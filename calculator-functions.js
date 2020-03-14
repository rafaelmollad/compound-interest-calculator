// Convert numbers to percentages. Example: 10% => 0.1
const numberToPercentage = function(number) {
  return number / 100;
};

// Converts a number into a currency number
// Example: 1000 => $1,000
const formatNumber = function(number) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });

  return formatter.format(number);
};

// prettier-ignore
// Creates the message that will be shown to the user
const getMessage = function (initialInvestment, isMonthly, contributionAmount, interestRate, balance,  years, compoundingFrequency) {

  const contributionFrequency = isMonthly ? 'monthly' : 'annual';

  contributionAmount = isMonthly ? contributionAmount / 12 : contributionAmount;


  return `Your initial investment of ${formatNumber(initialInvestment)} plus your ${contributionFrequency} investment of
  ${formatNumber(contributionAmount)} at an annualized interest rate of ${interestRate}% will be worth ${formatNumber(balance)} after ${years} years
  when compounded ${compoundingPeriods[compoundingFrequency]} ` 
}

// prettier-ignore
// Computes how much your money will grow depending on the different variables used and returns the result
const getValue = (initialDeposit, addition, years, rate, compoundingFrequency) => {
    // Turn the interest rate into a percentage.
    const percentageRate = numberToPercentage(rate);
  
    // This is the amount of money we deposit initially
    let principal = initialDeposit;
  
    // Is the contribution monthly or annually?
    let isMonthly = true
  
    // Additions can be monthly (true) or annually (false)
    let contribution = isMonthly ? addition * 12 : addition;
  
  
    // Shows how the initial investment grows each year
    for (let year = 0; year <= years; year++) {
      
      // Shows Year x: $y 
      console.log(`Year ${year}: ${formatNumber(principal)}`);
  
      // Don't calculate a new principal if the current year is the last year
      // Since this was calculated in the previous loop
      if (year === years) {
        break;
      }
  
      // compoundingFrequency is the number of periods an investment is compounded within a year. 
      // Example: Annually = 1. Semiannually = 2. Quarterly = 4. Monthly = 12. Daily = 365
      for (let period = 0; period < compoundingFrequency; period++) {
        // Calculate the interest
        let interest = principal * (percentageRate / compoundingFrequency)
  
        // If contributions are monthly we need to divide the contribution by the number of periods within a year
        if (isMonthly) {
          principal = principal + interest + (contribution / compoundingFrequency)
        } else {
          principal = principal + interest
        }
      }
  
      // If the contribution is annually, then we add it to the end of the year
      if (!isMonthly) {
        principal = principal + contribution
      }
    }
  
    return getMessage(initialDeposit, isMonthly, contribution, rate, principal, years, compoundingFrequency);
  };
