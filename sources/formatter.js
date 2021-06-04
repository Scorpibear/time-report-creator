class Formatter {

  makeBold(cell) {
    if(!cell.s) {
      cell.s = {}
    }
    if(!cell.s.font) {
      cell.s.font = {}
    }
    
    cell.s.font.bold = true;
  }

  makeLightGreen(cell){
    if(!cell.s.fill){
      cell.s.fill = {}
    }
    if(!cell.s.fill.fgColor){
      cell.s.fill.fgColor = {};
    }
    cell.s.fill.fgColor.rgb = "E2EFDA";
  }


  applyHeaderFormat(cell) {
    this.makeBold(cell)
  }
  
  applyTabsHeaderFormat(cell) {
    this.applyHeaderFormat(cell);
    if(!cell.s.alignment) {
      cell.s.alignment = {}
    }
    cell.s.alignment.horisontal = "center"
  }

  applySummaryRowFormat(cell) {
    this.makeBold(cell)
    this.makeLightGreen(cell)
  }

  applySummaryHeaderFormat(cell) {
    this.applyHeaderFormat(cell);
    cell.s.border = {bottom: {style: "thin", color: { auto: 1}} }
  }

  getColumnsPropertiesForSummary() {
    return [{ width: 28 }, { width: 19 }];
  }

  getColumnsPropertiesForTab(isPackageRequired) {
    const props = [{width: 20}]
    if(isPackageRequired) {
      props.push({width: 24})
    }
    props.push({width: 80}, {width: 10}, {width: 13});
    return props;
  }
}

module.exports = Formatter;
