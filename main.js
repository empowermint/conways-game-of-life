class conwayGrid {
  constructor(gridWidth, gridHeight) {
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;
    this.gridCellCount = gridWidth * gridHeight;
    this.currentValues = createNewGridArray();
  }

  createNewGrid() {
    // for initial setup, creates array of arrays to size of grid specified
  }

  renderNewGrid() {
    // renders a new grid and play/pause button into the DOM
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
