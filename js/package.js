'use strict';
var database = firebase.database();

function displayTablePackages() {
    database.ref('packages').once('value', function (snapshot) {
        if (snapshot.exists()) {
            var tablePackages = document.getElementById('tablePackages');
            var content =
                '<th>Image</th>' +
                '<th>Category</th>' +
                '<th>Name</th>' +
                '<th>Place</th>' +
                '<th>State</th>' +
                '<th>Short Detail</th>' +
                '<th>Price (RM)</th>' +
                '<th>Final Cost (RM)</th>' +
                '<th>Date Created</th>' +
                '<th>Start Promotion</th>' +
                '<th>End Promotion</th>' +
                '<th>Promotion</th>';

            snapshot.forEach(function (childSnapshot) {
                //Get the value
                var val = childSnapshot.val();

                var imageUrl = val.imageUrl;
                var category = val.category;
                var name = val.name;
                var place = val.place;
                var state = val.state;
                var shortDetail = val.shortDetail;
                var price = val.price.toFixed(2);
                var finalCost = val.finalCost.toFixed(2);


                var onCreatedDate = val.date;
                var onCreatedDateFinale = new Date(onCreatedDate);
                onCreatedDateFinale = new Date(onCreatedDateFinale.getTime() + (onCreatedDateFinale.getTimezoneOffset() * 60000));

                var dateStartPromotion = val.dateStartPromotion;
                var dateStartPromotionFinale;
             
                var dateFinishPromotion = val.dateFinishPromotion;
                var dateFinishPromotionFinale;
                

                var promotion = val.promotion;
                if (promotion) {
                    promotion = "Yes";

                    dateStartPromotionFinale = new Date(dateStartPromotion);
                    dateStartPromotionFinale = new Date(dateStartPromotionFinale.getTime() + (dateStartPromotionFinale.getTimezoneOffset() * 60000));

                    dateFinishPromotionFinale = new Date(dateFinishPromotion);
                    dateFinishPromotionFinale = new Date(dateFinishPromotionFinale.getTime() + (dateFinishPromotionFinale.getTimezoneOffset() * 60000));

                    dateStartPromotionFinale = dateStartPromotionFinale.toLocaleDateString("en-US");
                    dateFinishPromotionFinale = dateFinishPromotionFinale.toLocaleDateString("en-US");
                } else {
                    promotion = "No";
                    dateStartPromotionFinale = "No Start Promotion";
                    dateFinishPromotionFinale = "No Finish Promotion";
                }

                content += '<tr>';
                content += '<td><div class="div-image-custom"><img src="' + imageUrl + '"/></div></td>';
                content += '<td>' + category + '</td>';
                content += '<td>' + name + '</td>';
                content += '<td>' + place + '</td>';
                content += '<td>' + state + '</td>';
                content += '<td>' + shortDetail + '</td>';
                content += '<td>' + price + '</td>';
                content += '<td>' + finalCost + '</td>';
                content += '<td>' + onCreatedDateFinale.toLocaleDateString("en-US") + '</td>';
                content += '<td>' + dateStartPromotionFinale + '</td>';
                content += '<td>' + dateFinishPromotionFinale + '</td>';
                content += '<td>' + promotion + '</td>';
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
displayTablePackages();