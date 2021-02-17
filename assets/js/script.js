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

// should hold an array of objects (userStats)
var savedHighscores = JSON.parse(localStorage.getItem('stats'));
// temporary storage to later assign to localStorage
var highScores = [];

if(typeof(savedHighscores) !== undefined) {
    highScores = savedHighscores;
}

// timer length setting (in seconds)
var timeCount = 60;
var timer;
// tracks current question
var currentQuestion = 0;
// tracks if game is running
var running = false;

var quizItems = [
    {
        question: "How Now?",
        answers: ["Brown Cow", "Horsey Sauce", "Burger", "Fries"],
        correctInx: 0
    },
    {
        question: "Question 2",
        answers: ["Dummy1", "Dummy2", "Dummy3", "Dummy4"],
        correctInx: 2
    },
    {
        question: "Question 3",
        answers: ["Dummy1", "Dummy2", "Dummy3", "Dummy4"],
        correctInx: 1
    },
    {
        question: "Question 4",
        answers: ["Dummy1", "Dummy2", "Dummy3", "Dummy4"],
        correctInx: 3
    },
    {
        question: "Question 5",
        answers: ["Dummy1", "Dummy2", "Dummy3", "Dummy4"],
        correctInx: 1
    }
]

// object to hold users initials, highscore, and index for when assigning to array _highScores_
var userStats = {
    initials: "",
    // time remaining is the score
    score: 0,
    index: 0,
    // incrementIndex : function() {
    //     this.index++;
    // },
    // setScore : function(updateScore) {
    //     this.score = updateScore;
    // },
    // setInitials : function(updateInitials) {
    //     this.initials = updateInitials;
    // }
}

//initialization programming
function init() {
    running = true;
    startButtonEl.hide();
    timer = setInterval(displayTimer, 1000);    // starts countdown
    questionFieldEl.text("");   // Clears question field of intro text
    while (running) {
        if (currentQuestion < quizItems.length) {
            getQuestion();
            currentQuestion++;
        } else {
            running = false;
        }
    }
    // increment currentQ here? or...
}

// PROBABLY won't use this, but maaaaybe?
// // Returns a random number between 0 and max - 1
// function randomNum(max) {
//     return Math.floor(Math.random() * max);
// }

// start button event listener
startButtonEl.on('click', function(){
    init();
});

// reload button event listener, option to try again after loss
reloadButtonEl.on('click', function(){
    location.reload();
})

// Create a submit event listener located in the answerField
answersFieldEl.on('click', '#submitId', handleFormSubmit);

function handleFormSubmit(event){
    event.preventDefault();
    // alert("Submit clicked");

    var usersInitials = $('input[name="initialsText"]').val();
    userStats.initials = usersInitials;
    userStats.score = timeCount;
    highScores.push(userStats);
    saveData();
}



// when user clicks start: display timer, pick random question and display it
function displayTimer() {
    timerFieldEl.text(timeCount);
    timeCount--;
    if (timeCount < 0) {
        clearInterval(timer);
        endGame();
    }
}

function getQuestion() {
    var allButtonsEl = $('<div>');
    allButtonsEl.addClass('answerButtons');
    questionFieldEl.text(quizItems[currentQuestion].question);

    for (var i = 0; i < 4; i++) {
        var buttonEl = $('<button>');
        buttonEl.text(quizItems[currentQuestion].answers[i]);
        buttonEl.attr('name', 'button' + i);
        allButtonsEl.append(buttonEl);
    }
    answersFieldEl.append(allButtonsEl);
    endGame();
    // increment currentQuestion here? or in calling function
}

function endGame() {
    clearInterval(timer);
    questionFieldEl.text("All done!");
    answersFieldEl.text("");
    if (timeCount > 0) {
        answersFieldEl.text("Your final score is: " + timeCount);

        let initialField = $('<div>').attr('id', 'initialDiv');
        initialField.text("Initials: ");
        initialField.append($('<input name="initialsText">'));
        initialField.append($('<input type="Submit">').attr('id', 'submitId'));
        answersFieldEl.append(initialField);
    } else {
        let failText = $('<p>').text("Time has expired, you did not qualify to be added to the highscore board.");
        answersFieldEl.append(failText);
        answersFieldEl.append(reloadButtonEl);
    }
}

function handleQuestions() {
    // handle user clicking answer
    // if correct, increment score
        // if not end of question, move to next question
            // else end quiz
    // else decrement score AND time
}

function saveData() {
    localStorage.setItem('stats', JSON.stringify(highScores));
    answersFieldEl.text('');
    var linkToHs = $('<a href="highscores.html">');
    linkToHs.text("View Highscores");
    answersFieldEl.append(linkToHs);
}




// When game completes, ask for user initials
    // store as an array of objects
    // add (.push(newScore)) to score array
    // store scores in localStorage
    // clearInterval(intervalObject)