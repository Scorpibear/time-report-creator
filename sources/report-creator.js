const XLSX = require('xlsx');
const converter = require('./converter');

function createReport(projectName, tabs, settings, timeData) {
  const reportFileName = `${projectName}_${settings.startDate}_${settings.endDate}_report.xlsx`;
  const wb = XLSX.utils.book_new();

  // create summary
  function createSummary() {
    let ws_name = "Summary";

    let ws_data = [
      [ "Activities",	"Service Points Spent"]
    ];
    let total = 0;
    tabs.forEach(tab => {
      let spent = timeData.filter(({Tag}) => Tag == tab.tag).map(record => record.Hours).reduce((a, b) => (a + b), 0);
      ws_data.push([tab.tabName, spent]);
      total+= spent;
      if(!spent){
        console.error(`No time spent for project '${projectName}', tab '${tab.tabName}', tag '${tab.tag}'`);
      }
    })
    ws_data.push([ "Total Service Points",	total])

    let ws = XLSX.utils.aoa_to_sheet(ws_data);

    XLSX.utils.book_append_sheet(wb, ws, ws_name);
  }
  createSummary();

  // create tabs
  
  function createTab(tabInfo) {
    let ws_name = tabInfo.tabName;
    const header = ["Employee"];
    if(tabInfo.leavePackage == 'Y') {
      header.push("Package");
    }
    header.push("Activity description", "Date", "Service Points");
    const propertyMap = {
      "Service Points": (info) => info["Hours"],
      "Date": (info) => converter.formatDateFromDays(info["Date"])
    };
    let tabTimeData = timeData.filter(({Tag}) => Tag == tabInfo.tag);
    let ws_data = [header];
    tabTimeData.forEach(info => {
      let row = header.map(property => 
        propertyMap[property] ? propertyMap[property](info) : info[property]
      );
      ws_data.push(row);
    });
    let summaryRow = ["Service Points spent"];
    for(let i = 1; i < header.length - 1; i++) {
      summaryRow.push("");
    }
    summaryRow.push(tabTimeData.map(data => data["Hours"]).reduce((a, b) => (a + b), 0));
    ws_data.push(summaryRow)
    let ws = XLSX.utils.aoa_to_sheet(ws_data);
    XLSX.utils.book_append_sheet(wb, ws, ws_name);
  }

  tabs.forEach(createTab);

  XLSX.writeFile(wb, reportFileName);
}

module.exports = {createReport};