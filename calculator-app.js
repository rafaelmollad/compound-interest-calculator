// ====================
// Get the DOM elements
// ====================
const initialDepositEl = document.querySelector("#initial-deposit");
const contributionsEl = document.querySelector("#contributions");
const contributionFrequencyEls = document.querySelectorAll(
  ".contribution-periods"
);
const investmentTimeEl = document.querySelector("#time");
const rateEl = document.querySelector("#rate");
const compoundFrequencyEls = document.querySelectorAll(".compound-frequency");
const handlers = document.querySelectorAll(".step-handler");
const messageEl = document.querySelector("#message");
const formEl = document.querySelector("#form");

// =============================================
// Initialize variables
// =============================================
let initialDeposit;
setValue(initialDepositEl.id, initialDepositEl.value);

let contributions;
setValue(contributionsEl.id, contributionsEl.value);

let investmentTime;
setValue(investmentTimeEl.id, investmentTimeEl.value);

let rate;
setValue(rateEl.id, rateEl.value);

// Loop through each contribution period to know which one is checked and store its value
let contributionPeriod;
contributionFrequencyEls.forEach((period) => {
  if (period.checked) {
    contributionPeriod = period.value;
  }
});

// Loop through each compounding period to know which one is checked and store its value
let compoundFrequency;
compoundFrequencyEls.forEach((compoundingPeriod) => {
  if (compoundingPeriod.checked) {
    compoundFrequency = compoundingPeriods[compoundingPeriod.value];
  }
});

// ===================
// Set event listeners
// ===================

// Event listener for initial deposit, contributions and rate elements
[initialDepositEl, contributionsEl, rateEl].forEach((el) => {
  el.addEventListener("change", (e) => {
    e.target.value = getValidInput(e.target.id, sanitizeInput(e.target.value));

    setValue(e.target.id, e.target.value);
  });
});

// Event listener for the contribution period radio buttons
contributionFrequencyEls.forEach((period) => {
  period.addEventListener("change", (e) => {
    contributionPeriod = e.target.value;
  });
});

// Event listener for the compound frequency radio buttons
compoundFrequencyEls.forEach((compoundingPeriod) => {
  compoundingPeriod.addEventListener("change", (e) => {
    compoundFrequency = compoundingPeriods[e.target.value];
  });
});

// Event listener for the increase and decrease handlers
handlers.forEach((el) => {
  el.addEventListener("click", (e) => {
    // Get the text input linked to the handlers
    const textInput = e.target.parentNode.querySelector("input");

    // Set the new text input value
    textInput.value = getIncrementSum(textInput, e.target);

    setValue(textInput.id, textInput.value);
  });
});

// Don't submit the form if 'Enter' was pressed
document.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    return false;
  }
});

// Calculate the interest
formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  // Calculate the result and set it as the value for the message paragraph
  messageEl.textContent = calculate(
    initialDeposit,
    contributions,
    contributionPeriod,
    investmentTime,
    rate,
    compoundFrequency
  );
});
