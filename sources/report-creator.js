const XLSX = require('sheetjs-style');
const converter = require('./converter');
const Formatter = require('./formatter');

class ReportCreator {

  constructor(formatter) {
    this.formatter = formatter || new Formatter();
  }

  createReport(projectName, tabs, settings, timeData) {
    const reportFileName = `${projectName}_${settings.startDate}_${settings.endDate}_report.xlsx`;
    const wb = XLSX.utils.book_new();

    let ws = this.createSummary(tabs, timeData);

    XLSX.utils.book_append_sheet(wb, ws, "Summary");

    // create tabs
    tabs.forEach(tabInfo => {
      let tabWorkSheet = this.createTab(tabInfo, timeData);
      XLSX.utils.book_append_sheet(wb, tabWorkSheet, tabInfo.tabName);
    });

    XLSX.writeFile(wb, reportFileName);
  }

  getHeader(isPackageRequired) {
    let header = ["Employee"];
    if(isPackageRequired) {
      header.push("Package");
    }
    header.push("Activity description", "Date", "Service Points");
    return header;
  }

  createTab(tabInfo, timeData) {
    const header = this.getHeader(tabInfo.leavePackage == 'Y');
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
    const cols = ["A", "B", "C", "D"];
    if(header.length > 4) {
      cols.push("E");
    }
    const lastCol = cols[cols.length - 1];
    const servicePointSpentCell = `${lastCol}${ws_data.length}`;
    ws[servicePointSpentCell].f = `SUM(${lastCol}2:${lastCol}${ws_data.length-1})`
    const headerCells = cols.map(col => `${col}1`);
    const summaryCells = cols.map(col => `${col}${ws_data.length}`);
    headerCells.forEach(cell => this.formatter.applyTabsHeaderFormat(ws[cell]));
    summaryCells.forEach(cell => this.formatter.applySummaryRowFormat(ws[cell]));
    return ws;
  }

  createSummary(tabs, timeData) {
    const ws_data = [
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

    const ws = XLSX.utils.aoa_to_sheet(ws_data);

    tabs.forEach((tab, n) => {
      const cell = `B${n+2}`
      const lastRow = timeData.filter(({Tag}) => Tag == tab.tag).length + 2; // + header and summary
      ws[cell].f = `${tab.tabName}!${getTabLastCol(tab)}${lastRow}`;
    });

    const totalSpentCell = `B${tabs.length + 2}`;
    ws[totalSpentCell].f = `SUM(B2:B${tabs.length + 1})`;
    
    // apply formatting
    ["A1","B1"].forEach(cell => this.formatter.applyHeaderFormat(ws[cell]));
    ["A","B"].map(col => `${col}${ws_data.length}`).forEach(cell => this.formatter.applySummaryRowFormat(ws[cell]));

    return ws;
  }
}

const getTabLastCol = tabInfo => tabInfo.leavePackage == 'Y' ? 'E' : 'D';

module.exports = ReportCreator;