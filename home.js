//variables moving text
var xStart = 0;
var content = 'DO MACHINES REALLY KNOW YOU?';

// variables clouds
var t = 0.0;
let n;
let step = 14;
let txt;
// variables grid
let cols;
let rows;
let w, h;
//variable text 

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    angleMode(DEGREES);

}

function draw() { 
    fill(250);
    rect(0,0, width*2, height*2); // clear upper 2/3
    frameRate(15);
    
      //CLOUDS
  push()
  for (y = 0; y < height; y += step/3) {
  for (x = 0; x < width; x += step/3) {
    
    //draw evolving clouds
    n = noise(x/100, y/100, t/3);
    noStroke();
    fill(96, 151, 144, n*map(y, 30, height, 200, 50)); 
    rect(x, y, step, step);
  }
}
t+= 0.1;
pop();

    
  gw = width / 40;
  gh = height / 20;

  // grid
  push();
  strokeWeight(0.5);
  stroke(217, 217, 217, 70);
  // Count from left side of screen to right by column width
  for (let x = 0; x < width; x += gw) {
    // For each colum, count down by row height
    for (let y = 0; y < height; y += gh) {
      // Draw the cell
      noFill();
      rect(x, y, gw, gh);
    }
  }

      //white bar
      stroke(0)
      strokeWeight(1.5)
      fill(255);
      rect(0, height-height / 10, width, height / 10 + 2);

      //moving text
  push()
  for (let x = xStart; x < width; x += 400) { //use a for loop to draw the line of text multiple times down the vertical axis
    fill(0)  // x /2 + 100, 0); //create a gradient by associating the fill color with the y location of the text
    noStroke();
    textFont('Martian Mono');
    textSize(20)
    text(content, x, height/1.04); //display text

    }
    xStart -= 4; //move the starting point of the loop up to create the scrolling animation, yStart-- is the same as yStart = yStart -1 or yStart-=1
pop()

}

