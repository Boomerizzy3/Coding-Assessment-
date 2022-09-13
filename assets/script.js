var questions = [document.getElementById("question1"), document.getElementById("question2"), document.getElementById("question3"), document.getElementById("question4"), document.getElementById("question5")];
var startbutton = document.getElementById("start-quiz");
var homescreen = document.getElementById("home-screen");
var resultscreen = document.getElementById("result");
var submitbutton = document.getElementById("submit");
var leaderboard = document.getElementById("leaderboard")
var listofscores = document.getElementById("listofscores")
var previousscores = [];
var storedscores = [];
var index = 0
var timer = 75
var testinprogress = 0
var timerstart = setInterval(timercountdown, 1000)
var score = 0

// function leaderboardupdateonload() {
//     var storedscores = localStorage.getItem("score")
//     previousscores.push(storedscores)
// }

// leaderboardupdateonload()

console.log(previousscores);

function timercountdown() {
    if (testinprogress != 1) {
        return;
    } else {
        timer--
        document.getElementById("time").innerHTML = ("Time: " + timer)
    }
    }

startbutton.addEventListener("click", function() {
    homescreen.style.display = "none"
    questions[0].style.display = "block"
    document.getElementById("time").innerHTML = ("Time: " + timer)
    testinprogress++
    selectanswer();
});

function selectanswer() {
questions[index].addEventListener("click", function(event) {
    var element = event.target;

    if (element.matches(".correct")) {
        nextquestion()
        console.log("yep")
    } else if (element.matches("button")) {
        timer -= 10
        document.getElementById("time").innerHTML = ("Time: " + timer)
        nextquestion()
        console.log("nooope")
    } else {
        return;
    }

})
};

function nextquestion(event) {
    questions[index].style.display = "none";

    if (index == 4) {
        testinprogress--
        index -= 4
        results()
        return;
    } else {
        console.log("it worked boii");
        index++
        questions[index].style.display = "block";
        selectanswer()
    }
}

function results() {
    resultscreen.style.display = "block";
    console.log("results dude");
    document.getElementById("score").innerHTML = ("Your final score is " + timer);
}

submitbutton.addEventListener("click", function() {
    var initials = document.getElementById("initial").value
    JSON.stringify(initials)
    var upinitials = initials.toUpperCase()
    score = [upinitials, timer]
    previousscores.push(score.join(" - "));
    storedscores.push(previousscores);
    JSON.stringify(storedscores);
    localStorage.setItem("score", storedscores);
    leaderboardupdate()
    resultscreen.style.display = "none"
    leaderboard.style.display = "block"
});

function leaderboardupdate() {
    var lastscore = localStorage.getItem("score")
    const para = document.createElement("p");
    const node = document.createTextNode(lastscore);
    para.appendChild(node);
    listofscores.appendChild(para);
    console.log(lastscore);
}