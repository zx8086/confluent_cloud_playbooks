import { isDateWithinRangeOrOlderThanAYear } from './your-date-validation-module'; // Import your date validation function

// Test cases for date validation
describe('Date Validation', () => {
  it('should return true for a valid date', () => {
    expect(isDateWithinRangeOrOlderThanAYear('2022-01-15', new Date(), new Date())).toBe(true);
  });

  it('should return false for an invalid date', () => {
    expect(isDateWithinRangeOrOlderThanAYear('InvalidDate', new Date(), new Date())).toBe(false);
  });
});

// Test cases for date range checking
describe('Date Range Checking', () => {
  it('should return true for a date within the range', () => {
    const minDate = new Date('2022-01-01');
    const maxDate = new Date('2022-12-31');
    expect(isDateWithinRangeOrOlderThanAYear('2022-06-15', minDate, maxDate)).toBe(true);
  });

  it('should return false for a date outside the range', () => {
    const minDate = new Date('2022-01-01');
    const maxDate = new Date('2022-12-31');
    expect(isDateWithinRangeOrOlderThanAYear('2023-02-20', minDate, maxDate)).toBe(false);
  });
});

// Test cases for older-than-a-year check
describe('Older Than a Year Check', () => {
  it('should return true for a date older than a year', () => {
    const currentDate = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    expect(isDateWithinRangeOrOlderThanAYear('2021-12-01', oneYearAgo, currentDate)).toBe(true);
  });

  it('should return false for a date not older than a year', () => {
    const currentDate = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    expect(isDateWithinRangeOrOlderThanAYear('2022-05-10', oneYearAgo, currentDate)).toBe(false);
  });
});
