let intViewportWidth = window.innerWidth;
let intViewportHeight = window.innerHeight;
let question2 = document.getElementById("question-2");
let endpage = document.getElementById("thankyou");

let sentiment;



//switching between the two sections
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
    
    
      
  