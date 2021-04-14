const reader = require('./sources/reader');
const reportCreator = require('./sources/report-creator');

const settingsFile = "Splitter_settings.xlsx";
const settingsSheet = "Settings";

const settings = reader.readSettings(settingsFile, settingsSheet);

console.log(settings.timeFileName, settings.startDate, settings.endDate);

const timeData = reader.readTimeBook(settings.timeFileName);

//console.log(timeData);

settings.forEach(projectSettings => reportCreator.createReport(projectSettings, settings, timeData));