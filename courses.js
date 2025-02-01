// // import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
// // import { getFirestore, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// // // Firebase configuration
// // const firebaseConfig = {
// //     apiKey: "AIzaSyCBckLKiCtLIFvXX3SLfyCaszC-vFDL3JA",
// //     authDomain: "ecommerce-9d94f.firebaseapp.com",
// //     projectId: "ecommerce-9d94f",
// //     storageBucket: "ecommerce-9d94f.appspot.com",
// //     messagingSenderId: "444404014366",
// //     appId: "1:444404014366:web:d1e5a5f10e5b90ca95fd0f",
// //     measurementId: "G-V7Q9HY61C5"
// // };

// // // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// // const db = getFirestore(app);
// // const coursesList = document.getElementById("courses");

// // // تحميل الدورات في الوقت الفعلي
// // onSnapshot(collection(db, "courses"), (snapshot) => {
// //     coursesList.innerHTML = ""; // مسح القائمة

// //     snapshot.forEach(doc => {
// //         const course = doc.data();
// //         const li = document.createElement("li");

// //         li.innerHTML = `
// //             <img src="${course.image}" alt="${course.title}">
// //             <h3>${course.title}</h3>
// //             <p><strong>Instructor:</strong> ${course.instructor}</p>
// //             <p><strong>Price:</strong> $${course.price}</p>
// //             <p><strong>Duration:</strong> ${course.duration}</p>
// //         `;

// //         li.addEventListener("click", () => {
// //             // تخزين بيانات الدورة في localStorage
// //             localStorage.setItem("selectedCourse", JSON.stringify({ id: doc.id, ...course }));
          
// //             window.location.href = "courseContent.html"; // الانتقال إلى صفحة التفاصيل
// //         });

// //         coursesList.appendChild(li);
// //     });
// // });

// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
// import { getFirestore, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
// import { getDoc, doc,addDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged }
//     from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

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
// const auth = getAuth(app);

// // Load courses in real-time
// onSnapshot(collection(db, "courses"), (snapshot) => {
//     coursesList.innerHTML = ""; // Clear previous data
// //i change this line to this no docs
//     snapshot.docs.forEach(doc => {
//         const course = doc.data();
//         const li = document.createElement("li");

//         li.innerHTML = `
//             <img src="${course.image}" alt="${course.title}">
//             <h3>${course.title}</h3>
//             <p><strong>Instructor:</strong> ${course.instructor}</p>
//             <p><strong>Price:</strong> $${course.price}</p>
//             <p><strong>Duration:</strong> ${course.duration}</p>
//             <button class="enroll-btn" data-id="${doc.id}">Enroll</button>
//         `;

//         coursesList.appendChild(li);
//     });

//     // Add event listeners to all "Enroll" buttons
   
//     document.querySelectorAll(".enroll-btn").forEach(button => {
//         button.addEventListener("click", async (event) => {
//             const courseId = event.target.getAttribute("data-id");
    
//             // First, check if the user is authenticated
//             onAuthStateChanged(auth, async (user) => {
//                 if (user) {
//                     const userId = user.uid;
    
//                     // Store data in Firestore after getting the userId
//                     try {
//                         await addDoc(collection(db, "enrollment"), {
//                             courseId: courseId,
//                             userId: userId,
//                             status: "pending"
//                         });

//                         // Fetch enrollment data by userId using snapshot
//                         onSnapshot(collection(db, "enrollment"), (enrollmentSnapshot) => {
//                             enrollmentSnapshot.docs.forEach(enrollmentDoc => {
//                                 const enrollmentData = enrollmentDoc.data();
//                                 if (enrollmentData.userId === userId && enrollmentData.courseId === courseId) {
//                                     if (enrollmentData.status === "approved") {
//                                         alert("Your enrollment is approved!");
//                                          window.location.href = `courseContent.html?courseId=${courseId}`;

//                                     } else {
//                                         console.log("Enrollment status:", enrollmentData.status);
//                                         alert("Your enrollment is not approved yet.");
//                                     }
//                                 }
//                             });
//                         });
                         
                         

//                         // Redirect to course content page with the courseId
                       
//                     } catch (error) {
//                         console.error("Error enrolling in course:", error);
//                     }
//                 } else {
//                     console.log("User is not logged in.");
//                     alert("Please log in to enroll in a course.");
//                 }
//             });
//         });
//     });
    
// });


import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, collection, onSnapshot, addDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

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
const auth = getAuth(app);
const coursesList = document.getElementById("courses");
let currentUser = null; // Store the logged-in user

// Check authentication state ONCE when the page loads
onAuthStateChanged(auth, (user) => {
    currentUser = user; // Store the logged-in user globally
});

// Load courses in real-time
onSnapshot(collection(db, "courses"), (snapshot) => {
    coursesList.innerHTML = ""; // Clear previous data

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
        button.addEventListener("click", async (event) => {
            if (!currentUser) {
                alert("Please log in to enroll in a course.");
                return;
            }

            const courseId = event.target.getAttribute("data-id");

            try {
                // Add enrollment to Firestore
                await addDoc(collection(db, "enrollment"), {
                    courseId: courseId,
                    userId: currentUser.uid,
                    status: "pending"
                });

                alert("Enrollment request submitted. Waiting for approval.");
                
                // Redirect to course content page if approved
                checkEnrollmentStatus(courseId, currentUser.uid);
            } catch (error) {
                console.error("Error enrolling in course:", error);
            }
        });
    });
});

// Function to check enrollment status
function checkEnrollmentStatus(courseId, userId) {
    onSnapshot(collection(db, "enrollment"), (enrollmentSnapshot) => {
        enrollmentSnapshot.docs.forEach(enrollmentDoc => {
            const enrollmentData = enrollmentDoc.data();
            if (enrollmentData.userId === userId && enrollmentData.courseId === courseId) {
                if (enrollmentData.status === "approved") {
                    alert("Your enrollment is approved!");
                    window.location.href = `courseContent.html?courseId=${courseId}`;
                } else {
                    console.log("Enrollment status:", enrollmentData.status);
                    alert("Your enrollment is not approved yet.");
                }
            }
        });
    });
}
