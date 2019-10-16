'use strict';
//Get a reference to the database service
//var database = firebase.database();
//var textRef = database.ref('admin');

//Method signOut
function btnSignOutOnClick() {
    firebase.auth().signOut();
}

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
        .catch(function
            (error) {
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

// //Method onBtnSubmitClick
// function btnSubmitOnClick() {
//     textRef.set(textHere.value, function (error) {
//         if (error) {
//             console.log(error.message);
//         } else {
//             console.log("Success Update Data");
//         }
//     });
// }

// textRef.on('value', function(snapshot) {
//     displaySexy.innerHTML = snapshot.val();
// });

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

/**
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
            console.log("email: " + email);
            //Display all the nav link when user is logging and display navlinksignout
            document.getElementById('navLinkSignOut').hidden = false;
            document.getElementById('navLinkAdmin').hidden = false;
            document.getElementById('navLinkCustomer').hidden = false;
            document.getElementById('navLinkPackages').hidden = false;
            document.getElementById('navLinkTransaction').hidden = false;
            document.getElementById('navLinkLiveChat').hidden = false;
            document.getElementById('formDisplayAdmin').hidden = false;
            //Hide form sign in
            document.getElementById('formSignIn').hidden = true;

            //Get a reference to the database service
            var database = firebase.database();
            database.ref('admin/' + uid + '/').on('value', function (snapshot) {
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



            // // [START_EXCLUDE]
            // document.getElementById('quickstart-sign-in').textContent = 'Sign out';
            // document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
            // if (!emailVerified) {
            //     document.getElementById('quickstart-verify-email').disabled = false;
            // }
            // // [END_EXCLUDE]
        } else {
            //Display form sign in
            document.getElementById('formSignIn').hidden = false;
            // User is signed out.
            // // [START_EXCLUDE]
            // document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
            // document.getElementById('quickstart-sign-in').textContent = 'Sign in';
            // document.getElementById('quickstart-account-details').textContent = 'null';
            // // [END_EXCLUDE]
        }
    });
    // [END authstatelistener]
    document.getElementById('btnSignIn').addEventListener('click', btnSignInOnClick, false);
    document.getElementById('navLinkSignOut').addEventListener('click', btnSignOutOnClick, false);
}
// window.onload = function () {
//     initApp();
// };

initApp();