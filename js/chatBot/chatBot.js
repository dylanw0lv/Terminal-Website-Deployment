
const chatBot = async (text) => {
    let message = text.replaceAll(" ", "_");

    let url = `https://e3rkh8un62.execute-api.us-east-1.amazonaws.com/?prompt=${message}`;
    
    try {
      let request = await fetch(url);
      let answer = await request.json();
      typeWriterEffect(answer, ".output", 10);
    } catch (e) {
      console.log(e);
      typeWriterEffect("An error occurred. Try again...", ".output", 10);
    }

}

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
  return value.trim();
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
function addParagraph() {
  document.querySelector(".output").classList.remove("output");
  let newPre = document.createElement("p");
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
  addParagraph();
  setTimeout(() => keepFocus(), 1);

}

// Outputs the information for each command
function commander() {
  let input = getTextValue();
  
  if (input === "back") {
    typeWriterEffect("Loading main page...", ".output", 10);
    setTimeout(()=> window.location.href = "./index.html", 1000);
  } else {
    chatBot(input);
  }
  

}