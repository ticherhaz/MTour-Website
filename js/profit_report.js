'use strict';
var database = firebase.database();
var timezone = new Date().getTimezoneOffset();

function displayTableTransaction() {
    database.ref('profitReport').once('value', function (snapshot) {
        if (snapshot.exists()) {
            var tablePackages = document.getElementById('tableProfitReport');
            var content =
                '<th>Package Image</th>' +
                '<th>Package Name</th>' +
                '<th>Username</th>' +
                '<th>User Profile</th>' +
                '<th>Price (RM)</th>' +
                '<th>Cost Activity (RM)</th>' +
                '<th>Cost Hotel (RM)</th>' +
                '<th>Cost Tour Guide (RM)</th>' +
                '<th>Service Tax (RM)</th>' +
                '<th>Service Charges (RM)</th>' +
                '<th>Final Cost (RM)</th>' +
                '<th>On Date Purchased (RM)</th>';
            snapshot.forEach(function (childSnapshot) {
                //Get the value
                var val = childSnapshot.val();
                const packageName = val.packageName;
                const userName = val.userName;

                const price = val.price;
                const costActivity = val.costActivity;
                const costHotel = val.costHotel;
                const costTourGuide = val.costTourGuide;
                const serviceTax = val.serviceTax;
                const serviceCharges = val.serviceCharges;
                const finalCost = val.finalCost;

                const packageUrl = getProfilePicUrl(val.packageImageUrl);
                const packageUrlFinale = addSizeToGoogleProfilePic(packageUrl);

                const userProfileUrl = getProfilePicUrl(val.userProfileUrl);
                const userProfileUrlFinale = addSizeToGoogleProfilePic(userProfileUrl);

                var onCreatedDate = val.onDatePurchased;
                var onCreatedDateFinale = new Date(onCreatedDate);
                onCreatedDateFinale = new Date(onCreatedDateFinale.getTime() + (onCreatedDateFinale.getTimezoneOffset() * 60000));
                onCreatedDateFinale = onCreatedDateFinale.toLocaleDateString("en-US");

                content += '<tr>';
                content += '<td><div class="div-image-custom"><img src="' + packageUrlFinale + '"/></div></td>';
                content += '<td>' + packageName + '</td>';
                content += '<td>' + userName + '</td>';
                content += '<td><div class="div-image-custom"><img src="' + userProfileUrlFinale + '"/></div></td>';
                content += '<td>' + price.toFixed(2); + '</td>';
                content += '<td>' + costActivity.toFixed(2); + '</td>';
                content += '<td>' + costHotel.toFixed(2); + '</td>';
                content += '<td>' + costTourGuide.toFixed(2); + '</td>';
                content += '<td>' + serviceTax.toFixed(2); + '</td>';
                content += '<td>' + serviceCharges.toFixed(2); + '</td>';
                content += '<td>' + finalCost.toFixed(2); + '</td>';
                content += '<td>' + onCreatedDateFinale + '</td>';
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