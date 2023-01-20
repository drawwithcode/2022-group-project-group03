
// DOMS
let intViewportWidth = window.innerWidth;
let intViewportHeight = window.innerHeight;
let background = document.getElementById("background");
let intro = document.getElementById("intro");
let introAlert1 = document.getElementById("intro-1");
let introAlert2 = document.getElementById("intro-2");
let introAlert3 = document.getElementById("intro-3");
let introAlert4 = document.getElementById("intro-4");
let questions = document.getElementById("question-container");
let question1 = document.getElementById("question-1");
let question2 = document.getElementById("question-2");
let endpage = document.getElementById("thankyou");

//ML5
let hold;
let faceapi;
let detections = [];
let sentiment;


let fbkey;

//function to check if the desktop is being used
function windowResized() {
  if(windowWidth*1.1 > windowHeight){
    document.getElementById("phone").style.display = "block";
  
  }else{
    document.getElementById("phone").style.display = "none";
  }
}

//switching between slides
function nextSection(sectionNumber) {
switch (sectionNumber) {
    case "A":
      introAlert1.className = "container hide";
      setTimeout(() => {
        introAlert2.className = "container show";
      }, 750);
      break;
    case "B":
      introAlert2.className = "container hide";
      setTimeout(() => {
        introAlert3.className = "container show";
      }, 750);
      break;
    case "C":
      introAlert3.className = "container hide";
      setTimeout(() => {
        introAlert4.className = "container show";
      }, 750);
      break;
    case "D":
      intro.className = "section hide";
      introAlert4.className = "container hide";
        setTimeout(() => {
          questions.className = "section show";
          question1.className = "container show";
        }, 750);
        break;
    }
  }


  function setup() {
  let canvasWebcam = createCanvas (windowWidth, windowHeight);
      canvasWebcam.parent("canvas");
  
      
      //webcam
      video = createCapture(VIDEO);
      video.hide();

      //declaring what i want to detect through faceapi
	    const faceOptions = {
		   withExpression: true,
		   minConfidence: 0.5
	    };

      //declaring faceapi
	    faceapi = ml5.faceApi(video, faceOptions, faceReady);


      //creating snapshot from webcam
	    hold = createImage(video.width, video.height);

    }


  function draw() {

     //live camera
     push();
     imageMode(CENTER);
     translate(windowWidth/2, windowHeight/2);
     scale(-1.4, 1.4);
     image(video, 0, 0);
     pop();

    }

    //function to take photo and convert the image to an url sent to the database. I call the faceapi here to detect the faces in the moment i take the photo
  function takeSnap (){
  
       video.stop();
       hold = video.get();
	     video.loadPixels();
	     image64 = video.canvas.toDataURL();
	     faceapi.detect(gotFaces);

    }


    function faceReady() {

      faceapi.detect(gotFaces);
    
    }

    //function to detect the expression. then it is sent to the database and an fbkey is generated

    function gotFaces(error, result) {
    
      if (error) {
        console.log(error);
        return;
      } 
      
      detections = result;
      console.log(detections[0].expression);

      fbkey = submitScore();
      

      }
    

      //opening a new page for the sentiment part so I can send the first information to the database giving it an id
    function nextPressed() {

      window.open("sentiment.html?id=" + fbkey, "_self");

    }

    
