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

// ✅ Initialize Firebase (Legacy Mode)
firebase.initializeApp(firebaseConfig);

// ✅ Get a reference to the database
const database = firebase.database();

// ✅ Fetch the latest detection data
function getLatestData() {
    database.ref().orderByChild("timestamp").limitToLast(1).on("child_added", (snapshot) => {
        const data = snapshot.val();

        // Set image URL
        document.getElementById("bacteriaImage").src = data.image_url || "placeholder.jpg";

        // Set bacteria counts
        document.getElementById("ecoliCount").textContent = data.e_coli_count;
        document.getElementById("coliformCount").textContent = data.coliform_count;
        document.getElementById("totalCount").textContent = data.e_coli_count + data.coliform_count;

        // Set potability status
        const statusElement = document.getElementById("potabilityStatus");
        statusElement.textContent = data.potable ? "Safe ✅" : "Unsafe ❌";
        statusElement.className = data.potable ? "status safe" : "status unsafe";
    });
}

// ✅ Call function to get the latest data
getLatestData();
