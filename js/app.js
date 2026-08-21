function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function fmtMoney(n) {
  const v = Number(n) || 0;
  return v.toLocaleString("es-ES", { maximumFractionDigits: 0 }) + " \u20ac";
}

function fmtPct(n) {
  const v = Number(n) || 0;
  return v.toLocaleString("es-ES", { maximumFractionDigits: 1 }) + " %";
}

function emptyMonthlyRow() {
  return { id: uid(), name: "", purpose: "", horizon: "", targetPercent: 0, vehicle: "", rate: 0, capital: 0 };
}

function emptyCapitalRow() {
  return { id: uid(), name: "", purpose: "", horizon: "", targetPercent: 0, vehicle: "", capital: 0 };
}

function emptyAssetRow() {
  return { id: uid(), name: "", isin: "", weightPercent: 0, covers: "", role: "" };
}

function emptyRuleRow() {
  return { frequency: "", what: "", check: "", action: "" };
}

function demoProfile() {
  const emergencyBucketId = uid();
  const longTermBucketId = uid();
  return {
    income: 2000,
    monthlyBuckets: [
      { id: uid(), name: "[Ejemplo] Gastos fijos", purpose: "[Ejemplo] Alquiler/hipoteca, suministros, seguros, comida...", horizon: "Mensual", targetPercent: 50, vehicle: "[Ejemplo] Banco A · cuenta corriente (0 %)", rate: 0, capital: 0 },
      { id: uid(), name: "[Ejemplo] Ocio y gastos variables", purpose: "[Ejemplo] Salidas, ropa, caprichos, imprevistos pequeños", horizon: "Mensual", targetPercent: 10, vehicle: "[Ejemplo] Banco A · misma cuenta de gasto", rate: 0, capital: 0 },
      { id: uid(), name: "[Ejemplo] Fondo de emergencia", purpose: "[Ejemplo] Colchón para imprevistos (3-6 meses de gastos)", horizon: "Corto plazo (0-2 años)", targetPercent: 10, vehicle: "[Ejemplo] Banco B · cuenta remunerada (rentabilidad de ejemplo)", rate: 2, capital: 1000 },
      { id: uid(), name: "[Ejemplo] Ahorro medio plazo", purpose: "[Ejemplo] Objetivo concreto a 3-5 años (coche, entrada de vivienda...)", horizon: "Medio plazo (3-5 años)", targetPercent: 10, vehicle: "[Ejemplo] Depósito o cuenta a plazo (rentabilidad de ejemplo)", rate: 3, capital: 1500 },
      { id: uid(), name: "[Ejemplo] Inversión largo plazo", purpose: "[Ejemplo] Crecimiento del patrimonio / jubilación", horizon: "Largo plazo (>10 años)", targetPercent: 18, vehicle: "[Ejemplo] Bróker · producto de inversión diversificado", rate: 6, capital: 2500 },
      { id: uid(), name: "[Ejemplo] Riesgo / especulación", purpose: "[Ejemplo] Operativa de mayor riesgo, capital que se puede perder", horizon: "Sin horizonte fijo", targetPercent: 2, vehicle: "[Ejemplo] Bróker · productos de mayor riesgo", rate: 0, capital: 0 },
    ],
    capitalBuckets: [
      { id: uid(), name: "[Ejemplo] Liquidez disponible", purpose: "[Ejemplo] Saldo para pagos y gastos del día a día", horizon: "Inmediato", targetPercent: 5, vehicle: "[Ejemplo] Banco A · cuenta corriente (0 %)", capital: 250 },
      { id: emergencyBucketId, name: "[Ejemplo] Fondo de emergencia", purpose: "[Ejemplo] Reserva para imprevistos, alta liquidez", horizon: "Corto plazo (0-2 años)", targetPercent: 15, vehicle: "[Ejemplo] Banco B · cuenta remunerada", capital: 750 },
      { id: uid(), name: "[Ejemplo] Ahorro medio plazo", purpose: "[Ejemplo] Capital reservado para un objetivo concreto", horizon: "Medio plazo (3-5 años)", targetPercent: 20, vehicle: "[Ejemplo] Depósito o cuenta a plazo", capital: 1000 },
      { id: longTermBucketId, name: "[Ejemplo] Inversión largo plazo", purpose: "[Ejemplo] Cartera diversificada para crecimiento a largo plazo", horizon: "Largo plazo (>10 años)", targetPercent: 55, vehicle: "[Ejemplo] Ver desglose en la pestaña Carteras", capital: 2750 },
      { id: uid(), name: "[Ejemplo] Riesgo / especulación", purpose: "[Ejemplo] Capital asignado a operativa de mayor riesgo", horizon: "Sin horizonte fijo", targetPercent: 5, vehicle: "[Ejemplo] Bróker · productos de mayor riesgo", capital: 250 },
    ],
    portfolios: {
      [longTermBucketId]: [
        { id: uid(), name: "[Ejemplo] Producto A · núcleo diversificado", isin: "XX0000000001", weightPercent: 70, covers: "[Ejemplo] Mercados desarrollados a nivel global", role: "[Ejemplo] Núcleo principal de la cartera de largo plazo" },
        { id: uid(), name: "[Ejemplo] Producto B · complemento", isin: "XX0000000002", weightPercent: 20, covers: "[Ejemplo] Mercados emergentes o segmento complementario", role: "[Ejemplo] Diversifica la exposición geográfica del núcleo" },
        { id: uid(), name: "[Ejemplo] Producto C · renta fija", isin: "XX0000000003", weightPercent: 10, covers: "[Ejemplo] Bonos o deuda de baja volatilidad", role: "[Ejemplo] Estabiliza la cartera y reduce el riesgo global" },
      ],
    },
    reviewRules: [
      { frequency: "[Ejemplo] Mensual", what: "[Ejemplo] Gasto real vs. presupuesto", check: "[Ejemplo] Comparar el gasto del mes con el % planificado en cada bloque", action: "[Ejemplo] Ajustar el bloque de gastos si te has desviado" },
      { frequency: "[Ejemplo] Trimestral", what: "[Ejemplo] Estado de los productos", check: "[Ejemplo] Cambios relevantes en comisiones, condiciones o rentabilidad ofrecida", action: "[Ejemplo] Valorar cambiar de producto solo si cambia algo estructural" },
      { frequency: "[Ejemplo] Anual", what: "[Ejemplo] Rebalanceo de patrimonio", check: "[Ejemplo] Desviación entre el % actual y el % objetivo de cada bloque", action: "[Ejemplo] Usar nuevas aportaciones para corregir la desviación" },
    ],
  };
}

function emptyProfile() {
  return {
    income: 0,
    monthlyBuckets: [],
    capitalBuckets: [],
    portfolios: {},
    reviewRules: [],
  };
}

function emptyState() {
  return { currentProfile: null, profiles: {} };
}

function demoState() {
  return {
    currentProfile: "Ejemplo ilustrativo",
    profiles: {
      "Ejemplo ilustrativo": demoProfile(),
      "Mi perfil": emptyProfile(),
    },
  };
}

function blankState() {
  return {
    currentProfile: "Mi perfil",
    profiles: {
      "Mi perfil": emptyProfile(),
    },
  };
}

function isValidState(obj) {
  return !!obj && typeof obj === "object" && obj.profiles && typeof obj.profiles === "object" && obj.currentProfile;
}

let state = emptyState();
let isDirty = false;

function markDirty() {
  isDirty = true;
  updateDirtyIndicator();
}

function markClean() {
  isDirty = false;
  updateDirtyIndicator();
}

function updateDirtyIndicator() {
  const el = document.getElementById("dirtyIndicator");
  if (!el) return;
  if (isDirty) {
    el.textContent = "● Cambios sin descargar";
    el.className = "dirty-indicator dirty";
  } else {
    el.textContent = "✓ Todo descargado";
    el.className = "dirty-indicator saved";
  }
}

// Sustituye a los antiguos saveState()/loadState() basados en localStorage.
// El estado ahora solo vive en memoria: cualquier cambio marca "dirty" hasta
// que el usuario descarga el JSON. No hay persistencia automática en el
// navegador.
function saveState() {
  markDirty();
}

function currentProfile() {
  return state.profiles[state.currentProfile];
}

function sumPercent(rows) {
  return rows.reduce((acc, r) => acc + (Number(r.targetPercent) || 0), 0);
}

function totalCapital(rows) {
  return rows.reduce((acc, r) => acc + (Number(r.capital) || 0), 0);
}

let chartMensual = null;
let chartPatrimonio = null;
let chartProjection = null;

// Referencias a celdas calculadas, para poder refrescarlas en vivo sin
// reconstruir los <input> de la tabla (evita que el usuario pierda el foco
// mientras escribe).
let monthlyRefs = new Map();
let capitalRefs = new Map();
let capitalFootRefs = null;
let portfolioRefs = new Map();
let portfolioFootRefs = null;

function renderAll() {
  renderProfileSelect();
  renderIncome();
  renderMonthlyTable();
  renderCapitalTable();
  renderPortfolioSelect();
  renderPortfolioTable();
  renderRulesTable();
  renderSummary();
  renderProjection();
}

function renderProfileSelect() {
  const select = document.getElementById("profileSelect");
  select.innerHTML = "";
  Object.keys(state.profiles).forEach((name) => {
    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    if (name === state.currentProfile) opt.selected = true;
    select.appendChild(opt);
  });
}

function renderIncome() {
  document.getElementById("incomeInput").value = currentProfile().income || "";
}

function makeCell(tag, value, onChange, opts) {
  opts = opts || {};
  const td = document.createElement("td");
  const el = document.createElement(tag === "select" ? "select" : "input");
  if (tag !== "select") {
    el.type = opts.type || "text";
    if (opts.step) el.step = opts.step;
  } else {
    (opts.options || []).forEach((o) => {
      const op = document.createElement("option");
      op.value = o;
      op.textContent = o;
      if (o === value) op.selected = true;
      el.appendChild(op);
    });
  }
  if (tag !== "select") el.value = value;
  if (tag !== "select" && (opts.type || "text") === "text" && value) el.title = String(value);
  el.addEventListener("change", (e) => onChange(e.target.value));
  el.addEventListener("input", (e) => {
    onChange(e.target.value);
    if (tag !== "select" && (opts.type || "text") === "text") el.title = e.target.value;
  });
  td.appendChild(el);
  return td;
}

function makeComputedCell(text) {
  const td = document.createElement("td");
  td.className = "computed-cell";
  td.textContent = text;
  return td;
}

function makeDeleteCell(onDelete) {
  const td = document.createElement("td");
  const btn = document.createElement("button");
  btn.className = "row-delete";
  btn.textContent = "\u2715";
  btn.title = "Eliminar fila";
  btn.addEventListener("click", onDelete);
  td.appendChild(btn);
  return td;
}

function renderMonthlyTable() {
  const profile = currentProfile();
  const tbody = document.querySelector("#monthlyTable tbody");
  tbody.innerHTML = "";
  monthlyRefs = new Map();
  profile.monthlyBuckets.forEach((row) => {
    const tr = document.createElement("tr");
    tr.appendChild(makeCell("input", row.name, (v) => { row.name = v; saveState(); renderSummary(); renderProjection(); }));
    tr.appendChild(makeCell("input", row.purpose, (v) => { row.purpose = v; saveState(); }));
    tr.appendChild(makeCell("input", row.horizon, (v) => { row.horizon = v; saveState(); }));
    tr.appendChild(makeCell("input", row.targetPercent, (v) => { row.targetPercent = parseFloat(v) || 0; saveState(); recalcMonthly(); renderSummary(); renderProjection(); }, { type: "number", step: "0.1" }));
    tr.appendChild(makeCell("input", row.vehicle, (v) => { row.vehicle = v; saveState(); }));
    tr.appendChild(makeCell("input", row.rate, (v) => { row.rate = parseFloat(v) || 0; saveState(); renderProjection(); }, { type: "number", step: "0.01" }));
    tr.appendChild(makeCell("input", row.capital, (v) => { row.capital = parseFloat(v) || 0; saveState(); renderProjection(); }, { type: "number", step: "10" }));
    const profileIncome = profile.income || 0;
    const monthlyAmount = profileIncome * (row.targetPercent || 0) / 100;
    const amountCell = makeComputedCell(fmtMoney(monthlyAmount));
    tr.appendChild(amountCell);
    tr.appendChild(makeDeleteCell(() => {
      profile.monthlyBuckets = profile.monthlyBuckets.filter((r) => r.id !== row.id);
      saveState();
      renderMonthlyTable();
      renderSummary();
      renderProjection();
    }));
    tbody.appendChild(tr);
    monthlyRefs.set(row.id, { amountCell });
  });
}

function recalcMonthly() {
  const profile = currentProfile();
  const income = profile.income || 0;
  profile.monthlyBuckets.forEach((row) => {
    const refs = monthlyRefs.get(row.id);
    if (!refs) return;
    const amount = income * (row.targetPercent || 0) / 100;
    refs.amountCell.textContent = fmtMoney(amount);
  });
}

function renderCapitalTable() {
  const profile = currentProfile();
  const tbody = document.querySelector("#capitalTable tbody");
  tbody.innerHTML = "";
  capitalRefs = new Map();
  const total = totalCapital(profile.capitalBuckets);
  profile.capitalBuckets.forEach((row) => {
    const tr = document.createElement("tr");
    tr.appendChild(makeCell("input", row.name, (v) => {
      row.name = v; saveState(); renderSummary(); renderPortfolioSelect();
    }));
    tr.appendChild(makeCell("input", row.purpose, (v) => { row.purpose = v; saveState(); }));
    tr.appendChild(makeCell("input", row.horizon, (v) => { row.horizon = v; saveState(); }));
    tr.appendChild(makeCell("input", row.targetPercent, (v) => {
      row.targetPercent = parseFloat(v) || 0; saveState();
      recalcCapital(); recalcPortfolio(); renderSummary();
    }, { type: "number", step: "0.1" }));
    tr.appendChild(makeCell("input", row.vehicle, (v) => { row.vehicle = v; saveState(); }));
    tr.appendChild(makeCell("input", row.capital, (v) => {
      row.capital = parseFloat(v) || 0; saveState();
      recalcCapital(); renderSummary();
    }, { type: "number", step: "10" }));
    const actualPercent = total > 0 ? (row.capital / total) * 100 : 0;
    const actualCell = makeComputedCell(fmtPct(actualPercent));
    tr.appendChild(actualCell);
    const deviation = actualPercent - (row.targetPercent || 0);
    const devCell = makeComputedCell((deviation >= 0 ? "+" : "") + deviation.toFixed(1) + " %");
    devCell.style.color = deviationColor(deviation);
    tr.appendChild(devCell);
    tr.appendChild(makeDeleteCell(() => {
      profile.capitalBuckets = profile.capitalBuckets.filter((r) => r.id !== row.id);
      delete profile.portfolios[row.id];
      saveState();
      renderCapitalTable();
      renderPortfolioSelect();
      renderPortfolioTable();
      renderSummary();
    }));
    tbody.appendChild(tr);
    capitalRefs.set(row.id, { actualCell, devCell });
  });
  const pctSum = sumPercent(profile.capitalBuckets);
  const foot = document.getElementById("capitalFoot");
  foot.innerHTML = "";
  const totalSpan = document.createElement("span");
  totalSpan.textContent = "Capital total: " + fmtMoney(total);
  const sumLabel = document.createElement("span");
  sumLabel.textContent = "Suma % objetivo: ";
  const sumValue = document.createElement("span");
  sumValue.className = Math.abs(pctSum - 100) < 0.05 ? "ok" : "bad";
  sumValue.textContent = pctSum.toFixed(1) + " %";
  sumLabel.appendChild(sumValue);
  foot.appendChild(totalSpan);
  foot.appendChild(sumLabel);
  capitalFootRefs = { totalSpan, sumValue };
}

function deviationColor(deviation) {
  return Math.abs(deviation) <= 2 ? "var(--green)" : Math.abs(deviation) <= 5 ? "var(--amber)" : "var(--red)";
}

function recalcCapital() {
  const profile = currentProfile();
  const total = totalCapital(profile.capitalBuckets);
  profile.capitalBuckets.forEach((row) => {
    const refs = capitalRefs.get(row.id);
    if (!refs) return;
    const actualPercent = total > 0 ? (row.capital / total) * 100 : 0;
    refs.actualCell.textContent = fmtPct(actualPercent);
    const deviation = actualPercent - (row.targetPercent || 0);
    refs.devCell.textContent = (deviation >= 0 ? "+" : "") + deviation.toFixed(1) + " %";
    refs.devCell.style.color = deviationColor(deviation);
  });
  if (capitalFootRefs) {
    capitalFootRefs.totalSpan.textContent = "Capital total: " + fmtMoney(total);
    const pctSum = sumPercent(profile.capitalBuckets);
    capitalFootRefs.sumValue.className = Math.abs(pctSum - 100) < 0.05 ? "ok" : "bad";
    capitalFootRefs.sumValue.textContent = pctSum.toFixed(1) + " %";
  }
}

function renderPortfolioSelect() {
  const profile = currentProfile();
  const select = document.getElementById("portfolioBucketSelect");
  const prevValue = select.value;
  select.innerHTML = "";
  profile.capitalBuckets.forEach((b) => {
    const opt = document.createElement("option");
    opt.value = b.id;
    opt.textContent = b.name || "(sin nombre)";
    select.appendChild(opt);
  });
  if (profile.capitalBuckets.some((b) => b.id === prevValue)) {
    select.value = prevValue;
  }
}

function currentPortfolioBucketId() {
  const select = document.getElementById("portfolioBucketSelect");
  return select.value || (currentProfile().capitalBuckets[0] && currentProfile().capitalBuckets[0].id);
}

function renderPortfolioTable() {
  const profile = currentProfile();
  const bucketId = currentPortfolioBucketId();
  const tbody = document.querySelector("#portfolioTable tbody");
  tbody.innerHTML = "";
  portfolioRefs = new Map();
  const foot = document.getElementById("portfolioFoot");
  foot.innerHTML = "";
  portfolioFootRefs = null;
  if (!bucketId) return;
  const bucket = profile.capitalBuckets.find((b) => b.id === bucketId);
  const assets = profile.portfolios[bucketId] || [];
  assets.forEach((row) => {
    const tr = document.createElement("tr");
    tr.appendChild(makeCell("input", row.name, (v) => { row.name = v; saveState(); }));
    tr.appendChild(makeCell("input", row.isin, (v) => { row.isin = v; saveState(); }));
    tr.appendChild(makeCell("input", row.weightPercent, (v) => {
      row.weightPercent = parseFloat(v) || 0; saveState(); recalcPortfolio();
    }, { type: "number", step: "0.1" }));
    const weightOverTotal = bucket ? (bucket.targetPercent || 0) * (row.weightPercent || 0) / 100 : 0;
    const weightCell = makeComputedCell(fmtPct(weightOverTotal));
    tr.appendChild(weightCell);
    tr.appendChild(makeCell("input", row.covers, (v) => { row.covers = v; saveState(); }));
    tr.appendChild(makeCell("input", row.role, (v) => { row.role = v; saveState(); }));
    tr.appendChild(makeDeleteCell(() => {
      profile.portfolios[bucketId] = profile.portfolios[bucketId].filter((r) => r.id !== row.id);
      saveState();
      renderPortfolioTable();
    }));
    tbody.appendChild(tr);
    portfolioRefs.set(row.id, { weightCell });
  });
  const pctSum = assets.reduce((acc, r) => acc + (Number(r.weightPercent) || 0), 0);
  const sumLabel = document.createElement("span");
  sumLabel.textContent = "Suma peso en el bloque: ";
  const sumValue = document.createElement("span");
  sumValue.className = Math.abs((assets.length ? pctSum : 100) - 100) < 0.05 ? "ok" : "bad";
  sumValue.textContent = pctSum.toFixed(1) + " %";
  sumLabel.appendChild(sumValue);
  foot.appendChild(sumLabel);
  const bucketSpan = document.createElement("span");
  if (bucket) bucketSpan.textContent = "Peso del bloque sobre capital total: " + fmtPct(bucket.targetPercent || 0);
  foot.appendChild(bucketSpan);
  portfolioFootRefs = { sumValue, bucketSpan, bucketId };
}

function recalcPortfolio() {
  const profile = currentProfile();
  const bucketId = portfolioFootRefs ? portfolioFootRefs.bucketId : currentPortfolioBucketId();
  if (!bucketId) return;
  const bucket = profile.capitalBuckets.find((b) => b.id === bucketId);
  const assets = profile.portfolios[bucketId] || [];
  assets.forEach((row) => {
    const refs = portfolioRefs.get(row.id);
    if (!refs) return;
    const weightOverTotal = bucket ? (bucket.targetPercent || 0) * (row.weightPercent || 0) / 100 : 0;
    refs.weightCell.textContent = fmtPct(weightOverTotal);
  });
  if (portfolioFootRefs) {
    const pctSum = assets.reduce((acc, r) => acc + (Number(r.weightPercent) || 0), 0);
    portfolioFootRefs.sumValue.className = Math.abs((assets.length ? pctSum : 100) - 100) < 0.05 ? "ok" : "bad";
    portfolioFootRefs.sumValue.textContent = pctSum.toFixed(1) + " %";
    if (bucket) portfolioFootRefs.bucketSpan.textContent = "Peso del bloque sobre capital total: " + fmtPct(bucket.targetPercent || 0);
  }
}

function renderRulesTable() {
  const profile = currentProfile();
  const tbody = document.querySelector("#rulesTable tbody");
  tbody.innerHTML = "";
  profile.reviewRules.forEach((row, idx) => {
    const tr = document.createElement("tr");
    tr.appendChild(makeCell("input", row.frequency, (v) => { row.frequency = v; saveState(); }));
    tr.appendChild(makeCell("input", row.what, (v) => { row.what = v; saveState(); }));
    tr.appendChild(makeCell("input", row.check, (v) => { row.check = v; saveState(); }));
    tr.appendChild(makeCell("input", row.action, (v) => { row.action = v; saveState(); }));
    tr.appendChild(makeDeleteCell(() => {
      profile.reviewRules.splice(idx, 1);
      saveState();
      renderRulesTable();
    }));
    tbody.appendChild(tr);
  });
}

function metricCard(label, value, statusClass) {
  const div = document.createElement("div");
  div.className = "metric-card";
  const l = document.createElement("div");
  l.className = "label";
  l.textContent = label;
  const v = document.createElement("div");
  v.className = "value " + (statusClass || "");
  v.textContent = value;
  div.appendChild(l);
  div.appendChild(v);
  return div;
}

function renderSummary() {
  const profile = currentProfile();
  const cards = document.getElementById("summaryCards");
  cards.innerHTML = "";
  const income = profile.income || 0;
  const monthlyPctSum = sumPercent(profile.monthlyBuckets);
  const capitalPctSum = sumPercent(profile.capitalBuckets);
  const capitalTotal = totalCapital(profile.capitalBuckets);
  const savingsPct = profile.monthlyBuckets
    .filter((b) => !/gasto/i.test(b.name))
    .reduce((acc, r) => acc + (Number(r.targetPercent) || 0), 0);

  cards.appendChild(metricCard("Ingreso mensual", fmtMoney(income)));
  cards.appendChild(metricCard("Capital total actual", fmtMoney(capitalTotal)));
  cards.appendChild(metricCard("Tasa de ahorro estimada", fmtPct(savingsPct), savingsPct >= 20 ? "ok" : "warn"));
  cards.appendChild(metricCard(
    "Suma % mensual",
    monthlyPctSum.toFixed(1) + " %",
    Math.abs(monthlyPctSum - 100) < 0.05 ? "ok" : "bad"
  ));
  cards.appendChild(metricCard(
    "Suma % patrimonio",
    capitalPctSum.toFixed(1) + " %",
    Math.abs(capitalPctSum - 100) < 0.05 ? "ok" : "bad"
  ));

  renderDonutMensual(profile);
  renderDonutPatrimonio(profile);

  document.getElementById("statusMensual").textContent =
    Math.abs(monthlyPctSum - 100) < 0.05
      ? "La distribución mensual suma 100 %."
      : `La distribución mensual suma ${monthlyPctSum.toFixed(1)} %. Ajusta los bloques para llegar a 100 %.`;

  document.getElementById("statusPatrimonio").textContent =
    Math.abs(capitalPctSum - 100) < 0.05
      ? "La estructura objetivo de patrimonio suma 100 %."
      : `La estructura objetivo de patrimonio suma ${capitalPctSum.toFixed(1)} %. Ajusta los bloques para llegar a 100 %.`;
}

const PALETTE = ["#4f8cff", "#34c98a", "#e5b95c", "#ef5b6b", "#a385ff", "#3fc7d6", "#ff8fab", "#7bd389"];

function renderDonutMensual(profile) {
  const ctx = document.getElementById("chartMensual");
  const labels = profile.monthlyBuckets.map((b) => b.name || "(sin nombre)");
  const data = profile.monthlyBuckets.map((b) => b.targetPercent || 0);
  if (chartMensual) {
    chartMensual.data.labels = labels;
    chartMensual.data.datasets[0].data = data;
    chartMensual.update();
    return;
  }
  chartMensual = new Chart(ctx, {
    type: "doughnut",
    data: { labels, datasets: [{ data, backgroundColor: PALETTE, borderWidth: 0 }] },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: "bottom", labels: { color: "#e8ecf5", boxWidth: 12 } } },
    },
  });
}

function renderDonutPatrimonio(profile) {
  const ctx = document.getElementById("chartPatrimonio");
  const labels = profile.capitalBuckets.map((b) => b.name || "(sin nombre)");
  const data = profile.capitalBuckets.map((b) => b.targetPercent || 0);
  if (chartPatrimonio) {
    chartPatrimonio.data.labels = labels;
    chartPatrimonio.data.datasets[0].data = data;
    chartPatrimonio.update();
    return;
  }
  chartPatrimonio = new Chart(ctx, {
    type: "doughnut",
    data: { labels, datasets: [{ data, backgroundColor: PALETTE, borderWidth: 0 }] },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: "bottom", labels: { color: "#e8ecf5", boxWidth: 12 } } },
    },
  });
}

function getHorizonYears() {
  const el = document.getElementById("horizonNumber");
  const raw = parseInt(el.value, 10);
  return Math.max(1, Math.min(40, isNaN(raw) ? 20 : raw));
}

function computeBucketYearlySeries(bucket, income, years) {
  const months = years * 12;
  const monthlyRate = (Number(bucket.rate) || 0) / 100 / 12;
  const contribution = income * (Number(bucket.targetPercent) || 0) / 100;
  let capital = Number(bucket.capital) || 0;
  const yearly = [capital];
  for (let m = 1; m <= months; m++) {
    capital = capital * (1 + monthlyRate) + contribution;
    if (m % 12 === 0) yearly.push(capital);
  }
  return yearly;
}

function textCell(text, numeric) {
  const td = document.createElement("td");
  if (numeric) td.className = "num";
  td.textContent = text;
  return td;
}

function spanText(text, cls) {
  const span = document.createElement("span");
  if (cls) span.className = cls;
  span.textContent = text;
  return span;
}

function renderProjection() {
  const profile = currentProfile();
  const years = getHorizonYears();
  const horizonLabel = document.getElementById("horizonLabel");
  if (horizonLabel) horizonLabel.textContent = years;
  const income = profile.income || 0;
  const buckets = profile.monthlyBuckets;

  const seriesList = buckets.map((b) => ({ bucket: b, series: computeBucketYearlySeries(b, income, years) }));
  const labels = Array.from({ length: years + 1 }, (_, i) => i);
  const totalSeries = labels.map((_, i) => seriesList.reduce((acc, s) => acc + s.series[i], 0));

  renderProjectionChart(labels, seriesList);
  renderProjectionCards(seriesList, totalSeries, years, income, buckets);
  renderProjectionTable(seriesList, totalSeries, years, income);
}

function renderProjectionChart(labels, seriesList) {
  const ctx = document.getElementById("chartProjection");
  if (!ctx) return;
  const datasets = seriesList.map((s, idx) => {
    const color = PALETTE[idx % PALETTE.length];
    return {
      label: s.bucket.name || "(sin nombre)",
      data: s.series,
      borderColor: color,
      backgroundColor: color + "55",
      fill: true,
      stack: "capital",
      tension: 0.25,
      pointRadius: 0,
    };
  });
  if (chartProjection) {
    chartProjection.data.labels = labels;
    chartProjection.data.datasets = datasets;
    chartProjection.update();
    return;
  }
  chartProjection = new Chart(ctx, {
    type: "line",
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      scales: {
        x: { title: { display: true, text: "Años", color: "#9aa5c0" }, ticks: { color: "#9aa5c0" }, grid: { color: "#2a3450" } },
        y: { stacked: true, ticks: { color: "#9aa5c0", callback: (v) => fmtMoney(v) }, grid: { color: "#2a3450" } },
      },
      plugins: {
        legend: { position: "bottom", labels: { color: "#e8ecf5", boxWidth: 12 } },
        tooltip: { callbacks: { label: (item) => `${item.dataset.label}: ${fmtMoney(item.parsed.y)}` } },
      },
    },
  });
}

function renderProjectionCards(seriesList, totalSeries, years, income, buckets) {
  const cards = document.getElementById("projectionCards");
  if (!cards) return;
  cards.innerHTML = "";
  const initialTotal = buckets.reduce((acc, b) => acc + (Number(b.capital) || 0), 0);
  const monthlyContributionTotal = buckets.reduce((acc, b) => acc + income * (Number(b.targetPercent) || 0) / 100, 0);
  const finalTotal = totalSeries[years];
  const contributedTotal = monthlyContributionTotal * 12 * years;
  const interestGenerated = finalTotal - initialTotal - contributedTotal;

  cards.appendChild(metricCard("Capital inicial", fmtMoney(initialTotal)));
  cards.appendChild(metricCard("Aportación mensual total", fmtMoney(monthlyContributionTotal)));
  cards.appendChild(metricCard(`Capital estimado a ${years} años`, fmtMoney(finalTotal), "ok"));
  cards.appendChild(metricCard("Aportado en el periodo", fmtMoney(contributedTotal)));
  cards.appendChild(metricCard("Interés / rentabilidad generada", fmtMoney(interestGenerated), interestGenerated >= 0 ? "ok" : "bad"));
}

function renderProjectionTable(seriesList, totalSeries, years, income) {
  const tbody = document.querySelector("#projectionTable tbody");
  if (!tbody) return;
  tbody.innerHTML = "";
  let totalInitial = 0, totalFinal = 0, totalContributed = 0;
  seriesList.forEach(({ bucket, series }) => {
    const initial = Number(bucket.capital) || 0;
    const contribution = income * (Number(bucket.targetPercent) || 0) / 100;
    const final = series[years];
    const contributed = contribution * 12 * years;
    const interest = final - initial - contributed;

    totalInitial += initial;
    totalFinal += final;
    totalContributed += contributed;

    const tr = document.createElement("tr");
    tr.appendChild(textCell(bucket.name || "(sin nombre)"));
    tr.appendChild(textCell(fmtMoney(initial), true));
    tr.appendChild(textCell(fmtMoney(contribution), true));
    tr.appendChild(textCell(fmtPct(bucket.rate || 0), true));
    tr.appendChild(textCell(fmtMoney(final), true));
    tr.appendChild(textCell(fmtMoney(contributed), true));
    const interestCell = textCell((interest >= 0 ? "+" : "") + fmtMoney(interest), true);
    interestCell.style.color = interest >= 0 ? "var(--green)" : "var(--red)";
    tr.appendChild(interestCell);
    tbody.appendChild(tr);
  });

  const totalInterest = totalFinal - totalInitial - totalContributed;
  const foot = document.getElementById("projectionFoot");
  if (!foot) return;
  foot.innerHTML = "";
  foot.appendChild(spanText(`Capital inicial total: ${fmtMoney(totalInitial)}`));
  foot.appendChild(spanText(`Aportado en el periodo: ${fmtMoney(totalContributed)}`));
  foot.appendChild(spanText(`Capital proyectado total: ${fmtMoney(totalFinal)}`, "ok"));
  foot.appendChild(spanText(
    `Interés generado total: ${(totalInterest >= 0 ? "+" : "") + fmtMoney(totalInterest)}`,
    totalInterest >= 0 ? "ok" : "bad"
  ));
}

function setupProjectionControls() {
  const range = document.getElementById("horizonRange");
  const number = document.getElementById("horizonNumber");
  if (!range || !number) return;
  const presetButtons = document.querySelectorAll("#horizonPresets .preset-btn");

  function highlightPresets(years) {
    presetButtons.forEach((btn) => btn.classList.toggle("active", Number(btn.dataset.years) === years));
  }

  function setYears(years) {
    years = Math.max(1, Math.min(40, years));
    range.value = years;
    number.value = years;
    highlightPresets(years);
    renderProjection();
  }

  range.addEventListener("input", () => setYears(parseInt(range.value, 10) || 1));
  number.addEventListener("input", () => setYears(parseInt(number.value, 10) || 1));
  presetButtons.forEach((btn) => {
    btn.addEventListener("click", () => setYears(Number(btn.dataset.years)));
  });

  highlightPresets(parseInt(number.value, 10) || 20);
}

function setupTabs() {
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      activateTab(btn.dataset.tab);
    });
  });
}

function activateTab(tabName) {
  document.querySelectorAll(".tab-btn").forEach((b) => b.classList.toggle("active", b.dataset.tab === tabName));
  document.querySelectorAll(".tab-panel").forEach((p) => p.classList.toggle("active", p.id === "tab-" + tabName));
}

function setupAdvancedToggle() {
  const toggle = document.getElementById("advancedToggle");
  toggle.checked = false;
  document.body.classList.remove("advanced-mode");

  toggle.addEventListener("change", () => {
    const enabled = toggle.checked;
    document.body.classList.toggle("advanced-mode", enabled);
    if (!enabled) {
      const activePanel = document.querySelector(".tab-panel.active");
      if (activePanel && (activePanel.id === "tab-carteras" || activePanel.id === "tab-seguimiento")) {
        activateTab("resumen");
      }
    }
  });
}

function setupProfileControls() {
  document.getElementById("profileSelect").addEventListener("change", (e) => {
    state.currentProfile = e.target.value;
    saveState();
    renderAll();
  });

  document.getElementById("newProfileBtn").addEventListener("click", () => {
    const name = prompt("Nombre del nuevo perfil:");
    if (!name) return;
    if (state.profiles[name]) {
      alert("Ya existe un perfil con ese nombre.");
      return;
    }
    state.profiles[name] = emptyProfile();
    state.currentProfile = name;
    saveState();
    renderAll();
  });

  document.getElementById("renameProfileBtn").addEventListener("click", () => {
    const oldName = state.currentProfile;
    const name = prompt("Nuevo nombre para el perfil:", oldName);
    if (!name || name === oldName) return;
    if (state.profiles[name]) {
      alert("Ya existe un perfil con ese nombre.");
      return;
    }
    state.profiles[name] = state.profiles[oldName];
    delete state.profiles[oldName];
    state.currentProfile = name;
    saveState();
    renderAll();
  });

  document.getElementById("deleteProfileBtn").addEventListener("click", () => {
    const names = Object.keys(state.profiles);
    if (names.length <= 1) {
      alert("Debe existir al menos un perfil.");
      return;
    }
    if (!confirm(`¿Eliminar el perfil "${state.currentProfile}"?`)) return;
    delete state.profiles[state.currentProfile];
    state.currentProfile = Object.keys(state.profiles)[0];
    saveState();
    renderAll();
  });

  document.getElementById("exportBtn").addEventListener("click", downloadStateAsJson);

  document.getElementById("importInput").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    importStateFromFile(file, (err) => {
      if (err) {
        alert("No se pudo importar el archivo: " + err.message);
      } else {
        isDemoLoaded = false;
        updateDemoBanner();
        renderAll();
      }
    });
    e.target.value = "";
  });

  document.getElementById("closeFileBtn").addEventListener("click", () => {
    if (isDirty && !confirm("Tienes cambios sin descargar. Si cierras el archivo se perderán. ¿Continuar?")) {
      return;
    }
    goToOnboarding();
  });
}

function downloadStateAsJson() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "plan-financiero.json";
  a.click();
  URL.revokeObjectURL(url);
  markClean();
}

function importStateFromFile(file, callback) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(reader.result);
      if (!isValidState(imported)) throw new Error("Formato inválido");
      if (!imported.profiles[imported.currentProfile]) {
        imported.currentProfile = Object.keys(imported.profiles)[0] || null;
      }
      state = imported;
      markClean();
      callback(null);
    } catch (err) {
      callback(err);
    }
  };
  reader.readAsText(file);
}

function setupIncome() {
  document.getElementById("incomeInput").addEventListener("input", (e) => {
    currentProfile().income = parseFloat(e.target.value) || 0;
    saveState();
    recalcMonthly();
    renderSummary();
    renderProjection();
  });
}

function setupAddButtons() {
  document.getElementById("addMonthlyBtn").addEventListener("click", () => {
    currentProfile().monthlyBuckets.push(emptyMonthlyRow());
    saveState();
    renderMonthlyTable();
    renderSummary();
    renderProjection();
  });

  document.getElementById("addCapitalBtn").addEventListener("click", () => {
    currentProfile().capitalBuckets.push(emptyCapitalRow());
    saveState();
    renderCapitalTable();
    renderPortfolioSelect();
    renderSummary();
  });

  document.getElementById("addAssetBtn").addEventListener("click", () => {
    const bucketId = currentPortfolioBucketId();
    if (!bucketId) {
      alert("Primero crea un bloque de patrimonio.");
      return;
    }
    const profile = currentProfile();
    if (!profile.portfolios[bucketId]) profile.portfolios[bucketId] = [];
    profile.portfolios[bucketId].push(emptyAssetRow());
    saveState();
    renderPortfolioTable();
  });

  document.getElementById("addRuleBtn").addEventListener("click", () => {
    currentProfile().reviewRules.push(emptyRuleRow());
    saveState();
    renderRulesTable();
  });

  document.getElementById("portfolioBucketSelect").addEventListener("change", () => {
    renderPortfolioTable();
  });
}

function showOnboarding() {
  document.body.classList.remove("app-active");
  const err = document.getElementById("onboardingError");
  if (err) err.textContent = "";
}

let isDemoLoaded = false;

function updateDemoBanner() {
  const banner = document.getElementById("demoBanner");
  if (banner) banner.hidden = !isDemoLoaded;
}

function showApp() {
  document.body.classList.add("app-active");
  markClean();
  updateDemoBanner();
  renderAll();
}

function goToOnboarding() {
  state = emptyState();
  isDemoLoaded = false;
  markClean();
  showOnboarding();
}

function setupOnboarding() {
  document.getElementById("startBlankBtn").addEventListener("click", () => {
    state = blankState();
    isDemoLoaded = false;
    showApp();
  });

  document.getElementById("startDemoBtn").addEventListener("click", () => {
    state = demoState();
    isDemoLoaded = true;
    showApp();
  });

  document.getElementById("onboardingImportInput").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const err = document.getElementById("onboardingError");
    importStateFromFile(file, (error) => {
      if (error) {
        if (err) err.textContent = "No se pudo importar el archivo: " + error.message;
      } else {
        if (err) err.textContent = "";
        isDemoLoaded = false;
        showApp();
      }
    });
    e.target.value = "";
  });
}

function setupUnloadWarning() {
  window.addEventListener("beforeunload", (e) => {
    if (isDirty) {
      e.preventDefault();
      e.returnValue = "";
    }
  });
}

function init() {
  setupTabs();
  setupAdvancedToggle();
  setupProfileControls();
  setupIncome();
  setupAddButtons();
  setupProjectionControls();
  setupOnboarding();
  setupUnloadWarning();
  showOnboarding();
}

document.addEventListener("DOMContentLoaded", init);
