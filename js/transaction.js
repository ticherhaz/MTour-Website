'use strict';
var database = firebase.database();
var timezone = new Date().getTimezoneOffset();

function displayTableTransaction() {
    database.ref('transaction').once('value', function (snapshot) {
        if (snapshot.exists()) {
            var tablePackages = document.getElementById('tableTransaction');
            var content =
                '<th>Package</th>' +
                '<th>Transaction Uid</th>' +
                '<th>Package Uid</th>' +
                '<th>Customer Uid</th>' +
                '<th>Package Name</th>' +
                '<th>Price</th>' +
                '<th>Quantity</th>' +
                '<th>Date</th>';
            snapshot.forEach(function (childSnapshot) {
                //Get the value
                var val = childSnapshot.val();
                const packageUrl = getProfilePicUrl(val.imageUrl);
                const packageUrlFinale = addSizeToGoogleProfilePic(packageUrl);

                var onCreatedDate = val.time;
                var onCreatedDateFinale = new Date(onCreatedDate);
                onCreatedDateFinale = new Date(onCreatedDateFinale.getTime() + (onCreatedDateFinale.getTimezoneOffset() * 60000));

                content += '<tr>';
                content += '<td><div class="div-image-custom"><img src="' + packageUrlFinale + '"/></div></td>';
                content += '<td>' + val.pushid + '</td>';
                content += '<td>' + val.packageid + '</td>';
                content += '<td>' + val.uid + '</td>';
                content += '<td>' + val.packagePlace + '</td>';
                content += '<td>' + val.price + '</td>';
                content += '<td>' + val.quantity + '</td>';
                content += '<td>' + onCreatedDateFinale.toLocaleDateString("en-US") + '</td>';
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
displayTableTransaction();