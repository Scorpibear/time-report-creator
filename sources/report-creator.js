const XLSX = require('xlsx');

function createReport({ProjectName, TabName, Tag, LeavePackage}, settings, timeData) {
  const reportFileName = `${ProjectName}_${settings.startDate}_${settings.endDate}_report.xlsx`;
  const wb = XLSX.utils.book_new();

  // create summary
  function createSummary() {
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
  }
  createSummary();

  // create tabs
  let tabs = [TabName];
  
  function createTab(tab) {
    let ws_name = tab;
    const header = ["Employee", "Package", "Activity description", "Date", "Service Points"]
    let ws_data = [
      header,
      timeData.map(data => [data.Employee, data.Package, data["Activity description"], data.Date, data["Service Points"]])
    ];
    let ws = XLSX.utils.aoa_to_sheet(ws_data);
    XLSX.utils.book_append_sheet(wb, ws, ws_name);
  }

  tabs.forEach(createTab);

  XLSX.writeFile(wb, reportFileName);
}

module.exports = {createReport};