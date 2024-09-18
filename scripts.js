const questions = [
    {
        question: "which is the largest animal in the world ?",
        answers: [
            { text: "shark", correct: false },
            { text: "blue whale", correct: true },
            { text: "elephant", correct: false },
            { text: "dinasour", correct: false },
        ]

    },
    {
        question: "who is know as the 'Tuber Man' of kerala ?",
        answers: [
            { text: "Sunny", correct: false },
            { text: "Akelash yadev", correct: false },
            { text: "Yogi Adhiyanath", correct: false },
            { text: "Shaji NM", correct: true },
        ]

    },
    {
        question: "What is the only Prime number ?",
        answers: [
            { text: "2", correct: true },
            { text: "1", correct: false },
            { text: "0", correct: false },
            { text: "4", correct: false },
        ]

    },
    {
        question: "In which state Zawar mines located ?",
        answers: [
            { text: "Jammu and kashmir", correct: false },
            { text: "Rajasthan", correct: true },
            { text: "UP", correct: false },
            { text: "Goa", correct: false },
        ]

    }
];

const questionElement = document.getElementById("question");
const answerbutton = document.getElementById("AnswerBtn");
const nextButton = document.getElementById("next-btn");

let questionIndex = 0;
let score = 0;

function startQuiz() {
    questionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[questionIndex];
    let questionNo = questionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerbutton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", slectAnswer);

    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerbutton.firstChild) {
        answerbutton.removeChild(answerbutton.firstChild);
    }

}

function slectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if (isCorrect) {
        selectBtn.classList.add("correct");
        score++;
    } else {
        selectBtn.classList.add("incorrect");
    }

    Array.from(answerbutton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}



function showScore() {
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    questionIndex++;
    if (questionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }

}

nextButton.addEventListener("click", () => {
    if (questionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});


startQuiz();
