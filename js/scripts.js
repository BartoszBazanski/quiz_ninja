function main() {
    'use strict';

    // alert("Welcome to Quiz Ninja!");

    var $question = document.getElementById("question");
    var $score = document.getElementById("score");
    var $feedback = document.getElementById("feedback");
    var $start = document.getElementById("startButton");
    var $form = document.getElementById("answer");
    var questionCounter;
    var score;

    hide($form);

    $start.addEventListener('click', function() {
        play(quiz);
    }, false);

    var quiz = {
        name: "Super Hero Name Quiz",
        description: "How many super heroes can you name?",
        question: "What is the real name of ",
        questions: [
            {question: "Superman", answer: "Clarke Kent"},
            {question: "Batman", answer: "Bruce Wayne"},
            {question: "Wonderwoman", answer: "Dianna Prince"}
        ]
    }


    function hide(element) {
        element.style.display = "none";
    }

    function show(element) {
        element.style.display = "block";
    }

    function play(quiz) {
        questionCounter = 0;
        score = 0;
        console.log(questionCounter);
        update($score, score);
        hide($start);
        show($form);
        chooseQuestion();
        $form.addEventListener("submit", function(event) {
            event.preventDefault();
            console.log(questionCounter);
            check($form[0].value);
        }, false);
    }

    function chooseQuestion() {
        var question = quiz.questions[questionCounter].question;
        ask(question);
    }

    function ask(question) {
        update($question, quiz.question + question + "?");
        $form[0].value = "";
        $form[0].focus();
    }

    function check(answer) {
        if(answer === quiz.questions[questionCounter].answer) {
            update($feedback, "Correct!", "right");
            score ++;
            update($score, score);
        } else {
            update($feedback, "Wrong!", "wrong");
        }
        questionCounter++;
        if(questionCounter === quiz.questions.length) {
            gameOver();
        } else {
            chooseQuestion();
        }
    }

    function gameOver() {
        show($start);
        hide($form);
        update($question, "Game Over, you scored " + score + " points.")
    }

    function update(element, content, additionalClass) {
        var p = element.firstChild || document.createElement("p");
        p.textContent = content;
        element.appendChild(p);
        if(additionalClass) {
            p.className = additionalClass;
        }
    }
};

document.addEventListener('DOMContentLoaded', main);
