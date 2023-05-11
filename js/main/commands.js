// Startup Messages
export const corpText = "Dylan Wolverton (DW) Not Exactly A Corporation. No rights reserved.";

export const asciiText = 
`:::::::::  :::   ::: :::            :::     ::::    ::: ::: ::::::::       ::::::::::: :::::::::: :::::::::  ::::    ::::  ::::::::::: ::::    :::     :::     :::        
:+:    :+: :+:   :+: :+:          :+: :+:   :+:+:   :+: :+ :+:    :+:          :+:     :+:        :+:    :+: +:+:+: :+:+:+     :+:     :+:+:   :+:   :+: :+:   :+:        
+:+    +:+  +:+ +:+  +:+         +:+   +:+  :+:+:+  +:+    +:+                 +:+     +:+        +:+    +:+ +:+ +:+:+ +:+     +:+     :+:+:+  +:+  +:+   +:+  +:+        
+#+    +:+   +#++:   +#+        +#++:++#++: +#+ +:+ +#+    +#++:++#++          +#+     +#++:++#   +#++:++#:  +#+  +:+  +#+     +#+     +#+ +:+ +#+ +#++:++#++: +#+        
+#+    +#+    +#+    +#+        +#+     +#+ +#+  +#+#+#           +#+          +#+     +#+        +#+    +#+ +#+       +#+     +#+     +#+  +#+#+# +#+     +#+ +#+        
#+#    #+#    #+#    #+#        #+#     #+# #+#   #+#+#    #+#    #+#          #+#     #+#        #+#    #+# #+#       #+#     #+#     #+#   #+#+# #+#     #+# #+#        
#########     ###    ########## ###     ### ###    ####     ########           ###     ########## ###    ### ###       ### ########### ###    #### ###     ### ##########    
`
export const welcomeText = `Welcome to my website!
For a list of commands, type 'help'.`

export const tagline = "user@dwolverton.com:~$ ";

// Command Messages and Functions
export const help = 
`about              Who is Dylan?
contact            Displays contact information
skills             Lists my skills
rps                Play Rock Paper Scissors
coinflip            Flips a coin
weather            Displays current weather
chatbot            Opens chat bot page
speedtest          Opens typing speed test page
red                Changes theme to red
blue               Changes theme to blue
green              Changes theme to green
clear              Clears terminal`;

export const about = 
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

export const contact = 
`email         dylanw0lv@gmail.com
linkedin      Opens a new tab to my LinkedIn
github        Opens a new tab to my GitHub`;

export const games = 
`Coming soon...
blackjack     Opens blackjack
hangman       Opens hangman`;

export const skills = 
`HTML/CSS      Intermediate
JavaScript    Intermediate
Python        Intermediate
PHP           Beginner
C++           Beginner
jQuery        Intermediate
Reactjs       Beginner
Bootstrap     Beginner
AWS           Intermediate`;

export const rpsDirections = 
`Welcome to Rock Paper Scissors!

Rules:
Rock wins against scissors.
Paper wins against rock.
Scissors wins against paper.

Type 'rock', 'paper', or 'scissors'.`;

// Flips coin 
export const coinFlip = () => {
    let sides = ['heads', 'tails'];
    let index = Math.floor(Math.random() * sides.length);
    return sides[index];
}
  
// Rock Paper Scissors game
export const rps = (choice) => {
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
export const linkedIn = () => {window.open("https://www.linkedin.com/in/dylan-wolverton-034072259")};
  
//Opens email
export const email = () => {window.open("mailto:dylanw0lv@gmail.com")};

//Opens GitHub
export const github = () => {window.open("https://github.com/dylanw0lv")};


// Weather API call
export const fetchWeather = async () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(async (pos) => {
            let lon = pos.coords.longitude;
            let lat = pos.coords.latitude;
    
            let url = `https://1dbtfjoli1.execute-api.us-east-1.amazonaws.com/?lat=${lat}&lon=${lon}`;
            
            try {
                let requestWeather = await fetch(url);
                let weatherData = await requestWeather.json();
    
                console.log(weatherData)
    
                let city = weatherData.name;
                let temp = weatherData.main.temp;
                let description = weatherData.weather[0].description;
                let humidity = weatherData.main.humidity;
                let windSpeed = weatherData.wind.speed;
                let feelsLike = weatherData.main.feels_like;
                let message =
`The current temperature in ${city} is ${temp}°F.
It feels like ${feelsLike}°F.
Description: ${description}
Humidity: ${humidity}%
Wind Speed: ${windSpeed} mph`;
    
                resolve(message);
            } catch (e) {
                console.log(e);
                reject("An error occurred. Try again...");
            }
        });
    })
    
}






