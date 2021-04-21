const reader = require('../sources/reader');

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
})
