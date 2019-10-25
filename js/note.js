/**
 * THIS PLACE IS STORE ANY INFORMATIONS OF THE CODING...
 * 
 */

//------------------------------------------------------------------------------------------------

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

//-------------------------------------------------------------------------------------------


//-------------------------------[START] CONSTANST METHOD OLD [START]--------------------------------------------

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
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;

          /**
           * 1. We want to get the type of admin and display accordingly.
           */
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
//-------------------------------[END] CONSTANST METHOD OLD [END]--------------------------------------------


//----------[ANOTHER]


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


//---------------[ANOTHER]

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

//---------------[ANOTHER]