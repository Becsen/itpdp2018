const SerialPort = require('serialport'); //opret en seriel port til input fra arduino (node-serialport-github.io)
const Regex = require('parser-regex'); //parser der laver hex code om til strings (node-serialport.github.io/parsers)
const port = new SerialPort('/dev/ttyACM0', function(err){ //initialisering af porten til input
    if(err) {
        return console.log('Error: ', err.message);
    }}, {
    baudRate: 9600 //Den serielle rate der bliver angivet på arduinoen, sørger for data er i sync
});
const parser = port.pipe(new Regex({ regex: /[\r\n]+/ })); //specificering af hvordan parser skal opdele hex koden
const say = require('say');

const debug = false;

parser.on('data', (data) =>{
    if(data == 'a'){
        console.log("Data received: A pushed");
        say.speak("seventeen of june. Go to the dentist at one");
    } else if(data == 'b') {
        console.log("Data received: B pushed");
        say.speak("eigth of june. Dinner with your mom");
    } 
})