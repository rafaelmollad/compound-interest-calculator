// Convert numbers to percentages. Example: 10 => 0.1
const numberToPercentage = function (number) {
  return number / 100;
};

// Converts a number into a currency number
// Example: 1000 => $1,000
const formatCurrency = function (number) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(number);
};

// Round a format the text input
const formatInput = function (id, number) {
  if (id === "rate") {
    return `${(Math.round(number * 100) / 100).toFixed(2)}%`;
  } else if (id === "initial-deposit" || id === "contributions") {
    return `$${Math.round(number)}`;
  } else {
    return Math.round(number);
  }
};

// Returns the sum of numberOne and numberTwo
const sum = function (numberOne, numberTwo) {
  return parseFloat(numberOne, 10) + parseFloat(numberTwo, 10);
};

// Remove invalid characters from the input
const sanitizeInput = function (input) {
  const regex = /\d*\.?\d+/g;
  let sanitizedInput = "";

  let matches = input.match(regex);

  if (matches) {
    matches.forEach((match) => {
      sanitizedInput += match;
    });
  }

  // Return a valid number
  return sanitizedInput;
};

// Sets the values that will be used to calculate the result
const setValue = function (id, value) {
  switch (id) {
    case "initial-deposit":
      initialDeposit = parseFloat(value.substring(1));
      break;
    case "contributions":
      contributions = parseFloat(value.substring(1));
      break;
    case "time":
      investmentTime = parseFloat(value);
      break;
    case "rate":
      rate = parseFloat(value.substring(0, value.length - 1));
      break;
  }
};

// Checks if the input number is within the set boundaries for the current text input.
// If it is, then it returns it. Otherwise it returns its min or max.
const getValidInput = function (id, number) {
  // Get the min and max for the text input with the specified id
  const { min, max } = steps[id];

  // Since number could be a string, we turn it into a float before comparing it
  number = parseFloat(number);

  if (!number || number < min) {
    return formatInput(id, min);
  } else if (number > max) {
    return formatInput(id, max);
  } else {
    return formatInput(id, number);
  }
};

// Gets the sum of the amount to increase/decrease plus the current text input value
const getIncrementSum = function (textInput, handler) {
  // A boolean to keep track which handler was pressed
  const isDecrease = handler.classList.contains("decrease-handler");

  const sanitizedInput = sanitizeInput(textInput.value);

  // amount is the amount by which we're going to increase or decrease the current input
  let amount = steps[textInput.id].amount;

  // If isDecrease is true, then we have to turn amount into a negative number
  if (isDecrease) {
    amount = -1 * amount;
  }

  // Sum value plus amount then return the sum, min or max accordingly
  return getValidInput(textInput.id, sum(sanitizedInput, amount));
};

// Creates the message that will be shown to the user
const getMessage = function (principal, years) {
  return `In ${years} years you will have ${formatCurrency(principal)} `;
};

// Computes how much your money will grow depending on the different variables used and returns the result
const calculate = (
  initialDeposit,
  addition,
  contributionPeriod,
  years,
  rate,
  compoundingFrequency
) => {
  // Turn the interest rate into a percentage.
  const percentageRate = numberToPercentage(rate);

  // This is the amount of money we deposit initially
  let principal = initialDeposit;

  // Additions can be monthly (true) or annually (false)
  let contribution =
    contributionPeriod === "monthly" ? addition * 12 : addition;

  // Shows how the initial investment grows each year
  for (let year = 0; year <= years; year++) {
    // Don't calculate a new principal if the current year is the last year
    // Since this was calculated in the previous loop
    if (year === years) {
      break;
    }

    // compoundingFrequency is the number of periods an investment is compounded within a year.
    // Example: Annually = 1. Semiannually = 2. Quarterly = 4. Monthly = 12. Daily = 365
    for (let period = 0; period < compoundingFrequency; period++) {
      // Calculate the interest
      let interest = principal * (percentageRate / compoundingFrequency);

      // If contributions are monthly we need to divide the contribution by the number of periods within a year
      if (contributionPeriod === "monthly") {
        principal = principal + interest + contribution / compoundingFrequency;
      } else {
        principal = principal + interest;
      }
    }

    // If the contribution is annually, then we add it to the end of the year
    if (contributionPeriod !== "monthly") {
      principal = principal + contribution;
    }
  }

  return getMessage(principal, years);
};
