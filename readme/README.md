![](592.png)



This is Group 03 final project of the elective course [Creative Coding at Politecnico di Milano](https://www11.ceda.polimi.it/schedaincarico/schedaincarico/controller/scheda_pubblica/SchedaPublic.do?&evn_default=evento&c_classe=696598&__pj0=0&__pj1=3ed8420c42c849845b5caa3de626e8fc).
Browse [this website](https://drawwithcode.github.io/) if you want to know more about it.



### Faculty

* Michele Mauri
* Andrea Benedetti
* Tommaso Elli

### Team

* Giovanni Benvegnù
* Mattia Bonanno
* Lorenzo Cordioli
* Olimpia Di Via
* Gioia Stroffolini

### Index
0. [Must Have](#must-have)
1. [Design](#design)
    * Brief
    * Concept 
    * How it works
    * Process
2. [Coding](#Coding)
    * Face recognition
    * Sentiment
    * Firebase
    * The Map
3. [Credits](#credits)

## Must Have

In order to run **Emotion Cloud** you must pre-install [nodejs and npm](https://nodejs.org/)

## Design

### Brief

**Presence** "In a context in which technology used in design products is rendered invisible and tangible,
aiming for a quasi-magical experience, we prompt you in exploring the opposite of this."

**Is there a usage of technology that makes it present, tangible, persistent?**

### Concept

Through our interaction, our personalities and digital behaviors we are translated into data that fuels the machine: this data is used as a mean to catalog our interests, behaviors and habits, creating categories of users.

Our project, “Emotion Cloud”, wants to put the focus on how bias and stereotypes might influence these algorithms that categorize us, and how we can not confide in their inability to fail.

![](girl.gif)

### How it works

The goal is to create a platform through which our faces and words are analyzed to create an emotion visual map of how our expressions appear in front of a webcam and how our words are read by the machine.

It doesn’t matter if the result is true or false, our categorization and catalogation is reality: it’s what happens everyday when we face technology.
The aim of the project is to be as visually distant from a real restitution of emotions as possible: the user is asked to portray his/her state of mind, but the machine returns something that is more like a pattern, an aseptic system of images and signs, which has nothing to do with the way people are.

In order to do this, the user must capture a photo of himself thought the webcam. We use **FaceAPI** to detect different emotions by the individuation of different features of the face. 
Additionally, we use **ml5.sentiment** to detect whether the sentiment of the answer is positive or negative with a value between 0 (“negative”) and 1 (“positive”).

### Process

The experience starts from a QRcode (on mobile phones) which will lead the user to the webcam page and then to the question box, through different sections. The project is designed to be used by several people at the same time: to do this all the information is stored in a database, that collects all the informations from the single devices and makes them available for the use within the system.

![](homepage.png)

The result is a constantly evolving map where users' photos are polarized around the emotion that the machine has identified as prevalent, with a size and arrangement that depend on the intensity of the emotion identified and on the response evaluation. This map is only usable from a desktop computer, since it's designed to be projected on a large screen within an installation whose main theme is the presence of technology.

The public then can interact with the installation (using their own phone) seeing which category they belong to: if they are happy, sad, neutral, surprised, fearful, angry or disgusted. According to the machine, of course.

![Process](591.png)

---

## Coding

![](bbt.gif)

### **Face recognition**

We use FaceAPI, particularly the model faceExpression, to detect different emotions by the individuation of different features of the face and their relative position. The definition of the expression, then, will lead to a specific categorization, defined by a number which will decide the preponderant emotion on the map.
Once the value of emotions has been found, they will be used to display the images on the map.

### General Criticisms
For this section of the code, the biggest difficulties were related to handling the data detected by the face API, so that it was then sent in the most correct way to the database. Another important element was the retrieval of data from the database, in order to set the position of the images and the general operations of the system. 


### The Code step by step

Thanks to the windowsresized() function, we ensured that the image capture was usable from the phone: the responsiveness of the initial sections was important to make the experience as much comfortable as possible for the users.

```js 
function windowResized() {
  if(windowWidth*1.1 > windowHeight){
    document.getElementById("phone").style.display = "block";
  
  }else{
    document.getElementById("phone").style.display = "none";
  }
}
```

---

Using the NextSection() function, we navigate between the various introductory sections. As we move from one section to the next, we will introduce what the experience will consist of, making every step of the interaction clear.

```js 
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
```
![](schermateStart.png)
---
In setup() we configured the webcam, which will be indispensable for capturing expressions with the face API, which we declared in the previous lines.

```js 
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

```
---
The draw function is used to show the live webcam . At the same time, takesnap() is used to capture the image.
```js 

function draw() {

     //live camera
     push();
     imageMode(CENTER);
     translate(windowWidth/2, windowHeight/2);
     scale(-1.4, 1.4);
     image(video, 0, 0);
     pop();

    }

      function takeSnap (){
  
       video.stop();
       hold = video.get();
	     video.loadPixels();
	     image64 = video.canvas.toDataURL();
	     faceapi.detect(gotFaces);

    }
```

---
Through these two functions we are able to load the faceApi model before every other action and, after that, to detect the value of emotions and send them to the database: for each image we will have a value for each of the 7 detected feelings.

```js 
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
```

---
Using this last function, we can move on to the last section, which is where we will write the sentence to detect the sentiment value: this function allows to open a new page associated to an Id, which is necessary to connect to the database and to pair the two pieces of information sent.

```js 
  function nextPressed() {

      window.open("sentiment.html?id=" + fbkey, "_self");

    }
 ```

---

### **Sentiment**
After the user has finished on the webcam page, a question will be asked: "How do you feel today?". The user then must fill a text box with an honest answer from which a value will be created: this will decide the distance between the picture and the emotion’s word, corresponding to the emotion's "pole". We use ml5.sentiment to detect whether the sentiment of the answer is positive or negative with a value between 0 (“negative”) and 1 (“positive”): since the machine learning system uses a database of words most often used in reviews to determine this value, the link between the written sentence and the actual score is completely arbitrary, but that is precisely the point.
We do not necessarily want people to recognise themselves in the score they are given.
It's thanks to this model then that we are able to attribute a value that will constitute the size of the picture.

### General Criticisms

It was a question of writing the sentence and analyzing its sentiment value, after which we needed to send the score obtained to the database and then retrieve it to use it as a variable for the pictures.

### The Code
Through the nextsection() function, as in the previous section, we can move between the sentiment detection and the next phase.
```js 
function nextSection(sectionNumber) {
    switch (sectionNumber) {
        case "F":
            getSentiment();
            question2.className = "container hide";
          setTimeout(() => {
            endpage.className = "container show";
          }, 750);
          break;
        }
      }
```

---

In this section of the code we see how the sentiment model is called and loaded, after which we calculated its value using the getSentiment() function. Through submitSentiment() we sent the calculated value to the database
```js 
function setup() {
        //declaring sentiment
        sentiment = ml5.sentiment('movieReviews', modelReady)
      }


      function modelReady() {

        // model is ready
        console.log('Model Loaded')
    
      }
 
      //function to detect the sentiment of the input phrase. then, it calls the submit function passing the fbkey id and the prediction
      function getSentiment() {

        let inp = document.getElementById("input-text").value;
        let prediction = sentiment.predict(inp);
        console.log(prediction);
        const Id = window.location.search.split("=")[1]; //ricerca la chiave nell'URL
        submitSentiment(Id, prediction);
      
      }

```

---

Through this function we will move to the section of the map, which is the final step of the installation project.

---

### **Firebase**
### General Criticisms
We decided to use Firebase because it is an open source service, but supported by Google, which allowed us to interface with it via Javascript. Loading the data was intuitive, given the various resources available on the web. The user data was stored in Objects, each one of them consisting of the image (converted in URL), the expressions detections (one score for each emotion that could be identified by the Api), and the sentiment detection score.
However, the subsequent phase of retrieving and reproposing the data in our code was more critical, due to the connection between database and code. 

### The Code step by step
Through the code provided by the platform we connected to the previously configured realtime database.
```js 
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
```

---
 
Once the connection was established we went to create the various folders where the data would be stored. 
```js 
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
                    UserData(img, scores[k].expression, scores[k].sentiment);
  
            });
    };
  });
}

``` 


---
![](593.png)

### **The Map**
The map is the final output of our project: the users, after the interaction with the system, will have the 7 emotions arranged at equal distances in the screen, and their pictures will be disposed in groups inside the screen space, and their size will be determined by the Sentiment's score.
In this way, each user is able to see how Face API and Sentiment will arrange and categorise their pictures, seeing if one's state of mind is reflected in the analysis made by the machine, or not.

### The Code step by step
After setting up and connecting the database, I go to load the image and previously saved data.
```js 
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
```
---
In the setup() function we define the size of the canvas and call the background function to create the grid and drawexpressions() for the words of the various 7 sentiments.
```js
function setup() {

  let canvasBack = createCanvas (windowWidth, windowHeight);
  canvasBack.parent("canvas");
  background(39, 39, 39)

  drawBackground();

}

function draw() {

  drawExpressions();
  
}
```

---
With this part of the code, we are able to filter out all the faceAPI values so that we could find the right position for the images on the screen: for each one of them an 'if' statement was created, through which we associate the values of the variables (xcanvasposition, ycanvasposition, dimw, dimh and val) to a specific response based on the expression detected.

```js
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
  }
```

---
This series of if() instead is used to figure out the size of the image based on the sentiment value.
```js
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
```
---
Once all the parameters have been defined, we are finally able to define the position and size of the photo, then display it via the image() function
 ```js
  imageMode(CENTER);
  image(img, xcanvasposition + val * cos(circ), ycanvasposition + val * sin(circ), dimw, dimh)
  ```


## Credits
Draw With Code: Creative Coding 2022/2023 
Politecnico di Milano – Dipartimento di Design


