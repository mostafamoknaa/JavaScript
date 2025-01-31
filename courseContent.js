

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

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
const analytics = getAnalytics(app);
const db = getFirestore(app);




const urlParams = new URLSearchParams(window.location.search);
const courseId = urlParams.get("courseId");

// Load course details
async function loadCourseContent() {
    if (!courseId) {
        alert("Invalid Course!");
        window.location.href = "index.html";
        return;
    }

    const courseDoc = await getDoc(doc(db, "courses", courseId));

    if (!courseDoc.exists()) {
        alert("Course not found!");
        window.location.href = "index.html";
        return;
    }

    const course = courseDoc.data();
    document.getElementById("courseTitle").innerText = course.title;
    document.getElementById("courseDescription").innerText = course.description;

    const lessonList = document.getElementById("lessonList");
    lessonList.innerHTML = "";

    course.content.forEach((video, index) => {
        const li = document.createElement("li");
        li.innerText = `Lesson ${index + 1}`;
        li.onclick = () => loadVideo(video);
        lessonList.appendChild(li);
    });
}

// Load video in iframe
function loadVideo(videoUrl) {
    const videoPlayer = document.getElementById("videoPlayer");
    videoPlayer.src = videoUrl;
}

// Load content on page load
loadCourseContent();
