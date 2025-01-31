// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
// import { getFirestore, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// // Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyCBckLKiCtLIFvXX3SLfyCaszC-vFDL3JA",
//     authDomain: "ecommerce-9d94f.firebaseapp.com",
//     projectId: "ecommerce-9d94f",
//     storageBucket: "ecommerce-9d94f.appspot.com",
//     messagingSenderId: "444404014366",
//     appId: "1:444404014366:web:d1e5a5f10e5b90ca95fd0f",
//     measurementId: "G-V7Q9HY61C5"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const coursesList = document.getElementById("courses");

// // تحميل الدورات في الوقت الفعلي
// onSnapshot(collection(db, "courses"), (snapshot) => {
//     coursesList.innerHTML = ""; // مسح القائمة

//     snapshot.forEach(doc => {
//         const course = doc.data();
//         const li = document.createElement("li");

//         li.innerHTML = `
//             <img src="${course.image}" alt="${course.title}">
//             <h3>${course.title}</h3>
//             <p><strong>Instructor:</strong> ${course.instructor}</p>
//             <p><strong>Price:</strong> $${course.price}</p>
//             <p><strong>Duration:</strong> ${course.duration}</p>
//         `;

//         li.addEventListener("click", () => {
//             // تخزين بيانات الدورة في localStorage
//             localStorage.setItem("selectedCourse", JSON.stringify({ id: doc.id, ...course }));
          
//             window.location.href = "courseContent.html"; // الانتقال إلى صفحة التفاصيل
//         });

//         coursesList.appendChild(li);
//     });
// });

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCBckLKiCtLIFvXX3SLfyCaszC-vFDL3JA",
    authDomain: "ecommerce-9d94f.firebaseapp.com",
    projectId: "ecommerce-9d94f",
    storageBucket: "ecommerce-9d94f.appspot.com",
    messagingSenderId: "444404014366",
    appId: "1:444404014366:web:d1e5a5f10e5b90ca95fd0f",
    measurementId: "G-V7Q9HY61C5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const coursesList = document.getElementById("courses");

// Load courses in real-time
onSnapshot(collection(db, "courses"), (snapshot) => {
    coursesList.innerHTML = ""; // Clear previous data
//i change this line to this no docs
    snapshot.docs.forEach(doc => {
        const course = doc.data();
        const li = document.createElement("li");

        li.innerHTML = `
            <img src="${course.image}" alt="${course.title}">
            <h3>${course.title}</h3>
            <p><strong>Instructor:</strong> ${course.instructor}</p>
            <p><strong>Price:</strong> $${course.price}</p>
            <p><strong>Duration:</strong> ${course.duration}</p>
            <button class="enroll-btn" data-id="${doc.id}">Enroll</button>
        `;

        coursesList.appendChild(li);
    });

    // Add event listeners to all "Enroll" buttons
    document.querySelectorAll(".enroll-btn").forEach(button => {
        // localStorage.clear();

        button.addEventListener("click", (event) => {
            window.location.href="courseContent.html";
            const courseId = event.target.getAttribute("data-id");
            window.location.href = `courseContent.html?courseId=${courseId}`; // Navigate with course ID
        });
    });
});
