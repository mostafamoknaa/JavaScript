import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

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

// DOM Elements
const categoryName = document.getElementById("categoryName");
const addCategoryButton = document.getElementById("addCategory");
const categoryList = document.getElementById("categoryList"); // Dropdown of categories
const courseCategory = document.getElementById("courseCategory"); // Dropdown in course form
const courseTitle = document.getElementById("courseTitle");
const courseInstructor = document.getElementById("courseInstructor");
const coursePrice = document.getElementById("coursePrice");
const courseImage = document.getElementById("courseImage");
const courseDuration = document.getElementById("courseDuration");
const courseDescription = document.getElementById("courseDescription");
const courseContent = document.getElementById("courseContent");
const addCourseButton = document.getElementById("addCourse");
const coursesList = document.getElementById("courses");

// ✅ **إضافة فئة جديدة**
addCategoryButton.addEventListener("click", async () => {
    const name = categoryName.value.trim();

    if (!name) {
        alert("Please enter a category name");
        return;
    }

    try {
        const db = getFirestore(app);
        alert("Category added successfully!");
        categoryName.value = "";
    } catch (error) {
        console.error("Error adding category: ", error);
    }
});

// ✅ **تحميل الفئات وإضافتها إلى القوائم المنسدلة**
async function fetchCategories() {
    const snapshot = await getDocs(collection(db, "categories"));
    categoryList.innerHTML = "<option value=''>Select Category</option>";
    courseCategory.innerHTML = "<option value=''>Select Category</option>";

    snapshot.forEach(doc => {
        const category = doc.data().name;
        const option1 = document.createElement("option");
        option1.value = category;
        option1.innerText = category;
        categoryList.appendChild(option1);

        const option2 = option1.cloneNode(true);
        courseCategory.appendChild(option2);
    });
}

// ✅ **إضافة دورة جديدة**
addCourseButton.addEventListener("click", async () => {
    const title = courseTitle.value.trim();
    const instructor = courseInstructor.value.trim();
    const price = coursePrice.value.trim();
    const image = courseImage.value.trim();
    const category = courseCategory.value.trim();
    const duration = courseDuration.value.trim();
    const description = courseDescription.value.trim();
    const content = courseContent.value.trim().split(",");

    if (!title || !instructor || !price || !image || !category || !duration || !description || content.length === 0) {
        alert("Please fill all fields");
        return;
    }

    try {
        await addDoc(collection(db, "courses"), {
            title,
            instructor,
            price,
            image,
            category,
            duration,
            description,
            content
        });

        alert("Course added successfully!");
        
        // إعادة تعيين القيم بعد الإضافة
        courseTitle.value = "";
        courseInstructor.value = "";
        coursePrice.value = "";
        courseImage.value = "";
        courseCategory.value = "";
        courseDuration.value = "";
        courseDescription.value = "";
        courseContent.value = "";

    } catch (error) {
        console.error("Error adding course: ", error);
    }
});

// ✅ **مراقبة الدورات في الوقت الفعلي باستخدام `onSnapshot()`**
onSnapshot(collection(db, "courses"), (snapshot) => {
    coursesList.innerHTML = ""; // مسح القائمة قبل إعادة تحميلها

    snapshot.forEach(doc => {
        const course = doc.data();
        const li = document.createElement("li");
        li.innerHTML = `
            <img src="${course.image}" alt="${course.title}" width="100"><br>
            <strong>${course.title}</strong> <br>
            <em>Instructor: ${course.instructor}</em><br>
            <strong>Category:</strong> ${course.category} <br>
            <strong>Price:</strong> $${course.price} <br>
            <strong>Duration:</strong> ${course.duration} <br>
            <strong>Description:</strong> ${course.description} <br>
            <strong>Content:</strong> <ul>
                ${course.content.map(video => `<li>${video}</li>`).join("")}
            </ul>
            <button onclick="deleteCourse('${doc.id}')">Delete</button>
        `;
        coursesList.appendChild(li);
    });
});

// ✅ **حذف الدورة**
window.deleteCourse = async function (courseId) {
    try {
        await deleteDoc(doc(db, "courses", courseId));
        alert("Course deleted successfully!");
    } catch (error) {
        console.error("Error deleting course: ", error);
    }
};

// ✅ **تحميل الفئات عند تحميل الصفحة**
fetchCategories();
