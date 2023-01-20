
// firebase global variables
let db;
let database;
let scoreRef;
let image64;
let scores;
let img = [];



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
                    UserData(img, scores[k].expression, scores[k].sentiment);
  
            });
    };
  });
}

//submit initial score, and return key
function submitScore() {
  let data = {
    //collecting images and expressions first
    image: image64,
    expression: detections[0].expressions
  };

  // create a new entry
  let newScore = db.push(scoreRef);
  // add the data to it
  db.set(newScore, data).then(function(){});
  // initialize score variable
  return newScore.key;


}

//submit newscore with the sentiment value
function submitSentiment(Id, Text) {
  const ref = db.child(scoreRef, Id);
  db.update(ref, {'sentiment': Text});
  
}

