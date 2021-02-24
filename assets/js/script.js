/*
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and my score
*/


var timerFieldEl = $('#timer');
var questionFieldEl = $('#question');
var answersFieldEl = $('#answers');
var startButtonEl = $('#startButton');
var reloadButtonEl = $('<button>)').attr('id', 'reloadButton').text('Try Again');
var containerClassEl = $('.container-fluid');
var tempTextEl = $('<div>').attr('id', 'highscoreDiv');


// should hold an array of objects (userStats)
var savedHighscores = JSON.parse(localStorage.getItem('stats'));
// temporary storage to later assign to localStorage
var highScores = [];
var correctInx;

if(typeof(savedHighscores) !== 'undefined' && savedHighscores != null) {
    highScores = savedHighscores;
};

// timer length setting (in seconds)
var timeCount = 60;
var timer;
// tracks current question
var currentQuestion = 0;

var quizItems = [
    {
        question: "JSON stands for:",
        answers: ["JavaScript Output Notation", "JavaStyle Option Notes", "Java Standard Output Navigation", "JavaScript Object Notation"],
        correctInx: 3
    },
    {
        question: "To write into the browser console use:",
        answers: ["console.print()", "console.show()", "console.log()", "console.me()"],
        correctInx: 2
    },
    {
        question: "What is used to separate JavaScript statements?",
        answers: ["Colons (:)", "Semicolons (;)", "Question Marks (?)", "Commas (,)"],
        correctInx: 1
    },
    {
        question: "With JavaScript, these can be used to store data:",
        answers: ["Vegetables", "Keywords", "Kettles", "Variables"],
        correctInx: 3
    },
    {
        question: "Given x = 8, which comparison is true:",
        answers: ["x !== 8", "x === 8", "x === \"8\"", "x == Eight"],
        correctInx: 1
    }
];

// object to hold users initials and highscore before pushing to array _highScores_
var userStats = {
    initials: "",
    score: 0    // time remaining IS the score
};

// initialization
function init() {
    startButtonEl.hide();
    timer = setInterval(displayTimer, 1000);    // starts countdown
    questionFieldEl.text("");   // Clears question field of intro text
    getQuestion();
}

// start button event listener
startButtonEl.on('click', function(){
    init();
});

// reload button event listener, option to try again after loss
reloadButtonEl.on('click', function(){
    location.reload();
});

// Create a submit event listener located in the answerField
answersFieldEl.on('click', '#submitId', handleFormSubmit);



function handleFormSubmit(event){
    event.preventDefault();

    var usersInitials = $('input[name="initialsText"]').val();
    userStats.initials = usersInitials;
    userStats.score = timeCount;
    // add current user stats to array
    highScores.push(userStats);
    // saves array 
    saveData();
}



// displays timer, calls endGame() if time reaches 0 or below
function displayTimer() {
    timeCount--;
    timerFieldEl.text(timeCount);
    if (timeCount <= 0) {
        timerFieldEl.text(0);
        clearInterval(timer);
        endGame();
    }
}

function getQuestion() {
    if (currentQuestion < quizItems.length) {
        var allButtonsEl = $('<div>');
        allButtonsEl.addClass('answerButtons');
        questionFieldEl.text(quizItems[currentQuestion].question);
        for (var i = 0; i < 4; i++) {
            var buttonEl = $('<button>');
            buttonEl.text(quizItems[currentQuestion].answers[i]);
            buttonEl.attr('id', 'button' + i);
            allButtonsEl.append(buttonEl);
        }
        answersFieldEl.append(allButtonsEl);
        ansButtonsEl = $('.answerButtons');
        correctInx = quizItems[currentQuestion].correctInx;
    
        // event handler for answer buttons
        ansButtonsEl.on('click', handleQuestions);
    } else {
        endGame();
    }
}

function endGame() {
    questionFieldEl.text("All done!");
    answersFieldEl.text("");
    clearInterval(timer);
    if (timeCount > 0) {
        displayTimer();
        answersFieldEl.text("Your final score is: " + timeCount);

        let initialField = $('<div>').attr('id', 'initialDiv');
        initialField.text("Initials: ");
        initialField.append($('<input name="initialsText">').attr('maxlength', '3').css('text-transform', 'uppercase'));
        initialField.append($('<input type="Submit">').attr('id', 'submitId'));
        answersFieldEl.append(initialField);
    } else {
        let failText = $('<p>').text("Time has expired, you did not qualify to be added to the highscore board.");
        answersFieldEl.append(failText);
        answersFieldEl.append(reloadButtonEl);
    }
}

// handles user clicking an answer
function handleQuestions(event) {
    var clickEvent = event.target;
    var clickId = clickEvent.getAttribute('id');

    if (clickId === ('button' + correctInx)) { // Correct Answer, reward 3 seconds
        timeCount = timeCount + 3;
        if (currentQuestion < quizItems.length) {
            currentQuestion++;
            answersFieldEl.text("");
            getQuestion();
        } else {
            endGame();
        }
    } else { // Incorrect Answer, deduct 10 seconds
        timeCount = timeCount - 10;
        if (currentQuestion < quizItems.length) {
            currentQuestion++;
            answersFieldEl.text("");
            getQuestion();
        } else {
            endGame();
        }
    }
}

// Saves users stats to localStorage by way of JSON stringify
function saveData() {
    localStorage.setItem('stats', JSON.stringify(highScores));
    answersFieldEl.text('');
    var linkToHs = $('<a href="highscores.html">');
    linkToHs.text("View Highscores");
    answersFieldEl.append(linkToHs);
}


// To display highscores in highscores.html
$('section.highScores').ready(function() {
    if ($('body').is('.highscoreBody')) {
        var scoreLocation = $('.highscores');
        var counter = 0;

        // sorts highscores by score desc
        highScores.sort((a,b) => (a.score < b.score) ? 1 : -1);
        Object.keys(highScores).forEach(key => {
            tempTextEl.append("<p>" + highScores[key].initials + " " + highScores[key].score);
            scoreLocation.append(tempTextEl);
            counter++;
        });
        containerClassEl.append($('<hr><button id="eraseButton">Erase Data</button>'));

        // Erase button handler, clears saved stats from localStorage
        $('#eraseButton').on('click', function(){
            localStorage.clear('stats');
            location.reload();
        });
    }
});