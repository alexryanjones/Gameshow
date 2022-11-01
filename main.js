import questions from "./questions.js"
let questionText;
let choicesText;

let correctAnswer = 0;


window.onload = function () {
    newQuestion();
    populateScoreboard()
    console.log(document.getElementById("choices"));
    console.log(questions)
}

function populateScoreboard() {
    // Create 15 divs for the question levels
    for (let i = 15; i>0; i--) {
        const level = document.createElement("div");
        level.classList.add("level");
        level.setAttribute("id", `level-${i}`);
        document.getElementById("scoreboard").append(level);
        document.getElementById(`level-${i}`).innerText = `${i} - £${i*1000}`;

    }
}

function newQuestion() {
    // Create 4 divs for the choices
    for (let i = 1; i<5; i++) {
        const choice = document.createElement("div");
        choice.classList.add("choice");
        choice.setAttribute("id", `choice-${i}`);
        console.log(typeof document.getElementById("choices"))
        document.getElementById("choices").append(choice);
        document.getElementById(`choice-${i}`).addEventListener("click", answerSelect);
    }

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

    //Add incorrect answers to remaining empty choice boxes
    for (let i=0; i<arr.length; i++) {
        let incorrectAnswerText = questions[questionNumber].Incorrect[i];
        document.getElementById(`choice-${arr[i]}`).innerText = incorrectAnswerText;
    }

    
    
}

function answerSelect() {
    console.log(this.id === correctAnswer);
}

