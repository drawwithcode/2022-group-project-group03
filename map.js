
let img = [];

// variables ellipses
let parola;


// variables grid
let cols;
let rows;
let w, h;

//numeri
var gridSizeA = 70;
var gridSizeB = 5;


async function preload() {

  // load firebase app module
  // it will be loaded in a variable called initializeApp
  const fb_app = "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
  const { initializeApp } = await import(fb_app);

  // loading firebase database module
  // it will be loaded in a variable called "db"
  const fb_database =
    "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
  db = await import(fb_database);

  // Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByAlzlIOzZiRjwhm69gf1qmdnyZyXfj6I",
  authDomain: "emotioncloud-179e1.firebaseapp.com",
  databaseURL: "https://emotioncloud-179e1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "emotioncloud-179e1",
  storageBucket: "emotioncloud-179e1.appspot.com",
  messagingSenderId: "244977193252",
  appId: "1:244977193252:web:887555dad3e658e30763b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

  // Initialize Database
  database = db.getDatabase(app);
  // The reference to database key where we store data
  // we use this both for reading and writing
  scoreRef = db.ref(database, "scores");
  // define the callback function that will be called when
  // new data will arrive
  db.onValue(scoreRef, (data) => {
  
  let scores = data.val();
  for (let k in scores) {
          img = loadImage(scores[k].image, function(img){
                  UserData(img, scores[k].expression, scores[k].sentiment)
              
          });
  };
});

}


function setup() {

  let canvasBack = createCanvas (windowWidth, windowHeight);
  canvasBack.parent("canvas");
  background(39, 39, 39)

  drawBackground();

}

function draw() {

  drawExpressions();
  
}



//////////DRAWING///////////


function UserData(img, expression, sentiment) {

  let circ = random(0, 100 * PI);
  let dimw = 0;
  let dimh = 0;
  let val = 0;
  let xcanvasposition = 0;
  let ycanvasposition = 0;
 
  let angry = expression.angry;
  let sad = expression.sad;
  let happy =  expression.happy;
  let neutral = expression.neutral;
  let fearful = expression.fearful;
  let surprised = expression.surprised;
  let disgusted = expression.disgusted;
  let sntm = sentiment["score"];

  //finding the most important expression detected, this sets the x and y position of the images

  if (angry >= 0.7 && angry <= 1) {
    xcanvasposition = width / 3;
    ycanvasposition = height / 1.23;
    if (
      angry >= 0.7 &&
      angry <= 0.89
    ) {
      val = 50;
    }
    if (
      angry >= 0.9 &&
      angry <= 0.95
    ) {
      val = 70;
    }
    if (angry >= 0.96 && angry <= 1) {
      val = 90;
    }
  } else if (
    happy >= 0.7 &&
    happy <= 1
  ) {
    xcanvasposition = width / 6;
    ycanvasposition = height / 2;
    if (
      happy >= 0.7 &&
      happy <= 0.89
    ) {
      val = 50;
    }
    if (
      happy >= 0.9 &&
      happy <= 0.95
    ) {
      val = 70;
    }
    if (happy >= 0.96 && happy <= 1) {
      val = 90;
    }
  } else if (
    neutral >= 0.7 &&
    neutral <= 1
  ) {
    xcanvasposition = width / 2;
    ycanvasposition = height / 2;
    if (
      neutral >= 0.7 &&
      neutral <= 0.89
    ) {
      val = 10;
    }
    if (
      neutral >= 0.9 &&
      neutral <= 0.95
    ) {
      val = 70;
    }
    if (
      neutral >= 0.96 &&
      neutral <= 1
    ) {
      val = 90;
    }
  } else if (
    sad >= 0.7 && 
    sad <= 1) {
    xcanvasposition = (width / 6) * 5;
    ycanvasposition = (height / 4) * 2;
    if (
      sad >= 0.7 && 
      sad <= 0.89) {
      val = 50;
    }
    if (
      sad >= 0.9 && 
      sad <= 0.95) {
      val = 70;
    }
    if (
      sad >= 0.96 && 
      sad <= 1) {
      val = 90;
    }
  } else if (
    fearful >= 0.7 &&
    fearful <= 1
  ) {
    xcanvasposition = (width / 3) * 2;
    ycanvasposition = height / 4.8;
    if (
      fearful >= 0.7 &&
      fearful <= 0.89
    ) {
      val = 50;
    }
    if (
      fearful >= 0.9 &&
      fearful <= 0.95
    ) {
      val = 70;
    }
    if (
      fearful >= 0.96 &&
      fearful <= 1
    ) {
      val = 90;
    }
  } else if (
    surprised >= 0.7 &&
    surprised <= 1
  ) {
    xcanvasposition = width / 3;
    ycanvasposition = height / 4.8;
    if (
      surprised >= 0.7 &&
      surprised <= 0.89
    ) {
      val = 50;
    }
    if (
      surprised >= 0.9 &&
      surprised <= 0.95
    ) {
      val = 70;
    }
    if (
      surprised >= 0.96 &&
      surprised <= 1
    ) {
      val = 90;
    }
  } else if (
    disgusted >= 0. &&
    disgusted <= 1
  ) {
    xcanvasposition = (width / 3) * 2;
    ycanvasposition = height / 1.23;
    if (
      disgusted >= 0.7 &&
      disgusted <= 0.89
    ) {
      val = 50;
    }
    if (
      disgusted >= 0.9 &&
      disgusted <= 0.95
    ) {
      val = 70;
    }
    if (
      disgusted >= 0.96 &&
      disgusted <= 1
    ) {
      val = 90;
    }
  }

  //setting three dimensions of the image depending on the sentiment of the input text

  if (sntm >= 0.71 && sntm <= 1) {
    dimw = img.width/6.5
    dimh = img.height/6.5
    parola = "sicurissimo!"
  } else if (sntm >= 0.41 && sntm <= 0.7) {
    dimw = img.width/8
    dimh = img.height/8
    parola = "sicuro?"
  } else if (sntm >= 0.001 && sntm <= 0.4) {
    dimw = img.width/9.5
    dimh = img.height/9.5
    parola = "bah...sarà!"
  }

  
  //IMAGE DISPLAY
 
  imageMode(CENTER);
  image(img, xcanvasposition + val * cos(circ), ycanvasposition + val * sin(circ), dimw, dimh)
  

}







//------------- BACKGROUND FUNCTIONS 


function drawBackground() {

  w = width / 40;
  h = height / 20;

  // grid
  push();
  strokeWeight(0.5);
  stroke(217, 217, 217, 70);
  // Count from left side of screen to right by column width
  for (let x = 0; x < width; x += w) {
    // For each colum, count down by row height
    for (let y = 0; y < height; y += h) {
      // Draw the cell
      noFill();
      rect(x, y, w, h);
    }
  }
   

  fill(217)
  //neutral numbers
for (x = gridSizeA + 550; x < windowWidth - gridSizeA - 550;  x += 45) {
  textSize(20);
  textFont("VT323");
  text('1', x, windowHeight/2.5);
  }
  
  for (y = gridSizeB + 345; y < windowHeight - gridSizeB - 310;  y += 45) {
    textSize(20);
    textFont("VT323");
    text('1', windowWidth/2.52, y);
   }
    
  
  for (y = gridSizeB + 345; y < windowHeight - gridSizeB - 310;  y += 45) {
    textSize(20);
    textFont("VT323");
    text('1', windowWidth/1.675, y);
   }
  
   for (x = gridSizeA + 550; x < windowWidth - gridSizeA - 550;  x += 45) {
    textSize(20);
    textFont("VT323");
    text('1', x, windowHeight/1.67);
    }
  
  
    //angry numbers
  for (x = gridSizeA + 330; x < windowWidth - gridSizeA - 830;  x += 45) {
    textSize(20);
    textFont("VT323");
    text('1', x, windowHeight/1.4);
    }
    
    for (x = gridSizeA + 330; x < windowWidth - gridSizeA - 830;  x += 45) {
      textSize(20);
      textFont("VT323");
      text('1', x, windowHeight/1.11);
      }
  
      for (y = gridSizeB + 590; y < windowHeight - gridSizeB - 70;  y += 45) {
        textSize(20);
        textFont("VT323");
        text('1', windowWidth/2.52, y);
       }
      
  for (y = gridSizeB + 590; y < windowHeight - gridSizeB - 70;  y += 45) {
        textSize(20);
        textFont("VT323");
        text('1', windowWidth/4.05, y);
       }
  
        //happy numbers
  for (x = gridSizeA + 80; x < windowWidth - gridSizeA - 1100;  x += 45) {
    textSize(20);
    textFont("VT323");
    text('1', x, windowHeight/2.5);
    }
  
  
  for (y = gridSizeB + 345; y < windowHeight - gridSizeB - 310;  y += 45) {
    textSize(20);
    textFont("VT323");
    text('1', windowWidth/4.4, y);
   }
    
   for (y = gridSizeB + 345; y < windowHeight - gridSizeB - 310;  y += 45) {
    textSize(20);
    textFont("VT323");
    text('1', windowWidth/11.5, y);
   }
  
   for (x = gridSizeA + 80; x < windowWidth - gridSizeA - 1100;  x += 45) {
    textSize(20);
    textFont("VT323");
    text('1', x, windowHeight/1.67);
    }
  
    //surprised numbers
    for (x = gridSizeA + 330; x < windowWidth - gridSizeA - 830;  x += 45) {
      textSize(20);
      textFont("VT323");
      text('1', x, windowHeight/8.8);
      }
  
      for (x = gridSizeA + 330; x < windowWidth - gridSizeA - 830;  x += 45) {
        textSize(20);
        textFont("VT323");
        text('1', x, windowHeight/3.35);
        }
  
        for (y = gridSizeB + 120; y < windowHeight - gridSizeB - 560;  y += 45) {
          textSize(20);
          textFont("VT323");
          text('1', windowWidth/2.4, y);
         }
  
         for (y = gridSizeB + 120; y < windowHeight - gridSizeB - 560;  y += 45) {
          textSize(20);
          textFont("VT323");
          text('1', windowWidth/4.2, y);
         }
  
      //fearful numbers
      for (x = gridSizeA + 840; x < windowWidth - gridSizeA - 350;  x += 45) {
        textSize(20);
        textFont("VT323");
        text('1', x, windowHeight/8.8);
        }
  
        for (x = gridSizeA + 840; x < windowWidth - gridSizeA - 350;  x += 45) {
          textSize(20);
          textFont("VT323");
          text('1', x, windowHeight/3.35);
          }
  
        for (y = gridSizeB + 120; y < windowHeight - gridSizeB - 560;  y += 45) {
            textSize(20);
            textFont("VT323");
            text('1', windowWidth/1.72, y);
           }
  
           for (y = gridSizeB + 120; y < windowHeight - gridSizeB - 560;  y += 45) {
            textSize(20);
            textFont("VT323");
            text('1', windowWidth/1.34, y);
           }
     
     //disgusted numbers
  
     for (x = gridSizeA + 840; x < windowWidth - gridSizeA - 350;  x += 45) {
      textSize(20);
      textFont("VT323");
      text('1', x, windowHeight/1.4);
      }
  
     for (x = gridSizeA + 840; x < windowWidth - gridSizeA - 350;  x += 45) {
      textSize(20);
      textFont("VT323");
      text('1', x, windowHeight/1.11);
      }
  
      for (y = gridSizeB + 590; y < windowHeight - gridSizeB - 70;  y += 45) {
        textSize(20);
        textFont("VT323");
        text('1', windowWidth/1.75, y);
       }
      
       for (y = gridSizeB + 590; y < windowHeight - gridSizeB - 70;  y += 45) {
        textSize(20);
        textFont("VT323");
        text('1', windowWidth/1.32, y);
       }
    
       // sad numbers
  
       for (x = gridSizeA + 1130; x < windowWidth - gridSizeA - 120;  x += 45) {
        textSize(20);
        textFont("VT323");
        text('1', x, windowHeight/2.5);
        }
  
  
       for (x = gridSizeA + 1130; x < windowWidth - gridSizeA - 120;  x += 45) {
        textSize(20);
        textFont("VT323");
        text('1', x, windowHeight/1.67);
        }
      
        for (y = gridSizeB + 345; y < windowHeight - gridSizeB - 310;  y += 45) {
          textSize(20);
          textFont("VT323");
          text('1', windowWidth/1.13, y);
         }
  
         for (y = gridSizeB + 345; y < windowHeight - gridSizeB - 310;  y += 45) {
          textSize(20);
          textFont("VT323");
          text('1', windowWidth/1.3, y);
         }

  }


  
  function drawExpressions () {
    //text emotions
  push();
  textFont("VT323");
  fill(110, 230, 215);
  stroke("black");
  strokeWeight(3);
  textSize(windowWidth / 40);
  textAlign(CENTER);
  translate(width / 2, height / 2);
  text("NEUTRAL", 0, 0);
  pop();

  push();
  textFont("VT323");
  fill(110, 230, 215);
  stroke("black");
  strokeWeight(3);
  textSize(windowWidth / 40);
  textAlign(CENTER);
  translate((width / 3) * 2, height / 1.23);

  text("DISGUSTED", 0, 0);
  pop();

  push();
  textFont("VT323");
  fill(110, 230, 215);
  stroke("black");
  strokeWeight(3);
  textSize(windowWidth / 40);
  textAlign(CENTER);
  translate(width / 3, height / 4.8);

  text("SURPRISED", 0, 0);
  pop();

  push();
  textFont("VT323");
  fill(110, 230, 215);
  stroke("black");
  strokeWeight(3);
  textSize(windowWidth / 40);
  textAlign(CENTER);
  translate((width / 3) * 2, height / 4.8);

  text("FEARFUL", 0, 0);
  pop();

  push();
  textFont("VT323");
  fill(110, 230, 215);
  stroke("black");
  strokeWeight(3);
  textSize(windowWidth / 40);
  textAlign(CENTER);
  translate((width / 6) * 5, (height / 4) * 2);

  text("SAD", 0, 0);
  pop();

  push();
  textFont("VT323");
  fill(110, 230, 215);
  stroke("black");
  strokeWeight(3);
  textSize(windowWidth / 40);
  textAlign(CENTER);
  translate(width / 3, height / 1.23);
  text("ANGRY", 0, 0);
  pop();

  push();
  textFont("VT323");
  fill(110, 230, 215);
  stroke("black");
  strokeWeight(3);
  textSize(windowWidth / 40);
  textAlign(CENTER);
  translate(width / 6, height / 2);
  text("HAPPY", 0, 0);
  pop();

  }



 