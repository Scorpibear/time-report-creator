const XLSX = require('xlsx');

function createReport({ProjectName, TabName, Tag, LeavePackage}, settings, timeData) {
  const reportFileName = `${ProjectName}_${settings.startDate}_${settings.endDate}_report.xlsx`;
  console.log(reportFileName);
}

module.exports = {createReport};