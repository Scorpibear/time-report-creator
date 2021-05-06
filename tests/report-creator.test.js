const reportCreator = require('../sources/report-creator');

const XLSX = require('sheetjs-style');

describe('report-creator', () => {
  const settings = {startDate: "2021-03-01", endDate: "2021-03-31"}
  test('creates a book', () => {
    jest.spyOn(XLSX.utils, 'book_new');
    reportCreator.createReport("project name", [], settings, []);
    expect(XLSX.utils.book_new).toBeCalled();
  })
  test('apply summary row format for the last row on each tab');
  test('apply summary row format for the last row on the summary');
})