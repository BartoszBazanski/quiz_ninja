(function() {
    'use strict';

    var $question = document.getElementById("question");
    var $score = document.getElementById("score");
    var $feedback = document.getElementById("feedback");
    var $start = document.getElementById("startButton");
    var $form = document.getElementById("answer");
    var $timer = document.getElementById("timer");
    var options = [], button;

    var quiz = {
        name: "Super Hero Name Quiz",
        description: "How many super heroes can you name?",
        question: "What is the real name of ",
        questions: [
            {question: "Superman", answer: "Clarke Kent", "asked": false},
            {question: "Batman", answer: "Bruce Wayne", "asked": false},
            {question: "Wonderwoman", answer: "Dianna Prince", "asked": false}
        ]
    }

    function Game(quiz) {
        this.questions = quiz.questions;
        this.question = quiz.question;
        this.score = 0;
        this.time = 20;
        update($timer, this.time);
        this.interval = window.setInterval(this.countDown.bind(this), 1000);
        hide($start);
        show($form);
        $form.addEventListener('click', function(event) {
            event.preventDefault();
            this.check(event.target.value);
        }.bind(this), false);
        this.chooseQuestion();
    }

    Game.prototype.chooseQuestion = function() {
        console.log("chooseQuestion() called");
        var question = this.questions[random(this.questions.length) -1];
        this.ask(question);
    }

    Game.prototype.ask = function(question) {
        console.log("ask() called");
        var quiz = this;
        question.asked = true;
        update($question, this.question + question.question + "?");
        $form.innerHTML = "";
        var option1 = chooseOption();
        options.push(option1.answer);
        var option2 = chooseOption();
        options.push(option2.answer);
        options.slice(random(0,2),0, this.question.answer);
        options.forEach(function(name) {
            button = document.createElement('button');
            button.value = name;
            button.textContent = name;
            $form.appendChild(button);
        });
    }

    Game.prototype.check = function(answer) {
        console.log("check() called");
        if(answer === this.question.answer) {
            update($feedback, "Correct!", "correct");
            this.score++;
            update($score, this.score);
        } else {
            update($feedback, "Wrong", "wrong");
        }
        this.chooseQuestion();
    }

    Game.prototype.countDown = function() {
        this.time--;
        update($timer, this.time);
        if(this.time <= 0) {
            this.gameOver();
        }
    }

    Game.prototype.gameOver = function() {
        console.log("gameOver() called");
        update($question, "Game Over, you scored " + this.score + " points");
        window.clearInterval(this.interval);
        hide($form);
        show($start);
    }

    function chooseOption() {
        var option = quiz.questions[random(quiz.questions.length) - 1];
        if(option === question || options.indexOf(option.answer) !== -1) {
            return chooseOption();
        }
        return option;
    }

    function update(element, content, additionalClass) {
        var p = element.firstChild || document.createElement("p");
        p.textContent = content;
        element.appendChild(p);
        if(additionalClass) {
            p.className = additionalClass;
        }
    }

    function hide(element) {
        element.style.display = "none";
    }

    function show(element) {
        element.style.display = "block";
    }

    function random(a, b, callback) {
        if(b === undefined) {
            b = a, a = 1;
        }
        var result = Math.floor((b-a+1) * Math.random()) + a;
        if(typeof callback === "function") {
            result = callback(result);
        }
        return result;
    }

    $start.addEventListener('click', function() { new Game(quiz) }, false);
    //
    //
    // hide($form);
    //
    // $start.addEventListener('click', function() {
    //     play(quiz);
    // }, false);
    //
    //
    //
    //
    // function play(quiz) {
    //     time = 20;
    //     update($timer, time);
    //     interval = window.setInterval(countDown, 1000);
    //     score = 0;
    //     update($score, score);
    //     hide($start);
    //     show($form);
    //     chooseQuestion();
    //     $form.addEventListener("click", function(event) {
    //         event.preventDefault();
    //         check(event.target.value)
    //     }, false);
    // }
    // function chooseQuestion() {
    //     console.log("chooseQuestion() invoked");
    //     questions = filterNotAskedQuestions();
    //     question = questions[random(questions.length) - 1];
    //     ask(question);
    // }
    //
    // function ask(question) {
    //     console.log("ask() invoked");
    //     question.asked = true;
    //     update($question, quiz.question + question.question + "?");
    //     var option1 = chooseOption();
    //     options.push(option1.answer);
    //     console.log(options);
    //     var option2 = chooseOption();
    //     options.push(option2.answer);
    //     console.log(options);
    //     options.splice(random(0, 2), 0, question.answer);
    //     console.log(options);
    //     options.forEach(function(name) {
    //         button = document.createElement("button");
    //         button.value = name;
    //         button.textContent = name;
    //         $form.appendChild(button);
    //     })
    //
    // }
    //
    // function chooseOption() {
    //     var option = quiz.questions[random(quiz.questions.length) - 1];
    //     console.log("Option:", option);
    //     console.log("Question:", question);
    //     if(option === question || options.indexOf(option.answer) !== -1) {
    //         return chooseOption();
    //     }
    //     return option;
    // }
    //
    // function check(answer) {
    //     console.log("check() invoked");
    //     if(answer === question.answer) {
    //         update($feedback, "Correct!", "right");
    //         score ++;
    //         update($score, score);
    //     } else {
    //         update($feedback, "Wrong!", "wrong");
    //     }
    //     if(filterNotAskedQuestions().length === 0) {
    //         gameOver();
    //     } else {
    //         chooseQuestion();
    //     }
    // }
    //
    // function filterNotAskedQuestions() {
    //     return quiz.questions.filter(function(question) {
    //         return question.asked === false;
    //     });
    // }
    //
    // function gameOver() {
    //     console.log("gameOver() invoked");
    //     show($start);
    //     hide($form);
    //     update($question, "Game Over, you scored " + score + " points.")
    //     window.clearInterval(interval);
    //     resetQuestionStatuses();
    // }
    //
    // function resetQuestionStatuses() {
    //     quiz.questions.forEach(function(question) {
    //         question.asked = false;
    //     });
    // }
    //
    //
    // function countDown() {
    //     time--;
    //     update($timer, time);
    //     if(time <= 0) {
    //         gameOver();
    //     }
    // }
})();
