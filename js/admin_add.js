'use strict';

/**
 * [IMPORTANT]
 * [TODO]
 * 1. Since we just only have one button which is add admin,
 *    we put all the variables inside the method (function) btnInsertOnClick().
 */

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
    var password = document.getElementById('inputPassword').value;
    var confirmPassword = document.getElementById('inputConfirmPassword').value;
    /**
     * 1. We validate the inputs and the password is match or not
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
    if (password.length < 8) {
        alert('Password must length above 8 digits');
        return;
    }
    if (password !== confirmPassword) {
        alert('Password is not match, please try again');
        return;
    }
    /**
     * 1. After all the inputs are valid, we proceed to create the auth
     *     using the firebaseAuth.
     * 2. All the parameters will get here and set at function creatAuth.
     */
    createAuth(username, fullName, type, email, password);
}

/**
 * 1. This is method to create Firebase Auth using the property firebase.auth().
 * 
 * @param {String} username value from the inputUsername.
 * @param {String} fullName value from the inputFullName.
 * @param {String} type value from the inputType.
 * @param {String} email value from the inputEmail.
 * @param {String} password value from the inputPassword.
 */
function createAuth(username, fullName, type, email, password) {
    /**
     * 1. This is a firebase auth, we just need to call class 'firebase'.
     * 2. It will proceed to create the account auth at firebase cloud.
     * 
     */
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(function (error) {
            //Handle any errors here while creating user account.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert('Error: ' + errorMessage + '\nError Code: ' + errorCode);
        });

    /**
     * 1. After we success create account, we get the uid of the user.
     * 2. We will store in the realtime database.
     */
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            //Get the userUid from the FirebaseAuth.
            var userUid = user.uid;

            /**
            * 1. Initialize the Realtime Database.
            * 2. Now, we are linked with the Firebase.
            * 3. database is usable and has property for Firebase.
            */
            var database = firebase.database();

            /**
             * 1. Get the value of date as ISO.
             * 2. Want to convert to local at mobile version.
             * 3. ISO is readable and get the UTC timezone.
             */
            var date = new Date().toISOString();

            //Next we will store in realtime database.
            registerNewAdmin(userUid, username, fullName, type, email, date, database);
            //After we update, we need to sign out this particular user.
            //firebase.auth().signOut();

        }
    });
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
function registerNewAdmin(userUid, username, fullName, type, email, date, database) {
    //Make entry to register new admin.
    var adminData = {
        userUid: userUid,
        username: username,
        fullName: fullName,
        type: type,
        email: email,
        date: date
    };

    /**
     * 1. There are 2 ways to store the database.
     *  1.1. We want to store only 1 root of data.
     *  1.2. Or we want to store array for 2 roots of data.
     *      1.1.1. Example to store array for 2 roots.
     *                  var pushUid = database.push().key;
     *                  var updates = {};
     *                  updates['/firstRoot/' + pushUid ] = adminData;
     *                  updates['/secondRoot/location' + pushUid ] = adminData;
     *                  return database.ref().update(uodates);
     *      1.1.2. As you can see there are 2 variables of updates. Its an array.
     *      1.1.3. So it store at 2 locations.
     * 2. Right now, I want to store only at 1 location (root).
     * 
     */
    var updates = {};
    updates['/adminA/' + userUid + '/'] = adminData;
    return database.ref().set(updates);
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
        } else {
            Console.log('User signed out');
        }
    });
    // [END authstatelistener]
    document.getElementById('navLinkSignOut').addEventListener('click', btnSignOutOnClick, false);
    document.getElementById('btnAdd').addEventListener('click', btnInsertOnClick, false);
}

/**
 * 1. Usage of window.onLoad means that, after html completed their display, id, etc...
 * the window.onLoad will triggered after that.
 * 1. This functions initApp() called once this file is called at the html.
 * 2. It will go trigger this first as the early function.
 */
window.onload = function () {
    initApp();
}
//-------------------------------[END] CONSTANST METHOD [END]--------------------------------------------