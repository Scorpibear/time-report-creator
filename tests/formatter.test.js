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
  describe('getColumnsPropertiesForSummary', () => {
    test('uses width in characters for the first column with 0.9 coefficient', () => {
      expect(formatter.getColumnsPropertiesForSummary(20)[0]).toEqual({width: 18});
    })
  })
  describe('getColumnsPropertiesForTab', () => {
    test('return 5 column properties if package is required', () => {
      expect(formatter.getColumnsPropertiesForTab(true).length).toBe(5);
    })
    test('return 4 column properties if package is NOT required', () => {
      expect(formatter.getColumnsPropertiesForTab(false).length).toBe(4);
    })
  })
})