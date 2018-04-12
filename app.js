$(document).ready(function () {

    var messageKey = '';
    var messageText = '';
    var localKey = '';
    var userName = '';


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
        var randStr = "";
        for (var letter = 1; letter <= 8; letter++) {
            randStr += letter % 2 == 0 ? String.fromCharCode(Math.random() * (91 - 65) + 65) : Math.ceil(Math.random() * 9);
        }
        console.log(randStr);
        //this is used to determine the session for each chat and only pull from that session
        localKey = randStr;

        if (localStorage.getItem("localKey") === null) {
            localStorage.setItem("localKey", localKey);
        } else {
            localKey = localStorage.getItem("localKey");
        }
    });

    $("#send-message").on("click", function () {
        messageText = $('#message').val().trim();
        userName = $("#name").val().trim();
        // console.log(messageText);
        //This will create a new object in the Firebase with name of localKey
        database.ref(localKey).push({
            message: messageText,
            date: Date.now(),
            storedKey: localKey,
            userName: userName

        });
    });

    // this will only pull messages from the object in Firebase with this session's localKey
    database.ref().on("child_added", function (snapshot) {
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