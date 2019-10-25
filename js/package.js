'use strict';
var database = firebase.database();

function displayTablePackages() {
    database.ref('packages').once('value', function (snapshot) {
        if (snapshot.exists()) {
            var tablePackages = document.getElementById('tablePackages');
            var content =
                '<th>Image</th>' +
                '<th>Name</th>' +
                '<th>Short Detail</th>' +
                '<th>Place</th>' +
                '<th>Price</th>' +
                '<th>Date</th>' +
                '<th>Start Promotion</th>' +
                '<th>End Promotion</th>' +
                '<th>Promotion</th>';

            snapshot.forEach(function (childSnapshot) {
                //Get the value
                var val = childSnapshot.val();

                var onCreatedDate = val.date;
                var onCreatedDateFinale = new Date(onCreatedDate);
                onCreatedDateFinale = new Date(onCreatedDateFinale.getTime() + (onCreatedDateFinale.getTimezoneOffset() * 60000));

                var dateStartPromotion = val.dateStartPromotion;
                var dateStartPromotionFinale = new Date(dateStartPromotion);
                dateStartPromotionFinale = new Date(dateStartPromotionFinale.getTime() + (dateStartPromotionFinale.getTimezoneOffset() * 60000));

                var dateFinishPromotion = val.dateFinishPromotion;
                var dateFinishPromotionFinale = new Date(dateFinishPromotion);
                dateFinishPromotionFinale = new Date(dateFinishPromotionFinale.getTime() + (dateFinishPromotionFinale.getTimezoneOffset() * 60000));



                content += '<tr>';
                content += '<td><div class="div-image-custom"><img src="' + val.imageUrl + '"/></div></td>';
                content += '<td>' + val.name + '</td>';
                content += '<td>' + val.shortDetail + '</td>';
                content += '<td>' + val.place + '</td>';
                content += '<td>' + val.price + '</td>';
                content += '<td>' + onCreatedDateFinale.toLocaleDateString("en-US") + '</td>';
                content += '<td>' + dateStartPromotionFinale.toLocaleDateString("en-US") + '</td>';
                content += '<td>' + dateFinishPromotionFinale.toLocaleDateString("en-US") + '</td>';
                content += '<td>' + val.promotion + '</td>';
                content += '</tr>';
            });
            //Display at package.html
            tablePackages.innerHTML = content;
        }
    });
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
displayTablePackages();