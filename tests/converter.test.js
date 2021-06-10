const converter = require('../sources/converter');

describe('converter', () => {
  test('format date to YYYY-MM-DD format', () => {
    expect(converter.formatDate(new Date("2021-03-31"))).toBe("2021-03-31");
  })
  test('format date to YYYY-MM-DD format', () => {
    expect(converter.formatDate(new Date("2021-03-31"))).toBe("2021-03-31");
  })
  test('give false information to formatDate and check for error', () => {
    const exampleText = "Testing"
    const ddd = converter.formatDate(exampleText);
    expect(ddd).toBe(exampleText);
  })
  test('formatDateToUSFromDays', () => {
    expect(converter.formatDateToUSFromDays(2)).toBe("1/2/1900");
  })
  test('formatDateFromDays use formatDate', () => {
    // could be different dates due to local timezone 
    expect(converter.formatDateFromDays(3)).toMatch("1900-01-");
  })
}) 