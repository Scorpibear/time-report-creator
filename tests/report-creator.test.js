const ReportCreator = require('../sources/report-creator');

const XLSX = require('sheetjs-style');
const Formatter = require('../sources/formatter');

describe('report-creator', () => {
  const settings = {startDate: "2021-03-01", endDate: "2021-03-31"}
  const tabInfo = {tag: 'testTag', tabName: 'testTabName'}
  const timeData = [{'Tag': 'testTag', 'Activity description': 'test activity', 'Date':42120, 'Hours': 3}]
  const formatter = new Formatter();
  const reportCreator = new ReportCreator(formatter);
  
  it('creates a book', () => {
    jest.spyOn(XLSX.utils, 'book_new');
    reportCreator.createReport("project name", [], settings, []);
    expect(XLSX.utils.book_new).toBeCalled();
  })
  it('applies summary row format for the last row on each tab', () => {
    jest.spyOn(formatter, 'applySummaryRowFormat');
    reportCreator.createTab(tabInfo, timeData);
    expect(formatter.applySummaryRowFormat).toBeCalled();
  });
  it('applies summary row format for the last row on the summary', () => {
    jest.spyOn(formatter, 'applySummaryRowFormat');
    reportCreator.createReport("project name", [tabInfo], settings, timeData);
    expect(formatter.applySummaryRowFormat).toBeCalled();
  });
})