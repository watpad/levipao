// Replace with your actual Firebase config
 
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

// ✅ Get database reference
const database = firebase.database();

// ✅ Function to update the UI
function updateUI(data) {
    console.log("📡 Updating UI with:", data);

    document.getElementById("bacteriaImage").src = data.image_url || "placeholder.jpg";
    document.getElementById("ecoliCount").textContent = data.e_coli_count ?? "N/A";
    document.getElementById("coliformCount").textContent = data.coliform_count ?? "N/A";
    document.getElementById("totalCount").textContent = (data.e_coli_count ?? 0) + (data.coliform_count ?? 0);
    
    const statusElement = document.getElementById("potabilityStatus");
    statusElement.textContent = data.potable ? "Safe ✅" : "Unsafe ❌";
    statusElement.className = data.potable ? "status safe" : "status unsafe";
}

// ✅ Function to get the latest data
function getLatestData() {
    database.ref().orderByChild("timestamp").limitToLast(1).on("child_added", (snapshot) => {
        const data = snapshot.val();
        if (data) {
            updateUI(data);
        }
    }, (error) => {
        console.error("❌ Firebase Error:", error);
    });
}

// ✅ Load data when the page loads
window.onload = function () {
    getLatestData();
};
