const URL = 'https://teachablemachine.withgoogle.com/models/8XhqeyFcN/'

const checkpointURL = URL + 'model.json'
const metadataURL = URL + 'metadata.json';
console.log(checkpointURL);
console.log(metadataURL);

// Options for the SpeechCommands18w model, the default probabilityThreshold is 0
const options = { probabilityThreshold: 0.7 };
const classifier = ml5.soundClassifier(checkpointURL, options, modelReady);

const btnIniciar = document.getElementById("btnIniciar");
btnIniciar.style.display = "none";

const lblResult = document.getElementById("lblResult");
const result = document.getElementById("result");
const lblAccuracy = document.getElementById("lblAccuracy");
const accuracy = document.getElementById("accuracy");

