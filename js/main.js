
// Turns off spellcheck (The red underline for misspelled words)
document.body.setAttribute('spellcheck', false);

// Calling a function that keeps the focus on the input element
keepFocus();

// Listens for keypress and activates commander if Enter key is pressed
document.addEventListener("keydown", checkKeyPressed, false);


function checkKeyPressed(event) {
  if (event.key === "Enter") {
    noEdit();
    commander();
  } 
}


// Listens to see if element is in focus and focuses if not 
function keepFocus() {

  let element = document.querySelector(".input");
  element.focus();
  element.addEventListener("focusout", focusBack);

  function focusBack() {
    setTimeout(() => element.focus(), 1);
  }
}


// Gets text from the text area
function getTextValue() {
  var value = document.querySelector('.input').textContent;
  value = value.replaceAll(/\s/g, '');
  return value.toLowerCase();
}


// Changes textarea attribute to readOnly
function noEdit() {
  document.querySelector(".input").contentEditable = "false";
}


// Removes input class from last textarea and creates new textarea and connected tagline
function addTextArea() {
  document.querySelector(".input").classList.remove("input");

  let newTextArea = document.createElement("div");
  newTextArea.contentEditable = "true";
  newTextArea.classList.add("input");
  newTextArea.classList.add("connected");
  newTextArea.classList.add("textarea");

  let newTagLine = document.createElement("pre");
  newTagLine.textContent = "user@dwolverton.com:~$ ";
  newTagLine.classList.add("connected");

  document.getElementById("new-elements").appendChild(newTagLine);
  document.getElementById("new-elements").appendChild(newTextArea);
}


// Creates new pre element and removes class from old pre element
function addPre() {
  document.querySelector(".output").classList.remove("output");
  let newPre = document.createElement("pre");
  newPre.classList.add("output");
  document.getElementById("new-elements").appendChild(newPre);
}


// Writes text with type writer effect and creates new elements
function typeWriterEffect(string, elementClass, speed) {
  var text = string;
  var len = text.length;
  var char = 0;
  var element = document.querySelector(elementClass);
  element.innerHTML = "";
  
  function type() {
    if (char < len) {
      element.innerHTML += text.charAt(char);
      char++;
      setTimeout(type, speed);
    }
  }
  type();
  addTextArea();
  addPre();
  setTimeout(() => keepFocus(), 1);

}


// Outputs the information for each command
function commander() {
  let input = getTextValue();

  if (input.includes("nutrition")) {
    input = "nutrition";
  }

  switch(input) {
    case "about":
      typeWriterEffect(about, ".output", 10);
      console.log(getTextValue());
      break;
    case "contact":
      typeWriterEffect(contact, ".output", 10);
      break;
    case "linkedin":
      typeWriterEffect("Opening LinkedIn...", ".output", 1);
      setTimeout(linkedIn, 1000);
      break;
    case "games":
      typeWriterEffect(games, ".output", 10);
      break;
    case "theme":
      typeWriterEffect(theme, ".output", 10);
      break;
    case "help":
      typeWriterEffect(help, ".output", 10);
      break;
    case "skills":
      typeWriterEffect(skills, ".output", 10);
      break;
    case "clear":
      window.location.reload();
      break;
    case "email":
      typeWriterEffect("Opening email...", ".output", 1);
      setTimeout(email, 1000);
      break;
    case "github":
      typeWriterEffect("Opening GitHub...", ".output", 1);
      setTimeout(github, 1000);
      break;
    case "coinflip":
      typeWriterEffect(`It is ${coinFlip()}.`, ".output", 10);
      break;

    case "chatbot":
      typeWriterEffect("Loading chatbot...", ".output", 10);
      setTimeout(chatPage, 1000);
      break;

    // Rock Paper Scissors
    case "rps":
      typeWriterEffect(rps, ".output", 10);
      break;
    case "rock":
      typeWriterEffect(rockPaperScissors("rock"), ".output", 10);
      break;
    case "scissors":
      typeWriterEffect(rockPaperScissors("scissors"), ".output", 10);
      break;
    case "paper":
      typeWriterEffect(rockPaperScissors("paper"), ".output", 10);
      break;
    case "weather":
      fetchWeather();
      break;

    default:
      typeWriterEffect(`That is not a valid command. For a list of commands, type 'help'.`, ".output", 10);
      break;
  }
}

