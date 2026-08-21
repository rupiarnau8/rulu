# MVP · Plan Financiero Personal (dinámico y multiusuario)

Aplicación web ligera (HTML + CSS + JS, sin build ni backend) que generaliza el
esquema de `contexto.md` para que **cualquier usuario** pueda montar y visualizar
su propia organización financiera: reparto del sueldo, patrimonio objetivo,
cartera de inversión y reglas de seguimiento.

## Cómo abrirla

Solo hace falta un navegador. Dos opciones:

1. Abrir directamente `index.html` con doble clic.
2. O servirla (recomendado, evita restricciones de `file://`):
   ```bash
   cd mvp
   python -m http.server 8000
   # abrir http://localhost:8000
   ```

No requiere `npm install`. El único recurso externo es Chart.js vía CDN
(`cdn.jsdelivr.net`) para las gráficas de tipo donut.

## El archivo .json es la única base de datos

No hay `localStorage` ni backend: **el estado completo de la app vive solo en
memoria del navegador** mientras trabajas, y el archivo `.json` que descargas
es la única copia persistente.

Flujo:

1. **Al abrir la app** aparece una pantalla de bienvenida con tres opciones:
   - **Crear mi plan desde cero** → arranca un perfil vacío ("Mi perfil").
   - **Cargar ejemplo explicativo** → arranca con datos **ficticios y
     genéricos** (bancos, productos e ISIN inventados, todos los campos
     prefijados con `[Ejemplo]`), pensados solo para mostrar cómo se rellena
     cada tabla; nunca se muestran como si fueran datos reales.
   - **Importar mi archivo .json** → continuar editando un plan ya
     descargado previamente.
2. **Mientras editas**, cualquier cambio en las tablas marca el indicador de
   cabecera como "● Cambios sin descargar". Si cierras/recargas la pestaña
   con cambios pendientes, el navegador pide confirmación (no hay autoguardado).
3. **"Descargar JSON"** vuelca el estado completo (todos los perfiles) a
   `plan-financiero.json` y limpia el indicador ("✓ Todo descargado").
4. **"Importar"** (en la cabecera, una vez dentro de la app) sustituye el
   estado actual por el contenido de un `.json` subido.
5. **"Cerrar archivo"** descarta el estado en memoria y vuelve a la pantalla
   de bienvenida (pide confirmación si hay cambios sin descargar).

## Modelo de datos (de contexto.md a un formato genérico)

`contexto.md` describe un caso concreto: bloques fijos (Gastos, Corto plazo,
Medio plazo, Medio-largo plazo, Largo plazo, Riesgo), con sus propios % y
vehículos. El MVP convierte esa idea en una estructura **libre y editable**
por perfil. Así es el JSON que se descarga/importa:

```
perfil
├── income                → sueldo/ingreso mensual
├── monthlyBuckets[]       → "Distribución de la aportación mensual" (tabla 2)
│     { name, purpose, horizon, targetPercent, vehicle, rate, capital }
├── capitalBuckets[]       → "Estructura objetivo del capital total" (tabla 3)
│     { name, purpose, horizon, targetPercent, vehicle, capital }
├── portfolios{bucketId}[] → desglose de cartera dentro de un bloque (tabla 3.1)
│     { name, isin, weightPercent, covers, role }
└── reviewRules[]          → "Seguimiento y revisión" (tabla 3.3)
      { frequency, what, check, action }
```

Cada usuario define **sus propios bloques** (no hay categorías fijas de
fábrica): puede llamarlos "Gastos", "Fondo de emergencia", "Viajes", etc., y
ajustar horizonte, % objetivo, vehículo y rentabilidad. Esto permite
reproducir el caso de `contexto.md` tal cual (ya viene precargado como perfil
de ejemplo) o crear uno completamente distinto.

## Perfiles (varios planes en un mismo archivo)

- Selector de perfil en la cabecera: crear, renombrar y eliminar perfiles.
- Cada perfil tiene su propio sueldo, bloques, cartera y reglas.
- Un mismo archivo `.json` puede contener varios perfiles (por ejemplo,
  distintos escenarios o distintos miembros de una familia): el selector
  cambia entre ellos sin perder ninguno; todos se descargan juntos.
- El perfil de ejemplo "Ejemplo ilustrativo" solo aparece si eliges "Cargar
  ejemplo explicativo" en la bienvenida; usa datos ficticios marcados con
  `[Ejemplo]` en cada campo y nunca se mezcla con tus datos reales.

## Evolución del capital (proyección)

- Pestaña **"Evolución del capital"**: proyecta cada bloque de la
  distribución mensual (capital inicial + aportación + rentabilidad indicada)
  con interés compuesto mensual, a lo largo de un horizonte ajustable
  (slider, campo numérico o presets de 1/5/10/15/20/30 años).
- Gráfica de área apilada con la evolución año a año, tarjetas resumen
  (capital inicial, aportado, capital final estimado, interés generado) y
  tabla de detalle por bloque.
- Se recalcula en vivo ante cualquier cambio de sueldo, %, rentabilidad o
  capital inicial, sin recargar la página.

> Es una estimación de interés compuesto sobre los datos introducidos, no una
> proyección financiera garantizada ni asesoramiento de inversión.

## Pestañas

- **Resumen** — sueldo, tarjetas de métricas (capital total, tasa de ahorro,
  comprobación de que los % suman 100) y dos gráficas donut (reparto mensual
  y patrimonio objetivo). Es la vista simple por defecto.
- **Distribución mensual** — tabla editable de bloques mensuales; el importe
  en euros se calcula solo (`sueldo × %`).
- **Patrimonio objetivo** — tabla editable de bloques de patrimonio; calcula
  el % real a partir del capital introducido y la desviación frente al
  objetivo (verde/ámbar/rojo).
- **Carteras** *(modo avanzado)* — para un bloque de patrimonio elegido,
  desglose de activos (ISIN, peso, función), replicando la lógica de la
  cartera de largo plazo del documento, pero aplicable a cualquier bloque.
- **Seguimiento** *(modo avanzado)* — tabla libre de reglas de revisión
  (frecuencia, qué mirar, qué comprobar, acción).

El interruptor **"Modo avanzado"** de la cabecera oculta por defecto
*Carteras* y *Seguimiento* para que un usuario sin conocimientos de
inversión vea solo lo esencial (sueldo, reparto, patrimonio), y lo active
cuando quiera el nivel de detalle de `contexto.md`.

## Por qué esta arquitectura para un MVP

- **Sin backend ni almacenamiento oculto**: el archivo `.json` que el usuario
  descarga/sube es literalmente todo lo que existe; no hay `localStorage` ni
  servidor que pueda desincronizarse o filtrar datos.
- **Tablas 100 % editables**: añadir/eliminar filas, cualquier campo es un
  input; nada está "hardcodeado" a los bloques del documento de ejemplo.
- **Cálculos derivados en vivo**: importes, % reales, desviaciones, sumas de
  control (100 %) y proyección a futuro se recalculan al vuelo, igual que en
  las tablas de `contexto.md`.
- **Visual desde el primer momento**: donuts de reparto mensual y de
  patrimonio, gráfica de evolución del capital, tarjetas de estado con
  semáforo de color.

## Siguientes pasos naturales (fuera de alcance del MVP)

- Backend + autenticación real para multiusuario (hoy cada archivo `.json`
  es la identidad de un usuario, sin login ni sincronización entre
  dispositivos salvo mover el propio archivo).
- Soporte de sub-bloques anidados (el documento anida "Largo plazo → 50 %
  medio-largo / 50 % jubilación → activos"); el MVP simplifica a un solo
  nivel de cartera por bloque.
- Histórico real (capital mes a mes ya ejecutado, no solo proyectado) y
  conexión con datos reales de banco/bróker.
