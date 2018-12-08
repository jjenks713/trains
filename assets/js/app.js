  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDbsmjA_IrNDpb5v7olPhVLvjcyNRMWofQ",
    authDomain: "train-schedule-e0c52.firebaseapp.com",
    databaseURL: "https://train-schedule-e0c52.firebaseio.com",
    projectId: "train-schedule-e0c52",
    storageBucket: "train-schedule-e0c52.appspot.com",
    messagingSenderId: "954538934397"
  };

          firebase.initializeApp(config);
        
          var database = firebase.database();

        // add var for moment.js
        var firstTime = $("#first-time").val().trim();
        var randomFormat = "MM/DD/YYYY";
        var convertTime = moment(firstTime, randomFormat);

        //   on click button to submit val to firebase
                $("#submit").on("click", function () {
                    event.preventDefault();
                    var name = $("#train-name").val().trim();
                    var destination = $("#destination").val().trim();
                    var frequency = $("#frequency").val().trim();

                // collect and calculate moment.js info
                    
                    var nextArrival = convertTime.fromNow();
                    var moneysPaid = monthsWorked * monthlyRate;
        
                    console.log("anything");
                // push data to Firebase
                    database.ref().push({
                    name: name,
                    destination: destination,
                    frequency: frequency
                  });
                  
        
                });
        
        
            // database.ref() function taking database info back to HTML
            // Firebase watcher + initial loader .on("child_added")
            database.ref().on("child_added", function(childSnapshot) {

            // collect data from Firebase
              $("#train-name").text(childSnapshot.val().name);
              $("#destination").text(childSnapshot.val().destination);
            //   $("#first-time").text(childSnapshot.val().startDate);
              $("#frequency").text(childSnapshot.val().frequency);    

            // push data to HTML
              $("#th-body").append("<tr><td>" + childSnapshot.val().name + "</td>" +
              "<td>" + childSnapshot.val().destination + "</td>" +
              "<td>" + childSnapshot.val().frequency + " Minutes</td>" +
              "<td></td>" +
              "<td></td></tr>");
              
            });  

            // for reference
        // (TEST)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 7 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:21 -- 5 minutes away
    // ==========================================================
    // Solved Mathematically
    // Test case 2:
    // 16 - 00 = 16
    // 16 % 7 = 2 (Modulus is the remainder)
    // 7 - 2 = 5 minutes away
    // 5 + 3:16 = 3:21
    // // Assumptions
    // var tFrequency = 3;

    // // Time is 3:30 AM

    // var firstTime = "03:30";

    // // First Time (pushed back 1 year to make sure it comes before current time)

    // var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    // console.log(firstTimeConverted);

    // // Current Time

    // var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // // Difference between the times

    // var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);

    // // Time apart (remainder)

    // var tRemainder = diffTime % tFrequency;
    // console.log(tRemainder);

    // // Minute Until Train

    // var tMinutesTillTrain = tFrequency - tRemainder;
    // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // // Next Train
    
    // var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));