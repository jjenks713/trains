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
        var convertDate = moment(dateInput, randomFormat);

        //   on click button to submit val to firebase
                $("#submit").on("click", function () {
                    event.preventDefault();
                    var name = $("#train-name").val().trim();
                    var destination = $("#destination").val().trim();
                    var frequency = $("#frequency").val().trim();

                // collect and calculate moment.js info
                    
                    var monthsWorked = convertDate.fromNow();
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

            var randomDate = "02/23/1999";
            var randomFormat = "MM/DD/YYYY";
            var convertDate = moment(randomDate, randomFormat);
        
            // Using scripts from moment.js write code below to complete each of the following.
            // Console.log to confirm the code changes we made worked.
            console.log(convertDate.format('MMMM Do YYYY, h:mm:ss a'));
            console.log(convertDate.format('dddd'));
            console.log(convertDate.format('x'));
            console.log(convertDate.format('MM/DD/YYYY'));
        
            // 1 ...to convert the randomDate into three other date formats
            // 2 ...to determine the time in years, months, days between today and the randomDate
            console.log(convertDate.fromNow());
            console.log(convertDate.diff(moment(), "years"));
            console.log(convertDate.diff(moment(), "months"));
            console.log(convertDate.diff(moment(), "days"));