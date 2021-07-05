const Formatter = require('../sources/formatter');

describe('formatter', () => {
  const formatter = new Formatter();

  describe('applyTabsHeaderFormat', () => {
    test('makes alignment.horizontal = "center"', () => {
      const cell = {};
      formatter.applyTabsHeaderFormat(cell);
      expect(cell.s.alignment.horisontal).toEqual("center");
    })
    test('leaves existent style as is', () => {
      const cell = {s: {font: {name: 'Calibri'}}};
      formatter.applyTabsHeaderFormat(cell);
      expect(cell.s.font.name).toEqual('Calibri');
    })
    test('leaves existent vertical alignment as is', () => {
      const cell = {s: {alignment: {vertical: "top"}}};
      formatter.applyTabsHeaderFormat(cell);
      expect(cell.s.alignment.vertical).toEqual("top");
    })
  })
  describe('applySummaryRowFormat', () => {
    test('marks it in bold font', () => {
      const cell = {};
      formatter.applySummaryRowFormat(cell);
      expect(cell.s.font.bold).toBeTruthy();
    })
  })
  describe('applySummaryRowFormat', () => {
    test('check for makeLightGreen has its color', () => {
      const cell = {};
      formatter.applySummaryRowFormat(cell);
      expect(cell.s.fill.fgColor.rgb).toEqual("E2EFDA");
    })
  })
  describe('applySummaryHeaderFormat', () => {
    test('apply bottom border', () => {
      const cell = {};
      formatter.applySummaryHeaderFormat(cell);
      expect(cell.s.border.bottom).toEqual({style: "thin", color: { auto: 1}})
    })
  })
  describe('getColumnsProperties', () => {
    test('uses width in characters', () => {
      expect(formatter.getColumnsProperties([['12345678901234567890']])[0]).toEqual({wch: 20});
    })
    test('return same # of column properties as input data', () => {
      expect(formatter.getColumnsProperties([['c1','c2','c3','c4','c5']]).length).toBe(5);
    })
    test('returns empty array for empty data', () => {
      expect(formatter.getColumnsProperties([])).toEqual([]);
    })
    test('undefined values does not contribute to column width', () => {
      expect(formatter.getColumnsProperties([['myData'],[undefined]])).toEqual([{wch: 6}]);
    })
    test('numbers does not change the column width', () => {
      expect(formatter.getColumnsProperties([['myData'],[5]])).toEqual([{wch: 6}])
    })
  })
  describe('makeLightGreen', () => {
    test('does not modify other properties of fill object', () => {
      const cell = {s: {fill: {patternType: "none"}}};
      formatter.makeLightGreen(cell);
      expect(cell.s.fill.patternType).toEqual("none");
    })
  })
})