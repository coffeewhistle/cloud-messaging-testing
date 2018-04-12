$(document).ready(function () {

    var messageKey = '';
    var messageText = '';

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
        console.log(messageText);
        database.ref('messages').push({
            message: messageText,
            key: messageKey,
            date: Date.now()
        });
    });

    database.ref('messages').on("child_added", function (snapshot) {
        var newDiv = $("<div>");
        var msgText = snapshot.val().message;
        var msgDate = moment(snapshot.val().date).format("HH:mm");

        console.log(msgText);
        console.log(msgDate);

        var newMessage = newDiv.text(msgText + " - " + msgDate);

        $("#chat-box").append(newMessage);
    });

    function writeMessage(message) {
        var newDiv = $("<div>");

        $("#message").prepend(newMessage)
    }


});