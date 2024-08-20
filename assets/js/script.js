const gameGrid = document.getElementById('game-grid');
let gridCells = [];

// make grid
for (let i=0; i<15; i++) {
    gridCells[i] =[];
    for (let j=0; j<25; j++) {
        gridCells[i][j] = document.createElement("div");
        gridCells[i][j].classList.add("cell");
        gameGrid.appendChild(gridCells[i][j]);
        gridCells[i][j].innerText = `${i},${j}`
    }
}

// place mines
let rndi = [];
let rndj = [];
for (let i = 0; i<69; i++) {
    rndi[i] = Math.floor(Math.random()*15);
    rndj[i] = Math.floor(Math.random()*25);
}
for (let i = 0; i<69; i++) {
    gridCells[rndi[i]][rndj[i]].classList.add("mine");
}