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

// ✅ Initialize Firebase in Compatibility Mode
firebase.initializeApp(firebaseConfig);

// ✅ Get a reference to the database
const database = firebase.database();

// ✅ Function to fetch the latest data from Firebase
function getLatestData() {
    database.ref().orderByChild("timestamp").limitToLast(1).on("child_added", (snapshot) => {
        const data = snapshot.val();
        console.log("📡 Received Data:", data); // Debugging

        if (data) {
            // Set image URL
            const placeholderImage = "https://aclmaringa.com.br/wp-content/uploads/2021/06/Placa_EC.jpg";
            document.getElementById("bacteriaImage").src = placeholderImage;

            // Set bacteria counts
            document.getElementById("ecoliCount").textContent = data.e_coli_count ?? "-";
            document.getElementById("coliformCount").textContent = data.coliform_count ?? "-";
            document.getElementById("totalCount").textContent = (data.e_coli_count ?? 0) + (data.coliform_count ?? 0);

            // Set potability status
            const statusElement = document.getElementById("potabilityStatus");
            statusElement.textContent = data.potable ? "Safe ✅" : "Unsafe ❌";
            statusElement.className = data.potable ? "status safe" : "status unsafe";
        }
    }, (error) => {
        console.error("❌ Firebase Error:", error);
    });
}

// ✅ Call function to get the latest data
getLatestData();
