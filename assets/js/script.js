const gameGrid = document.getElementById("game-grid");
let gridCells = [];

// make grid
function fillGrid() {
  for (let i = 0; i < 15; i++) {
    gridCells[i] = [];
    for (let j = 0; j < 25; j++) {
      gridCells[i][j] = document.createElement("div");
      gridCells[i][j].classList.add("cell", "cover");
      gridCells[i][j].addEventListener("click", reveal);
      gameGrid.appendChild(gridCells[i][j]);
    }
  }
  placeMines();
  addNumbersIndicatingMines();
}


// place mines
function placeMines() {
  let rndi = [];
  let rndj = [];
  for (let i = 0; i < 69; i++) {
    rndi[i] = Math.floor(Math.random() * 15);
    rndj[i] = Math.floor(Math.random() * 25);
  }
  for (let i = 0; i < 69; i++) {
    gridCells[rndi[i]][rndj[i]].classList.add("mine");
  }
}

// square of side length 2n+1, ie radius n
function squareRadiusN(n) {
  let array = [];
  for (let i = 0; i <= 8 * n - 1; i++) {
    if (i <= 2 * n) {
      array[i] = [-n, n - i];
    } else if (i >= 2 * n + 1 && i <= 4 * n - 1) {
      array[i] = [n - (i - 2 * n), n];
    } else if (i >= 4 * n && i <= 6 * n) {
      array[i] = [n, 5 * n - i];
    } else {
      array[i] = [7 * n - i, -n];
    }
  }
  return array;
}
// to ensure everything is inside the grid
function mapToWall(arr) {
  return arr.map(([x, y]) => {
    const fixedX = Math.max(0, Math.min(x, 14));
    const fixedY = Math.max(0, Math.min(y, 24));
    return [fixedX, fixedY];
  });
}

// returns n-th square around cell (i,j), with anything that falls outside of the grid mapped to the wall of the array.
function around(i, j, n) {
  let arr = [];
  let array = mapToWall(squareRadiusN(n).map(([x, y]) => [x + i, y + j]));
  for (let el of array) {
    arr.push(gridCells[el[0]][el[1]]);
  }
  return arr;
}

// checks the n-th square around (i,j) cell, for mines for example, returns number of elements found
function check(i, j, n, query) {
  let count = 0;
  for (let el of around(i, j, n)) {
    if (el.classList.contains(query)) {
      count++;
    }
  }
  return count;
}

// adding mine indicating numbers
function addNumbersIndicatingMines() {
  for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 25; j++) {
      if (
        !gridCells[i][j].classList.contains("mine") &&
        check(i, j, 1, "mine") > 0
      )
        gridCells[i][j].innerText = check(i, j, 1, "mine");
    }
  }
}

// reveal cell content when cicked
function reveal(e) {
  e.target.classList.remove("cover");
  updateMineCount();
}

function updateMineCount() {
  let mineCount = 0;
  for (let el of document.querySelectorAll(".cell")) {
    if (el.classList.contains("mine") && el.classList.contains("cover")) {
      mineCount++;
    }
  }
  document.querySelector("#mine-count").innerText = `Mines remaining: ${mineCount}`;
}

fillGrid();
// restart
document.querySelector("#restart-button").addEventListener("click", restart)
function restart() {
  gameGrid.innerHTML = '';
  gridCells = [];
  fillGrid();
  document.querySelector("#mine-count").innerHTML = "Mines remaining: --"
}