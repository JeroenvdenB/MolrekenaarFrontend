function getRandomExercise(seed) {
    //Switch number to a page readout once that's a button
    //Switch type to "Random" once back-end supports that
    var number = 10;
    if (seed == undefined) {
        seed = Date.now();
    }
    fetchExercise(number, seed);
}

async function fetchExercise(number, seed) {
    var response = await fetch(url + "generateRandomExercise/" + number + "/" + seed);
    var exercise = await response.json();
    displayExercise(exercise);   
}  

function displayExercise(exercise) {
    var numberOfQuestions = exercise.questionsList.length;
    var exerciseHTML = "";
    var answersHTML = "";
    for (var i = 0; i < numberOfQuestions; i++) {
        exerciseHTML += "<p>" + (i+1) + ") " + exercise.questionsList[i].questionText.replaceAll(".",",") + ".</p>";
        answersHTML += "<p>" + (i+1) + ") " + exercise.questionsList[i].answerKeyString + "</p>";
    }

    exerciseHTML += "<br><p><span class='code-text'> code: " + exercise.seed + "</span> </p>";
    answersHTML = answersHTML.replaceAll(".", ",");
    
    $("#exercisePlaceholder").html(exerciseHTML);
    $("#answersPlaceholder").html(answersHTML);
}
