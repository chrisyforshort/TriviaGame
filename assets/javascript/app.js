$(document).ready(function () {

    // Global Variables //
    var correctCounter = 0;
    var wrongCounter = 0;
    var unanswerCounter = 0;
    var count = 0;
    var time = 5; 
    var interval;
    var asked = [];
    var questionsAsked = 0;   
    var match

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
        time= 5;
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
                },3000);
            }
        }

    // Function of Bringing Up Questions, Options, and Answers
    function newQuestion() {
        timeCount()
        var randomQuestion = questions[Math.floor(questions.length * Math.random())];
            // Need for loop to compare the current randomQuestion with questions in the asked array
            // for (var i=0; i< questios.length; i++){
                // for (var j=0; j<asked.length; j++){
                    // if(questions[i].equals(asked[j])){
                        // match=true;
                    // }
                // }                 
            // }
            
                // Need if statement for if they match then choose new randomQuestion
                    // if (randomQuestion) == ()
                // Need if statement for if they dont match then continue with function
                    // questionsAsked ++
                    // Need if statement for if questionAsked>10 then shows the end game display
                        // endDisplay()
        chosenQuestion = [$(randomQuestion).attr("question")]
        chosenAnswer = [$(randomQuestion).attr("answer")]
        chosenPicture = [$(randomQuestion).attr("picture")]
        $("#questionArea").html(chosenQuestion)
        asked.push(randomQuestion)
        // NEED function to go through options and split them into their own string
        for (var i = 0; i < 4; i++) {
            $("#optionsArea").html("<br><button id='option'>" + randomQuestion.options[i] + "</button>")
            console.log(randomQuestion.options[i])
        }
        // NEED to get the options into their own button options
        // $("#optionsArea").html("<button id='options'>" + chosenOptions + "</button>")
            if ($("#options")==(chosenAnswer)) {
                correctAnswer()
            }
            // Need if statement for if the clicked option does not match the chosenAnswer then 
                // WRcorrectAnswer()
        console.log(chosenQuestion)
    }

    // What happens when an answer is not selected
    function UNcorrectAnswer() {
        unanswerCounter ++;
        var UNanswerDiv = $('<div class="UNcorrAnswer">');
        UNcorrAnswr = UNanswerDiv.append("Time's up!<br><br>The correct answer is:<br>" + chosenAnswer + "<br>" + "<img src='" + chosenPicture + "'style='width:200px;height:200px;'/>")
        $("#questionArea").html(UNcorrAnswr);
        $("#option").hide()
        setTimeout(function(){
            $('div').remove('.UNcorrAnswer');
        },3000);
    }

    // What happens when an incorrect answer is selected
    function WRcorrectAnswer() {
        wrongCounter ++;
        var WRanswerDiv = $('<div class="WRcorrAnswer">');
        WRcorrAnswr = WRanswerDiv.html("Wrong Choice!<br><br>The correct answer is:<br>" + chosenAnswer + "<br>" + "<img src='" + chosenPicture + "'style='width:200px;height:200px;'/>")
        $("#area").append(WRcorrAnswr);
        setTimeout(function(){
            $('div').remove('.WRcorrAnswer');
        },3000);
    }

    // What happens when the correct answer is selected
    function correctAnswer() {
        correctCounter ++;
        var answerDiv = $('<div class="corrAnswer">');
        corrAnswr = answerDiv.append("Correct!<br><br>" + "<img src='" + chosenPicture + "'style='width:200px;height:200px;'/>")
        $("#area").append(corrAnswr);
        setTimeout(function(){
            $('div').remove('.corrAnswer');
        },3000);
    }

    // NEED function to show what happens at the end of the game
        // Shows all 3 Counter totals
        // end = endDiv.html("End of the Road, your final scores:<br>" + "" + chosenPicture + "'style='width:200px;height:200px;'/>")
        // $("#area").html(end);
        // restartBTN.show()
    // 


    // NEED function to Push ask Array back into the questions Array (backtoQuestions)
        // Code Here
    // 

    // NEED Restart Button function to start restart functions
        // questionsAsked = 0
        // backtoQuestions()

    // // Calling the game to start //
    initGame()
})
