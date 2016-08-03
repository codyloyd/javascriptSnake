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
  var oppositeDirections = { "r":"l","u":"d","d":"u","l":"r"}
  var keypressMap = {37:"l",38:"u",39:"r",40:"d"}
  var keypress = keypressMap[input.keyCode]
  if (oppositeDirections[keypress] != snake.direction) {
    return keypress
  } else {
    return snake.direction
  }
}

function placeSnake(grid) {
  for (var i = 0; i < snake.currentSnake.length; i++) {
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
    eatFood()
  } else {
    removeSnakeTail(grid)
  }
}

function eatFood() {
  food.coords = foodCoords()
  score += 1
  if (speed > 100) {
    speed -= 5
  } else if (speed > 75) {
    speed -= 3
  } else if (speed > 50) {
    speed -= 1
  } else {

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
    20) && (snake.currentSnake[0][1] >= 0 && snake.currentSnake[0][1] < 20) ) {
      return true
  } else {
    return false
  }
}

function notOverlappingSnake(coord) {
  for (var i = 1; i < snake.currentSnake.length; i++) {
    if (JSON.stringify(snake.currentSnake[i]) == JSON.stringify(coord)) {
      return false
    } else {
    }
  }
  return true
}

function gameOverYet() {
  if (snakeIsInBounds() && notOverlappingSnake(snake.currentSnake[0])) {
      return false
  } else {
    return true
  }

}

function foodCoords(){
  coords = []
  coords.push(Math.floor((Math.random() * 20)))
  coords.push(Math.floor((Math.random() * 20)))
  if (notOverlappingSnake(coords)){
    return coords
  } else {
    foodCoords()
  }
}

function renderScore(){
  $("#score").text(score)
}

var snake = {
  position: [10,10],
  direction: "r",
  currentSnake: [[10,10],[10,9],[10,8],[10,7],[10,6],[10,5]]
}

var food = {
  coords: [10,15]
}

var score = 0
var speed = 150

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
    }, speed)
}
$(document).ready(function(){
  var gridSize = 20
  var gameGrid = createGameGrid(gridSize)
  renderGrid(gameGrid,snake.currentSnake)
  $("body").keydown(function(input){
    snake.direction = parseKeypress(input)
  })
  gameLoop(gameGrid)
})
