

// ✅ Ensure JavaScript executes after the DOM is ready
document.addEventListener("DOMContentLoaded", function () {

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

    // ✅ Function to update the UI
    function updateUI(data) {
        console.log("📡 Updating UI with:", data);

        const imageElement = document.getElementById("bacteriaImage");
        const ecoliElement = document.getElementById("ecoliCount");
        const coliformElement = document.getElementById("coliformCount");
        const totalElement = document.getElementById("totalCount");
        const statusElement = document.getElementById("potabilityStatus");

        if (imageElement && ecoliElement && coliformElement && totalElement && statusElement) {
            imageElement.src = data.image_url || "placeholder.jpg";
            ecoliElement.textContent = data.e_coli_count ?? "N/A";
            coliformElement.textContent = data.coliform_count ?? "N/A";
            totalElement.textContent = (data.e_coli_count ?? 0) + (data.coliform_count ?? 0);
            
            statusElement.textContent = data.potable ? "Safe ✅" : "Unsafe ❌";
            statusElement.className = data.potable ? "status safe" : "status unsafe";
        } else {
            console.error("❌ UI Elements not found!");
        }
    }

    // ✅ Function to get the latest data
    function getLatestData() {
        database.ref().orderByChild("timestamp").limitToLast(1).on("child_added", (snapshot) => {
            const data = snapshot.val();
            if (data) {
                updateUI(data);
            } else {
                console.warn("⚠ No data retrieved.");
            }
        }, (error) => {
            console.error("❌ Firebase Error:", error);
        });
    }

    // ✅ Start fetching data
    getLatestData();
});

function getLatestData() {
    database.ref().orderByChild("timestamp").limitToLast(1).on("value", (snapshot) => {
        console.log("📡 Raw Firebase Snapshot:", snapshot.val());
        const data = snapshot.val();
        if (data) {
            const latestKey = Object.keys(data)[0];  // Get latest entry key
            console.log("📡 Latest Data Entry:", data[latestKey]); // Log latest entry
            updateUI(data[latestKey]); // Pass latest entry
        } else {
            console.warn("⚠ No data retrieved.");
        }
    }, (error) => {
        console.error("❌ Firebase Error:", error);
    });
}

