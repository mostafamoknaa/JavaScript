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


//filter dropdown
const registrationTable = document.getElementById("registration-table");
const statusFilter = document.getElementById("status-filter");

// Fetch registrations 
async function fetchRegistrations(filter = "all") {
    registrationTable.innerHTML = ""; // Clear existing data
    const snapshot = await getDocs(collection(db, "registrations"));

    snapshot.forEach(doc => {
                const data = doc.data();
                if (filter === "all" || data.status === filter) {
                    let row = `<tr>
                <td>${data.studentName}</td>
                <td>${data.course}</td>
                <td>${data.status}</td>
                <td>
                    ${data.status === "pending" ? `
                        <button class="approve-btn" onclick="confirmAction('${doc.id}', 'approved', '${data.studentEmail}')">Approve</button>
                        <button class="reject-btn" onclick="confirmAction('${doc.id}', 'rejected', '${data.studentEmail}')">Reject</button>
                    ` : 'No Actions'}
                </td>
            </tr>`;
            registrationTable.innerHTML += row;
        }
    });
}

// Confirmation before updating status
window.confirmAction = async (id, newStatus, email) => {
    if (confirm(`Are you sure you want to ${newStatus} this registration?`)) {
        await updateStatus(id, newStatus);
        sendEmailNotification(email, newStatus);
    }
};

// Update registration status
async function updateStatus(id, newStatus) {
    const docRef = doc(db, "registrations", id);
    await updateDoc(docRef, { status: newStatus });
    alert(`Registration ${newStatus}`);
    fetchRegistrations(statusFilter.value); // Refresh data
}

// Email notification function (uses Firebase Cloud Functions)
function sendEmailNotification(email, status) {
    fetch("https://your-cloud-function-url/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, status })
    })
    .then(response => response.json())
    .then(data => console.log("Email sent:", data))
    .catch(error => console.error("Error sending email:", error));
}

// Load registrations on page load
window.onload = () => {
    fetchRegistrations();
    statusFilter.addEventListener("change", () => fetchRegistrations(statusFilter.value));
};