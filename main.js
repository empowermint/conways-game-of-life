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
    this.currentGridArray = this.createNewGridArray(startTruePercent);
    this.runState = true;
    this.cycleTime = 400; // in milliseconds

    this.renderGrid();
    this.updateGrid(this.currentGridArray);

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

  createNewGridArray(startTruePercent) {
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
    domStartForm.style.display = 'none'; // TODO: Replace with .hidden class (because more performant)
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
    this.currentGridArray = outputGrid;
  }

  calcNextGrid() {
    const nextGrid = [];
    for (let y = 0; y < this.gridHeight; y++) {
      const gridRow = [];
      for (let x = 0; x < this.gridWidth; x++) {
        gridRow.push(this.checkCell(y, x));
      }
      nextGrid.push(gridRow);
    }
    return nextGrid;
  }

  checkCell(y, x) {
    const currentCell = this.currentGridArray[y][x];
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
    return this.currentGridArray[y][x];
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
    const colors = ['magenta', 'green', 'purple', 'darkblue', 'violet', 'cyan', 'yellow']
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    cell.className = newColor;
  }

  play() {
    this.runState = true;
    domStartButton.style.display = 'none'; // TODO: Replace with a .hidden class
    domStartOverButton.style.display = 'none';
    domPauseButton.style.display = 'unset';
    this.runLoop();
  }

  async runLoop() {
    while(this.runState === true) {
      this.readCurrentGrid();
      this.updateGrid(this.calcNextGrid(this.currentGridArray));
      await new Promise(resolve => setTimeout(resolve, this.cycleTime));
    }
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

// TODO: Find out why the play loop sometimes breaks when paused and restarted, and stop that from happening.