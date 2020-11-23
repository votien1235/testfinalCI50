const caseAPI = 'https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple';

const containerEl = document.querySelector('.container');
const form = document.getElementById('quiz_form');
const qusEl = document.querySelector('.qus');
const optionEl = document.querySelector('.all-options');
const buttonEl = document.querySelector('.buttons');
const scoreEl = document.querySelector('.scoreBoard .score-num');
const answeredEl = document.querySelector('.scoreBoard .answered-num');

let question, answer;
let options = [];
let score = 0;
let answeredQus = 0;


window.addEventListener('DOMContentLoaded', quizApp);

async function quizApp() {
    updateScoreBoard();
    const data = await fetchQuiz();
    question = data[0].question;
    options = [];
    answer = data[0].correct_answer;
    data[0].incorrect_answers.map(option => options.push(option));
    options.splice(Math.floor(Math.random() * options.length + 1), 0, answer);
    renderTemplate(question, options);

}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (event.target.quiz.value) {
        checkQuiz(event.target.quiz.value);
        event.target.querySelector('button').style.display = 'none';
        renderButton();
    } else {
        return
    }
})

async function fetchQuiz() {
    const response = await fetch(caseAPI);
    const data = await response.json();
    console.log(data.results);
    return data.results;
}

function renderTemplate(question, options) {
    optionEl.innerHTML = "";
    qusEl.innerText = question;
    options.map((option, index) => {
        const item = document.createElement('div');
        item.classList.add('option');
        item.innerHTML = `
        <input type="radio" id="option${index + 1}" value="${option}" name="quiz">
                    <label for="option${index + 1}">${option} </label>
        `
        optionEl.appendChild(item);
    })
}


function checkQuiz(selected) {
    answeredQus++;
    if (selected === answer) {
        score = score + 10;
        plusScore();

    }
    updateScoreBoard()
    form.quiz.forEach(input => {
        if (input.value === answer) {
            input.parentElement.classList.add('correct');

        } else if (selected !== answer) {
            noScore();
        }


    })
}


function updateScoreBoard() {
    scoreEl.innerText = score;
    answeredEl.innerText = answeredQus;
}

function renderButton() {
    const finishBtn = document.createElement('button');
    finishBtn.innerText = 'Finish';
    finishBtn.setAttribute('type', 'button');
    finishBtn.classList.add('finish-btn');
    buttonEl.appendChild(finishBtn);

    const nextBtn = document.createElement('button');
    nextBtn.innerText = 'Next Quiz';
    nextBtn.setAttribute('type', 'button');
    nextBtn.classList.add('next-btn');
    buttonEl.appendChild(nextBtn);

    finishBtn.addEventListener('click', finishQuiz);
    nextBtn.addEventListener('click', getNextQuiz);
}

function getNextQuiz() {
    const nextBtn = document.querySelector('.next-btn');
    const finishBtn = document.querySelector('.finish-btn');

    buttonEl.removeChild(nextBtn);
    buttonEl.removeChild(finishBtn);

    buttonEl.querySelector('button[type="submit"]').style.display = 'block';

    document.getElementById('notificationTrue').style.display = 'none';
    document.getElementById('notificationFalse').style.display = 'none';
    quizApp();


}

function finishQuiz() {
    const nextBtn = document.querySelector('.next-btn');
    const finishBtn = document.querySelector('.finish-btn');

    buttonEl.removeChild(nextBtn);
    buttonEl.removeChild(finishBtn);

    buttonEl.querySelector('button[type="submit"]').style.display = 'block';


    const overlay = document.createElement('div');
    overlay.classList.add('result-overlay');
    overlay.innerHTML = `
    <div class="final-result"> ${score}/${answeredQus}</div>
    <button>Play Again </button>
    `
    containerEl.appendChild(overlay);

    overlay.querySelector('button').addEventListener('click', () => {
        containerEl.removeChild(overlay);
        playAgain();
    });

}

function plusScore() {
    const noticeT = document.getElementById('notificationTrue');
    noticeT.style.display = 'block';
    noticeT.innerHTML = "+10 Score";
}
function noScore() {
    const noticeF = document.getElementById('notificationFalse');
    noticeF.style.display = 'block';
    noticeF.innerHTML = "+0 Score";

}

function playAgain() {
    score = 0;
    answeredQus = 0;

    quizApp();
}