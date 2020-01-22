let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
// Добавляем фон при помощи метода Image
const ground = new Image();
ground.src = '/img/ground.png';
// Добавляем клубнику при помощи метода Image
const strawberryImg = new Image();
strawberryImg.src = '/img/strawberry.png'

let box = 32

let score = 0;
// Добавление клубники в рандомном месте
let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box
};
// Создаем саму змейку
let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box
}

document.addEventListener('keydown', direction);

let dir;

function direction(event) {
  if (event.keyCode == 37 && dir != 'right') {
    dir = 'left'
  } else if (event.keyCode == 38 && dir != 'down') {
    dir = 'up';
  } else if (event.keyCode == 39 && dir != 'left') {
    dir = 'right';
  } else if (event.keyCode == 40 && dir != 'up') {
    dir = 'down';
  }
}
// Функция для того, чтобы змейка непроходила через себя
function eatTail(head, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (head.x == arr[i].x && head.y == arr[i].y){
      clearInterval(game);
    }
  }
}

// Добавляем функцию для отображения картинок x = 0, y = 0
function drawGame() {
  ctx.drawImage(ground, 0, 0);

  ctx.drawImage(strawberryImg, food.x, food.y);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? 'green' : 'tomato';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = 'white';
  ctx.font = '50px Jura';
  ctx.fillText(score, box * 2.5, box * 1.7);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (snakeX == food.x && snakeY == food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box
    };
  } else {
    snake.pop();
  }

  if (snakeX < box || snakeX > box * 17 
    || snakeY < 3 * box || snakeY > box * 17) 
    clearInterval(game);

  if (dir == 'left') snakeX -= box;
  if (dir == 'right') snakeX += box;
  if (dir == 'up') snakeY -= box;
  if (dir == 'down') snakeY += box;

  let newHead = {
    x: snakeX,
    y: snakeY
  };

  eatTail(newHead, snake);

  snake.unshift(newHead);
}
// Создаем интервал для отображения фоновой картинки
let game = setInterval(drawGame, 100);










// function zebra() {
  
//   let x = 0;
//   let y = 0;
//   let count = 0;

//   while (count < 79) {
//     x = x + 10;
//     y = y + 10;
//     count++;

//     ctx.moveTo(x, 0);
//     ctx.lineTo(0, y);
//     ctx.stroke();
//   }
  
// }
// zebra();


