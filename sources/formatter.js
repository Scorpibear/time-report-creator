class Formatter {

  makeBold(cell) {
    if(!cell.s) {
      cell.s = {}
    }
    if(!cell.s.font) {
      cell.s.font = {}
    }
    cell.s.font.bold = true
  }
  applyHeaderFormat(cell) {
    this.makeBold(cell)
  }
  
  applyTabsHeaderFormat(cell) {
    this.applyHeaderFormat(cell);
    if(!cell.s) {
      cell.s = {}
    }
    if(!cell.s.alignment) {
      cell.s.alignment = {}
    }
    cell.s.alignment.horisontal = "center"
  }

  applySummaryRowFormat(cell) {
    this.makeBold(cell)
  }
}

module.exports = Formatter;
