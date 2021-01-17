const compoundingPeriods = {
  annually: 1,
  semiannually: 2,
  quarterly: 4,
  monthly: 12,
  daily: 365,
};

// Initial deposit can't be less than 100 or greater than 1000000
// Contributions can't be less than 0 or greater than 1000000
// Investment Time can't be less than 1 or greater than 50
// Rate of return can't be less than 0% or greater than 50%
const steps = {
  "initial-deposit": {
    amount: 100,
    min: 100,
    max: 1000000,
  },
  contributions: {
    amount: 50,
    min: 0,
    max: 1000000,
  },
  time: {
    amount: 1,
    min: 1,
    max: 50,
  },
  rate: {
    amount: 0.25,
    min: 0.0,
    max: 50.0,
  },
};
