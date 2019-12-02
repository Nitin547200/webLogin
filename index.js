
function writeData()
{
  var email=document.getElementById("email").value;
  var pass=document.getElementById("pass").value;
  var shopname=document.getElementById("shopname").value;
  var area=document.getElementById("area").value;
  var lat=document.getElementById("lat").value;
  var long=document.getElementById("long").value;
  var username=document.getElementById("username").value;
  var phone=document.getElementById("phone").value;

    firebase.auth().createUserWithEmailAndPassword(email,pass).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
}).then(function() {

  var uid= firebase.auth().currentUser.uid;
  var firebaseRef=firebase.database().ref();

  firebaseRef.child("User").child(uid).child("email").set(email);
  firebaseRef.child("User").child(uid).child("pass").set(pass);
  firebaseRef.child("User").child(uid).child("shopname").set(shopname);
  firebaseRef.child("User").child(uid).child("area").set(area);
  firebaseRef.child("User").child(uid).child("lat").set(lat);
  firebaseRef.child("User").child(uid).child("long").set(long);
  firebaseRef.child("User").child(uid).child("username").set(phone);
  firebaseRef.child("User").child(uid).child("email").set(email);
  window.alert("Acuid created");

});
}


function loginAuth(){

  var userEmail = document.getElementById("uname").value;
  var userPass = document.getElementById("upass").value;

  var ret=firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

  var ret=firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(function() {
    //window.alert("Login Success");
    //window.location.replace("in.html");
    var firebaseRef=firebase.database().ref();
    var aa=firebaseRef.child("User").child("1").child("area").get();
    window.alert("Area is:"+aa);

  });
}


function AddUser(){

  var userEmail = document.getElementById("uname").value;
  var userPass = document.getElementById("upass").value;

  firebase.auth().createUserWithEmailAndPassword(userEmail,userPass).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
}

function GoogleSignIn(){
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
  console.log("Google sign in success");
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
}).catch(function(error) {
  // Handle Errors here.
  console.log(error);
  console.log("Failed to do");
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's acuid used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
}
var order_id = [];
var custid = [];
var urls = [];

function readData()
{
  var ref2=firebase.database().ref().child("User").child(firebase.auth().currentUser.uid);
  var ref=ref2.child("Orders");

  //var ref=firebase.database().ref('User');
  ref.on('child_added', function(custSnap){
    console.log(custSnap.key);
     custid.push(custSnap.key);

    custSnap.forEach(function(orderSnap){
      // var url1=childSnapshot.val().url;
      console.log(orderSnap.key);
       order_id.push(orderSnap.key);

       orderSnap.forEach(function(urlSnap){
         // var url1=childSnapshot.val().url;
         console.log(urlSnap.val().url);
          urls.push(urlSnap.val().url);

          var URL = urls[0];

          popup = window.open(URL);
       //popup.document.write(URL);
        //popup.window.print();
      setTimeout(function(){  popup.document.write(URL);popup.focus();
       print(popup); }, 5000);



         });

      });
  });
}




  //ref2.on("value",function(snapshot){
  //  console.log(snapshot.key);
  //  ref2.child(snapshot.key.on("value",function(snapshot1){
  //    console.log(snapshot1.key)
  //  }));
  //});
  //}, function (errorObject) {
  //console.log("The read failed: " + errorObject.code);
//});
