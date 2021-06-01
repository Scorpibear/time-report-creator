const ReportCreator = require('../sources/report-creator');

const XLSX = require('sheetjs-style');
const Formatter = require('../sources/formatter');

describe('report-creator', () => {
  const settings = {startDate: "2021-03-01", endDate: "2021-03-31"}
  const tabInfo = {tag: 'testTag', tabName: 'test Tab Name'}
  const tabInfoWithPackage = {tag: 'tag2', tabName: 'tab2', leavePackage: 'Y'}
  const timeData = [
    {'Tag': 'testTag', 'Activity description': 'test activity', 'Date':42120, 'Hours': 3},
    {'Tag': 'tag2', 'Activity description': 'test activity', 'Date':42120, 'Hours': 1}
  ]
  const formatter = new Formatter();
  const reportCreator = new ReportCreator(formatter);
  const colsProperties = [{width: 10}, {width: 20}];
  
  describe('createReport', () => {
    it('creates a book', () => {
      jest.spyOn(XLSX.utils, 'book_new');
      reportCreator.createReport("project name", [], settings, []);
      expect(XLSX.utils.book_new).toBeCalled();
    })
    it('applies summary row format for the last row on the summary', () => {
      jest.spyOn(formatter, 'applySummaryRowFormat');
      reportCreator.createReport("project name", [tabInfo], settings, timeData);
      expect(formatter.applySummaryRowFormat).toBeCalled();
    });
    it('applies summary header format for the first row of the summary', () => {
      jest.spyOn(formatter, 'applySummaryHeaderFormat');
      reportCreator.createReport('project name', [tabInfo], settings, timeData);
      expect(formatter.applySummaryHeaderFormat).toBeCalled();
    })
  })
  describe('createTab', () => {
    it('applies summary row format for the last row on each tab', () => {
      jest.spyOn(formatter, 'applySummaryRowFormat');
      reportCreator.createTab(tabInfo, timeData);
      expect(formatter.applySummaryRowFormat).toBeCalled();
    });
    it('use sum() formula for summary row on a tab', () => {
      let ws = reportCreator.createTab(tabInfo, timeData);
      expect(ws["D3"].f).toBe("SUM(D2:D2)");
    })
    it('get columns properties', () => {
      jest.spyOn(formatter, 'getColumnsPropertiesForTab').mockReturnValue(colsProperties);
      let ws = reportCreator.createTab(tabInfo, timeData);
      expect(ws['!cols']).toBe(colsProperties);
    })
  })
  describe('getHeader', () => {
    it('has Package column in header if required', () => {
      const header = reportCreator.getHeader(true);
      expect(header).toContain("Package");
    });
  })
  describe('getColumns', () => {
    it('last column in case of Package is E', () => {
      const cols = reportCreator.getColumns(true);
      expect(cols[cols.length - 1]).toBe('E');
    });
    it('last column in case of no Package is D', () => {
      const cols = reportCreator.getColumns(false);
      expect(cols[cols.length - 1]).toBe('D');
    });
  })
  it('if formatter is not specified the default is created', () => {
    const rc = new ReportCreator();
    expect(rc.formatter).toBeDefined();
  })
  describe('createSummary', () => {
    it('summary uses reference to spent time cell of each tab', () => {
      let ws = reportCreator.createSummary([tabInfo], timeData);
      expect(ws["B2"].f).toBe("'test Tab Name'!D3");
    });
    it('summary references to E column data in case of package is left', () => {
      let ws = reportCreator.createSummary([tabInfoWithPackage], timeData);
      expect(ws["B2"].f).toBe("'tab2'!E3");
    })
    it('use sum() formula to sum all tabs info', () => {
      let ws = reportCreator.createSummary([tabInfo, tabInfo], timeData);
      expect(ws["B4"].f).toBe("SUM(B2:B3)");
    });
    it('specify the column properties', () => {
      jest.spyOn(formatter, 'getColumnsPropertiesForSummary').mockReturnValue(colsProperties);
      let ws = reportCreator.createSummary([tabInfo, tabInfo], timeData);
      expect(ws['!cols']).toBe(colsProperties);
    })
    it('set 0 if no data provider', () => {
      let ws = reportCreator.createSummary([tabInfo], []);
      expect(ws["B2"].f).toBeUndefined();
      expect(ws["B2"].v).toBe(0);
    })
  })
})