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
    cell.s.fill.fgColor = {rgb: "E2EFDA"};
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

  /**
   * Get columns properties
   *
   * @param {Array<Array<String>>} data 
   * @returns {Array<{width: Number}>} data for columns properties
   */
  getColumnsProperties(data) {
    return data.length ?
      data[0].map((colName, index) => 
        ({ wch: data.reduce((maxWidth, rowData) => 
          Math.max(maxWidth, typeof(rowData[index]) === 'string' ? rowData[index].length : 0), 0) * this.getAutoSizeCoefficient()
        })
      ) : [];
  }

  getAutoSizeCoefficient() {
    return 1;
  }
}

module.exports = Formatter;
