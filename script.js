// Global vars
grid = twoDimensionalArray(10, 10);
gridHeight = 10;
gridWidth = 10;
cellSize = 10;
liveColour = "#FFFFFF";
deadColour = "#000000";
borderColour = "#333333";
cellBorderSize = 1;
framesPerStep = 1; // Number of frames before updating the simulation
frameNo = 1;


// Init function
$(document).ready(function(){
    var c = document.getElementById("mainCanvas");

    // Fix canvas resolution
    c.width=$('#mainCanvas').width();
    c.height=$('#mainCanvas').height();

    // Determine Grid size
    gridWidth = (Math.ceil(c.width / cellSize) * cellSize) / cellSize;
    gridHeight = (Math.ceil(c.height / cellSize) * cellSize) / cellSize;
    console.log("Width: " + c.width + " gridWidth: " + gridWidth);
    console.log("Height: " + c.height + " gridHeight: " + gridHeight);

    // Reset grid to correct size
    grid = twoDimensionalArray(gridWidth, gridHeight);

    // Populate grid with dead cells
    for (y=0; y<gridHeight-1; y++) {
        for (x=0; x<gridWidth-1; x++) {
            grid[x][y] = 0; // 0 Represents dead, 1 represents live
        }
    }

    grid[0][1] = 1;
    grid[2][0] = 1;
    grid[2][1] = 1;
    grid[2][2] = 1;
    grid[1][2] = 1;

    grid[30][1] = 1;
    grid[30][2] = 1;
    grid[30][3] = 1;

    // Begin main loop
    drawGrid();
});


function drawGrid(){
    if (frameNo == framesPerStep) {
        // Run algorithm
        simulateCycle()
        frameNo = 1;
    }else{
        frameNo ++;
    }
    
    // Create context
    var c = document.getElementById("mainCanvas");
    var ctx = c.getContext("2d");
    canvasWidth = c.width;
    canvasHeight = c.height;
    
    // Clear and color background
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw grid
    for (var y=0; y<gridHeight-1; y++) {
        for (var x=0; x<gridWidth-1; x++) {
            // Draw border
            ctx.fillStyle = borderColour;
            ctx.fillRect(x*cellSize, y*cellSize, cellSize, cellSize);
            // Draw internal cell
            if (grid[x][y] == 0){ // 0 Represents dead, 1 represents live
                ctx.fillStyle = deadColour;
            }else{
                ctx.fillStyle = liveColour;
            }
            
            ctx.fillRect((x*cellSize)+cellBorderSize, (y*cellSize)+cellBorderSize, cellSize-(cellBorderSize*2), cellSize-(cellBorderSize*2));
        }
    }


    // Create animation loop
    window.requestAnimationFrame(drawGrid);
}

//Function to process game of life
function simulateCycle(){ // it's the ciiiiircle of lifeee
    // Create backup of current grid before algorithm is performed
    previousGrid = twoDimensionalArray(gridWidth, gridHeight);
    for (y=0; y<gridHeight-1; y++) {
        for (x=0; x<gridWidth-1; x++) {
            previousGrid[x][y] = grid[x][y];
        }
    }

    // Main loop
    for (var x=0; x<gridWidth-1; x++) {
        for (var y=0; y<gridHeight-1; y++) {
            liveCellCount = 0; // How many live cells border the current cell
            for (var i=x-1; i<x+2; i++) {
                for (var j=y-1; j<y+2; j++) {
                    if (inGrid(i, j) == true && !(i == x && j == y)) {
                        if (previousGrid[i][j] == 1) {
                            liveCellCount += 1;
                        }
                    }
                }
            }
            if (previousGrid[x][y] == 1) { // If cell is currently alive
                if (liveCellCount == 2 || liveCellCount == 3) {
                    grid[x][y] = 1;
                }else{
                    grid[x][y] = 0;
                }
            }else{ // Is currently dead
                if (liveCellCount == 3) {
                    grid[x][y] = 1;
                }
            }
        }
    }
}

// Function to determine whether coordinate is within the grid
function inGrid(x, y){
    if (x<0 || y < 0 || x >= gridWidth || y >=gridHeight){
        return false;
    }else{
        return true;
    }
}

// Function to create 2d Array
function twoDimensionalArray(rows, columns) {
    // Create "internal" array
    var arr = [];
  
    // Create 2nd dimension array
    for (i=0; i<rows; i++) {
       arr[i] = [];
       for (j=0; j<rows; j++) {
        arr[i][j] = null;
       }
    }
  
    return arr;
  }