import { Terminal } from "../main/Terminal.js";

export class Chatbot extends Terminal {
    constructor(...args) {
        super(...args);
    }

    type(text, elementClass=".output", speed=10) {
        return new Promise((resolve) => {
            let len = text.length;
            let index = 0;
            let element = document.querySelector(elementClass);
        
            const typeDigit = () => {
                if (index < len) {
                    element.innerHTML += text.charAt(index);
                    index++;
                    setTimeout(typeDigit, speed);
    
                } else {
                    resolve();
                }
            }
            typeDigit();
        })
    }

    prompt(message) {
        return new Promise(async (resolve, reject) => {
            message = message.replaceAll(" ", "_");
    
            let url = `https://e3rkh8un62.execute-api.us-east-1.amazonaws.com/?prompt=${message}`;
            
            try {
                let response = await fetch(url);
                let answer = await response.json();
                resolve(answer);
            } catch (e) {
                console.log(e);
                reject("An error occurred. Try again...");
            }
        })
    }
}


