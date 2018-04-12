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
        console.log(messageText);
        database.ref().push({
            message: messageText
        });

        database.ref().on("value", function (snapshot) {
            messageKey = snapshot.key;
            console.log(messageKey);
        });
    });
});