'use strict';
var database = firebase.database();
var timezone = new Date().getTimezoneOffset();

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
    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function (user) {
        // [START_EXCLUDE silent]
        //document.getElementById('quickstart-verify-email').disabled = true;
        // [END_EXCLUDE]
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
            // // [START_EXCLUDE]
            // document.getElementById('quickstart-sign-in').textContent = 'Sign out';
            // document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
            // if (!emailVerified) {
            //     document.getElementById('quickstart-verify-email').disabled = false;
            // }
            // // [END_EXCLUDE]
        } else {
            // User is signed out.
            // // [START_EXCLUDE]
            // document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
            // document.getElementById('quickstart-sign-in').textContent = 'Sign in';
            // document.getElementById('quickstart-account-details').textContent = 'null';
            // // [END_EXCLUDE]
        }
    });
    document.getElementById('navLinkSignOut').addEventListener('click', btnSignOutOnClick, false);
}
initApp();