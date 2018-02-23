$(document).ready(function () {

    // Global Variables //
    var correctCounter = 0;
    var wrongCounter = 0;
    var unanswerCounter = 0;
    var count = 0;
    var time = 10; 
    var asked = [];
    var questionsAsked = 0;   
    var match;
    var userSelected;
    var interval;

    // Question Attributes //
    var questions = [
        {
            question: 'Which frog is known for drinking tea?',
            options: ['Kermit','Pepe','Frogger','Mr. Toad'],
            answer: 'Kermit',
            picture: 'assets/images/kermitDrinkMeme.png',
            usedQ: false,
        },
        {
            question: 'What is the breed of the Doge?',
            options: ['Shiba Inu','French Bulldog','Huskie','Golden Retriever'],
            answer: 'Shiba Inu',
            picture: 'assets/images/codedoge.jpg',
            usedQ: false,
        },
        {
            question: 'What is the saying used for memes with an 8-bit sunglasses and a cigerete?',
            options: ['Say No to Drugs','Thug Life','Later Haters','Future Too Bright'],
            answer: 'Thug Life',
            picture: 'assets/images/Thug-Life-Cool-Glasses-PNG.png',
            usedQ: false,
        },
        {
            question: 'What recent horror film remake sparked a flood of memes luring people into a sewer?',
            options: ['It','Saw','Black Mirror','Insidious'],
            answer: 'It',
            picture: 'assets/images/itMeme.jpg',
            usedQ: false,
        },
        {
            question: 'Nyan cat in a combination of cat and what other thing?',
            options: ['Naan','Yam','Nylon','Pop Tart'],
            answer: 'Pop Tart',
            picture: 'assets/images/nyanCat.gif',
            usedQ: false,
        },
        {
            question: "What is Willy Wonka's state in his memes?",
            options: ['Livid','Sad','Condescending','Happy'],
            answer: 'Condescending',
            picture: 'assets/images/willywonkameme.jpg',
            usedQ: false,
        },
        {
            question: 'Where is the famous Troll face from?',
            options: ['Rage Comic','Tumblr','Reddit','John Willkin Comics'],
            answer: 'Rage Comic',
            picture: 'assets/images/trollface.jpg',
            usedQ: false,
        },
        {
            question: 'Where is the aint nobody got time for that meme originate from?',
            options: ['Reddit','Comic Book','Television Show','TV Interview'],
            answer: 'TV Interview',
            picture: 'assets/images/cold-weather-meme.jpg',
            usedQ: false,
        },
        {
            question: 'Which illustration is not a version of Pepe the Frog?',
            options: ['Feels Good Man','Angry Pepe','Sad Frog','Pepe Hungry'],
            answer: 'Pepe Hungry',
            picture: 'assets/images/pepe-frog-640x480.jpg',
            usedQ: false,
        },
        {
            question: 'Which actor is featured in the roll safe meme?',
            options: ['Kayode Ewumi','Kevin Hart','Larry the Cable Guy','Will Ferrel'],
            answer: 'Kayode Ewumi',
            picture: 'assets/images/rollsafe.jpg',
            usedQ: false,
        },
    ]

    // Game start function //
    function initGame() {
        $("#restartBTN").hide()
        $("#countdown").hide()
        }
    
    // Function to decrease the time by an interval of 1 second
    function timeCount() {
        time= 10;
        interval=setInterval(timeRemaining,1000);
    }

    // // What happens when you hit the Start Button //
    $("#startBTN").on("click", function(){
        $("#startBTN").hide()
        $("#countdown").show()
        newQuestion()
    })

    //  Timer and Function to decrease the time in the timer
    function timeRemaining() {
        time--;
        $("#countdown").html("Time Left : "+ time +" seconds")
            // When the timer reaches 0
            if (time == 0) {
                clearInterval(interval);
                UNcorrectAnswer()
                setTimeout(function(){
                    newQuestion();
                },4000);
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
        $("#questionArea").html(chosenQuestion)
        $(randomQuestion).attr('usedQ', true)
        asked.push(randomQuestion)
        questionsAsked ++
        $("#optionsArea").show()
        console.log(asked)
        console.log(questions)
        if (questionsAsked === 11) {
            clearInterval(interval); 
            endGame ()
        }
        // For loop to append the different options as buttons
        for (var i = 0; i < 4; i++) {
            $("#optionsArea").append("<br><button id='option' value='"+randomQuestion.options[i]+"'>" + randomQuestion.options[i] + "</button>")
        }
    // }
        // NEED else statement so that when value usedQ is true it will run function to choose need word
    }

    $(document).on("click", "#option", function () {
        userSelected = $(this).attr("value")
        if (userSelected == chosenAnswer){
            correctAnswer()
        }
        else {
            wrongAnswer()
        }
    });

    // What happens when an answer is not selected
    function UNcorrectAnswer() {
        unanswerCounter ++;
        var UNanswerDiv = $('<div class="UNcorrAnswer">');
        UNcorrAnswr = UNanswerDiv.append("Time's up!<br><br>The correct answer is:<br>" + chosenAnswer + "<br><br>" + "<img src='" + chosenPicture + "'style='width:200px;height:200px;'/>")
        $("#questionArea").html(UNcorrAnswr);
        $("#optionsArea").empty()
        setTimeout(function(){
            $('div').remove('.UNcorrAnswer');
        },4000);
    }

    // What happens when an incorrect answer is selected
    function wrongAnswer() {
        wrongCounter ++;
        var WRanswerDiv = $('<div class="WRcorrAnswer">');
        WRanswr = WRanswerDiv.html("Wrong Choice!<br><br>The correct answer is:<br>" + chosenAnswer + "<br><br>" + "<img src='" + chosenPicture + "'style='width:200px;height:200px;'/>")
        $("#questionArea").html(WRanswr);
        $("#optionsArea").empty()
        clearInterval(interval); 
        setTimeout(function(){
            $('div').remove('.WRcorrAnswer');
            newQuestion();
        },4000);
    }

    // What happens when the correct answer is selected
    function correctAnswer() {
        correctCounter ++;
        var answerDiv = $('<div class="corrAnswer">');
        corrAnswr = answerDiv.append("Much correct, such awesome!<br><br>" + "<img src='" + chosenPicture + "'style='width:200px;height:200px;'/>")
        $("#questionArea").html(corrAnswr);
        $("#optionsArea").empty()
        clearInterval(interval); 
        setTimeout(function(){
            $('div').remove('.corrAnswer');
            newQuestion();
        },4000);
    }

    // Function to show what happens at the end of the game
    function endGame () {
        reset();
        var endDiv = $('<div class="ending">');
        end = endDiv.html("End of the Road, your final results: <br>" + "<p>Correct Answers: " +correctCounter+"</p>" +
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
        questions.usedQ = false
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
