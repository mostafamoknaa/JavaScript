import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

  
const firebaseConfig = {
    apiKey: "AIzaSyCBckLKiCtLIFvXX3SLfyCaszC-vFDL3JA",
    authDomain: "ecommerce-9d94f.firebaseapp.com",
    projectId: "ecommerce-9d94f",
    storageBucket: "ecommerce-9d94f.appspot.com",
    messagingSenderId: "444404014366",
    appId: "1:444404014366:web:d1e5a5f10e5b90ca95fd0f",
    measurementId: "G-V7Q9HY61C5"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

 
document.getElementById("signup-btn").addEventListener("click", () => {
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("User signed up successfully!");
            userCredential.user.getIdToken().then((token) => {
                localStorage.setItem("userToken", token);
            });
        })
        .catch((error) => {
            alert(error.message);
        });
});
  
document.getElementById("login-btn").addEventListener("click", () => {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("User logged in successfully!");
            userCredential.user.getIdToken().then((token) => {
                localStorage.setItem("userToken", token);

                window.location.href = "test.html";
            });
        })
        .catch((error) => {
            alert(error.message);
        });
});

  
document.getElementById("logout-btn").addEventListener("click", () => {
    signOut(auth).then(() => {
        alert("User logged out");
        localStorage.removeItem("userToken");
    }).catch((error) => {
        alert(error.message);
    });
});

onAuthStateChanged(auth, (user) => {
    if (user) {
        user.getIdToken().then((token) => {
            localStorage.setItem("userToken", token);
            document.getElementById("user-info").innerText = `Logged in as: ${user.email}`;
        });
    } else {
        localStorage.removeItem("userToken");
        document.getElementById("user-info").innerText = "Not logged in";
    }
});
