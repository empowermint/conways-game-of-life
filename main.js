class conwayGrid {
  constructor(gridWidth, gridHeight, startTruePercent) {
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;
    this.gridCellCount = gridWidth * gridHeight;
    this.currentValues = this.createNewGrid(startTruePercent);
  }

  createNewGrid(startTruePercent) {
    // for initial setup, creates array of arrays to size of grid specified, with startTruePercent true values
    const returnGrid = [];
    for (let i = 0; i < this.gridHeight; i++) {
      const gridRow = [];
      for (let i = 0; i < this.gridWidth; i++) {
        gridRow.push(Math.random() <= startTruePercent / 100 ? true : false);
      }
      returnGrid.push(gridRow);
    }
    return returnGrid;
  }

  renderNewGrid() {
    // renders a new grid into the DOM
  }

  renderPausePlay() {
    // renders a play/pause button into the DOM
  }

  calcNextGrid() {
    // applies the game rules to derive the next grid state by iterating through cells, storing them in NextGrid
  }

  checkCell(cell) {
    // checks a given cell againt the rules of the game
  }

  renderGrid() {
    // renders NextGridArray
  }

  renderCell() {
    // renders an individual cell 
  }

  run() {
    // allows play and pause of grid
  }

  onPause() {
    // during pause, allows users to change cell states 
  }
}

const renderedGrid = new conwayGrid(10,10,10);
console.log(renderedGrid.currentValues);