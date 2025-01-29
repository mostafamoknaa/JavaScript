


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
// DOM Elements
const courseTitle = document.getElementById("courseTitle");
const courseDescription = document.getElementById("courseDescription");
const courseCategory = document.getElementById("courseCategory");
const courseDuration = document.getElementById("courseDuration");
const addCourseButton = document.getElementById("addCourse");
const coursesList = document.getElementById("courses");
const categoryList = document.getElementById("categoryList");
const addCategoryButton = document.getElementById("addCategory");
const categoryName = document.getElementById("categoryName");

// Add Category
addCategoryButton.addEventListener("click", async () => {

    var flag=0;
    const name = categoryName.value;
    if (!name) {
        alert("Please enter a category name");
        return;
    }
    try {  

        const snapshot = await getDocs(collection(db, "categories"));
        snapshot.forEach(doc => {
            const category = doc.data();
        if (category.name === name) {
            flag=1;
           
        }
        else
        {flag=0;}
    });
   if(flag==0){
    const docRef = await addDoc(collection(db, "categories"), {
        name: name
        });
        alert("Category added successfully");
        categoryName.value = "";
        }
        else{
            alert("Category already exists");
            return;
        }
        } catch (e) {
            console.error("Error adding category: ", e);
            }
            });
            
//    }
//     await addDoc(collection(db, "categories"), { name });

//         alert("Category added successfully!");
//         categoryName.value = "";
//         fetchCategories();
//     } catch (error) {
//         console.error("Error adding category: ", error);
//     }
// });

// Fetch Categories and Update Category Dropdown
async function fetchCategories() {
    categoryList.innerHTML = "";
    try {
        const snapshot = await getDocs(collection(db, "categories"));
        snapshot.forEach(doc => {
            const category = doc.data();
            const option = document.createElement("option");
            option.value = doc.id;
            option.textContent = category.name;
            categoryList.appendChild(option);
        });

        // Update courseCategory dropdown
        courseCategory.innerHTML = `<option value="">Select Category</option>`;
        snapshot.forEach(doc => {
            const category = doc.data();
            const option = document.createElement("option");
            option.value = doc.id;
            option.textContent = category.name;
            courseCategory.appendChild(option);
        });
    } catch (error) {
        console.error("Error fetching categories: ", error);
    }
}

// Add Course to Specific Category
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
        const categoryRef = doc(db, "categories", category);
        await addDoc(collection(categoryRef, "courses"), {
            title,
            description,
            duration
        });
        alert("Course added successfully!");
        courseTitle.value = "";
        courseDescription.value = "";
        courseCategory.value = "";
        courseDuration.value = "";
        fetchCourses(category); // Fetch courses for the selected category
    } catch (error) {
        console.error("Error adding course: ", error);
    }
});

// Fetch and Display Courses from Selected Category
courseCategory.addEventListener("change", () => {
    const selectedCategory = courseCategory.value;
    fetchCourses(selectedCategory);
});

async function fetchCourses(category) {
    coursesList.innerHTML = "";
    if (!category) return;

    try {
        const categoryRef = doc(db, "categories", category);
        const snapshot = await getDocs(collection(categoryRef, "courses"));
        snapshot.forEach(doc => {
            const course = doc.data();
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${course.title}</strong><br>
                ${course.description}<br>
                Duration: ${course.duration}<br>
                <button onclick="deleteCourse('${category}', '${doc.id}')">Delete</button>
            `;
            coursesList.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching courses: ", error);
    }
}

// Delete Course from Specific Category
async function deleteCourse(category, courseId) {
    try {
        const courseRef = doc(db, "categories", category, "courses", courseId);
        await deleteDoc(courseRef);
        alert("Course deleted successfully!");
        fetchCourses(category); // Refresh the course list for the selected category
    } catch (error) {
        console.error("Error deleting course: ", error);
    }
}

fetchCategories(); 
window.deleteCourse=deleteCourse;