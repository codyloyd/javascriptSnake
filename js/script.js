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
      $(".game-grid").append('<div class="square" id="'+ i +'-'+ ii +'">'+ grid[i][ii] +'</div>')
    }
  }
}

function parseKeypress(input) {
  var keypressMap = {37:"l",38:"u",39:"r",40:"d"}
  return keypressMap[input.keyCode]
}

function placeSnake(grid) {
  for (var i = 0; i < snake.currentSnake.length; i++) {
    // grid[snake.currentSnake[i][0]][snake.currentSnake[i][1]] = "x"
    $("#"+snake.currentSnake[i][0]+"-"+snake.currentSnake[i][1]).addClass("snake")
  }
}

function placeFood(grid) {
    $("#"+food.coords[0]+"-"+food.coords[1]).addClass("food")
}

function moveSnakeInDirection(x,y,grid) {
  coords = [snake.currentSnake[0][0]+x,snake.currentSnake[0][1]+y]
  snake.currentSnake.unshift(coords)
  if (JSON.stringify(food.coords) == JSON.stringify(coords)) {
    food.coords = foodCoords()
    score += 1
    console.log(score)
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

function snakeIsInBounds() {
  if ( (snake.currentSnake[0][0] >= 0 && snake.currentSnake[0][0] <
    40) && (snake.currentSnake[0][1] >= 0 && snake.currentSnake[0][1] < 40) ) {
      return true
  } else {
    return false
  }
}

function snakeNotOverlapping() {
  for (var i = 1; i < snake.currentSnake.length; i++) {
    if (JSON.stringify(snake.currentSnake[i]) == JSON.stringify(snake.currentSnake[0])) {
      return false
    } else {
    }
  }
  return true
}

function gameOverYet() {
  if (snakeIsInBounds() && snakeNotOverlapping()) {
      return false
  } else {
    return true
  }

}

function foodCoords(){
  coords = []
  coords.push(Math.floor((Math.random() * 40)))
  coords.push(Math.floor((Math.random() * 40)))
  return coords
}

function renderScore(){
  $("#score").text(score)
}

var snake = {
  position: [20,10],
  direction: "r",
  currentSnake: [[20,10],[20,9],[20,8],[20,7],[20,6],[20,5]]
}

var food = {
  coords: [20,15]
}

var score = 0

function gameLoop(gameGrid){
    setTimeout(function timer(){
        move(gameGrid)
      if (!gameOverYet()) {
        renderGrid(gameGrid)
        placeFood(gameGrid)
        placeSnake(gameGrid)
        renderScore()
        gameLoop(gameGrid)
      } else {
        alert("gameover")
      }
    }, 50)
}
$(document).ready(function(){
  var gridSize = 40
  var gameGrid = createGameGrid(gridSize)
  renderGrid(gameGrid,snake.currentSnake)
  $("body").keypress(function(input){
    snake.direction = parseKeypress(input)
  })
  gameLoop(gameGrid)
})
