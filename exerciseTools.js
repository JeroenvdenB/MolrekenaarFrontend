function getRandomExercise(seed) {
    //Switch number to a page readout once that's a button
    //Switch type to "Random" once back-end supports that
    var number = 10;
    var questionType = "MassMol";
    if (seed == undefined) {
        seed = Date.now();
    }
    fetchExercise(questionType, number, seed);
}

async function fetchExercise(questionType, number, seed) {
    var response = await fetch(url + "generateExercise/" + questionType + "/" + number + "/" + seed);
    var exercise = await response.json();
    displayExercise(exercise);   
}  

function displayExercise(exercise) {
    var numberOfQuestions = exercise.questionsList.length;
    var exerciseHTML = "";
    var answersHTML = "";
    for (var i = 0; i < numberOfQuestions; i++) {
        exerciseHTML += "<p>" + (i+1) + ") " + exercise.questionsList[i].questionText + "</p>";
        answersHTML += "<p>" + (i+1) + ") " + exercise.questionsList[i].answerKeyString + "</p>";
    }

    exerciseHTML += "<br><p><span class='code-text'> code: " + exercise.seed + "</span> </p>";
    
    $("#exercisePlaceholder").html(exerciseHTML);
    $("#answersPlaceholder").html(answersHTML);
}
