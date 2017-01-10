(function() {
    'use strict';

    var $question = document.getElementById("question");
    var $score = document.getElementById("score");
    var $feedback = document.getElementById("feedback");
    var $start = document.getElementById("startButton");
    var $form = document.getElementById("answer");
    var $timer = document.getElementById("timer");
    var questionCounter;
    var score;
    var time;
    var interval;

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
        time = 20;
        update($timer, time);
        interval = window.setInterval(countDown, 1000);
        questionCounter = 0;
        score = 0;
        update($score, score);
        hide($start);
        show($form);
        chooseQuestion();
        $form.addEventListener("submit", onQuestionSubmit, false);
    }
    function onQuestionSubmit(event) {
        event.preventDefault();
        check($form[0].value);
    }
    function chooseQuestion() {
        console.log("chooseQuestion() invoked");
        var question = quiz.questions[questionCounter].question;
        ask(question);
    }

    function ask(question) {
        console.log("ask() invoked");
        update($question, quiz.question + question + "?");
        $form[0].value = "";
        $form[0].focus();
    }

    function check(answer) {
        console.log("check() invoked");
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
        console.log("gameOver() invoked");
        show($start);
        hide($form);
        update($question, "Game Over, you scored " + score + " points.")
        $form.removeEventListener("submit", onQuestionSubmit, false);
        window.clearInterval(interval);
    }

    function update(element, content, additionalClass) {
        var p = element.firstChild || document.createElement("p");
        p.textContent = content;
        element.appendChild(p);
        if(additionalClass) {
            p.className = additionalClass;
        }
    }

    function countDown() {
        time--;
        update($timer, time);
        if(time <= 0) {
            gameOver();
        }
    }
})();
