
let correct = 0;
let incorrect = 0;
let blank = 0;

let intervalID;

     timer = {

        time: 120,

        start: function () {
            $("#timer-display").text("02:00");
            intervalID = setInterval(timer.countdown, 1000);
        },

        countdown: function () {
            console.log("countdown");
            timer.time--;
            let currentTime = timer.timeConverter(timer.time);
            console.log(currentTime);
            $("#timer-display").text(currentTime);

            if (timer.time === 0) {
                $("#timer-display").text("Time's Up!");
                clearInterval(intervalID);
                $(".reset").show();
            } else {

            }
        },

        reset: function () {
            timer.time = 120;
            clearInterval(intervalID);
            console.log("Reset");
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

// Timer functions================================================================================================



$(document).ready(function() {


    $(".start").on("click", function() {
        $(".start").hide();
        timer.start();


    });
    $(".reset").on("click", function () {
        $(".start").show();
        $(".reset").hide();
        timer.reset();
    });
});