import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, collection, onSnapshot, getDocs, addDoc, query, where } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

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
const db = getFirestore(app);
const auth = getAuth(app);
const coursesList = document.getElementById("courses");
let currentUser = null;

onAuthStateChanged(auth, (user) => {
    currentUser = user;
    loadCourses();
});

function loadCourses() {
    onSnapshot(collection(db, "courses"), async (snapshot) => {
        coursesList.innerHTML = "";

        for (const doc of snapshot.docs) {
            const course = doc.data();
            const li = document.createElement("li");

            let enrollmentStatus = "not enrolled";
            let enrollmentId = null;

            if (currentUser) {
                const enrollmentRef = collection(db, "enrollment");
                const q = query(enrollmentRef, where("courseId", "==", doc.id), where("userId", "==", currentUser.uid));

                const enrollmentSnapshot = await getDocs(q);
                
                if (!enrollmentSnapshot.empty) {
                    const enrollmentData = enrollmentSnapshot.docs[0].data();
                    enrollmentStatus = enrollmentData.status;
                    enrollmentId = enrollmentSnapshot.docs[0].id;
                }
            }

            let buttonText = "Enroll";
            if (enrollmentStatus === "approved") {
                buttonText = "Open Course";
            } else if (enrollmentStatus === "pending") {
                buttonText = "Pending Approval";
            }

            li.innerHTML = `
                <img src="${course.image}" alt="${course.title}">
                <h3>${course.title}</h3>
                <p><strong>Instructor:</strong> ${course.instructor}</p>
                <p><strong>Price:</strong> $${course.price}</p>
                <p><strong>Duration:</strong> ${course.duration}</p>
                <button class="enroll-btn" data-id="${doc.id}" data-enrollment-id="${enrollmentId}" ${enrollmentStatus === "pending" ? "disabled" : ""}>${buttonText}</button>
            `;

            coursesList.appendChild(li);
        }

        document.querySelectorAll(".enroll-btn").forEach(button => {
            button.addEventListener("click", (event) => handleEnrollment(event));
        });

        watchEnrollmentStatus();
    });
}

async function handleEnrollment(event) {
    if (!currentUser) {
        alert("Please log in to enroll in a course.");
        return;
    }

    const courseId = event.target.getAttribute("data-id");

    const enrollmentRef = collection(db, "enrollment");
    const q = query(enrollmentRef, where("courseId", "==", courseId), where("userId", "==", currentUser.uid));
    const enrollmentSnapshot = await getDocs(q);

    if (!enrollmentSnapshot.empty) {
        const enrollmentData = enrollmentSnapshot.docs[0].data();
        if (enrollmentData.status === "approved") {
            window.location.href = `courseContent.html?courseId=${courseId}`;
        } else {
            alert("Your enrollment request is pending approval.");
        }
    } else {
        try {
            await addDoc(enrollmentRef, {
                courseId: courseId,
                userId: currentUser.uid,
                status: "pending"
            });

            alert("Enrollment request submitted. Waiting for approval.");
        } catch (error) {
            console.error("Error enrolling in course:", error);
        }
    }
}

function watchEnrollmentStatus() {
    if (!currentUser) return;

    const enrollmentRef = collection(db, "enrollment");
    const q = query(enrollmentRef, where("userId", "==", currentUser.uid));

    onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach(enrollmentDoc => {
            const enrollmentData = enrollmentDoc.data();
            const courseId = enrollmentData.courseId;
            const status = enrollmentData.status;

            const button = document.querySelector(`button[data-id="${courseId}"]`);
            if (button) {
                if (status === "approved") {
                    button.innerText = "Open Course";
                    button.disabled = false;
                    button.addEventListener("click", () => {
                        window.location.href = `courseContent.html?courseId=${courseId}`;
                    });
                } else if (status === "pending") {
                    button.innerText = "Pending Approval";
                    button.disabled = true;
                }
            }
        });
    });
}
