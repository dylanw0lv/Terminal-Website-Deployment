
export class Terminal {
    constructor(divID, commander, color="green", rightsMessage, asciiArt, welcomeMessage, tagline) {
        this.commander = commander;
        this.rightsMessage = rightsMessage;
        this.asciiArt = asciiArt;
        this.welcomeMessage = welcomeMessage;
        this.tagline = tagline;
        document.body.setAttribute('spellcheck', false);
        this.screen = document.getElementById(divID);
        this.color = color;
        
        this.cmdHistory = [];
        this.currentIndex = 0;
    }

    setColor(color) {
        const r = document.querySelector(":root");
        if (color === "green") {
            r.style.setProperty("--text-color", "rgb(104, 233, 90)");
            r.style.setProperty("--background-color", "rgb(1, 18, 1)");
            r.style.setProperty("--shadow-color", "rgb(2, 33, 2)");
        } else if (color === "blue") {
            r.style.setProperty("--text-color", "rgb(46, 144, 255)");
            r.style.setProperty("--background-color", "rgb(3, 1, 14)");
            r.style.setProperty("--shadow-color", "rgb(7, 2, 33)");
        } else if (color === "red") {
            r.style.setProperty("--text-color", "rgb(255, 0, 0)");
            r.style.setProperty("--background-color", "rgb(14, 1, 1)");
            r.style.setProperty("--shadow-color", "rgb(33, 2, 2)");
        }
    }

    addInputElement() {
        if (document.getElementsByClassName("input").length > 0) {
            document.querySelector(".input").classList.remove("input");
        }

        let inputElement = document.createElement("div");
        inputElement.contentEditable = "true";
        inputElement.classList.add("input");
        inputElement.classList.add("connected");
        inputElement.addEventListener("focusout", () => setTimeout(()=>inputElement.focus()), 1);

        let newTagLine = document.createElement("pre");
        newTagLine.classList.add("connected");
        newTagLine.innerHTML = this.tagline;

        this.screen.appendChild(newTagLine);
        this.screen.appendChild(inputElement);
        
        inputElement.focus();
        console.log()
    }

    addOutputElement() {
        if (document.getElementsByClassName("output").length > 0) {
            document.querySelector(".output").classList.remove("output");
        }

        let outputElement = document.createElement("pre");
        outputElement.classList.add("output");
        outputElement.classList.add("outputEl");
        this.screen.appendChild(outputElement);
    }

    async startup() {
        this.setColor(this.color);

        let rights = document.createElement("pre");
        rights.classList.add("rightsMessage");
        this.screen.appendChild(rights);

        let ascii = document.createElement("pre");
        ascii.classList.add("asciiArt");
        this.screen.appendChild(ascii);

        let welcome = document.createElement("pre");
        welcome.classList.add("welcomeMessage");
        this.screen.appendChild(welcome);

        await this.output(this.rightsMessage, ".rightsMessage", 100);
        await this.output(this.asciiArt, ".asciiArt", 50);
        await this.output(this.welcomeMessage, ".welcomeMessage", 50);

        this.addInputElement()
        this.addOutputElement();
        document.addEventListener("keydown", (event) => this.handleKeyPress(event), false);
    }

    async handleKeyPress(objEvent) {
        if (objEvent.key === "Enter") {
            objEvent.preventDefault();
            document.querySelector(".input").contentEditable = "false";

            this.cmdHistory.push(this.getInput());
            this.currentIndex = this.cmdHistory.length;
            
            await this.commander();

            this.addInputElement();
            this.addOutputElement();
        }

        if (objEvent.key === "ArrowUp" && this.currentIndex != 0) {
            this.currentIndex -= 1;
            document.querySelector(".input").textContent = this.cmdHistory[this.currentIndex];
        }

        if (objEvent.key === "ArrowDown" && this.currentIndex != this.cmdHistory.length) {
            this.currentIndex += 1;
            if (this.cmdHistory[this.currentIndex] === undefined) {
                document.querySelector(".input").textContent = "";
            } else {
                document.querySelector(".input").textContent = this.cmdHistory[this.currentIndex];
            }
        }
    }

    getInput = () => document.querySelector('.input').textContent.trim();

    output(text, elementClass=".output", speed=100) {
        return new Promise((resolve) => {
            let textArray = text.split("\n");
            let len = textArray.length;
            let index = 0;
            let element = document.querySelector(elementClass);
    
            const typeLine = () => {
                if (index < len) {
                    element.innerHTML += `${textArray[index]}\n`;
                    index++;
                    setTimeout(typeLine, speed);
                } else {
                    resolve();
                }
            }
            typeLine();
        })
    }

    clear() {
        document.querySelectorAll('.connected').forEach(e => e.remove());
        document.querySelectorAll('.outputEl').forEach(e => e.remove());
    }
}


