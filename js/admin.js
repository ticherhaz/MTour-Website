'use strict';
var database = firebase.database();
var timezone = new Date().getTimezoneOffset();

// function btnTableDataUidOnClick() {
//     var valueTableData = document.getElementById('tableDataUid').value;

//     alert('Table Uid Clicked: ' + valueTableData);
// }

function btnEditOnClick(value) {
    //var newValue = document.getElementById('tdUid').innerHTML;
    var adminUid = value.innerText;
    localStorage.setItem("adminUid", adminUid);
    alert(adminUid);
    // window.location = "admin_edit.html";
}

function displayTableAdmin() {
    database.ref('admin').once('value', function (snapshot) {
        if (snapshot.exists()) {
            var tablePackages = document.getElementById('tableAdmin');
            var content =
                '<th>Picture</th>' +
                '<th>Admin ID</th>' +
                '<th>Full Name</th>' +
                '<th>Username</th>' +
                '<th>Number Phone</th>' +
                '<th>Email</th>' +
                '<th>Type</th>' +
                '<th>Created Date</th>' +
                '<th>Online</th>' +
                '<th>Edit</th>';
            snapshot.forEach(function (childSnapshot) {
                //Get the value
                var val = childSnapshot.val();
                const profileUrl = getProfilePicUrl(val.profileUrl);
                const profileUrlFinale = addSizeToGoogleProfilePic(profileUrl);
                var onCreatedDate = val.onCreatedDate;
                var onCreatedDateFinale = new Date(onCreatedDate);
                onCreatedDateFinale = new Date(onCreatedDateFinale.getTime() + (onCreatedDateFinale.getTimezoneOffset() * 60000));

                content += '<tr>';
                content += '<td><div class="div-image-custom"><img src="' + profileUrlFinale + '"/></div></td>';
                content += '<td id="tdUid">' + val.uid + '</td>';
                content += '<td>' + val.fullName + '</td>';
                content += '<td>' + val.username + '</td>';
                content += '<td>' + val.numberPhone + '</td>';
                content += '<td>' + val.email + '</td>';
                content += '<td>' + val.type + '</td>';
                content += '<td>' + onCreatedDateFinale.toLocaleDateString("en-US") + '</td>';
                content += '<td>' + val.isOnline + '</td>';
                content += '<td><button  onclick="btnEditOnClick(this)"  type="button" value="' + val.uid + '">Edit</button></td>';
                content += '</tr>';

            });
            //Display at admin.html
            tablePackages.innerHTML = content;
            //document.getElementById('tableDataUid').addEventListener('click', btnTableDataUidOnClick, false);

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
            database.ref('admin/' + uid + '/').on('value', function (snapshot) {
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
            Console.log('User signed out');
        }
    });
    // [END authstatelistener]
    document.getElementById('navLinkSignOut').addEventListener('click', btnSignOutOnClick, false);
}

/**
 * 1. Usage of window.onLoad means that, after html completed their display, id, etc...
 *    the window.onLoad will triggered after that.
 * 1. This functions initApp() called once this file is called at the html.
 * 2. It will go trigger this first as the early function.
 */
window.onload = function () {
    initApp();
    displayTableAdmin();
}
//-------------------------------[END] CONSTANST METHOD [END]--------------------------------------------