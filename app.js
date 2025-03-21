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

// ✅ Get a reference to the database
const database = firebase.database();

// ✅ Function to fetch the latest data from Firebase
function getLatestData() {
    database.ref().orderByChild("timestamp").limitToLast(1).on("child_added", (snapshot) => {
        const data = snapshot.val();
        console.log("📡 Received Data:", data); // Debugging

        if (data) {
            // ✅ Get elements
            const imgElement = document.getElementById("bacteriaImage");
            const ecoliElement = document.getElementById("ecoliCount");
            const coliformElement = document.getElementById("coliformCount");
            const totalElement = document.getElementById("totalCount");
            const statusElement = document.getElementById("potabilityStatus");

            // ✅ Update image (Check if URL is valid)
            if (data.image_url) {
                imgElement.src = data.image_url;
            } else {
                imgElement.src = "placeholder.jpg"; // Fallback image
            }

            // ✅ Update text content
            ecoliElement.textContent = data.e_coli_count ?? "N/A";
            coliformElement.textContent = data.coliform_count ?? "N/A";
            totalElement.textContent = (data.e_coli_count ?? 0) + (data.coliform_count ?? 0);

            // ✅ Update potability status with proper class
            statusElement.textContent = data.potable ? "Safe ✅" : "Unsafe ❌";
            statusElement.className = data.potable ? "status safe" : "status unsafe";

            console.log("✅ Webpage Updated Successfully!");
        }
    }, (error) => {
        console.error("❌ Firebase Error:", error);
    });
}

// ✅ Call function to get the latest data
getLatestData();
getLatestData();
