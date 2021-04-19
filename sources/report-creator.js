const XLSX = require('xlsx');

function createReport({ProjectName, TabName, Tag, LeavePackage}, settings, timeData) {
  const reportFileName = `${ProjectName}_${settings.startDate}_${settings.endDate}_report.xlsx`;
  const wb = XLSX.utils.book_new();

  let ws_name = "Summary";

  //TODO: 
  let referenceToServicePointsSpent = 54;

  let ws_data = [
    [ "Activities",	"Service Points Spent"],
    [ TabName,	referenceToServicePointsSpent],
    [ "Total Service Points",	"=SUM(B2:B2)"]
  ];

  let ws = XLSX.utils.aoa_to_sheet(ws_data);

  XLSX.utils.book_append_sheet(wb, ws, ws_name);

  XLSX.writeFile(wb, reportFileName);
}

module.exports = {createReport};