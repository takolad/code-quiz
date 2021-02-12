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
var answersFieldEl = $('answers');
var timer;
var running = false;

// multidimensional array, holds [index][Question|Answers|CorrectAnswerIndex]
var quiz = [
    // Dummy info
    ['How Now?', ['Brown Cow', 'Horsey Sauce', 'Burger', 'Fries'], 2],
    ['Where?', ['Here', 'There', 'Everywhere', 'Nowhere'], 1],
    ['What is a man?', ['Miserable Pile of Secrets', 'Stupid', 'Jokerfied', 'Toasty'], 0]
];

// object to hold users initials, highscore, and index for when assigning to array _highScores_
var userScore = {
    initials: "",
    score: 0,
    index: 0,
    incrementIndex = function() {
        this.index++;
    },
    setScore = function(updateScore) {
        this.score = updateScore;
    },
    setInitials = function(updateInitials) {
        this.initials = updateInitials;
    }
}

// array to hold userScore object
var highScores = [];

function init() {
    //initialize programming
    console.log("Testing: " + quiz[0][1][2]); // Outputs Burger
}

// Returns a random number between 0 and max - 1
function randomNum(max) {
    return Math.floor(Math.random() * max);
}

// init();