let board = [
['', '', ''],
['', '', ''],
['', '', '']
];

let threeInRow = [
[], [], [], [], [], [], [], []
];

let width = 300;
let height = 300;
let w = width / 3;
let h = height / 3;

let xwins = 0;
let owins = 0;
let gameover = false;

let players = ['X', 'O'];

let currentplayer;

function setup() {
  createCanvas(width, height);
  currentplayer = random(players);
  document.getElementById("currentturn").innerHTML = currentplayer;
}

function mousePressed() {
  if (!gameover) {
    let mx = mouseX;
    let my = mouseY;
    if (mx >= 0 && my >= 0 && mx <= width && my <= height){
      let xindex = floor(mx / w);
      let yindex = floor(my / h);
      play(currentplayer, yindex, xindex);
    }
  }
}

function nextPlayer(player) {
  switch (true) {
    case (player == "X"):
    return players[1];
    case (player == "O"):
    return players[0];
  }
}

function play(player, xclick, yclick) {
  if (board[xclick][yclick] == "") {
    board[xclick][yclick] = player;
    checkWin(board);
    currentplayer = nextPlayer(currentplayer);
    updateAll();
  }
}

function checkWin(b) {
  threeInRow = [
  [b[0][0], b[0][1], b[0][2]],
  [b[0][0], b[1][0], b[2][0]],
  [b[0][0], b[1][1], b[2][2]],
  [b[0][1], b[1][1], b[2][1]],
  [b[0][2], b[1][2], b[2][2]],
  [b[1][0], b[1][1], b[1][2]],
  [b[2][0], b[2][1], b[2][2]],
  [b[0][2], b[1][1], b[2][0]],
  ];

  for (i = 0; i < threeInRow.length; i++){
    let tester = threeInRow[i][0];
    let middle = threeInRow[i][1];
    let end = threeInRow[i][2];
    if (tester == middle && tester == end){
      if (tester == "X"){
        xwins += 1;
        gameover = true;
        updateAll();
      } else if (tester == "O"){
        owins += 1;
        gameover = true;
        updateAll();
      }
    }
  }
}

function updateAll(){
  document.getElementById("currentturn").innerHTML = currentplayer;
  document.getElementById("xwins").innerHTML = xwins;
  document.getElementById("owins").innerHTML = owins;
}

function resetBoard() {
  board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
  ];
  gameover = false;
  updateAll();
}

function resetScore(){
  xwins = 0;
  owins = 0;
  resetBoard();
}

function draw() {
  background(230);

  stroke(0);
  strokeWeight(2);
  fill(230);
  rect(0, 0, width, height);

  stroke(0);
  strokeWeight(2);
  fill(0);
  line(100, 0, 100, 300);
  line(200, 0, 200, 300);
  line(0, 100, 300, 100);
  line(0, 200, 300, 200);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let spot = board[i][j];
      let x = (width / 6) + (w * j);
      let y = (height / 6) + (h * i);
      textSize(100);
      textAlign(CENTER, CENTER);
      text(spot, x, y);
    }
  }
}