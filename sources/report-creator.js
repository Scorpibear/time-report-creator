const XLSX = require('xlsx');

function createReport(projectName, tabs, settings, timeData) {
  const reportFileName = `${projectName}_${settings.startDate}_${settings.endDate}_report.xlsx`;
  const wb = XLSX.utils.book_new();

  // create summary
  function createSummary() {
    let ws_name = "Summary";

    //TODO: 
    let referenceToServicePointsSpent = 54;

    let ws_data = [
      [ "Activities",	"Service Points Spent"]
    ];
    tabs.forEach(tab => {
      ws_data.push([tab.tabName, referenceToServicePointsSpent])
    })
    ws_data.push([ "Total Service Points",	"=SUM(B2:B2)"])

    let ws = XLSX.utils.aoa_to_sheet(ws_data);

    XLSX.utils.book_append_sheet(wb, ws, ws_name);
  }
  createSummary();

  // create tabs
  
  function createTab(tabInfo) {
    let ws_name = tabInfo.tabName;
    const header = ["Employee"];
    if(tabInfo.leavePackage) {
      header.push("Package");
    }
    header.push("Package", "Activity description", "Date", "Service Points");
    const propertyMap = {"Service Points": "Hours"};
    let tabTimeData = timeData.filter(({Tag}) => Tag == tabInfo.tag);
    let ws_data = [header];
    tabTimeData.forEach(info => {
      let row = header.map(property => 
        propertyMap[property] ? info[propertyMap[property]] : info[property]
      );
      ws_data.push(row);
    });
    let ws = XLSX.utils.aoa_to_sheet(ws_data);
    XLSX.utils.book_append_sheet(wb, ws, ws_name);
  }

  tabs.forEach(createTab);

  XLSX.writeFile(wb, reportFileName);
}

module.exports = {createReport};