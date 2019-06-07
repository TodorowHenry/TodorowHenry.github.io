class Bubble {
  constructor(x, y, d, r, g, b, vx, vy) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.r = r;
    this.g = g;
    this.b = b;
    this.p = 0;
    this.vx = vx;
    this.vy = vy;
  }
  getSpeed() {
    return Math.sqrt(this.vx*this.vx + this.vy*this.vy);
  }
}

let j;
let canvas;
let i;

let bubbles = [];
//for(let i=1; i<=200; i++) {
//  if(bubbles[i].x > 0 && bubbles[i].x < 800 && bubbles[i].y > 0 && bubbles[i].y < 600) {
//    bubbles[i].wall = false;
//  } else {
//    bubbles[i].wall = true;
//  }
//}

for(let i=1; i<=200; i++) {
  bubbles.push(new Bubble(Math.round(200+400*Math.random()), Math.round(100+400*Math.random()), 10, 0, 125, 125, 4*(GaussianRandom()), 4*(GaussianRandom())  ));
  //bubbles.push(new Bubble(Math.round(800*Math.random()), Math.round(600*Math.random()), 10, 255, 255, 255, 10*Math.random(), 10*Math.random()));
}

function GaussianRandom() {
  return Math.sqrt(-2*Math.log(Math.random()))*Math.cos(2*3.14159265359*Math.random());
}

function addHeat(){
    bubbles.forEach(function(b){b.vx *= 1.2;});
    bubbles.forEach(function(b){b.vy *= 1.2;});
}

function coolDown(){
    bubbles.forEach(function(b){b.vx *= 0.8;});
    bubbles.forEach(function(b){b.vy *= 0.8;});
}

function beep() {
    var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
    snd.play();
}

function distance(dx, dy) {
  return Math.sqrt(dx*dx + dy*dy);
}

function touchingbubble(m) {
  for(let i=0; i<200; i++) {
    if(distance(bubbles[m].x-bubbles[i].x, bubbles[m].y-bubbles[i].y)<=10) {
      collide(m, i);
    }
  }
}

// function edgebounce(m) {
//   if((bubbles[m].x <= 0 && bubbles[m].vx<0) || (bubbles[m].x >= 800 && bubbles[m].vx>0)) {
//     bubbles[m].vx = -1*bubbles[m].vx;
//   }
//   if((bubbles[m].y <= 0 && bubbles[m].vy < 0) || (bubbles[m].y >= 600 && bubbles[m].vy > 0)) {
//     bubbles[m].vy = -1*bubbles[m].vy;
//   }
// }

function edgebounce(m) {
    if((bubbles[m].x>=795 && bubbles[m].vx>0) || (bubbles[m].x<=5 && bubbles[m].vx<0)){
        bubbles[m].vx *= (-1);
    }

    if((bubbles[m].y>=595 && bubbles[m].vy>0) || (bubbles[m].y<=5 && bubbles[m].vy<0)){
        bubbles[m].vy *= (-1);
    }
}

function collide(p, q) {
  let pvxi = bubbles[p].vx;
  let pvyi = bubbles[p].vy;
  let qvxi = bubbles[q].vx;
  let qvyi = bubbles[q].vy;
  let pvxf = qvxi;
  let pvyf = qvyi;
  let qvxf = pvxi;
  let qvyf = pvyi;
  bubbles[p].vx = pvxf;
  bubbles[p].vy = pvyf;
  bubbles[q].vx = qvxf;
  bubbles[q].vy = qvyf;
}

function setup() {
  console.log("bubbles", bubbles);
  canvas = createCanvas(800, 600);
  background(0, 0, 0);
}

function draw() {
  clear();
  background(0, 0, 0);
  clicked = false;
  onbubble = false;
  for(let j=0;j<bubbles.length;j++){
    bubbles[j].x+=bubbles[j].vx;
    bubbles[j].y+=bubbles[j].vy;
    edgebounce(j);
    touchingbubble(j);
    fill(40*bubbles[j].getSpeed(), 125, 125);
    circle(bubbles[j].x, bubbles[j].y, bubbles[j].d);
    noStroke();
  }
}


