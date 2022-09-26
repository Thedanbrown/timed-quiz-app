var start = document.getElementById('start')
var next = document.getElementById('next')
var save = document.getElementById('save')
var timeUp = document.getElementById('time-up') 
var questionsEl = document.getElementById('questions')
var questionEL = document.getElementById('question')
var answerBtnEl = document.getElementById('answer-btn')
var timerEl = document.getElementById('timer')
var timeText = document.getElementById("time-left-txt")
let timeCount = document.getElementById("timer-sec")
let randomQuestion, currentQuestionIndex
let timeValue = 15;


//event listeners for start button and next question button with next calling the next random question
start.addEventListener('click', startgame)
next.addEventListener('click', () => {
    currentQuestionIndex++
    nextquestion();
})
// hides start button when clicked, picks a random question to start, shows the questions, starts timer
function startgame() {
    start.classList.add('hide');
    save.classList.add('hide')
    timeValue = 15;
    randomQuestion = question.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionsEl.classList.remove('hide');
    timerEl.classList.remove('hide')
    nextquestion();
    startTimer(timeValue);

}
//calls the next random question
function nextquestion() {
    reset();
    showQuestion(randomQuestion[currentQuestionIndex]);
}



//shows the randomly created question and populates the answer buttons with the corresponding answers
function showQuestion(question){
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

function answer(a) {
    var selectAnswer = a.target
    var correct = selectAnswer.dataset.correct
    Array.from(answerBtnEl.children).forEach(button => {
        setStatus(button, button.dataset.correct);
    })
    next.classList.remove('hide');
    if (randomQuestion.length > currentQuestionIndex +1) {
        next.classList.remove('hide');
    //controls what happens after all questions answered
    } else {
        next.classList.add('hide')
        save.classList.remove('hide')
    }
}

function setStatus(element, correct) {
    correctStatus(element)
    if(correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
    } 
    }

function correctStatus(element) {
    element.classList.remove('correct')
    element.classList.remove('incorrect')
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; 
        time--; 
        if(time < 0){ 
            clearInterval(counter);
            save.classList.remove('hide')
            next.classList.add('hide')
            questions.classList.add("hide")
            time-up.classList.remove('hide') 
        }
        if (answer != correct) {
            time--;
        }
    }
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