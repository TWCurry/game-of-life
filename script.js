// Global vars
grid = twoDimensionalArray(10, 10);
gridHeight = 10;
gridWidth = 10;
cellSize = 20;
liveColour = "#FFFFFF"
deadColour = "#000000"
borderColour = "#333333"
cellBorderSize = 1


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

    // Begin main loop
    drawGrid();
});


function drawGrid(){
    // Run algorithm
    simulateCycle()
    
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
    for (y=0; y<gridHeight-1; y++) {
        for (x=0; x<gridWidth-1; x++) {
            // Draw border
            ctx.fillStyle = borderColour;
            ctx.fillRect(x*cellSize, y*cellSize, cellSize, cellSize);
            // Draw internal cell
            if (grid[x][y] == 0){ // 0 Represents dead, 1 represents live
                ctx.fillStyle = deadColour;
            }else {
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