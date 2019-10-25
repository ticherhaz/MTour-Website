'use strict';

/**
 * [IMPORTANT]
 * [TODO]
 * 1. Since we just only have one button which is add admin,
 *    we put all the variables inside the method (function) btnInsertOnClick().
 * 2. Flow of this js is, when admin store all the data of new admin, actually it
 *    will save in the child 'adminPending' only, store with the password.
 */

/**
 * 1. Get the value adminUid from the localStorage
 */
var adminUid = localStorage.getItem("adminUid");

function setDivAdminUid() {
    
    //Display Information of the admin
    document.getElementById('divAdminUid').innerHTML = adminUid;
}

/**
 * 1. This is the method (function) when the button is clicked.
 * 2. After that, it will triggered here.
 */
function btnInsertOnClick() {
    /**
     * 1. We linked them from admin_add.html to here as variables var.
     * 2. While we linked them, we also get the value of the input. ".value"
     * 3. After that, all the value from the html is transfered in here.
     */
    var username = document.getElementById('inputUsername').value;
    var fullName = document.getElementById('inputFullName').value;
    var type = document.getElementById('inputType').value;
    var email = document.getElementById('inputEmail').value;
    var numberPhone = document.getElementById('inputNumberPhone').value;
    var password = document.getElementById('inputPassword').value;
    var confirmPassword = document.getElementById('inputConfirmPassword').value;
    /**
     * 1. We validate the inputs and the password is match or not.
     */
    if (username.length < 3) {
        alert('Username is not valid');
        return;
    }
    if (fullName.length < 3) {
        alert('Full Name is not valid');
        return;
    }
    if (type.length < 3) {
        alert('Type is not valid');
        return;
    }
    if (email.length < 4) {
        alert('Email is not valid');
        return;
    }
    if (numberPhone.length < 10) {
        alert('Number Phone is not valid');
        return;
    }
    if (password.length < 8) {
        alert('Password must length above 8 digits');
        return;
    }
    if (password !== confirmPassword) {
        alert('Password is not matched, please try again');
        return;
    }

    /**
     * 1. Initialize the Realtime Database.
     * 2. Now, we are linked with the Firebase.
     * 3. database is usable and has property for Firebase.
     */
    var database = firebase.database();

    /**
     * 1. Create the pushUid for this particular admin
     *    as adminPendingUid.
     */
    var adminPendingUid = database.ref().push().key;

    /**
     * 1. Get the value of date as ISO.
     * 2. Want to convert to local at mobile version.
     * 3. ISO is readable and get the UTC timezone.
     */
    var date = new Date().toISOString();

    /**
     * 1. After all the inputs are valid, we proceed to store the adminPending.
     * 2. All the parameters will get here and later just store only.
     */
    storeAdminPending(adminPendingUid, username, fullName, type, email, numberPhone, password, date, database);

    /**
     * 1. After we success store the adminPending in the Realtime Database,
     *    we will display alert and clear the input.
     */
    alert('Success create account for admin ' + username);
    username = '';
    fullName = '';
    type = '';
    email = '';
    numberPhone = '';
    password = '';
    confirmPassword = '';
}

/**
 * 1. We get value from method createAuth as parameters.
 * 2. Ready to store data into Realtime Database.
 * 
 * @param {String} userUid value from the firebase auth.
 * @param {String} username transfer value from method creathAuth.
 * @param {String} fullName transfer value from method creathAuth.
 * @param {String} type transfer value from method createAuth.
 * @param {String} email transfer value from method createAuth.
 * @param {String} date value from new Date().toISOString() method.
 */
function storeAdminPending(adminPendingUid, username, fullName, type, email, numberPhone, password, date, database) {
    //Make entry to register new admin.
    var adminPendingUidData = {
        uid: adminPendingUid,
        username: username,
        fullName: fullName,
        type: type,
        email: email,
        numberPhone: numberPhone,
        password: password,
        online: false,
        onCreatedDate: date
    };

    /**
     * 1. There are 2 ways to store the database.
     *  1.1. We want to store only 1 root of data.
     *  1.2. Or we want to store array for 2 roots of data.
     *      1.1.1. Example to store array for 2 roots.
     *                  var pushUid = database.ref().push().key;
     *                  var updates = {};
     *                  updates['/firstRoot/' + pushUid ] = adminData;
     *                  updates['/secondRoot/location' + pushUid ] = adminData;
     *                  return database.ref().update(uodates);
     *      1.1.2. As you can see there are 2 variables of updates. Its an array.
     *      1.1.3. So it store at 2 locations.
     * 2. Right now, I want to store only at 1 location (root). We are using set instead update.
     * 
     */
    return database.ref().child('adminPending').child(adminPendingUid).set(adminPendingUidData);
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
    document.getElementById('btnAdd').addEventListener('click', btnInsertOnClick, false);
    setDivAdminUid();
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