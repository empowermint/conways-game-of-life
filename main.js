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

const colors = ['magenta', 'green', 'purple', 'darkblue', 'violet', 'cyan', 'yellow'];

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
    domStartForm.style.display = 'none'; // TODO: Replace with hidden class (because more performant)
    domConwayGrid.style.gridTemplateColumns = 'repeat(' + this.gridWidth + ', 1fr)';
    for (let i = 0; i < this.gridCellCount; i++) {
      const cellId = 'cb_' + i;
      const cell = document.createElement('input');
      cell.setAttribute('type', 'checkbox');
      cell.setAttribute('id', cellId);
      cell.style.width = 'calc(50vmin / ' + this.gridWidth + ')'; // TODO: Try setting the width in the CSS, not here
      domConwayGrid.appendChild(cell);
    }
  }

  readCurrentGrid() {
    const outputGrid = [];
    let cellNum = 0;
    for (let y = 0; y < this.gridHeight; y++) {
      const gridRow = [];
      for (let x = 0; x < this.gridWidth; x++) {
        const cell = document.getElementById('cb_' + cellNum);
        gridRow.push(cell.checked);
        cellNum++;
      }
      outputGrid.push(gridRow);
    }
    this.currentValues = outputGrid; // TODO: Remove? (See line 78)
    return outputGrid;
  }

  calcNextGrid() { // TODO: Find way to eliminate this.currentValues altogether and just pass the current array around? This would increase modularity quite a bit.
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

  checkCell(y, x) {
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

    // The rules of Life:
    return neighbourCellsCount === 3 || (currentCell && neighbourCellsCount === 2);
  }

  lookupCell(y, x) {
    if (y < 0 || x < 0 || y >= this.gridHeight || x >= this.gridWidth) return false;
    return this.currentValues[y][x];
  }

  updateGrid(gridArray) {
    let cellCount = 0;
    for (let y = 0; y < this.gridWidth; y++) {
      for (let x = 0; x < this.gridHeight; x++) {
        const cell = document.getElementById(`cb_${cellCount}`);
        this.changeCellColor(cell);
        cell.checked = gridArray[y][x];
        cellCount++;
      }
    }
  }

  changeCellColor(cell) {
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    cell.className = newColor;
  }

  play() {
    domStartButton.style.display = 'none';
    domStartOverButton.style.display = 'none';
    domPauseButton.style.display = 'unset';
    // TODO: Move these initial setup bits elsewhere so they're not being re-updated with every iteration
    setTimeout(() => {
      this.readCurrentGrid(); // Updates this.currentValues
      const nextGrid = this.calcNextGrid(this.currentValues);
      this.updateGrid(nextGrid);

      if (this.runState === true) this.play();
    }, 333); 
  }

  pause() {
    this.runState = false;
    domStartButton.style.display = 'unset';
    domStartOverButton.style.display = 'unset';
    domPauseButton.style.display = 'none';
  }

  startOver() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((item) => item.remove());
    domGridArea.style.display = 'none';
    domStartForm.style.display = 'unset';
  }
}

domStartForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Stop page refreshing
  const gridWidth = domWidthField.value;
  const gridHeight = domHeightField.value;
  const startTruePercent = domPercentageField.value;
  let playGrid = new conwayGrid(gridWidth, gridHeight, startTruePercent);
});