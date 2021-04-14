const XLSX = require("xlsx");

const converter = require("./converter");

function readSettings(settingsFile, settingsSheet) {
  let settingsWorkbook = null;
  try{
    settingsWorkbook = XLSX.readFile(settingsFile, {
      type: 'binary',
      cellDates: true,
      cellNF: false,
      cellText: false
    });
  } catch (e) {
    console.error('Could not read the file', e);
    return;
  }
  const settingsData = XLSX.utils.sheet_to_json(settingsWorkbook.Sheets[settingsSheet]);
  settingsData.timeFileName = settingsData[0].File + ".xlsx";
  settingsData.startDate = converter.formatDate(settingsData[0].Start);
  settingsData.endDate = converter.formatDate(settingsData[0].End);
  return settingsData;
}

function readTimeBook(timeFileName) {
  let timeWorkbook;
  try{
    timeWorkbook = XLSX.readFile(timeFileName);
  } catch(e) {
    console.error(`Cound not read the time file '${timeFileName}'`)
    return;
  }
  const timeData = XLSX.utils.sheet_to_json(timeWorkbook.Sheets[timeWorkbook.SheetNames[0]]);
  return timeData;
}

module.exports = {readSettings, readTimeBook};