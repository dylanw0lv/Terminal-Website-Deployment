export class Terminal {
    constructor(commander, color="green", rightsMessage, asciiArt, welcomeMessage, tagline) {
        this.commander = commander;
        this.rightsMessage = rightsMessage;
        this.asciiArt = asciiArt;
        this.welcomeMessage = welcomeMessage;
        this.tagline = tagline;
        this.color = color;
        $("body").attr('spellcheck', false);
        this.cmdHistory = [];
        this.currentIndex = 0;
    }

    setColor(color) {
        const r = $(":root");
        if (color === "green") {
            r.css({
                "--text-color": "rgb(104, 233, 90)",
                "--background-color": "rgb(1, 18, 1)",
                "--shadow-color": "rgb(2, 33, 2)"
            });
        } else if (color === "blue") {
            r.css({
                "--text-color": "rgb(46, 144, 255)",
                "--background-color": "rgb(3, 1, 14)",
                "--shadow-color": "rgb(7, 2, 33)"
            });
        } else if (color === "red") {
            r.css({
                "--text-color": "rgb(255, 0, 0)",
                "--background-color": "rgb(14, 1, 1)",
                "--shadow-color": "rgb(33, 2, 2)"
            });
        }
    }

    addInputElement() {
        if ($(".input").length > 0) {$(".input").removeClass("input");}

        $("<pre/>", {
            "class": "connected"
        }).html(this.tagline).appendTo("#screen");

        $("<div/>", {
            "class": "input connected",
            "contentEditable": true,
            "focusout": () => {setTimeout(()=> $(".input").focus(), 1);}
        }).appendTo($("#screen"))

        $(".input").focus();
    }

    addOutputElement() {
        if ($(".output").length > 0) {$(".output").removeClass("output");}

        $("<pre/>", {
            "class": "output outputEl"
        }).appendTo("#screen");
    }

    async startup() {
        this.setColor(this.color);

        $("<pre/>", {
            "class": "rightsMessage"
        }).appendTo("#screen");

        $("<pre/>", {
            "class": "asciiArt"
        }).appendTo("#screen");

        $("<pre/>", {
            "class": "welcomeMessage"
        }).appendTo("#screen");

        await this.output(this.rightsMessage, ".rightsMessage", 100);
        await this.output(this.asciiArt, ".asciiArt", 50);
        await this.output(this.welcomeMessage, ".welcomeMessage", 50);

        this.addInputElement()
        this.addOutputElement();
        $(document).on("keydown", (event) => this.handleKeyPress(event));
    }

    async handleKeyPress(objEvent) {
        if (objEvent.key === "Enter") {
            objEvent.preventDefault();
            $(".input").attr("contentEditable", "false");

            this.cmdHistory.push(this.getInput());
            this.currentIndex = this.cmdHistory.length;
            
            await this.commander();
            this.addInputElement();
            this.addOutputElement();
        }

        if (objEvent.key === "ArrowUp" && this.currentIndex != 0) {
            this.currentIndex -= 1;
            $(".input").text(this.cmdHistory[this.currentIndex]);
        }

        if (objEvent.key === "ArrowDown" && this.currentIndex != this.cmdHistory.length) {
            this.currentIndex += 1;
            if (this.cmdHistory[this.currentIndex] === undefined) {
                $(".input").text("");
            } else {
                $(".input").text(this.cmdHistory[this.currentIndex]);
            }
        }
    }

    getInput = () => $('.input').text().trim();

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
        $(".outputEl").remove();
        $(".connected").remove();
    }
}
