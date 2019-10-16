'use strict';
var database = firebase.database();

function displayTableAdmin() {
    database.ref('transaction').once('value', function (snapshot) {
        if (snapshot.exists()) {
            var tablePackages = document.getElementById('tableTransaction');
            var content =
                '<th>Transaction Uid</th>' +
                '<th>Admin ID</th>' +
                '<th>Full Name</th>' +
                '<th>Username</th>' +
                '<th>Number Phone</th>' +
                '<th>Email</th>' +
                '<th>Type</th>' +
                '<th>Created Date</th>' +
                '<th>Online</th>';
            snapshot.forEach(function (childSnapshot) {
                //Get the value
                var val = childSnapshot.val();
                const profileUrl = getProfilePicUrl(val.profileUrl);
                const profileUrlFinale = addSizeToGoogleProfilePic(profileUrl);
                content += '<tr>';
                content += '<td><div class="div-image-custom"><img src="' + profileUrlFinale + '"/></div></td>';
                content += '<td>' + val.uid + '</td>';
                content += '<td>' + val.fullName + '</td>';
                content += '<td>' + val.username + '</td>';
                content += '<td>' + val.numberPhone + '</td>';
                content += '<td>' + val.email + '</td>';
                content += '<td>' + val.type + '</td>';
                content += '<td>' + val.onCreatedDate + '</td>';
                content += '<td>' + val.isOnline + '</td>';
                content += '</tr>';
            });
            //Display at package.html
            tablePackages.innerHTML = content;
        }
    });
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
displayTableAdmin();