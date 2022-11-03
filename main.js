import questionsArray from "./questions.js"
let questions = questionsArray.map(x => x);
let questionText;
let choicesText;
let scoreMultiplier = 1000;

let correctAnswer;
let finalAnswer;
let currentQuestion = 0;



window.onload = function () {
    populateScoreboard();
    newQuestion();    
}

function populateScoreboard() {
    // Create 15 divs for the question levels
    for (let i = 15; i>0; i--) {
        const level = document.createElement("div");
        level.classList.add("level");
        level.setAttribute("id", `level-${i}`);
        document.getElementById("scoreboard").append(level);
        document.getElementById(`level-${i}`).innerText = `${i} - £${i*scoreMultiplier}`;
    }
    // Add a white font colour to the current level
    document.getElementById(`level-${currentQuestion+1}`).classList.add("currentLevel");
}

function newQuestion() {
    // Create 4 divs for the choices
    for (let i = 1; i<5; i++) {
        const choice = document.createElement("div");
        choice.classList.add("choice");
        choice.setAttribute("id", `choice-${i}`);
        document.getElementById("choices").append(choice);
        document.getElementById(`choice-${i}`).addEventListener("click", answerSelect, { once: true });
    }

    // Populate question number div
    currentQuestion ++;
    document.getElementById("questionNumber").innerText = `Question ${currentQuestion}`;

    // Select question from question array
    let questionNumber = Math.floor(Math.random() * questions.length);

    // Add the question properties as text in the relevant locations in the HTML
    let questionText = questions[questionNumber].Question;
    document.getElementById("question").innerText = questionText;

    // Select a random choice box to put the correct answer
    let arr = [1, 2, 3, 4];
    let randomIndex = Math.floor(Math.random() * 4);
    let correctAnswerBox = arr.splice([randomIndex], 1);    // returns a random element from the array and removes that element from the original array
    correctAnswer = `choice-${correctAnswerBox}`;

    // Add correct answer text to the randomly selected choice box
    let correctAnswerText = questions[questionNumber].Correct;
    document.getElementById(`choice-${correctAnswerBox}`).innerText = correctAnswerText;

    // Add incorrect answers to remaining empty choice boxes
    for (let i=0; i<arr.length; i++) {
        let incorrectAnswerText = questions[questionNumber].Incorrect[i];
        document.getElementById(`choice-${arr[i]}`).innerText = incorrectAnswerText;
    }
    
    // Remove question from questions array
    questions.splice(questionNumber, 1);
}

function answerSelect() {
    // Retreives the id of the clicked choice and compares it with the correct answer, then adds the relevant class to the HTML element
    let finalAnswer = this.id;
    // Remove event listener from other choices
    let notSelected = document.querySelectorAll("div.choice");
    notSelected.forEach((item) => {
        item.removeEventListener("click", answerSelect);
      });    
    // Adds the class to the clicked choice, then calls a function to proceed (if correct, this happens after a delay.)
    if (finalAnswer === correctAnswer) {
        document.getElementById(this.id).classList.add("correctChoice")
        setTimeout(correctAnswerChosen, 4000);
    } else {
        document.getElementById(this.id).classList.add("incorrectChoice");
        setTimeout(incorrectAnswerChosen, 4000);
    };
    
}

function correctAnswerChosen() {
    // Reset all changed ids and classes and remove inner text (except for the scoreboard)
    let target = document.getElementById("choices")
    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
    removeAllChildNodes(target);
    newQuestion();
    
    // Change the colour of the level number in the scoreboard corresponding to the correctly answered question
    // currentQuestion ++;
    document.getElementById(`level-${currentQuestion}`).classList.add("currentLevel");
    document.getElementById(`level-${currentQuestion - 1}`).classList.replace("currentLevel", "correctLevel");

    // Call bank to check if question is multiple of 5
    bank();
}

function incorrectAnswerChosen() {
    // Restart game button shows & Score is displayed
    const restartButton = document.createElement("button");
    restartButton.classList.add("restart-button");
    restartButton.setAttribute("id", "restartButton");
    if (currentQuestion === 1) {
        document.getElementById("endgameMessage").innerText = "You go home with nothing.";
    } else {
        document.getElementById("endgameMessage").innerText = `You take home a measly £${currentQuestion * scoreMultiplier}.`
    }
    document.getElementById("endgameMessage").append(restartButton);
    document.getElementById("restartButton").innerText = "Restart?";
    document.getElementById("restartButton").addEventListener("click", restartGame, { once: true });
    document.getElementById("endgameMessage").classList.replace("hidden", "show");
    

    // Change colour of the level number in the scoreboard corresponding to the incorrectly answered question
    document.getElementById(`level-${currentQuestion}`).classList.replace("currentLevel", "incorrectLevel");
}

function restartGame() {
    // Remove the scoreboard and choices divs from the HTML
    let targetScoreboard = document.getElementById("scoreboard")
    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    let targetChoices = document.getElementById("choices")
    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
    removeAllChildNodes(targetScoreboard);
    removeAllChildNodes(targetChoices);

    // Reset current current question to first question again
    currentQuestion = 1;

    // Hide the endgame screen
    document.getElementById("endgameMessage").classList.replace("show", "hidden");

    // newQuestion and populateScoreboard functions will manage their own divs in the HTML
    newQuestion()
    populateScoreboard()

    // Reset the questions array

};

function bank() {
    // When a player answers 5 correct in a row
    // Add a class styled with green background for the last 5 questions
    if((currentQuestion - 1) % 5 == 0) {
        for (let i=currentQuestion; i>currentQuestion - 6; i--) {
            let target = document.getElementById(`level-${i}`);
            target.classList.replace("correctLevel", "banked");
        }
    }
    // Add a delay before each iteration which is shorter than the CSS animation
}
