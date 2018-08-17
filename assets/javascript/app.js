$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAy3Ery7U0PL1Z8H3Krtxs7m_85cMj9DVo",
        authDomain: "test-authentication-1d263.firebaseapp.com",
        databaseURL: "https://test-authentication-1d263.firebaseio.com",
        projectId: "test-authentication-1d263",
        storageBucket: "test-authentication-1d263.appspot.com",
        messagingSenderId: "473943358124"
    };

    firebase.initializeApp(config);

    // Create a variable to reference the database
    var database = firebase.database();

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
 
            // User is signed in.
            $("#user_div").css("display", "block");
            $("#login_div").css("display", "none");

            var user = firebase.auth().currentUser;

            if (user != null) {
                var email_id = user.email;
                $("#user_para").html("Welcome: " + email_id + "!");

            }

            // var userId = firebase.auth().currentUser.uid;

             firebase.database().ref('users/-LK3XYOWzKAgxbyHfyNx').once('value').then(function (snapshot) {
                $("#total_score").html("Total Points: " + snapshot.val().totalPoints);
            });

        } else {
            // No user is signed in.
            $("#user_div").css("display", "none");
            $("#login_div").css("display", "block");
        }
    });

    $("#create-input").on("click", function () {

        var userEmail = $("#email-input").val().trim();
        var userPass = $("#password-input").val().trim();

        
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            $("#loginError").html(errorMessage);
            // ...
        });

        



    });

    $("#login-input").on("click", function () {

        var userEmail = $("#email-input").val().trim();
        var userPass = $("#password-input").val().trim();

        firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            $("#loginError").html(errorMessage);
            // ...
        });


    });

    $("#logout-input").on("click", function () {
        $("#email-input").val("");
        $("#password-input").val("");
        $("#loginError").html("");

        firebase.auth().signOut();
    });

});