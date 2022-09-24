var start = document.getElementById('start')
var next = document.getElementById('next')
var questionsEl = document.getElementById('questions')
var questionEL = document.getElementById('question')
var answerBtnEl =document.getElementById('answer-btn')

let randomQuestion, currentQuestionIndex

start.addEventListener('click', startgame)

function startgame() {
    start.classList.add('hide');
    randomQuestion = question.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionsEl.classList.remove('hide');
    nextquestion();

}

function nextquestion() {
    reset()
    showQuestion(randomQuestion[currentQuestionIndex])
}




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
function reset() {
    next.classList.add('hide');
    while (answerBtnEl.firstChild) {
        answerBtnEl.removeChild(answerBtnEl.firstChild)
    }
}

function answer(e) {
}
var question = [
    {
        question: 'Which is an HTML element',
        answers: [
            {text: 'ul', correct: true},
            {text: ':before', correct: false},
            {text: 'get element', correct: false},
            {text: 'README', correct: false}
        ]
    }
]