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
  })
  describe('applySummaryRowFormat', () => {
    test('marks it in bold font', () => {
      const cell = {};
      formatter.applySummaryRowFormat(cell);
      expect(cell.s.font.bold).toBeTruthy();
    })
  })
  
})