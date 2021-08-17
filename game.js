buttonColors = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
gameStarted = false;
level = 0;

function nextSequence() {
    level++;
    $("h1").text("Level " + level);
    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    for (
        var gamePatternIndex = 0;
        gamePatternIndex < gamePattern.length;
        gamePatternIndex++
    ) {
        $("#" + gamePattern[gamePatternIndex])
            .fadeOut(100)
            .fadeIn(100);
        playSound(gamePattern[gamePatternIndex]);
    }
}

function playSound(name) {
    audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
    } else {
        console.log("failure");
    }

    if (userClickedPattern.length === gamePattern.length) {
        userClickedPattern = [];
        setTimeout(nextSequence(), 1000);
    }
}

for (var i = 0; i < buttonColors.length; i++) {
    $("#" + buttonColors[i]).click(function () {
        userChosenColor = this.id;
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);
        console.log(userClickedPattern);
    });
}

$(document).keydown(function () {
    if (!gameStarted) {
        gameStarted = true;
        $("h1").text("Level " + level);
        nextSequence();
    }
});
