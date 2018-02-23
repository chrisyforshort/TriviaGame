$(document).ready(function () {

    // Global Variables //
    var correctCounter = 0;
    var wrongCounter = 0;
    var unanswerCounter = 0;
    var time = 20;
    var asked = [];
    var questionsAsked = 0;
    var userSelected;
    var interval;

    // Question Attributes //
    var questions = [
        {
            question: 'Which frog is known for drinking tea?',
            options: ['Kermit', 'Pepe', 'Frogger', 'Mr. Toad'],
            answer: 'Kermit',
            picture: 'assets/images/kermitDrinkMeme.png',
        },
        {
            question: 'What is the breed of the Doge?',
            options: ['Shiba Inu', 'French Bulldog', 'Huskie', 'Golden Retriever'],
            answer: 'Shiba Inu',
            picture: 'assets/images/codedoge.jpg',
        },
        {
            question: 'What is the saying used for memes with an 8-bit sunglasses and a cigerete?',
            options: ['Say No to Drugs', 'Thug Life', 'Later Haters', 'Future Too Bright'],
            answer: 'Thug Life',
            picture: 'assets/images/Thug-Life-Cool-Glasses-PNG.png',
        },
        {
            question: 'What recent horror film remake sparked a flood of memes luring people into a sewer?',
            options: ['It', 'Saw', 'Black Mirror', 'Insidious'],
            answer: 'It',
            picture: 'assets/images/itMeme.jpg',
        },
        {
            question: 'Nyan cat in a combination of cat and what other thing?',
            options: ['Naan', 'Yam', 'Nylon', 'Pop Tart'],
            answer: 'Pop Tart',
            picture: 'assets/images/nyanCat.gif',
        },
        {
            question: "What is Willy Wonka's state in his memes?",
            options: ['Livid', 'Sad', 'Condescending', 'Happy'],
            answer: 'Condescending',
            picture: 'assets/images/willywonkameme.jpg',
        },
        {
            question: 'Where is the famous Troll face from?',
            options: ['Rage Comic', 'Tumblr', 'Reddit', 'John Willkin Comics'],
            answer: 'Rage Comic',
            picture: 'assets/images/trollface.jpg',
        },
        {
            question: "Where does the ain't nobody got time for that meme originate from?",
            options: ['Reddit', 'Comic Book', 'Television Show', 'TV Interview'],
            answer: 'TV Interview',
            picture: 'assets/images/cold-weather-meme.jpg',
        },
        {
            question: 'Which illustration is not a version of Pepe the Frog?',
            options: ['Feels Good Man', 'Angry Pepe', 'Sad Frog', 'Pepe Hungry'],
            answer: 'Pepe Hungry',
            picture: 'assets/images/pepe-frog-640x480.jpg',
        },
        {
            question: 'Which actor is featured in the roll safe meme?',
            options: ['Kayode Ewumi', 'Kevin Hart', 'Larry the Cable Guy', 'Will Ferrel'],
            answer: 'Kayode Ewumi',
            picture: 'assets/images/rollsafe.jpg',
        },
        {
            question: "What is Grumpy cat's real name?",
            options: ['Mr. Grump', 'Snowball', 'Tardar Sauce', 'Ron'],
            answer: 'Tardar Sauce',
            picture: 'assets/images/grumpyCat.jpg',
        },
        {
            question: "Which Kardashian is famously found contemplating in bed?",
            options: ['Kourtney Kardashian', 'Kris Kardashian', 'Kloé Kardashian', 'Kim Kardashian'],
            answer: 'Kim Kardashian',
            picture: 'assets/images/kimKMeme.png',
        },
        {
            question: "Which rapper has a Jackie Chan meme tattoed?",
            options: ['MadeinTYO', 'T-Pain', 'Big Sean', 'Mac Miller'],
            answer: 'T-Pain',
            picture: 'assets/images/tpain.png',
        },
        {
            question: "Which martial arts master is meme to be famously mind blown?",
            options: ['Jackie Chan', 'Bruce Lee', 'Chuck Norris', 'Master Chu'],
            answer: 'Jackie Chan',
            picture: 'assets/images/jackiechan.jpg',
        },
        {
            question: "Who is the artist of the song featured in the Shooting Star's memes?",
            options: ['MGMT', 'M83', 'Chainsmokers', 'Bag Raiders'],
            answer: 'Bag Raiders',
            picture: 'assets/images/shootingstarmeme.gif',
        },
        {
            question: "Who is the actress from original the math lady/confused thinking meme?",
            options: ['Reese Witherspoon', 'Zach Galifianakis', 'Renata Sorrah', 'Winona Ryder'],
            answer: 'Renata Sorrah',
            picture: 'assets/images/mathlady.gif',
        },
    ]

    // Game start function //
    function initGame() {
        $("#restartBTN").hide()
        $("#countdown").hide()
    }

    // Function to decrease the time by an interval of 1 second
    function timeCount() {
        time = 20;
        interval = setInterval(timeRemaining, 1000);
    }

    // // What happens when you hit the Start Button //
    $("#startBTN").on("click", function () {
        $("#startBTN").hide()
        $("#countdown").show()
        newQuestion()
    })

    //  Timer and Function to decrease the time in the timer
    function timeRemaining() {
        time--;
        $("#countdown").html("Time Left : " + time + " seconds")
        // When the timer reaches 0
        if (time == 0) {
            clearInterval(interval);
            UNcorrectAnswer()
            setTimeout(function () {
                newQuestion();
            }, 4000);
        }
    }

    // Function of Bringing Up Questions, Options, and Answers
    function newQuestion() {
        timeCount()
        var randomQuestion = questions[Math.floor(questions.length * Math.random())];
        // NEED fix below if statement so that when the value usedQ is false then will use the question 
        // if (randomQuestion.usedQ === false) {
        chosenQuestion = [$(randomQuestion).attr("question")]
        chosenAnswer = [$(randomQuestion).attr("answer")]
        chosenPicture = [$(randomQuestion).attr("picture")]
        $("#questionArea").html("<span id='questionCSS'>" + chosenQuestion + "</span>")
        questionsAsked++
        $("#optionsArea").show()
        if (questionsAsked === 11) {
            clearInterval(interval);
            endGame()
        }
        // For loop to append the different options as buttons
        for (var i = 0; i < 4; i++) {
            $("#optionsArea").append("<br><button id='option' value='" + randomQuestion.options[i] + "'>" + randomQuestion.options[i] + "</button>")
        }
        var removeItem = randomQuestion
        questions.splice($.inArray(removeItem, questions), 1);
    }

    // What happens when you click on an option
    $(document).on("click", "#option", function () {
        userSelected = $(this).attr("value")
        if (userSelected == chosenAnswer) {
            correctAnswer()
        }
        else {
            wrongAnswer()
        }
    });

    // What happens when an option is not selected
    function UNcorrectAnswer() {
        unanswerCounter++;
        var UNanswerDiv = $('<div class="UNcorrAnswer">');
        UNcorrAnswr = UNanswerDiv.append("<span id='headerCSS'>Time's up!</span><br>The correct answer is:<br><span id='answerCSS'>" + chosenAnswer + "</span><br><br>" + "<img src='" + chosenPicture + "'style='width:200px;height:200px;'/>")
        $("#questionArea").html(UNcorrAnswr);
        $("#optionsArea").empty()
        setTimeout(function () {
            $('div').remove('.UNcorrAnswer');
        }, 4000);
    }

    // What happens when an incorrect answer is selected
    function wrongAnswer() {
        wrongCounter++;
        var WRanswerDiv = $('<div class="WRcorrAnswer">');
        WRanswr = WRanswerDiv.html("<span id='headerCSS'>Wrong Choice!</span><br>The correct answer is:<br><span id='answerCSS'>" + chosenAnswer + "</span><br><br>" + "<img src='" + chosenPicture + "'style='width:200px;height:200px;'/>")
        $("#questionArea").html(WRanswr);
        $("#optionsArea").empty()
        clearInterval(interval);
        setTimeout(function () {
            $('div').remove('.WRcorrAnswer');
            newQuestion();
        }, 4000);
    }

    // What happens when the correct answer is selected
    function correctAnswer() {
        correctCounter++;
        var answerDiv = $('<div class="corrAnswer">');
        corrAnswr = answerDiv.append("<span id='headerCSS'>Much correct, such <span id='answerCSS'>awesome</span>!</span><br><br>" + "<img src='" + chosenPicture + "'style='width:200px;height:200px;'/>")
        $("#questionArea").html(corrAnswr);
        $("#optionsArea").empty()
        clearInterval(interval);
        setTimeout(function () {
            $('div').remove('.corrAnswer');
            newQuestion();
        }, 4000);
    }

    // Function to show what happens at the end of the game
    function endGame() {
        reset();
        var endDiv = $('<div class="ending">');
        end = endDiv.html("<span id='answerCSS'>End of the Road, your final results: </span><br>" + "<p>Correct Answers: " + correctCounter + "</p>" +
            "<p>Incorrect Answers: " + wrongCounter + "</p>" + "<p>Unanswered: " + unanswerCounter + "</p><img src='assets/images/grumpyGameOver.jpg' style='width:200px;height:200px;'/><button id='restartBTN' class='btn'>Restart</button><img src='assets/images/gameOver.jpg' style='width:200px;height:200px;'/>")
        $("#questionArea").html(end);
        $("#restartBTN").show()
    }

    // Clear the questions and options
    function reset() {
        $("#optionsArea").empty()
        $("#optionsArea").hide()
        $("#questionArea").empty()
    }

    // Reset the counters and values
    function resetValue() {
        correctCounter = 0
        wrongCounter = 0
        unanswerCounter = 0
        questionsAsked = 0
        questions = [
            {
                question: 'Which frog is known for drinking tea?',
                options: ['Kermit', 'Pepe', 'Frogger', 'Mr. Toad'],
                answer: 'Kermit',
                picture: 'assets/images/kermitDrinkMeme.png',
            },
            {
                question: 'What is the breed of the Doge?',
                options: ['Shiba Inu', 'French Bulldog', 'Huskie', 'Golden Retriever'],
                answer: 'Shiba Inu',
                picture: 'assets/images/codedoge.jpg',
            },
            {
                question: 'What is the saying used for memes with an 8-bit sunglasses and a cigerete?',
                options: ['Say No to Drugs', 'Thug Life', 'Later Haters', 'Future Too Bright'],
                answer: 'Thug Life',
                picture: 'assets/images/Thug-Life-Cool-Glasses-PNG.png',
            },
            {
                question: 'What recent horror film remake sparked a flood of memes luring people into a sewer?',
                options: ['It', 'Saw', 'Black Mirror', 'Insidious'],
                answer: 'It',
                picture: 'assets/images/itMeme.jpg',
            },
            {
                question: 'Nyan cat in a combination of cat and what other thing?',
                options: ['Naan', 'Yam', 'Nylon', 'Pop Tart'],
                answer: 'Pop Tart',
                picture: 'assets/images/nyanCat.gif',
            },
            {
                question: "What is Willy Wonka's state in his memes?",
                options: ['Livid', 'Sad', 'Condescending', 'Happy'],
                answer: 'Condescending',
                picture: 'assets/images/willywonkameme.jpg',
            },
            {
                question: 'Where is the famous Troll face from?',
                options: ['Rage Comic', 'Tumblr', 'Reddit', 'John Willkin Comics'],
                answer: 'Rage Comic',
                picture: 'assets/images/trollface.jpg',
            },
            {
                question: "Where does the ain't nobody got time for that meme originate from?",
                options: ['Reddit', 'Comic Book', 'Television Show', 'TV Interview'],
                answer: 'TV Interview',
                picture: 'assets/images/cold-weather-meme.jpg',
            },
            {
                question: 'Which illustration is not a version of Pepe the Frog?',
                options: ['Feels Good Man', 'Angry Pepe', 'Sad Frog', 'Pepe Hungry'],
                answer: 'Pepe Hungry',
                picture: 'assets/images/pepe-frog-640x480.jpg',
            },
            {
                question: 'Which actor is featured in the roll safe meme?',
                options: ['Kayode Ewumi', 'Kevin Hart', 'Larry the Cable Guy', 'Will Ferrel'],
                answer: 'Kayode Ewumi',
                picture: 'assets/images/rollsafe.jpg',
            },
            {
                question: "What is Grumpy cat's real name?",
                options: ['Mr. Grump', 'Snowball', 'Tardar Sauce', 'Ron'],
                answer: 'Tardar Sauce',
                picture: 'assets/images/grumpyCat.jpg',
            },
            {
                question: "Which Kardashian is famously found contemplating in bed?",
                options: ['Kourtney Kardashian', 'Kris Kardashian', 'Kloé Kardashian', 'Kim Kardashian'],
                answer: 'Kim Kardashian',
                picture: 'assets/images/kimKMeme.png',
            },
            {
                question: "Which rapper has a Jackie Chan meme tattoed?",
                options: ['MadeinTYO', 'T-Pain', 'Big Sean', 'Mac Miller'],
                answer: 'T-Pain',
                picture: 'assets/images/tpain.png',
            },
            {
                question: "Which martial arts master is meme to be famously mind blown?",
                options: ['Jackie Chan', 'Bruce Lee', 'Chuck Norris', 'Master Chu'],
                answer: 'Jackie Chan',
                picture: 'assets/images/jackiechan.jpg',
            },
            {
                question: "Who is the artist of the song featured in the Shooting Star's memes?",
                options: ['MGMT', 'M83', 'Chainsmokers', 'Bag Raiders'],
                answer: 'Bag Raiders',
                picture: 'assets/images/shootingstarmeme.gif',
            },
            {
                question: "Who is the actress from original the math lady/confused thinking meme?",
                options: ['Reese Witherspoon', 'Zach Galifianakis', 'Renata Sorrah', 'Winona Ryder'],
                answer: 'Renata Sorrah',
                picture: 'assets/images/mathlady.gif',
            },
        ]
    }

    // Restart Button to start game back to beginning
    $(document).on("click", "#restartBTN", function () {
        resetValue()
        reset()
        newQuestion()
    });

    // // Calling the game to start //
    initGame()
})
