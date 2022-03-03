const domStartForm = document.getElementById('startform');
const domGridArea = document.getElementById('grid-area');
const domConwayGrid = document.getElementById('conwaygrid');
const domStartButton = document.getElementById('start');
const domPauseButton = document.getElementById('pause');
const domStartOverButton = document.getElementById('startover');
const domGoButton = document.getElementById('go');
const domWidthField = document.getElementById('width');
const domHeightField = document.getElementById('height');
const domPercentageField = document.getElementById('percentage');

class conwayGrid {
  constructor(gridWidth, gridHeight, startTruePercent) {
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;
    this.gridCellCount = gridWidth * gridHeight;
    this.currentValues = this.createNewGrid(startTruePercent);
    this.runState = true;

    this.renderGrid();
    this.updateGrid(this.currentValues);

    domStartButton.addEventListener('click', () => {
      this.play();
    });
    domPauseButton.addEventListener('click', () => {
      this.pause();
    });
    domStartOverButton.addEventListener('click', () => {
      this.startOver();
    });

    this.play();
  }

  createNewGrid(startTruePercent) {
    domGridArea.style.display = 'unset';
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
    domStartForm.style.display = 'none';
    domConwayGrid.style.gridTemplateColumns = 'repeat(' + this.gridWidth + ', 1fr)';
    for (let i = 0; i < this.gridCellCount; i++) {
      const cellId = 'cb_' + i;
      const cell = document.createElement('input')
      cell.setAttribute('type', 'checkbox');
      cell.setAttribute('id', cellId);
      cell.style.width = 'calc(65vmin / ' + this.gridWidth + ')';
      domConwayGrid.appendChild(cell);
    }
  }

  calcNextGrid() {
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

  updateGrid(gridArray) {
    let cellCount = 0;
    for (let y = 0; y < this.gridHeight; y++) {
      for (let x = 0; x < this.gridWidth; x++) {
        const cell = `cb_${cellCount}`;
        if (gridArray[y][x] === true) {
          document.getElementById(cell).checked = true;
        } else {
          document.getElementById(cell).checked = false;
        }
        cellCount++;
      }
    }
  }

  play() {
    domStartButton.style.display = 'none';
    domStartOverButton.style.display = 'none';
    domPauseButton.style.display = 'unset';
    setTimeout(() => {
      const nextGrid = this.calcNextGrid();
      this.updateGrid(nextGrid);
      this.currentValues = nextGrid;
      if (this.runState === true) this.play(); // TODO: Find a more elegant loop to use
    }, 500); 
  }

  pause() {
    this.runState = false;
    domStartButton.style.display = 'unset';
    domStartOverButton.style.display = 'unset';
    domPauseButton.style.display = 'none';
  }

  startOver() {
    domGridArea.style.display = 'none';
    domStartForm.style.display = 'unset';
  }
}

// Initialision Form:

domGoButton.addEventListener('click', () => {
  const gridWidth = domWidthField.value;
  const gridHeight = domHeightField.value;
  const startTruePercent = domPercentageField.value;
  const playGrid = new conwayGrid(gridWidth, gridHeight, startTruePercent);
});