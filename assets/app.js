$(function() {

    // Initailize Firebase
    var config = {
        apiKey: "AIzaSyB32djvSzlGPe51idikpEFm8nzgpp5BRcI",
        authDomain: "myapp-799af.firebaseapp.com",
        databaseURL: "https://myapp-799af.firebaseio.com",
        projectId: "myapp-799af",
        storageBucket: "myapp-799af.appspot.com",
        messagingSenderId: "711982918736",
        appId: "1:711982918736:web:5dda086dc2cd49047f3555",
        measurementId: "G-VMLLQBMJ3B"
    };

    firebase.initializeApp(config);

    var database = firebase.database();

    // Create button to add train
    $("#add-train-btn").on("click", function(event) {
        event.preventDefault();

        // var to store user input
        var trainName = $("#train-name-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var firstTrain = moment($("#time-input").val().trim(), "HH:mm");
        var frequency = $("frequency-input").val().trim();
        
        // create local var to store train data as attr
        var newTrain = {
            TrainName: trainName,
            Destination: destination,
            FirstTrainTime: firstTrain,
            Frequency: frequency
        };

        // Uploads train data to the database
        database.ref().push(newTrain);

        // console log to check
        console.log(newTrain.TrainName);
        console.log(newTrain.Destination);
        console.log(newTrain.FirstTrainTime);
        console.log(newTrain.Frequency);

        // clear all input text
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#time-input").val("");
        $("frequency-input").val("");

    });

    // create firebase event for adding new train and append new data to html DOM.
    database.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val());

        // retrive firebase data and store to var
        var trainName = childSnapshot.val().TrainName;
        var Destination = childSnapshot.val().Destination;
        var FirstTrainTime = childSnapshot.val().FirstTrainTime;
        var Frequency = childSnapshot.val().Frequency;

        // console.log new train info
        console.log(TrainName);
        console.log(Destination);
        console.log(FirstTrainTime);
        console.log(Frequency);

        //set time format
        var nextArrival = moment.unix(NextArrival).format("HH:mm");
        var frequency = moment.unix(Frequency).format("mm");
        var minAway = moment.unix(MinAway).format("mm");

        // calculate next arrival, minutes away from current time.
        var firstTrainConverted = moment(FirstTrainTime, "HH:mm").subtract("1, days");
        console.log(firstTrainConverted);

        var difference = moment().diff(moment(firstTrainConverted), "minutes");
        console.log(difference);

        var remainder = difference % frequency;
        console.log("remainder: " + remainder);

        var MinAway = frequency - remainder;
        console.log("minutes away: " + MinAway);

        var NextArrival = moment().add(MinAway, "minutes").format("HH:mm");
        console.log("next arrival: " + NextArrival);

        // create new row 
        var newRow = $("<tr>".append(
            $("<td>").text(TrainName),
            $("<td>").text(Destination),
            $("<td>").text(Frequency),
            $("<td>").text(NextArrival),
            $("<td>").text(MinAway)
        ));

        // append new row to html DOM
        $("#train-table").append(newRow);
    });


});