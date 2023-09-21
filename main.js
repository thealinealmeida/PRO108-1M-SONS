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

let isNoisesReady = false;
let isModelReady = false;

// const noises = [
//   "Background Noise",
//   "caneca",
//   "estalo de dedo",
//   "la la la",
//   "palmas"
// ];

var noises = [];
getNoises();

async function getNoises() {
  const request = new Request(metadataURL);
  const response = await fetch(request);
  const data = await response.json();
  noises = data.wordLabels;
  console.log("Noises loaded");
  isNoisesReady = true;
  showButton();
  // console.log(Array.isArray(noises));
  // console.log(noises);
}

function modelReady() {
  // classify sound
  // classifier.classify(gotResult);
  console.log("Model Ready");
  isModelReady = true;
  showButton();
}

function showButton() {
  if (isModelReady && isNoisesReady){
    btnIniciar.style.display = "inline-block";
  }
}

function iniciar() {
  classifier.classify(gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // log the result
  // console.log(results);

console.log(noises)

  const rgb =
    'rgb(' +
    randomRGB() +
    ',' +
    randomRGB() +
    ',' +
    randomRGB() +
    ')';

  lblResult.style.color = rgb;
  lblAccuracy.style.color = rgb;

  const label = results[0].label;
  const confidence = results[0].confidence;
  console.log(label, confidence);

  result.innerHTML = label;
  accuracy.innerHTML = Math.round(confidence * 100) + "%"

  // if (noises.includes(label)) {
  const dancing = noises.indexOf(label);
  console.log(dancing);

  for (let numAlien = 1; numAlien < noises.length; numAlien++) {
    const alien = document.getElementById('alien' + numAlien);
    if (numAlien == dancing) {
      alien.src = 'aliens-0' + numAlien + '.gif';
    } else {
      alien.src = 'aliens-0' + numAlien + '.png';
    }
  }
  // }
}

// não vamos usar, mas é legal saber como fazer
function randomNumber(min, max) {
  min = parseInt(min);
  max = parseInt(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// equivamente a randomNumber(0, 255);
function randomRGB() {
  // min = 0; max = 255; 
  // max - min + 1 = 255 - 0 + 1 = 256
  return Math.floor(Math.random() * 256);
}
