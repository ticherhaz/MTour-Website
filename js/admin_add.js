'use strict';

//Initialize the Firebase
var database = firebase.database();

//Get the date as ISO string
var date = new Date().toISOString();

/**
 * 1. We linked them from admin_add.html to here as variables var.
 * 2. While we linked them, we also get the value of the input. ".value"
 * 3. After that, all the value from the html is transfered in here.
 */
var username = document.getElementById('inputUsername').value;
var fullName = document.getElementById('inputFullName').value;
var type = document.getElementById('inputType').value;
var email = document.getElementById('inputEmail').value;
var password = document.getElementById('inputPassword').value;
var confirmPassword = document.getElementById('inputConfirmPassword').value;


function btnInsertOnClick() {
    if (username.length < 3) {
        alert('Username is not good');
        return;
    }
    if(fullName.length < 3){
        alert('Full Name is not valid');
        return;
    }
    if(type.length < 3){

    }
    checkInput();
}

function insertData() {
    writeNewPost("uid", username, "picture", type, timezone);
}

function writeNewPost(uid, username, picture, title, body) {
    // A post entry.
    var postData = {
        author: username,
        uid: uid,
        body: body,
        title: title,
        starCount: 0,
        authorPic: picture
    };

    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().child('zuh').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/zuh/' + newPostKey] = postData;
    updates['/zuh-posts/' + uid + '/' + newPostKey] = postData;

    return firebase.database().ref().update(updates);
}


//---------------------------------------------------------------------------------------

//Method signOut
function btnSignOutOnClick() {
    firebase.auth().signOut();
}
/*
 * * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 * * - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 * * out, and that is where we update the UI.
 */
function initApp() {
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function (user) {

        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;

            //Display all the nav link when user is logging and display navlinksignout
            document.getElementById('navLinkSignOut').hidden = false;
            document.getElementById('navLinkAdmin').hidden = false;
            document.getElementById('navLinkCustomer').hidden = false;
            document.getElementById('navLinkPackages').hidden = false;
            document.getElementById('navLinkTransaction').hidden = false;
            document.getElementById('navLinkLiveChat').hidden = false;
        } else {
            Console.log('User signed out');
        }
    });
    // [END authstatelistener]
    document.getElementById('navLinkSignOut').addEventListener('click', btnSignOutOnClick, false);
    document.getElementById('btnAdd').addEventListener('click', btnInsertOnClick, false);
}
initApp();