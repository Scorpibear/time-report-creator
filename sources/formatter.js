class Formatter {
  applyHeaderFormat(cell) {
    if(!cell.s) {
      cell.s = {}
    }
    if(!cell.s.font) {
      cell.s.font = {}
    }
    cell.s.font.bold = true
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
}

module.exports = Formatter;
