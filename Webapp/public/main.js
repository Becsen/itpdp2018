// Script kan ikke læses på nuværende tidspunkt!?

// Source https://www.youtube.com/watch?v=F6UWb9FNnj4
const firebase = require('firebase');
const functions = require('firebase-functions');

// Input fields
let locationtext = document.getElementById('location')
let starttime = document.getElementById('starttime')
let endtime = document.getElementById('endtime')
let date = document.getElementById('date')
let title = document.getElementById('transcript')

let appointment = ''

// Submit data
function submitClick () {
  let firebaseRef = firebase.database().ref('Calendar/Aftale');
  let dateRef = firebase.database().ref('Calendar/Dato');
  // Values from inputs in webapp
  let locationval = locationtext.value
  let starttimeval = starttime.value
  let endtimeval = endtime.value
  let dateval = date.value
  let titlecontent = title.value

  console.log('Jeg er inde i sumbit')
  
  // Pushes data to database
  firebaseRef.push({Beskrivelse: titlecontent, Lokation: locationval, Starter: starttimeval, Slutter: endtimeval, Dato: dateval})
  dateRef.push({Dato: dateval})
}

// Måske kunne man bruge button clicks til at sætte data ind? Overksriv bare den specifikke knap

// Receive data
function recClick () {
  let firebaseRecRef = firebase.database().ref()
  firebaseRecRef.on('child_added', function (snapshot) { // når noget tilføjes til databasen
    let returnArr = [] // laver et tomt array

    snapshot.forEach(function (childSnapshot) { // for hvert child (dato, location mm.)
      let item = childSnapshot.val()
      item.key = childSnapshot.key

      returnArr.push(item) // Hvert child pushes i arrayet
    })
    console.log(returnArr) // logger arrayet
    return returnArr
  })
}

/// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let text = ''
let addedText = ''
// Web Speech API
function startReading () {
  var msg = new SpeechSynthesisUtterance()
  //window.speechSynthesis.speak(msg)

  var voices = window.speechSynthesis.getVoices()
  msg.voice = voices[0]
  msg.voiceURI = 'native'
  msg.volume = 1
  msg.rate = 1
  msg.text = addedText + text
  msg.lang = 'da-DK'

  msg.onend = function (e) {
    console.log('Finished in ' + event.elapsedTime + ' seconds.')
  }
  speechSynthesis.speak(msg)
}

// HTML5 Speech Recognition API
// Title transcription
function startDictation () {
  if (window.hasOwnProperty('webkitSpeechRecognition')) { // Checks if the users browser supports SpeechRecognition
    var recognition = new webkitSpeechRecognition()

    recognition.continous = true // continuos betyder, at man hele tiden kan tale til mikrofonen
    recognition.interimResults = true // når brugere taler, så kommer der resultater. Det bliver redefined and sets up this information

    recognition.lang = 'da-DK'
    recognition.start()

    recognition.onresult = function (e) {
      document.getElementById('transcript').value = e.results[0][0].transcript // Transcript from textarea arrived from Google serves. Man får resultatet af et array and pulled out the transcript
    }

    recognition.onerror = function (e) {
      recognition.stop()
    }
  }
}

// Location transcription HTML5 Recognition API
function startLocDictation () {
  if (window.hasOwnProperty('webkitSpeechRecognition')) { // Checks if the users browser supports SpeechRecognition
    var recognition = new webkitSpeechRecognition()

    recognition.continous = true // continuos betyder, at man hele tiden kan tale til mikrofonen
    recognition.interimResults = true // når brugere taler, så kommer der resultater. Det bliver redefined and sets up this information

    recognition.lang = 'da-DK'
    recognition.start()

    recognition.onresult = function (e) {
      document.getElementById('location').value = e.results[0][0].transcript // Transcript from textarea arrived from Google serves. Man får resultatet af et array and pulled out the transcript
    }

    recognition.onerror = function (e) {
      recognition.stop()
    }
  }
}

/// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Reads all titles on specific date
function readAppointment () {
  //let appointment = '-LAqm1DZluHrUuPKtEp7';
  let aftale = firebase.database().ref().child('Calendar/Aftale');
  console.log(aftale);
//Order by driller!
  aftale.orderByChild('Aftale/Dato').equalTo('27-04-2018').on('child_added', function (snapshot) {
    let childArray = Array.from(snapshot.children)
    console.log('Array consists of: ' + childArray.val());
    childArray.orderByValue("Starter").forEach(function (item) {
      addedText = item.key();
      text = item.val(); // bruges i startReading()
      startReading();
    })
  })
}