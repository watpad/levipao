// ✅ Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBGPqzH7H2tBvuCoIDJcmq9ZxoGkPL1R10",
    authDomain: "watpad.firebaseapp.com",
    databaseURL: "https://watpad-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "watpad",
    storageBucket: "watpad.firebasestorage.app",
    messagingSenderId: "664783349089",
    appId: "1:664783349089:web:7b28efdc2d9d062dddd120",
    measurementId: "G-VL4S9SQG0P"
};

// ✅ Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// 🔄 Function to Retrieve and Update Data **IN REAL-TIME**
function getLatestData() {
    database.ref().orderByChild("timestamp").limitToLast(1).on("child_added", (snapshot) => {
        console.log("📡 Firebase Data Received:", snapshot.val());
        updateUI(snapshot.val());
    }, (error) => {
        console.error("❌ Firebase Error:", error);
    });
}

// 📌 Function to Update the Webpage UI
function updateUI(data) {
    if (!data) return;

    console.log("📡 Updating UI with:", data);

    document.getElementById("bacteriaImage").src = data.image_url || "placeholder.jpg";
    document.getElementById("ecoliCount").textContent = data.e_coli_count ?? "N/A";
    document.getElementById("coliformCount").textContent = data.coliform_count ?? "N/A";
    document.getElementById("totalCount").textContent = (data.e_coli_count ?? 0) + (data.coliform_count ?? 0);

    const statusElement = document.getElementById("potabilityStatus");
    statusElement.textContent = data.potable ? "Safe ✅" : "Unsafe ❌";
    statusElement.className = data.potable ? "status safe" : "status unsafe";
}

// ✅ Load Data on Page Load
document.addEventListener("DOMContentLoaded", getLatestData);
