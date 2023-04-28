import { Chatbot } from "./Chatbot.js";
import { corpText, asciiText, welcomeText, tagline, help } from "./commands.js";

const commander = async () => {
    return new Promise(async (resolve) => {
        const input = chat.getInput();

        switch (input) {

            case "help":
                chat.output(help);
                break;

            case "back":
                chat.type("Loading main page...");
                setTimeout(()=>window.location.href="./index.html", 500)
                break;
            
            case "clear":
                chat.clear();
                break;

            case "red":
                chat.output("Setting color to red...");
                setTimeout(() => chat.setColor("red"), 500)
                break;

            case "blue":
                chat.output("Setting color to blue...");
                setTimeout(() => chat.setColor("blue"), 500)
                break;

            case "green":
                chat.output("Setting color to green...");
                setTimeout(() => chat.setColor("green"), 500)
                break;
            
            default:
                chat.type(await chat.prompt(input));
                break;
        }
        resolve();
    })
}

const chat = new Chatbot(commander, "green", corpText, asciiText, welcomeText, tagline);

chat.startup();