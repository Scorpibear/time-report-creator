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
  const settingsSheet = "example555";
  const timeFileChecker = {"Sheets":{
    "Start":"10",
    "End":"20"
  },
  "SheetNames":[
    "input"
  ]};
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { /* to mute console noise in negative tests */ });
  })
  describe('groupProjects', () => {
    it('groups project data in project->tabs format', () => {
      const projects = reader.groupProjects(sampleSettings);
      expect(projects.has("P11")).toBeTruthy();
      expect(projects.get("P11")).toHaveProperty('length');
      expect(projects.get("P11")[0]).toEqual({tabName: 'Tab1', tag: 'tagA', leavePackage: 'N'});
    })
  })
  it('checking readTimeBook function for error for false input file', () => {
    const timeBook = reader.readTimeBook("Non-existent filename");
    expect(timeBook).toUndefined;
  })
  it('checking readSettings function for error for false input file', () => {
    const readSettings = reader.readSettings("Unexistent_settings.xlsx", settingsSheet);
    expect(readSettings).toUndefined;
  })
  describe('readTimeBook', () => {
    const obJectFromSheetToJson = {
      '!ref': 'A1:H27',
      A1: {
        t: 's',
        v: 'Employee',
        r: '<t>Employee</t>',
        h: 'Employee',
        w: 'Employee'
      }};
    it('get timeData from readTimeBook', () => {
      jest.spyOn(XLSX, 'readFile').mockReturnValue(timeFileChecker);
      jest.spyOn(XLSX.utils, 'sheet_to_json').mockReturnValue(obJectFromSheetToJson);
      const timeData = reader.readTimeBook(obJectFromSheetToJson);
      expect(timeData).toBe(obJectFromSheetToJson); 
    });
  })
  describe('readSettings', () => {
    const timeDataFile = [{
      File : "Filename",
      Start: 5,
      End: 10 
    }];
    it('get settings from readSettings', () => {
      jest.spyOn(XLSX, 'readFile').mockReturnValue(timeFileChecker);
      jest.spyOn(XLSX.utils, 'sheet_to_json').mockReturnValue(timeDataFile);
      const settings = reader.readSettings("Settings.xlsx", settingsSheet);
      expect(settings.timeFileName).toBe('Filename.xlsx');
    });
  }) 
})