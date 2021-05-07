const reader = require('./sources/reader');
const ReportCreator = require('./sources/report-creator');
const reportCreator = new ReportCreator()

const settingsFile = "Splitter_settings.xlsx";
const settingsSheet = "Settings";

const settings = reader.readSettings(settingsFile, settingsSheet);

console.log(settings.timeFileName, settings.startDate, settings.endDate);

const timeData = reader.readTimeBook(settings.timeFileName);

for (let [projectName, tabs] of settings.projects) {
  reportCreator.createReport(projectName, tabs, settings, timeData);
}