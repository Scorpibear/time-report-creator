const reader = require('./sources/reader');
const reportCreator = require('./sources/report-creator');

const settingsFile = "Splitter_settings.xlsx";
const settingsSheet = "Settings";

const settings = reader.readSettings(settingsFile, settingsSheet);

console.log(settings.timeFileName, settings.startDate, settings.endDate);
console.log(settings.projects);

const timeData = reader.readTimeBook(settings.timeFileName);

settings.projects.forEach(project => reportCreator.createReport(project, timeData));