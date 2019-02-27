const RESOLUTION = 8;
const STROKEW = 0.5;

let grid;             //[COLS][ROWS]
let newGrid;
let isRunning = false;
let cnv;
let cols, rows;
let p, p2;
let btn;
let drawTool = 1;      // 1 = single;  2 = glider;  3 = glider gun;


function setup() {
  cnv = createCanvas(800,600);
  cnv.mousePressed(mousePrsd);
  frameRate(60);

  btn = createButton("Reset");
  btn.mousePressed(btnPressed);

  p = createP("Paused");
  p2 = createP("Single");

  cols = floor(width / RESOLUTION);
  rows = floor(height / RESOLUTION);

  grid = create2DArray(cols, rows);
  newGrid = create2DArray(cols, rows);

  // for (let col = 0; col < cols; col++) {
  //   for (let row = 0; row < rows; row++) {
  //     grid[col][row] = floor(random(2));
  //   }
  // }

  // grid[10][10] = 1;
  // grid[11][10] = 1;
  // grid[11][11] = 1;
  // grid[10][11] = 1;
}

function draw() {
  background(0);

  //drawing the grid
  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      if (grid[col][row] == 1) {
        fill(255,255,0);
        stroke(100);
        strokeWeight(STROKEW);
        rect(col*RESOLUTION, row*RESOLUTION, RESOLUTION-STROKEW, RESOLUTION-STROKEW);
      }
    }
  }

  if (isRunning) {
    if (frameCount % 1 == 0) {
      generation();
      grid = newGrid;
      newGrid = create2DArray(cols, rows);
    }
  }
}


function btnPressed() {
  grid = create2DArray(cols, rows);
  newGrid = create2DArray(cols, rows);
  isRunning = false;
  p.html("Paused");
}


function keyPressed() {
  if (key === "P") {
    isRunning = !isRunning;

    if (isRunning) {
      p.html("Running");
    } else {
      p.html("Paused");
    }

  } else if (key == "1") {
    drawTool = 1;
    p2.html("Single");

  } else if (key == "2") {
    drawTool = 2;
    p2.html("Glider");

  } else if (key == "3") {
    drawTool = 3;
    p2.html("Gosper Glider Gun");

  } else if (key == "5") {
    drawTool = 5;
    p2.html("Die Hard");

  } else if (key == "4") {
    drawTool = 4;
    p2.html("Invert gun");

  } else if (key == "6") {
    drawTool = 6;
    p2.html("Pentadecathlon");

  } else if (key == "7") {
    drawTool = 4;
    p2.html("Die Hard");

  }
}

function mousePrsd() {

  let col = floor(mouseX / RESOLUTION);
  let row = floor(mouseY / RESOLUTION);

  if (drawTool == 1) {            //Single
    if (grid[col][row] == 1) {
      grid[col][row] = 0;
    } else {
      grid[col][row] = 1;
    }

  } else if (drawTool == 2) {     //Glider
    grid[(col-1+cols)%cols][(row+rows)%rows] = 1;
    grid[(col+cols)%cols][(row+1+rows)%rows] = 1;
    grid[(col+1+cols)%cols][(row-1+rows)%rows] = 1;
    grid[(col+1+cols)%cols][(row+rows)%rows] = 1;
    grid[(col+1+cols)%cols][(row+1+rows)%rows] = 1;

    grid[(col+cols)%cols][(row+rows)%rows] = 0;
    grid[(col+cols)%cols][(row-1+rows)%rows] = 0;
    grid[(col-1+cols)%cols][(row+1+rows)%rows] = 0;
    grid[(col-1+cols)%cols][(row-1+rows)%rows] = 0;

  } else if (drawTool == 3) {     //Gosper Glider Gun
    grid[(col-18+cols)%cols][(row+rows)%rows] = 1;
    grid[(col-17+cols)%cols][(row+rows)%rows] = 1;
    grid[(col-18+cols)%cols][(row+1+rows)%rows] = 1;
    grid[(col-17+cols)%cols][(row+1+rows)%rows] = 1;
    grid[(col-8+cols)%cols][(row+rows)%rows] = 1;
    grid[(col-8+cols)%cols][(row+1+rows)%rows] = 1;
    grid[(col-8+cols)%cols][(row+2+rows)%rows] = 1;
    grid[(col-7+cols)%cols][(row-1+rows)%rows] = 1;
    grid[(col-7+cols)%cols][(row+3+rows)%rows] = 1;
    grid[(col-6+cols)%cols][(row-2+rows)%rows] = 1;
    grid[(col-6+cols)%cols][(row+4+rows)%rows] = 1;
    grid[(col-5+cols)%cols][(row-2+rows)%rows] = 1;
    grid[(col-5+cols)%cols][(row+4+rows)%rows] = 1;
    grid[(col-4+cols)%cols][(row+1+rows)%rows] = 1;
    grid[(col-3+cols)%cols][(row-1+rows)%rows] = 1;
    grid[(col-3+cols)%cols][(row+3+rows)%rows] = 1;
    grid[(col-2+cols)%cols][(row+rows)%rows] = 1;
    grid[(col-2+cols)%cols][(row+1+rows)%rows] = 1;
    grid[(col-2+cols)%cols][(row+2+rows)%rows] = 1;
    grid[(col-1+cols)%cols][(row+1+rows)%rows] = 1;
    grid[(col+2+cols)%cols][(row-2+rows)%rows] = 1;
    grid[(col+2+cols)%cols][(row-1+rows)%rows] = 1;
    grid[(col+2+cols)%cols][(row+rows)%rows] = 1;
    grid[(col+3+cols)%cols][(row-2+rows)%rows] = 1;
    grid[(col+3+cols)%cols][(row-1+rows)%rows] = 1;
    grid[(col+3+cols)%cols][(row+rows)%rows] = 1;
    grid[(col+4+cols)%cols][(row-3+rows)%rows] = 1;
    grid[(col+4+cols)%cols][(row+1+rows)%rows] = 1;
    grid[(col+6+cols)%cols][(row-4+rows)%rows] = 1;
    grid[(col+6+cols)%cols][(row-3+rows)%rows] = 1;
    grid[(col+6+cols)%cols][(row+1+rows)%rows] = 1;
    grid[(col+6+cols)%cols][(row+2+rows)%rows] = 1;
    grid[(col+16+cols)%cols][(row-2+rows)%rows] = 1;
    grid[(col+16+cols)%cols][(row-1+rows)%rows] = 1;
    grid[(col+17+cols)%cols][(row-2+rows)%rows] = 1;
    grid[(col+17+cols)%cols][(row-1+rows)%rows] = 1;

  } else if (drawTool == 4) {
    grid[(col-3+cols)%cols][(row+rows)%rows] = 1;
    grid[(col-2+cols)%cols][(row+rows)%rows] = 1;
    grid[(col-2+cols)%cols][(row+1+rows)%rows] = 1;
    grid[(col+3+cols)%cols][(row+rows)%rows] = 1;
    grid[(col+2+cols)%cols][(row+1+rows)%rows] = 1;
    grid[(col+3+cols)%cols][(row+1+rows)%rows] = 1;
    grid[(col+4+cols)%cols][(row+1+rows)%rows] = 1;
    grid[(col+3+cols)%cols][(row-2+rows)%rows] = 1;

  } else if (drawTool == 5) {
    grid[(col+18+cols)%cols][(row+rows)%rows] = 1;
    grid[(col+17+cols)%cols][(row+rows)%rows] = 1;
    grid[(col+18+cols)%cols][(row+1+rows)%rows] = 1;
    grid[(col+17+cols)%cols][(row+1+rows)%rows] = 1;
    grid[(col+8+cols)%cols][(row+rows)%rows] = 1;
    grid[(col+8+cols)%cols][(row+1+rows)%rows] = 1;
    grid[(col+8+cols)%cols][(row+2+rows)%rows] = 1;
    grid[(col+7+cols)%cols][(row-1+rows)%rows] = 1;
    grid[(col+7+cols)%cols][(row+3+rows)%rows] = 1;
    grid[(col+6+cols)%cols][(row-2+rows)%rows] = 1;
    grid[(col+6+cols)%cols][(row+4+rows)%rows] = 1;
    grid[(col+5+cols)%cols][(row-2+rows)%rows] = 1;
    grid[(col+5+cols)%cols][(row+4+rows)%rows] = 1;
    grid[(col+4+cols)%cols][(row+1+rows)%rows] = 1;
    grid[(col+3+cols)%cols][(row-1+rows)%rows] = 1;
    grid[(col+3+cols)%cols][(row+3+rows)%rows] = 1;
    grid[(col+2+cols)%cols][(row+rows)%rows] = 1;
    grid[(col+2+cols)%cols][(row+1+rows)%rows] = 1;
    grid[(col+2+cols)%cols][(row+2+rows)%rows] = 1;
    grid[(col+1+cols)%cols][(row+1+rows)%rows] = 1;
    grid[(col-2+cols)%cols][(row-2+rows)%rows] = 1;
    grid[(col-2+cols)%cols][(row-1+rows)%rows] = 1;
    grid[(col-2+cols)%cols][(row+rows)%rows] = 1;
    grid[(col-3+cols)%cols][(row-2+rows)%rows] = 1;
    grid[(col-3+cols)%cols][(row-1+rows)%rows] = 1;
    grid[(col-3+cols)%cols][(row+rows)%rows] = 1;
    grid[(col-4+cols)%cols][(row-3+rows)%rows] = 1;
    grid[(col-4+cols)%cols][(row+1+rows)%rows] = 1;
    grid[(col-6+cols)%cols][(row-4+rows)%rows] = 1;
    grid[(col-6+cols)%cols][(row-3+rows)%rows] = 1;
    grid[(col-6+cols)%cols][(row+1+rows)%rows] = 1;
    grid[(col-6+cols)%cols][(row+2+rows)%rows] = 1;
    grid[(col-16+cols)%cols][(row-2+rows)%rows] = 1;
    grid[(col-16+cols)%cols][(row-1+rows)%rows] = 1;
    grid[(col-17+cols)%cols][(row-2+rows)%rows] = 1;
    grid[(col-17+cols)%cols][(row-1+rows)%rows] = 1;

  } else if (drawTool == 6) {
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 7; j++) {
        grid[(col+i+cols)%cols][(row+j+rows)%rows] = 1;
      }
    }

    grid[(col+cols)%cols][(row+rows)%rows] = 0;
    grid[(col+cols)%cols][(row+5+rows)%rows] = 0;
  }
}


function generation() {
  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {

      let state = grid[col][row];
      let neighbors = countNeighbors(grid, col, row);

      if (state == 0 && neighbors == 3) {
        newGrid[col][row] = 1;
      } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        newGrid[col][row] = 0;
      } else {
        newGrid[col][row] = state;
      }
    }
  }

}


function countNeighbors(grid, x, y) {

  let sum = 0;

  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {

      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;

      sum += grid[col][row];
    }
  }

  sum -= grid[x][y];
  return sum;
}

function create2DArray(c, r) {
  let arr = new Array(c);

  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(r);
    for (let j = 0; j < r; j++) {
      arr[i][j] = 0;
    }
  }

  return arr;
}
