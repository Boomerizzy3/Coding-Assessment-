var questions = [document.getElementById("question1"), document.getElementById("question2"), document.getElementById("question3"), document.getElementById("question4"), document.getElementById("question5")];
var startbutton = document.getElementById("start-quiz");
var homescreen = document.getElementById("home-screen");
var resultscreen = document.getElementById("result");
var submitbutton = document.getElementById("submit");
var leaderboard = document.getElementById("leaderboard")
var listofscores = document.getElementById("listofscores")
var backbutton = document.getElementById("go-back");
var clearscores = document.getElementById("clear");
var viewscores = document.getElementById("high-score")
var correctanswer = document.getElementById("correct-answer");
var wronganswer = document.getElementById("wrong-answer");
var buttons = document.querySelectorAll("button");
var previousscores = [];
var storedscores = [];
var index = 0
var timer = 75
var testinprogress = 0
var timerstart = setInterval(timercountdown, 1000)
var score = 0

console.log(buttons);

viewscores.addEventListener("click", function() {
    if (testinprogress == 1) {
        return;
    } else {
    resetleaderboard()
    leaderboardupdate()
    homescreen.style.display = "none"
    resultscreen.style.display = "none"
    leaderboard.style.display = "block"
    }
})

function leaderboardupdateonload() {
    var storedscores1 = localStorage.getItem("score")

    if (storedscores1 == null) {
        return;
    } else {
        var storedscores2 = storedscores1.split(",")
        
        for (let i = 0; i < storedscores2.length; i++) {
        storedscores.push(storedscores2[i]);
        }

        console.log(storedscores2)
    }
}


leaderboardupdateonload()

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
    viewscores.style.color = "gray"
    selectanswer();
});

function selectanswer() {
questions[index].addEventListener("click", function(event) {
    var element = event.target;

    if (element.matches(".correct")) {
        wronganswer.style.display = "none"
        correctanswer.style.display = "block"
        nextquestion()
    } else if (element.matches("button")) {
        correctanswer.style.display = "none"
        wronganswer.style.display = "block"
        timer -= 10
        document.getElementById("time").innerHTML = ("Time: " + timer)
        nextquestion()
    } else {
        return;
    }

})
};

function nextquestion(event) {
    questions[index].style.display = "none";

    if (index == 4) {
        wronganswer.style.display = "none"
        correctanswer.style.display = "none"
        testinprogress--
        viewscores.style.color = "blue"
        index -= 4
        results()
        return;
    } else {
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
    initialtrim = initials.trim()

    if (initialtrim.length < 2) {
        alert("Initials must be at least 2 characters.")
        return;
    } else {
    JSON.stringify(initials)
    var upinitials = initials.toUpperCase()
    score = [upinitials, timer]
    previousscores.push(score.join(" - "));
    storedscores.push(previousscores);
    localStorage.setItem("score", storedscores);
    leaderboardupdate()
    resultscreen.style.display = "none"
    leaderboard.style.display = "block"
    }
});

function leaderboardupdate() {
    
    for (let i = 0; i < storedscores.length; i++) {
        const para = document.createElement("p");
        const node = document.createTextNode(storedscores[i]);
        para.appendChild(node);
        listofscores.appendChild(para);
      }
}

backbutton.addEventListener("click", function() {
    location.reload();
})

clearscores.addEventListener("click", function() {
    storedscores = [];
    localStorage.clear();
    resetleaderboard()
    
})

function resetleaderboard() {
    while (listofscores.hasChildNodes()) {
        listofscores.removeChild(listofscores.firstChild)
    }
};