//glabal variables
var timeLeft;
var score;
var id = 0;
var questionArr = [{
    id: 0,
    prompt: "Which of the following will write the message “Hello World!” in an alert box?",
    answer: [{ text: "alertBox(“Hello World!”);", isCorrect: false },
        { text: "alert(Hello World!);", isCorrect: false },
        { text: "msgAlert(“Hello World!”);", isCorrect: false },
        { text: "alert(“Hello World!”);", isCorrect: true }
    ]
},
{
    id: 1,
    prompt: "How do you find the minimum of x and y using JavaScript?",
    answer: [{ text: "min(x,y);", isCorrect: false},
        { text: "Math.min(x,y)", isCorrect: true },
        { text: "Math.min(xy)", isCorrect: false },
        { text: "min(xy);", isCorrect: false }
    ]

},
{
    id: 2,
    prompt: "Which JavaScript label catches all the values, except for the ones specified?",
    answer: [{ text: "catch", isCorrect: false },
        { text: "label", isCorrect: false },
        { text: "try", isCorrect: false },
        { text: "default", isCorrect: true }
    ]
},
{
    id: 3,
    prompt: "Which are the correct “if” statements to execute certain code if “x” is equal to 2?",
    answer: [{ text: "if(x 2)", isCorrect: false },
        { text: " if(x = 2)", isCorrect: false },
        { text: "if(x == 2)", isCorrect: true },
        { text: "if(x != 2 )", isCorrect: false }
    ]
},
{
    id: 4,
    prompt: "What will the code return? Boolean(3 < 7)",
    answer: [{ text: "true", isCorrect: true },
        { text: "false", isCorrect: false },
        { text: "NaN", isCorrect: false },
        { text: "SyntaxError", isCorrect: false }
    ]
},
{
    id: 5,
    prompt: "Which is the correct JavaScript syntax to change the HTML content given below? <p id=”test”>Hello World!</p>",
    answer: [{ text: "document.getElementById(“test”).innerHTML = “Hello World!”;", isCorrect: true },
        { text: "document.getElementsById(“test”).innerHTML = “Hello World!”;", isCorrect: false },
        { text: "document.getElementById(test).innerHTML = “Hello World!”;", isCorrect: false },
        { text: "document.getElementByTagName(“p”)[0].innerHTML = “Hello World!”;", isCorrect: false }
    ]
}];

//reset timer and result for user to play again
function reset() {
    timeLeft = 60;
    $('#timer').hide();
    $("#timer").css("color","rgb(0, 0, 0)");
    $("#timer").text("Time: " + timeLeft);
    $('#initialMsg').hide();
    score = 0;
    $('#result').text('');
    $('#result').css("border", "0");
}

//count down the time for user to play
function countdown() {
    $('#timer').show();
    var timeInterval = setInterval(function() {
        if (id<6) {
            timeLeft--;
            $("#timer").text("Time: " + timeLeft);
            console.log(timeLeft);
            if (timeLeft<6) {
                $("#timer").css("color","rgb(165, 40, 40)");
            }
            if (timeLeft<1) {
                $("#timer").text("Time's up! Your score is: " + score);
                clearInterval(timeInterval);
                $("#question-container").css("display", "none");
                $("#submit-score").css("display", "flex");
            }
        } else {
            clearInterval(timeInterval);
            $("#question-container").css("display", "none");
            $("#submit-score").css("display", "flex");
            console.log(score);
            console.log(timeLeft);
            score = score + timeLeft;
            console.log(score);
            $("#timer").text("You finish all questions! Your score is: " + score);
        }
    }, 1000);
}

//identify question prompts and object properties
function questionPrompt(id) {
    $('#question-container').css("display", "flex");
    $('#prompt').text(questionArr[id].prompt);

    $('#answer1').text(questionArr[id].answer[0].text);
    $('#answer2').text(questionArr[id].answer[1].text);
    $('#answer3').text(questionArr[id].answer[2].text);
    $('#answer4').text(questionArr[id].answer[3].text);

    $('#answer1').val(questionArr[id].answer[0].isCorrect);
    $('#answer2').val(questionArr[id].answer[1].isCorrect);
    $('#answer3').val(questionArr[id].answer[2].isCorrect);
    $('#answer4').val(questionArr[id].answer[3].isCorrect);   
}

//show the next question when user make a selection of the current question
function showNextQuestion() {
    questionPrompt(0);
    $('.answer').on("click", function(event) {
        if (id<6) {
            checkAnswer(event);
            id++;
            questionPrompt(id);
        } 
    });
}

//check if the answer is correct (the object has the 'true' value for the isCorrect property)
function checkAnswer(event) {
    console.log("id: " + id);
    console.log("value: " + $(event.target).val());
    if ($(event.target).val()==="false") {
        timeLeft-=5;
        $("#result").text("Wrong!");
    } else if ($(event.target).val()==="true") {
        score+=10;
        $("#result").text("Correct!");
    }
    $('#score').text(score);
    $("#result").css({
        "color":"gray",
        "font-style":"italic",
        "font-weight":"normal",
        "border-top": "1px solid grey", 
        "margin-top": "20px", 
        "padding": "3px 0"
    });
}

//save score to local storage
function saveScore() {
    $('#score-button').on("click", function(event) {
        event.preventDefault();
        console.log(document.getElementById("username").value);
        console.log("hi");
        console.log(score);
        var scores = {
            username: $('input[name="username"]').val(),
            userscore: score
        }
        localStorage.setItem("scores", JSON.stringify(scores));
        var scoreArr = [];
        scoreArr.push(scores);
        scoreArr = scoreArr.concat(JSON.parse(localStorage.getItem("scoreArr")||"[]"));
        localStorage.setItem("scoreArr", JSON.stringify(scoreArr));
        $('#submit-score').hide();
        $('#initialMsg').show();
        $('#timer').hide();
    }); 
}

//print locally stored scores to the screen
function renderScore() {
    var lastscore = JSON.parse(localStorage.getItem("scoreArr"));
    if (lastscore !== null) {
        $('#leaderboardList').text("");
        for(var j=0; j<lastscore.length; j++) {
            $('#leaderboardList').append("<li><b>Username: </b>" + lastscore[j].username + ", <b>Score: </b>" + lastscore[j].userscore + "</li>");
        } 
    } else {
        $('#leaderboardList').text("You need to play one game first!");
    }
    $('#leaderboardList').css({
        'padding': "5px",
        'line-height': "1.6",
    });
}

//add an event handler when user clicks the start button to start the quiz
$("#start-button").on("click", function() {
    reset();
    countdown();
    showNextQuestion();
    saveScore();
});

//add an event handler when the user clicks the leaderboard button to check the score history
$('#high-score').on("click", function() {
    renderScore();
    $('#high-score').hide();
    $('#timer').hide();
    $('#initialMsg').hide();
    $('#prompt').hide();
    $('#result').hide();
    $('#leaderboard').show();
    $('#submit-score').hide();
});

//add an event handler when the user is returning from the leaderboard to the main screen to do the quiz
$('#back-button').on("click", function() {
    $('#high-score').show();
    $('#leaderboard').hide();
    $('#timer').hide();
    $('#initialMsg').show();
    $('#prompt').show();
    $('#result').show();
});