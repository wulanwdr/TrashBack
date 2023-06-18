// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  update,
} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBL7baU2f4NBJHRFMqCZWsCXePqHrBjuEk",
  authDomain: "trashback-bc36c.firebaseapp.com",
  databaseURL: "https://trashback-bc36c-default-rtdb.firebaseio.com",
  projectId: "trashback-bc36c",
  storageBucket: "trashback-bc36c.appspot.com",
  messagingSenderId: "890623177499",
  appId: "1:890623177499:web:096dc712216a56283059be",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

let signinButton = document.getElementById("signin-button");
let signupButton = document.getElementById("signup-button");

signupButton.addEventListener("click", (e) => {
  let name = document.getElementById("name").value;
  let nohp = document.getElementById("nohp").value;
  let emailSignup = document.getElementById("email_signup").value;
  let passwordSignup = document.getElementById("psw_signup").value;

  createUserWithEmailAndPassword(auth, emailSignup, passwordSignup)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;

      set(ref(database, "users/" + user.uid), {
        name: name,
        nohp: nohp,
        email: emailSignup,
        password: passwordSignup,
      })
        .then(() => {
          // Data saved successfully!
          alert("User has been successfully created");
        })
        .catch((error) => {
          // The write failed
          alert(error.message);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});

signinButton.addEventListener("click", (e) => {
  let emailSignin = document.getElementById("email_signin").value;
  let passwordSignin = document.getElementById("psw_signin").value;
  signInWithEmailAndPassword(auth, emailSignin, passwordSignin)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      let lgDate = new Date();
      update(ref(database, "users/" + user.uid), {
        last_login: lgDate,
      })
        .then(() => {
          alert("User has successfully logged in");
          location.href =
            "http://127.0.0.1:5500/src/Components/Auth/Logout.html";
        })
        .catch((error) => {
          // The write failed
          alert(error.message);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
  signOut(auth)
    .then(() => {})
    .catch((error) => {});
});
