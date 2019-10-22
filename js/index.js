'use strict';

//Method onBtnSignInClick
function btnSignInOnClick() {
    //Get value from html (index.html)
    var inputEmail = document.getElementById('inputEmail').value;
    var inputPassword = document.getElementById('inputPassword').value;
    var btnSignIn = document.getElementById('btnSignIn');

    if (inputEmail.length < 4) {
        alert('Please enter an email address.');
        return;
    }
    if (inputPassword.length < 4) {
        alert('Please enter a password.');
        return;
    }
    // Sign in with email and pass.
    // [START authwithemail]
    firebase.auth().signInWithEmailAndPassword(inputEmail, inputPassword)
        .catch(function (error) {
            btnSignIn.disabled = true;
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode === 'auth/wrong-password') {

                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
            //document.getElementById('quickstart-sign-in').disabled = false;
            // [END_EXCLUDE]
        });
    btnSignIn.disabled = true;
    // [END authwithemail]
}


// Adds a size to Google Profile pics URLs.
function addSizeToGoogleProfilePic(url) {
    if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
        return url + '?sz=150';
    }
    return url;
}

// Returns the signed-in user's profile Pic URL.
function getProfilePicUrl(profileUrl) {
    return profileUrl || '/image/profile_placeholder.png';
}

//-------------------------------[START] CONSTANST METHOD [START]--------------------------------------------

/**
 * 1. This method is called when the nav signout is clicked.
 * 2. Once it clicked, the authStateChanged will listen and it will proceed to main menu.
 */
function btnSignOutOnClick() {
    firebase.auth().signOut();
}

/*
 * 1. initApp handles setting up UI event listeners and registering Firebase auth listeners:
 * - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 * out, and that is where we update the UI.
 */
function initApp() {
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function (user) {

        if (user) {
            //User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;

            /**
             * 1. We want to get the type of admin and display accordingly.
             * 2. First, we initialize the Firebase Realtime Database.
             * 3. Next, we retrieve the value from the database.
             * 4. const type will get the value type.
             * 5. Once we get the type, we will check them by lists of type of admin.
             * 6. Type = {'Owner' , 'Customer', 'Packages', 'Live Chat', 'Transaction', 'Profit Report'};
             * 7. After that, we only display nav top bar according to the type of admin.
             */
            var database = firebase.database();
            database.ref('/admin/' + uid + '/').on('value', function (snapshot) {
                //Get the value of type and store in var type.
                const type = snapshot.val().type;

                //Checking the type
                if (type === "Owner") {
                    document.getElementById('navLinkSignOut').hidden = false;
                    document.getElementById('navLinkAdmin').hidden = false;
                    document.getElementById('navLinkCustomer').hidden = false;
                    document.getElementById('navLinkPackages').hidden = false;
                    document.getElementById('navLinkTransaction').hidden = false;
                    document.getElementById('navLinkLiveChat').hidden = false;
                } else if (type === "Customer") {
                    document.getElementById('navLinkSignOut').hidden = false;
                    document.getElementById('navLinkCustomer').hidden = false;
                } else if (type === "Packages") {
                    document.getElementById('navLinkSignOut').hidden = false;
                    document.getElementById('navLinkPackages').hidden = false;
                } else if (type === "Live Chat") {
                    document.getElementById('navLinkSignOut').hidden = false;
                    document.getElementById('navLinkLiveChat').hidden = false;
                } else if (type === "Transaction") {
                    document.getElementById('navLinkSignOut').hidden = false;
                    document.getElementById('navLinkTransaction').hidden = false;
                }

                //Get the value
                const username = snapshot.val().username;
                const email = snapshot.val().email;
                const profileUrl = getProfilePicUrl(snapshot.val().profileUrl);

                //Design
                var htmlDetailUser =
                    '<h1>' + username + '</h1>' +
                    '<p><i>' + email + '</i></p>';

                //Set image Profile
                var divImage = document.getElementById('imgProfile');
                divImage.src = addSizeToGoogleProfilePic(profileUrl);

                //Display Information of the admin
                document.getElementById('divDetailUser').innerHTML = htmlDetailUser;
            });
            /**
             * 1. When firebaseAuth user is signed in, we will hide
             *    the formSignIn and then show the formDisplayAdmin.
             */
            document.getElementById('formDisplayAdmin').hidden = false;
            document.getElementById('formSignIn').hidden = true;
        } else {
            /**
             * 1. When firebaseAuth user is not signed in, we will display
             *    the formSignIn and then hide the formDisplayAdmin.
             */
            document.getElementById('formSignIn').hidden = false;
            document.getElementById('formDisplayAdmin').hidden = true;
        }
    });
    // [END authstatelistener]
    document.getElementById('navLinkSignOut').addEventListener('click', btnSignOutOnClick, false);
    document.getElementById('btnSignIn').addEventListener('click', btnSignInOnClick, false);
}

/**
 * 1. Usage of window.onLoad means that, after html completed their display, id, etc...
 *    the window.onLoad will triggered after that.
 * 1. This functions initApp() called once this file is called at the html.
 * 2. It will go trigger this first as the early function.
 */
window.onload = function () {
    initApp();
}
//-------------------------------[END] CONSTANST METHOD [END]--------------------------------------------