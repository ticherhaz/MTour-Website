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
            //User is signed in.
            var uid = user.uid;
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
                    document.getElementById('navLinkProfitReport').hidden = false;
                } else if (type === "Customer") {
                    document.getElementById('navLinkSignOut').hidden = false;
                    document.getElementById('navLinkCustomer').hidden = false;
                } else if (type === "Packages") {
                    document.getElementById('navLinkSignOut').hidden = false;
                    document.getElementById('navLinkPackages').hidden = false;
                } else if (type === "Profit Report") {
                    document.getElementById('navLinkSignOut').hidden = false;
                    document.getElementById('navLinkProfitReport').hidden = false;
                } else if (type === "Transaction") {
                    document.getElementById('navLinkSignOut').hidden = false;
                    document.getElementById('navLinkTransaction').hidden = false;
                }
            });
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