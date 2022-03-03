class conwayGrid {
  constructor(gridWidth, gridHeight, startTruePercent) {
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;
    this.gridCellCount = gridWidth * gridHeight;
    this.currentValues = this.createNewGrid(startTruePercent);
    this.runState = true;

    this.renderGrid();
    this.play();
  }

  createNewGrid(startTruePercent) {
    const returnGrid = [];
    for (let y = 0; y < this.gridHeight; y++) {
      const gridRow = [];
      for (let x = 0; x < this.gridWidth; x++) {
        gridRow.push(Math.random() <= (startTruePercent / 100) ? true : false);
      }
      returnGrid.push(gridRow);
    }
    return returnGrid;
  }

  renderGrid() {
    // renders a new grid into the DOM
  }

  calcNextGrid() {
    // applies the game rules to derive the next grid state by iterating through cells, storing them in a return array, NextGrid
    const nextGrid = [];
    for (let y = 0; y < this.gridHeight; y++) {
      const gridRow = [];
      for (let x = 0; x < this.gridWidth; x++) {
        gridRow.push(this.checkCell(x, y));
      }
      nextGrid.push(gridRow);
    }
    return nextGrid;
  }

  checkCell(x, y) {
    // checks a given cell againt the rules of the game
    const currentCell = this.currentValues[y][x];
    let neighbourCellsCount = 0;
    const neighbourCells = [
      this.lookupCell(y-1, x-1),
      this.lookupCell(y, x-1),
      this.lookupCell(y+1, x-1),
      this.lookupCell(y-1, x),
      this.lookupCell(y+1, x),
      this.lookupCell(y-1, x+1),
      this.lookupCell(y, x+1),
      this.lookupCell(y+1, x+1)
    ]
    for (let i = 0; i < 8; i++) {
      neighbourCells[i] === true && neighbourCellsCount++;
    } 
    if (neighbourCellsCount === 3) {
      return true;
    }
    if (currentCell === true && neighbourCellsCount === 2) {
      return true;
    }
    return false;
  }

  lookupCell(x, y) {
    try {
      return this.currentValues[y][x];
    } catch(e) {
      return false;
    }
  }

  updateGrid() {
    // renders a grid array
  }

  updateCell() {
    // renders an individual cell 
  }

  play() {
    setTimeout(() => {
      this.updateGrid(this.calcNextGrid);
      if (this.runState === true) this.play();
      // console.log(this.currentValues);
    }, 1000); 
  }
}

const playGrid = new conwayGrid(10, 10, 25);
