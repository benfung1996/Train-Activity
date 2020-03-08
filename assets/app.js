$function() {

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
        var firstTrain = $("#time-input").val().trim();
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

        
    })


}