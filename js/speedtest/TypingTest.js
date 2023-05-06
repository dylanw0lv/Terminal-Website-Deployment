import { corpText, asciiArt, welcomeMessage } from "./text.js";

export class TypingTest {
    constructor() {
        this.timer;
        this.maxTime = 60;
        this.timeLeft = this.maxTime;
        this.charIndex = 0;
        this.mistakes = 0;
    }

    async loadTest() {
        $("<pre/>", {
            "class": "time"
        }).appendTo("#results");

        $("<pre/>", {
            "class": "mistakes"
        }).appendTo("#results");

        $("<pre/>", {
            "class": "wpm"
        }).appendTo("#results");

        $("<pre/>", {
            "class": "border-top"
        }).appendTo("#borderTop");

        $("<pre/>", {
            "class": "border-bottom"
        }).appendTo("#borderBottom");

        await this.output("+----------------------------------------------------------------+", ".border-top", 50);
        await this.loadText();
        await this.output("Time: <span>60</span>s", ".time", 50);
        await this.output("Mistakes: <span>0</span>", ".mistakes", 50);
        await this.output("WPM: <span>0</span>", ".wpm", 50);
        await this.output("+----------------------------------------------------------------+", ".border-bottom", 50);
        
        $(".typing-text span:first").addClass("active connected");
    }

    async startup() {
        $("<pre/>", {
            "class": "rightsMessage"
        }).appendTo("#start");

        $("<pre/>", {
            "class": "asciiArt"
        }).appendTo("#start");

        $("<pre/>", {
            "class": "welcomeMessage"
        }).appendTo("#start");
        
        await this.output(corpText, ".rightsMessage", 100);
        await this.output(asciiArt, ".asciiArt", 50);
        await this.output(welcomeMessage, ".welcomeMessage", 50);

        this.loadTest();

        $(document).on("keydown", (event) => {
            if (event.key === "Escape") {
                setTimeout(()=>window.location.href="./index.html", 10)
            } else if (event.key === "Tab") {
                event.preventDefault()
                this.reloadTest();
            }
            $(".input").focus()
        });
        $(".typing-text p").on("click", () => {$(".input").focus()});
        $(".input").on("input", this.initTyping.bind(this));
    }

    async loadText() {
        try {
            let response = await fetch("metaphorpsum.com/paragraphs/1/2");
            let paragraph = await response.text();
            let sentencesRaw = paragraph.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
            sentencesRaw.forEach((sentence) => {
                sentence = (sentence + " ").split("").map(char => `<span>${char}</span>`).join("");
                $(".typing-text p").append(sentence);
            })
        } catch (e) {
            console.log(e);
        }
    }

    output(text, elementClass, speed=100) {
        return new Promise((resolve) => {
            let textArray;
            text === Array ? textArray = text : textArray = text.split("\n");
            let index = 0;
    
            const typeLine = () => {
                if (index < textArray.length) {
                    $(elementClass).append(`${textArray[index]}\n`);
                    index++;
                    setTimeout(typeLine, speed);
                } else {
                    resolve();
                }
            }
            typeLine();
        })
    }

    async initTyping() {
        let characters = $(".typing-text p span");
        let typedChar = $(".input").val().split("")[this.charIndex];
    
        if (this.charIndex === 0) {
            this.timer = setInterval(this.initTimer.bind(this), 1000);
        }
    
        if (this.charIndex < characters.length - 1 && this.timeLeft > 0) {
    
            if (this.charIndex === $(".typing-text p").text().length - 15) {
                this.loadText();
            }
    
            if (characters.eq(this.charIndex).html() == typedChar) {
                characters.eq(this.charIndex).addClass("correct");
            } else if(characters.eq(this.charIndex).html() != typedChar && typedChar != null && characters.eq(this.charIndex).html() == " ") {
                characters.eq(this.charIndex).addClass("space_incorrect");
                this.mistakes++;
            } else if(characters.eq(this.charIndex).html() != typedChar && typedChar != null) {
                characters.eq(this.charIndex).addClass("incorrect");
                this.mistakes++;
            }
    
            this.charIndex = $(".input").val().length;
    
            if (characters.eq(this.charIndex).hasClass("correct")) {
                characters.eq(this.charIndex).removeClass("correct");
            } else if (characters.eq(this.charIndex).hasClass("incorrect")) {
                characters.eq(this.charIndex).removeClass("incorrect");
                this.mistakes--;
            } else if (characters.eq(this.charIndex).hasClass("space_incorrect")) {
                characters.eq(this.charIndex).removeClass("space_incorrect");
                this.mistakes--;
            }
    
            $("span").removeClass("active");
            characters.eq(this.charIndex).addClass("active");
            let wpm = Math.round(((this.charIndex - this.mistakes)  / 5) / (this.maxTime - this.timeLeft) * 60);
            wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
            $(".wpm span").html(wpm)
            $(".mistakes span").html(this.mistakes);
        }   
    }

    initTimer() {
        if(this.timeLeft > 0) {
            this.timeLeft--;
            $(".time span").html(this.timeLeft);
            let wpm = Math.round(((this.charIndex - this.mistakes)  / 5) / (this.maxTime - this.timeLeft) * 60);
            $(".wpm span").html(wpm);
        } else {
            clearInterval(this.timer);
        }
    }

    async reloadTest() {
        $(".typing-text p span").remove();
        $(".time").remove()
        $(".mistakes").remove();
        $(".wpm").remove();
        $(".input").val("")
        clearInterval(this.timer);

        this.maxTime = 60;
        this.timeLeft = this.maxTime;
        this.charIndex = 0;
        this.mistakes = 0;
        
        $("<pre/>", {
            "class": "time"
        }).appendTo("#results");

        $("<pre/>", {
            "class": "mistakes"
        }).appendTo("#results");

        $("<pre/>", {
            "class": "wpm"
        }).appendTo("#results");

        await this.loadText();

        $(".time").html("Time: <span>60</span>s")
        $(".mistakes").html("Mistakes: <span>0</span>")
        $(".wpm").html("WPM: <span>0</span>")
        
        $(".typing-text span:first").addClass("active");
    }
}

