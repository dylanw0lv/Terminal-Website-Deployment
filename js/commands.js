
const help = 
`about              Who is Dylan?
contact            Displays contact information
skills             Lists the languages I am familiar with
rps                Allows user to play Rock Paper Scissors against computer
coinflip            Flips a coin
weather            Displays current weather data for your location
chatbot            Opens chat bot
clear              Clears terminal`;


const about = 
`Hey I'm Dylan!
I'm an aspiring software developer. My passion
is creating websites like this one and making visions into
reality. I'm acquiring a bachelor's degree in criminal psychology
and a minor in computer science from Liberty University.
I went into college thinking I was going to work in federal law enforcement,
but I started learning programming and really enjoyed it. I started learning
coding online through free resources. The first language I learned was
python. After taking a python course on Udemy, I began to make my own small
projects. The next course I took was a web development course. I enoyed it so
much that I would spend hours practicing coding problems and building small
projects. As my passion for coding grew, I knew that I wanted to be a software
developer.`;


const contact = 
`email         dylanw0lv@gmail.com
linkedin      Opens a new tab to my LinkedIn
github        Opens a new tab to my GitHub`;


const theme = 
`Coming soon...
retro         Changes terminal theme to retro
modern        Changes terminal theme to modern`;


const games = 
`Coming soon...
blackjack     Opens blackjack
hangman       Opens hangman`;


const skills = 
`HTML/CSS      Intermediate
JavaScript    Intermediate
Python        Intermediate
PHP           Beginner
C++           Beginner
Reactjs       Beginner
Bootstrap     Beginner`;

const rps = 
`Welcome to Rock Paper Scissors!

Rules:
Rock wins against scissors.
Paper wins against rock.
Scissors wins against paper.

Type 'rock', 'paper', or 'scissors'.`;


// Flips coin 
function coinFlip() {
    let sides = ['heads', 'tails'];
    let index = Math.floor(Math.random() * sides.length);
    return sides[index];
  }
  
  // Rock Paper Scissors game
function rockPaperScissors(choice) {
    let choices = ['rock', 'paper', 'scissors'];
    let userChoice = choices.indexOf(choice);
    let computerChoice = Math.floor(Math.random() * choices.length);
        
    if (userChoice == 0 && computerChoice == 2) {
        return `Your opponent chose ${choices[computerChoice]}. You win!`;
    } else if (computerChoice == 0 && userChoice == 2) {
        return `Your opponent chose ${choices[computerChoice]}. You lose!`;
    } else if (computerChoice > userChoice) {
        return `Your opponent chose ${choices[computerChoice]}. You lose!`;
    } else if (userChoice > computerChoice) {
        return `Your opponent chose ${choices[computerChoice]}. You win!`;
    } else if (computerChoice === userChoice) {
        return `Your opponent chose ${choices[computerChoice]}. It's a draw!`;
    }  
}
  
// Opens LinkedIn
const linkedIn = () => {window.open("https://www.linkedin.com/in/dylan-wolverton-034072259")};
  
//Opens email
const email = () => {window.open("mailto:dylanw0lv@gmail.com")};

//Opens GitHub
const github = () => {window.open("https://github.com/dylanw0lv")};

// Opens Chat Bot
const chatPage = () => {window.location.href = "https://master.d1aej28lkmlyg5.amplifyapp.com/chatbot"}
