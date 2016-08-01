function createGameGrid(size) {
  grid = []
  for (var i = 0; i < size; i++) {
    grid.push(createGridRow(size))
  }
  return grid
}

function createGridRow(size) {
  row = []
  for (var i = 0; i < size; i++) {
    row.push(" ")
  }
  return row
}

function renderGrid(grid) {
  $(".game-grid").empty()
  for (var i = 0; i < grid.length; i++) {
    for (var ii = 0; ii < grid[i].length; ii++) {
      $(".game-grid").append('<div class="square">'+ grid[i][ii] +'</div>')
    }
  }
}

function parseKeypress(input) {
  var keypressMap = {37:"l",38:"u",39:"r",40:"d"}
  return keypressMap[input.keyCode]
}

function placeSnake(grid) {
  for (var i = 0; i < snake.currentSnake.length; i++) {
    grid[snake.currentSnake[i][0]][snake.currentSnake[i][1]] = "x"
  }
}

function placeFood(grid) {
    grid[food.coords[0]][food.coords[1]] = "O"
}

function moveSnakeInDirection(x,y,grid) {
  coords = [snake.currentSnake[0][0]+x,snake.currentSnake[0][1]+y]
  snake.currentSnake.unshift(coords)
  if (JSON.stringify(food.coords) == JSON.stringify(coords)) {
    food.coords = foodCoords()
  } else {
    removeSnakeTail(grid)
  }
}

function removeSnakeTail(grid){
  var tail = snake.currentSnake.pop()
  grid[tail[0]][tail[1]] = " "
}

function move(grid) {
  switch(snake.direction){
    case "r":
      moveSnakeInDirection(0,1,grid)
      break
    case "l":
      moveSnakeInDirection(0,-1,grid)
      break
    case "d":
      moveSnakeInDirection(1,0,grid)
      break
    case "u":
      moveSnakeInDirection(-1,0,grid)
      break
  }
}

function gameOverYet() {
  if ( (snake.currentSnake[0][0] >= 0 && snake.currentSnake[0][0] <
    40) && (snake.currentSnake[0][1] >= 0 && snake.currentSnake[0][1] < 40) ) {
      return false
  } else {
    return true
  }
}

function foodCoords(){
  coords = []
  coords.push(Math.floor((Math.random() * 40) + 1))
  coords.push(Math.floor((Math.random() * 40) + 1))
  return coords
}

var snake = {
  position: [20,10],
  direction: "r",
  currentSnake: [[20,10],[20,9],[20,8],[20,7],[20,6],[20,5]]
}

var food = {
  coords: [20,15]
}

function gameLoop(gameGrid){
    setTimeout(function timer(){
        move(gameGrid)
      if (!gameOverYet()) {
        placeFood(gameGrid)
        placeSnake(gameGrid)
        renderGrid(gameGrid)
        gameLoop(gameGrid)
      } else {
        alert("gameover")
      }
    }, 100)
}

$(document).ready(function(){
  var gameGrid = createGameGrid(40)
  renderGrid(gameGrid,snake.currentSnake)
  $("body").keypress(function(input){
    snake.direction = parseKeypress(input)
  })
  gameLoop(gameGrid)
})
