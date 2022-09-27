var start = document.getElementById('start')
var next = document.getElementById('next')
var save = document.getElementById('save')
var timeUp = document.getElementById('time-up') 
var questionsEl = document.getElementById('questions')
var questionEL = document.getElementById('question')
var answerBtnEl = document.getElementById('answer-btn')
var timerEl = document.getElementById('timer')
var timeText = document.getElementById("time-left-txt")
let currentQuestion = null;
let currentScore = document.getElementById('score')
let timeCount = document.getElementById("timer-sec")
let randomQuestion, currentQuestionIndex
let timeValue = 60;
let score = 0;
var hasBeenAnswered = false;
let initialsEl = document.getElementById("initials");
let initialsInputEl = document.getElementById("initials-input");
let scoresList = document.getElementById("saved-scores");

//event listeners for start button and next question button with next calling the next random question
start.addEventListener('click', startgame);
next.addEventListener('click', () => {
    currentQuestionIndex++
    nextquestion();
});
//runs the onGameSaved function when score save is clicked adding score to scoreboard
save.addEventListener('click', onGameSaved);

// hides start button when clicked, picks a random question to start, shows the questions, starts timer
function startgame() {
    alert('The Timer will start immediately. You will lose 10 seconds for each incorrect answer, One point will be added for each correct answer. Enter your initials at the end to save your score!')
    start.classList.add('hide');
    randomQuestion = question.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionsEl.classList.remove('hide');
    timerEl.classList.remove('hide')
    startTimer();
    nextquestion();   
}
//saves the score in local storage and runs the function to update scoreboard
function onGameSaved() {
    let scores = localStorage.getItem('scores');
    scores = JSON.parse(scores);
    if (scores === null) {
        scores = [];
    }
    scores.push({
        initials: readInitials(),
        score: score 
    });
    localStorage.setItem('scores', JSON.stringify(scores));

    displaySaveTable();
}

function displaySaveTable() {
    const scores = localStorage.getItem("scores")
    let scoresTable = [];
    if (scores !== null) {
        scoresTable = JSON.parse(scores);
    }
    const tableHeader = document.createElement('li')
    tableHeader.innerHTML = "Initials  :  Score";
    scoresList.appendChild(tableHeader);
    scoresTable.forEach((scores) => {
        const savedScore = document.createElement("li");
        savedScore.innerHTML = scores.initials + "  :  " + scores.score;
        scoresList.appendChild(savedScore);
    });
}

//this is updating the table on initilization
displaySaveTable();

function readInitials() {
    return initialsInputEl.value
}

//calls the next random question
function nextquestion() {
    reset();
    showQuestion(randomQuestion[currentQuestionIndex]);
    hasBeenAnswered = false;
}

//shows the randomly created question and populates the answer buttons with the corresponding answers
function showQuestion(question){
    currentQuestion = question
    questionEL.innerText = question.question
    question.answers.forEach(answers => {
        var button = document.createElement('button');
        button.innerText = answers.text
        button.classList.add('btn');
        if (answers.correct) {
            button.dataset.correct = answers.correct
        }
        button.addEventListener('click', answer);
        answerBtnEl.appendChild(button);
    })
}

//removes placeholder buttons and adds appropriate answer buttons for current question
function reset() {
    next.classList.add('hide');
    while (answerBtnEl.firstChild) {
        answerBtnEl.removeChild(answerBtnEl.firstChild);
    }
}

function isCorrect(innerText, dataset) {
    for (var i = 0; i < dataset.answers.length; i++) {
        if (innerText === dataset.answers[i].text) {
            return dataset.answers[i].correct
        }   
    }

    console.log('isCorrect', innerText, dataset);
    return undefined;
}
//determines if an answer is correct, updates score. subtracts from score if inccorect
function answer(a) {
    if (hasBeenAnswered) {
        return;
    }
    var selectAnswer = a.target;
    var correct = isCorrect(selectAnswer.innerText, currentQuestion);
    if (correct) {
        score++;
        currentScore.innerText = 'Score: ' + score + '/5'
    } else {
        timeValue -= 10;
        updateTimerText();
    }
    Array.from(answerBtnEl.children).forEach(button => {
        setStatus(button, button.dataset.correct);
    })
    next.classList.remove('hide');
    if (randomQuestion.length > currentQuestionIndex +1) {
        next.classList.remove('hide');    
    } else {
        //controls what happens after all questions answered
        questions.classList.add('hide');
        next.classList.add('hide');
        initialsEl.classList.remove('hide');
        timerEl.classList.add('hide');
        timeText.classList.add('hide');
    }
    hasBeenAnswered = true;
}

function setStatus(element, correct) {
    correctStatus(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
    } 
}

function correctStatus(element) {
    element.classList.remove('correct')
    element.classList.remove('incorrect')
}
function updateTimerText() {
    timeCount.textContent = timeValue
}
function startTimer() {
    counter = setInterval(timer, 1000);
    function timer() {
        if (isGameOver()) {
            return;
        }
        timeValue--;
        updateTimerText()
        if (timeValue <= 0) { 
            clearInterval(counter);
            save.classList.remove('hide');
            next.classList.add('hide');
            questions.classList.add("hide");
            timeUp.classList.remove('hide');
        }
    }
}

function isGameOver() {
    return randomQuestion.length <= currentQuestionIndex +1
}

    

//list of available questions
var question = [
    {
        question: 'Which is an HTML element',
        answers: [
            {text: 'ul', correct: true},
            {text: ':before', correct: false},
            {text: 'get element', correct: false},
            {text: 'README', correct: false}
        ]
    }, 
    {
        question: 'Which is a Javascript Datatype',
        answers: [
            {text: 'Card', correct: false},
            {text: 'Class', correct: false},
            {text: 'Boolean', correct: true},
            {text: 'Script', correct: false}
        ]
    },
    {
        question: 'Which is not a way to declare a Variable in Javascript',
        answers: [
            {text: 'Let', correct: false},
            {text: 'Var', correct: false},
            {text: 'Append', correct: true},
            {text: 'Const', correct: false}
        ]
    },
    {
        question: 'the COLOR property in CSS determines what?',
        answers: [
            {text: 'Background color', correct: false},
            {text: 'Text color', correct: true},
            {text: 'Body Color', correct: false},
            {text: 'ShadowBox Color', correct: false}
        ]
    },
    {
        question: 'Which CSS property can alter what the pointer is currently over',
        answers: [
            {text: 'display', correct: false},
            {text: 'before', correct: false},
            {text: 'click', correct: false},
            {text: 'hover', correct: true}
        ]
    },
]