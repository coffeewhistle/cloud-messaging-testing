$(document).ready(function () {

    var messageKey = '';
    var messageText = '';
    //this is used to determine the session for each chat and only pull from that session
    var localKey = 54321;

    localStorage.setItem("localKey", localKey);

    var config = {
        apiKey: "AIzaSyA5M-HShYfmi1BIVC7_zZlzLp8G9ttmQJw",
        authDomain: "cloud-messaging-testing-177fa.firebaseapp.com",
        databaseURL: "https://cloud-messaging-testing-177fa.firebaseio.com",
        projectId: "cloud-messaging-testing-177fa",
        storageBucket: "cloud-messaging-testing-177fa.appspot.com",
        messagingSenderId: "1012542640461"
    };
    firebase.initializeApp(config);
    var database = firebase.database();

    $("#chat-box").hide();

    $("#start-chat").on("click", function () {
        $("#chat-box").show();
    });

    $("#send-message").on("click", function () {
        messageText = $('#message').val().trim();
        messageKey = 123;
        // console.log(messageText);
        //This will create a new object in the Firebase with name of localKey
        database.ref(localKey).push({
            message: messageText,
            key: messageKey,
            date: Date.now()
        });
    });

    // this will only pull messages from the object in Firebase with this session's localKey
    database.ref(localKey).on("child_added", function (snapshot) {
        var newDiv = $("<div>");
        var msgText = snapshot.val().message;
        var msgDate = moment(snapshot.val().date).format("HH:mm");
        // localKey = snapshot.key;

        console.log(msgText);
        console.log(msgDate);
        console.log(localKey);

        var newMessage = newDiv.text(msgText + " - " + msgDate);

        $("#chat-box").append(newMessage);
    });


});