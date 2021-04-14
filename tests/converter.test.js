const converter = require('../sources/converter');

describe('converter', () => {
  test('format date to YYYY-MM-DD format', () => {
    expect(converter.formatDate(new Date("2021-03-31"))).toBe("2021-03-31");
  })
})