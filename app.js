


import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCBckLKiCtLIFvXX3SLfyCaszC-vFDL3JA",
    authDomain: "ecommerce-9d94f.firebaseapp.com",
    projectId: "ecommerce-9d94f",
    storageBucket: "ecommerce-9d94f.firebasestorage.app",
    messagingSenderId: "444404014366",
    appId: "1:444404014366:web:d1e5a5f10e5b90ca95fd0f",
    measurementId: "G-V7Q9HY61C5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// DOM Elements
const courseTitle = document.getElementById("courseTitle");
const courseDescription = document.getElementById("courseDescription");
const courseCategory = document.getElementById("courseCategory");
const courseDuration = document.getElementById("courseDuration");
const addCourseButton = document.getElementById("addCourse");
const coursesList = document.getElementById("courses");
const registrationsList = document.getElementById("registrations");

// Add Course
addCourseButton.addEventListener("click", async () => {
    const title = courseTitle.value;
    const description = courseDescription.value;
    const category = courseCategory.value;
    const duration = courseDuration.value;

    if (!title || !description || !category || !duration) {
        alert("Please fill all fields");
        return;
    }

    try {
        await addDoc(collection(db, "courses"), {
            title,
            description,
            category,
            duration
        });
        alert("Course added successfully!");
        courseTitle.value = "";
        courseDescription.value = "";
        courseCategory.value = "";
        courseDuration.value = "";
        fetchCourses(); // Refresh the course list
    } catch (error) {
        console.error("Error adding course: ", error);
    }
});

// Fetch and Display Courses
async function fetchCourses() {
    try {
        const snapshot = await getDocs(collection(db, "courses"));
        coursesList.innerHTML = ""; // Clear the list
        snapshot.forEach(doc => {
            const course = doc.data();
            const li = document.createElement("li");
            li.innerHTML = `
        <strong>${course.title}</strong> (${course.category})<br>
        ${course.description}<br>
        Duration: ${course.duration}
        <button onclick="deleteCourse('${doc.id}')">Delete</button>
      `;
            coursesList.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching courses: ", error);
    }
}

// Delete Course
async function deleteCourse(courseId) {
    try {
        await deleteDoc(doc(db, "courses", courseId));
        alert("Course deleted successfully!");
        fetchCourses(); // Refresh the course list
    } catch (error) {
        console.error("Error deleting course: ", error);
    }
}

// Fetch and Display Registrations
async function fetchRegistrations() {
    try {
        const snapshot = await getDocs(collection(db, "registrations"));
        registrationsList.innerHTML = ""; // Clear the list
        snapshot.forEach(doc => {
            const registration = doc.data();
            const li = document.createElement("li");
            li.innerHTML = `
        Student ID: ${registration.studentId}<br>
        Course ID: ${registration.courseId}<br>
        Status: ${registration.status}
        <button onclick="approveRegistration('${doc.id}')">Approve</button>
        <button onclick="rejectRegistration('${doc.id}')">Reject</button>
      `;
            registrationsList.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching registrations: ", error);
    }
}

// Approve Registration
async function approveRegistration(registrationId) {
    try {
        await updateDoc(doc(db, "registrations", registrationId), { status: "approved" });
        alert("Registration approved!");
        fetchRegistrations(); // Refresh the registration list
    } catch (error) {
        console.error("Error approving registration: ", error);
    }
}

// Reject Registration
async function rejectRegistration(registrationId) {
    try {
        await updateDoc(doc(db, "registrations", registrationId), { status: "rejected" });
        alert("Registration rejected!");
        fetchRegistrations(); // Refresh the registration list
    } catch (error) {
        console.error("Error rejecting registration: ", error);
    }
}

// Initial Fetch
fetchCourses();
fetchRegistrations();
window.deleteCourse = deleteCourse;