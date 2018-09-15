let questionslist = {};
let trivia = {};

let questions;
/*let playeranswers;*/
let answers = ["B","D","A","B","D","A","B","D"];

let intervalID;

// Timer Object ========================================================================================================
     timer = {

        time: 120,

        start: function () {
            $("#timer-display").text("02:00");
            intervalID = setInterval(timer.countdown, 1000);
        },

        countdown: function () {
            /*console.log("countdown");*/
            timer.time--;
            let currentTime = timer.timeConverter(timer.time);
            /*console.log(currentTime);*/
            $("#timer-display").text(currentTime);

            if (timer.time === 0) {
                $("#timer-display").text("Time's Up!");
                clearInterval(intervalID);
                $(".done").hide();
                $(".question-block").hide();
                /*$(".question-block").empty();*/
                score();
                $(".results, .reset").show();
            } else {

            }
        },

        reset: function () {
            timer.time = 120;
            $("#timer-display").text("02:00");
            clearInterval(intervalID);
            /*console.log("Reset");*/
        },

        timeConverter: function (t) {
            let minutes = Math.floor(t / 60);
            let seconds = t - (minutes * 60);

            if (seconds < 10) {
                seconds = "0" + seconds;
            }

            if (minutes === 0) {
                minutes = "00";
            }

            else if (minutes < 10) {
                minutes = "0" + minutes;
            }

            return minutes + ":" + seconds;
        },

    };

// Question Object =====================================================================================================

function startTrivia() {
    /*playeranswers = [];*/
    questionslist = resetQuestions();
    trivia = resetTrivia();

    showQuestions();


}

function resetTrivia() {
    return {
        correct: 0,
        incorrect: 0,
        blank: 0,
    }
}

function resetQuestions() {
    return {
        q0 : {
            question : "What race is Chewbacca?",
            A : "Mon Calamari",
            B : "Wookie",
            C : "Jawa",
            D : "Bantha",
            /*answer : "choice2"*/
        },
        q1 : {
            question : "What give's lightsabers their color?",
            A : "The owner's energy.",
            B : "The planet it was made on.",
            C : "The owner's age.",
            D : "The crystals used to make them.",
            /*answer : "choice4"*/

        },
        q2 : {
            question : "What is the name of the snow planet in Episode V?",
            A : "Hoth",
            B : "Endor",
            C : "Alderaan",
            D : "Naboo",
            /*answer : "choice1"*/
        },
        q3 : {
            question : "What is the name of the only Super Star Destroyer see in the films, Darth Vader's flagship?",
            A : "Devastator",
            B : "Executor",
            C : "Dominator",
            D : "Lusankya",
            /*answer : "choice2"*/
        },
        q4 : {
            question : "How did Han Solo acquire the Millenium Falcon?",
            A : "Stole it.",
            B : "Won it in a raffle.",
            C : "Bought it.",
            D : "Won it in a Sabacc game.",
            /*answer : "choice4"*/
        },
        q5 : {
            question : "What was Luke's call sign in Episode IV?",
            A : "Red Five",
            B : "Big Red",
            C : "Rogue Five",
            D : "Epic One",
            /*answer : "choice1"*/
        },
        q6 : {
            question : "What system can Cloud City can be found in?",
            A : "Lando",
            B : "Bespin",
            C : "Dagobah",
            D : "Corellia",
            /*answer : "choice2"*/
        },
        q7 : {
            question : "Who is the bounty hunter who finally delivers Han to Jabba?",
            A : "Bossk",
            B : "Zuckuss",
            C : "Dengar",
            D : "Boba Fett",
            /*answer : "choice4"*/
        }
    }
}

function showQuestions() {
    questions = Object.keys(questionslist);
    for (var i = 0; i < questions.length; i++ ){
        var questiontitle = questions[i];
        var question = questionslist[questiontitle];
        var questionblocks = createQuestions(question, questiontitle);
        $(".question-block").append(questionblocks).show();
    }
}

/*function createQuestions(question, key) {
    var block = $("<div class='question' data-name='" + key + "'>").text(question.question);
    var choice1 = $("<li><input type='radio' name='" + key + "'><label>" + question.choice1 + "</label></li>");
    var choice2 = $("<li><input type='radio' name='" + key + "'><label>" + question.choice2 + "</label></li>");
    var choice3 = $("<li><input type='radio' name='" + key + "'><label>" + question.choice3 + "</label></li>");
    var choice4 = $("<li><input type='radio' name='" + key + "'><label>" + question.choice4 + "</label></li>");
    block.append(choice1, choice2, choice3, choice4);

    return block;
}*/

function createQuestions(question, key) {
    var block = $("<div class='question' name='" + key + "'>" + question.question + "" +
        "<ul>" +
        "<li><input type='radio' id='" + key + "' value='A'><label>" + question.A + "</label></li>" +
        "<li><input type='radio' id='" + key + "' value='B'><label>" + question.B + "</label></li>" +
        "<li><input type='radio' id='" + key + "' value='C'><label>" + question.C + "</label></li>" +
        "<li><input type='radio' id='" + key + "' value='D'><label>" + question.D + "</label></li>" +
        "</ul>");

    return block;
}

function score() {
    console.log($("input:radio[id='q0']:checked").val());
    let playeranswers = [$("input:radio[id='q0']:checked").val(),
        $("input:radio[id='q1']:checked").val(),
        $("input:radio[id='q2']:checked").val(),
        $("input:radio[id='q3']:checked").val(),
        $("input:radio[id='q4']:checked").val(),
        $("input:radio[id='q5']:checked").val(),
        $("input:radio[id='q6']:checked").val(),
        $("input:radio[id='q7']:checked").val()];

    console.log(playeranswers);
    console.log(answers);

    for (k = 0; k < questions.length; k++) {
        if (playeranswers[k] === undefined) {
            trivia.blank++;
        } else if (playeranswers[k] === answers[k]) {
            trivia.correct++;
        } else {
            trivia.incorrect++;
        }

    }

    $("#correct").text("Correct: " + trivia.correct);
    $("#incorrect").text("Incorrect: " + trivia.incorrect);
    $("#unanswered").text("Unanswered: " + trivia.blank);

    console.log(trivia.correct);
    console.log(trivia.incorrect);
    console.log(trivia.blank);
}

    /*alert($("input:radio[id='q0']:checked").val());*/
/*    console.log($("input:radio[id='q0']:checked").val());
    console.log($("input:radio[id='q1']:checked").val());
    console.log($("input:radio[id='q2']:checked").val());
    console.log($("input:radio[id='q3']:checked").val());
    console.log($("input:radio[id='q4']:checked").val());
    console.log($("input:radio[id='q5']:checked").val());
    console.log($("input:radio[id='q6']:checked").val());
    console.log($("input:radio[id='q7']:checked").val());*/

// Question Time =======================================================================================================

$(document).ready(function() {

    $(".start").on("click", function() {
        $(".start").hide();
        startTrivia();
        timer.start();
        $(".done").show();

    });

    $(".done").on("click", function() {
        score();
        $(".done, .question-block").hide();
        timer.reset();
        $(".results, .reset").show();
    });

    $(".reset").on("click", function () {
        $(".question-block").empty();
        $(".start").show();
/*        $(".question-block").empty();*/
        $(".reset, .results").hide();
        timer.reset();
    });
});