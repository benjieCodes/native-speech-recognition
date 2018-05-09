window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.interimResults = true;

let p = document.createElement("p");
const words = document.querySelector(".words");
words.appendChild(p);

recognition.addEventListener("result", e => {
  const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join("");

  p.textContent = transcript;
  console.log(transcript);
  // the speech recognition unbinds when I stop speaking
  if (e.results[0].isFinal) {
    p = document.createElement("p");
    words.appendChild(p);
  }
});

// this will fix when result ends
recognition.addEventListener("end", recognition.start);

recognition.start();
