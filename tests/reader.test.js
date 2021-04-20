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
  }];
  describe('formProjects', () => {
    test('forms project data in project->tabs format', () => {
      const projects = reader.groupProjects(sampleSettings);
      expect(projects).toHaveProperty('length');
      expect(projects[0].tabs).toHaveProperty('length');
      expect(projects[0].tabs[0]).toBe({tabName: 'Tab1', tag: 'tagA', leavePackage: 'N'});
    })
  })
})
