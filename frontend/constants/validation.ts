export const TERM_INPUT_VALIDATION = {
  MAX_LENGTH: {
    YEAR: 4,
    MONTH: 2
  },
  RANGE: {
    YEAR: {
      MIN: 1900,
      MAX: new Date().getFullYear()
    },
    MONTH: {
      MIN: 1,
      MAX: 12
    }
  }
} as const;
