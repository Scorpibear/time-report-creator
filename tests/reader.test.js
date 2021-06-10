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
  const settingsFile = "Splitter_settingsFalse.xlsx";
  const settingsSheet = "example555";
  const timeFileChecker = {"Sheets":{
    "Start":"david",
    "End":"davit"
  },
  "SheetNames":[
    "example2",
    "example"
  ]};
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
    const readSettings = reader.readSettings(settingsFile, settingsSheet);
    expect(readSettings).toUndefined;
  })
  describe('readTimeBook', () => {
    const textFromSheetToJson = "returned example text";
    it('get timeData from readTimeBook', () => {
      jest.spyOn(XLSX, 'readFile').mockReturnValue(timeFileChecker);
      jest.spyOn(XLSX.utils, 'sheet_to_json').mockReturnValue(textFromSheetToJson);
      const timeData = reader.readTimeBook(textFromSheetToJson);
      expect(timeData).toBe(textFromSheetToJson); 
    });
  })
  describe('readSettings', () => {
    const TimeDataFile = [{
      File : "Filename",
      Start: 5,
      End: 10 
    }];
    it('get settings from readSettings', () => {
      jest.spyOn(XLSX, 'readFile').mockReturnValue(timeFileChecker);
      jest.spyOn(XLSX.utils, 'sheet_to_json').mockReturnValue(TimeDataFile);
      const settings = reader.readSettings(settingsFile, settingsSheet);
      expect(settings.timeFileName).toBe('Filename.xlsx');
    });
  }) 
})