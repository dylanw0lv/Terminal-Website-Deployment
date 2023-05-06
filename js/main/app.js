import { Terminal } from "./Terminal.js"
import { about, contact, linkedIn, games, help, skills, email, github, rps, rpsDirections, coinFlip } from "./commands.js";
import {corpText, asciiText, welcomeText, tagline, fetchWeather } from "./commands.js";


export const commander = async () => {
    return new Promise(async (resolve) => {
        const input = terminal.getInput();

        switch(input) {

            case "about":
                terminal.output(about);
                break;

            case "contact":
                terminal.output(contact);
                break;

            case "linkedin":
                terminal.output("Opening LinkedIn...", ".output", 1);
                setTimeout(linkedIn, 1000);
                break;

            case "games":
                terminal.output(games);
                break;

            case "help":
                terminal.output(help);
                break;

            case "skills":
                terminal.output(skills);
                break;

            case "clear":
                terminal.clear();
                break;

            case "email":
                terminal.output("Opening email...", ".output", 1);
                setTimeout(email, 1000);
                break;

            case "github":
                terminal.output("Opening GitHub...", ".output", 1);
                setTimeout(github, 1000);
                break;

            case "coinflip":
                terminal.output(`It is ${coinFlip()}.`);
                break;
            
            case "rps":
                terminal.output(rpsDirections);
                break;

            case "rock":
                terminal.output(rps("rock"));
                break;

            case "scissors":
                terminal.output(rps("scissors"));
                break;

            case "paper":
                terminal.output(rps("paper"));
                break;

            case "red":
                terminal.output("Setting color to red...");
                setTimeout(() => terminal.setColor("red"), 500)
                break;

            case "green":
                terminal.output("Setting color to green...");
                setTimeout(() => terminal.setColor("green"), 500)
                break;
            
            case "blue":
                terminal.output("Setting color to blue...");
                setTimeout(() => terminal.setColor("blue"), 500)
                break;

            case "weather":
                terminal.output(await fetchWeather());
                break;
            
            case "chatbot":
                terminal.output("Loading chat bot...");
                setTimeout(()=>window.location.href="./chatbot.html", 500)
                break;

            case "speedtest":
                terminal.output("Loading the typing test...");
                setTimeout(()=>window.location.href="./speedtest.html", 500)
                break;

            default:
                terminal.output(`That is not a valid command. For a list of commands, type 'help'.`);
                break;
        }
        resolve();
    })
    
}


const terminal = new Terminal(commander, "green", corpText, asciiText, welcomeText, tagline);
terminal.startup();