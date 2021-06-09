const reader = require('../sources/reader');
const XLSX = require("sheetjs-style");

describe('reader', () => {
  const sampleSettings = [{
    ProjectName: 'P11',
    TabName: 'Tab1',
    Tag: 'tagA',
    LeavePackage: 'N'
  },
  {
    ProjectName: 'P11',
    TabName: 'Tab2',
    Tag: 'tagB',
    LeavePackage: 'N'
  },
  {
    ProjectName: 'P33',
    TabName: 'report',
    Tag: 'p33_report',
    LeavePackage: 'Y'
  }];
  describe('groupProjects', () => {
    test('groups project data in project->tabs format', () => {
      const projects = reader.groupProjects(sampleSettings);
      expect(projects.has("P11")).toBeTruthy();
      expect(projects.get("P11")).toHaveProperty('length');
      expect(projects.get("P11")[0]).toEqual({tabName: 'Tab1', tag: 'tagA', leavePackage: 'N'});
    })
  })
  describe('checking readTimeBook function for error for false input file', () => {
    const timeBook = reader.readTimeBook("Example Text");
    expect(timeBook).toUndefined;
  })
  describe('checking readSettings function for error for false input file', () => {
    const settingsFile = "Splitter_settingsFalse.xlsx";
    const settingsSheet = "SettingsFalse";
    const readSettings = reader.readSettings(settingsFile, settingsSheet);
    expect(readSettings).toUndefined;
  })
  describe('readTimeBook', () => {
    const timeFileN = {"Sheets":{"example2":"example"},"SheetNames":{"example2":"example"}};
    const exampleText = "returned example text";
    it('get timeData from readTimeBook', () => {
      jest.spyOn(XLSX, 'readFile').mockReturnValue(timeFileN);
      jest.spyOn(XLSX.utils, 'sheet_to_json').mockReturnValue(exampleText);
      const returnedFromFunc = reader.readTimeBook(exampleText);
      expect(returnedFromFunc).toBe(exampleText);
    });
  })
  describe('readSettings', () => {
    const settingsFile = "Splitter_settings2.xlsx";
    const settingsSheet = "example555";
    const timeFileN = {"Sheets":{"Start":"david","End":"davit"},"SheetNames":{"example2":"example"}};
    const exampleText = [{
      File : "Filename",
      Start: 5,
      End: 10
    }];
    it('get settings from readSettings', () => {
      jest.spyOn(XLSX, 'readFile').mockReturnValue(timeFileN);
      jest.spyOn(XLSX.utils, 'sheet_to_json').mockReturnValue(exampleText);
      const returnedFromFunc = reader.readSettings(settingsFile, settingsSheet);
      expect(returnedFromFunc.timeFileName).toBe('Filename.xlsx');
    });
  }) 
})
