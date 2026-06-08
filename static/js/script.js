// Formula math — must stay in sync with FORMULAS in app.py
const FORMULAS = {
  epley:    (w, r) => w * (1 + r / 30),
  brzycki:  (w, r) => w * 36 / (37 - r),
  lombardi: (w, r) => w * Math.pow(r, 0.10),
};

const PERCENTS = [100, 95, 90, 85, 80, 75, 70, 65, 60];
const LB_PER_KG = 2.2046226218;

const form = document.getElementById("form");
const weightEl = document.getElementById("weight");
const unitEl = document.getElementById("weightUnit");
const repsEl = document.getElementById("reps");
const resultSection = document.getElementById("result");
const resultValue = document.getElementById("resultValue");
const resultUnit = document.getElementById("resultUnit");
const formulaNote = document.getElementById("formulaNote");
const percentTable = document.getElementById("percentTable");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const weight = parseFloat(weightEl.value);
  const reps = parseInt(repsEl.value, 10);
  const unit = unitEl.value;
  const formulaKey = form.querySelector('input[name="formula"]:checked').value;

  if (!isFinite(weight) || weight <= 0) return;
  if (!isFinite(reps) || reps < 1) return;
  if (!FORMULAS[formulaKey]) return;

  // Compute in kg, then convert result to the user's unit for display.
  const weightKg = unit === "lb" ? weight / LB_PER_KG : weight;
  const oneRmKg = FORMULAS[formulaKey](weightKg, reps);
  const oneRmDisplay = unit === "lb" ? oneRmKg * LB_PER_KG : oneRmKg;

  resultValue.textContent = oneRmDisplay.toFixed(1);
  resultUnit.textContent = unit;

  const formula = FORMULAS[formulaKey];
  const optionEl = form.querySelector(`input[value="${formulaKey}"]`).closest(".formula-option");
  const note = optionEl ? optionEl.dataset.note : "";
  formulaNote.textContent = note;

  percentTable.innerHTML = PERCENTS.map((p) => {
    const weightAtP = oneRmDisplay * (p / 100);
    return `<tr><td>${p}%</td><td>${weightAtP.toFixed(1)} ${unit}</td></tr>`;
  }).join("");

  resultSection.hidden = false;
});

// ---------- Tooltip toggle for touch devices ----------
const options = form.querySelectorAll(".formula-option");

options.forEach((option) => {
  option.addEventListener("click", (e) => {
    // Only treat as a toggle if the click was on the label, not the radio itself.
    // The native radio input handles the "change" event for selection.
    if (e.target.tagName === "INPUT") return;
    e.preventDefault();
    const wasOpen = option.classList.contains("is-open");
    options.forEach((o) => o.classList.remove("is-open"));
    if (!wasOpen) option.classList.add("is-open");
  });
});

// Dismiss open tooltips when picking a formula.
form.querySelectorAll('input[name="formula"]').forEach((input) => {
  input.addEventListener("change", () => {
    options.forEach((o) => o.classList.remove("is-open"));
  });
});

// Dismiss on outside click.
document.addEventListener("click", (e) => {
  if (!e.target.closest(".formula-option")) {
    options.forEach((o) => o.classList.remove("is-open"));
  }
});
