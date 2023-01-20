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

![Process](girl.gif)

### How it works

The goal is to create a platform through which our faces and words are analyzed to create an emotion visual map of how our expressions appear in front of a webcam and how our words are read by the machine.

It doesn’t matter if the result is true or false, our categorization and catalogation is reality: it’s what happens everyday when we face technology.
The aim of the project is to be as visually distant from a real restitution of emotions as possible: the user is asked to portray his/her state of mind, but the machine returns something that is more like a pattern, an aseptic system of images and signs, which has nothing to do with the way people are.

In order to do this, the user must capture a photo of himself thought the webcam. We use **FaceAPI** to detect different emotions by the individuation of different features of the face. 
Additionally, we use **ml5.sentiment** to detect whether the sentiment of the answer is positive or negative with a value between 0 (“negative”) and 1 (“positive”).

### Process

The experience starts from a QRcode (on mobile phones) which will lead the user to the webcam page and then to the question box, through different sections. The project is designed to be used by several people at the same time: to do this all the information is stored in a database, that collects all the informations from the single devices and makes them available for the use within the system.

The result is a constantly evolving map where users' photos are polarized around the emotion that the machine has identified as prevalent, with a size and arrangement that depend on the intensity of the emotion identified and on the response evaluation. This map is only usable from a desktop computer, since it's designed to be projected on a large screen within an installation whose main theme is the presence of technology.

The public then can interact with the installation (using their own phone) seeing which category they belong to: if they are happy, sad, neutral, surprised, fearful, angry or disgusted. According to the machine, of course.

![Process](591.png)

---

## Coding

![Process](bbt.gif)

### **Face recognition**

We use FaceAPI, particularly the model faceExpression, to detect different emotions by the individuation of different features of the face and their relative position. The definition of the expression, then, will lead to a specific categorization, defined by a number which will decide the preponderant emotion on the map.
Once the value of emotions has been found, they will be used to display the images on the map.

### General Criticisms
For this section of the code, the biggest difficulties were related to handling the data detected by the face API, so that it was then sent in the most correct way to the database. Another important element was the retrieval of data from the database, in order to set the position of the images and the general operations of the system. 


### The Code step by step

Thanks to the windowsresized() function, we ensured that the image capture was usable from the phone: the responsiveness of the initial sections was important to make the experience as much comfortable as possible for the users.

```js 

```

---

Using the NextSection() function, we navigate between the various introductory sections. As we move from one section to the next, we will introduce what the experience will consist of, making every step of the interaction clear.

---
In setup() we configured the webcam, which will be indispensable for capturing expressions with the face API, which we declared in the previous lines.

---
The draw function is used to show the live webcam . At the same time, takesnap() is used to capture the image.

---
Through these two functions we are able to load the faceApi model before every other action and, after that, to detect the value of emotions and send them to the database: for each image we will have a value for each of the 7 detected feelings.

---
Using this last function, we can move on to the last section, which is where we will write the sentence to detect the sentiment value: this function allows to open a new page associated to an Id, which is necessary to connect to the database and to pair the two pieces of information sent.

---

### **Sentiment**
After the user has finished on the webcam page, a question will be asked: "How do you feel today?". The user then must fill a text box with an honest answer from which a value will be created: this will decide the distance between the picture and the emotion’s word, corresponding to the emotion's "pole". We use ml5.sentiment to detect whether the sentiment of the answer is positive or negative with a value between 0 (“negative”) and 1 (“positive”): since the machine learning system uses a database of words most often used in reviews to determine this value, the link between the written sentence and the actual score is completely arbitrary, but that is precisely the point.
We do not necessarily want people to recognise themselves in the score they are given.
It's thanks to this model then that we are able to attribute a value that will constitute the size of the picture.

### General Criticisms

It was a question of writing the sentence and analyzing its sentiment value, after which we needed to send the score obtained to the database and then retrieve it to use it as a variable for the pictures.

### The Code
Through the nextsection() function, as in the previous section, we can move between the sentiment detection and the next phase.

---

In this section of the code we see how the sentiment model is called and loaded, after which we calculated its value using the getSentiment() function. Through submitSentiment() we sent the calculated value to the database

---

Through this function we will move to the section of the map, which is the final step of the installation project.

---

### **Firebase**
### General Criticisms
We decided to use Firebase because it is an open source service, but supported by Google, which allowed us to interface with it via Javascript. Loading the data was intuitive, given the various resources available on the web. The user data was stored in Objects, each one of them consisting of the image (converted in URL), the expressions detections (one score for each emotion that could be identified by the Api), and the sentiment detection score.
However, the subsequent phase of retrieving and reproposing the data in our code was more critical, due to the connection between database and code. 

### The Code step by step
Through the code provided by the platform we connected to the previously configured realtime database.

---
 
Once the connection was established we went to create the various folders where the data would be stored. 

---
![Process](593.png)

### **The Map**
The map is the final output of our project: the users, after the interaction with the system, will have the 7 emotions arranged at equal distances in the screen, and their pictures will be disposed in groups inside the screen space, and their size will be determined by the Sentiment's score.
In this way, each user is able to see how Face API and Sentiment will arrange and categorise their pictures, seeing if one's state of mind is reflected in the analysis made by the machine, or not.

### The Code step by step
After setting up and connecting the database, I go to load the image and previously saved data.

---
In the setup() function we define the size of the canvas and call the background function to create the grid and drawexpressions() for the words of the various 7 sentiments.

---
With this part of the code, we are able to filter out all the faceAPI values so that we could find the right position for the images on the screen: for each one of them an 'if' statement was created, through which we associate the values of the variables (xcanvasposition, ycanvasposition, dimw, dimh and val) to a specific response based on the expression detected.

---
(codice troppo lungo per lo screen)
This series of if() instead is used to figure out the size of the image based on the sentiment value.

---
Once all the parameters have been defined, we are finally able to define the position and size of the photo, then display it via the image() function

## Credits
Draw With Code: Creative Coding 2022/2023 
Politecnico di Milano – Dipartimento di Design


