// Firebase Configuration
const firebaseConfig = {
    	apiKey: "AIzaSyBGPqzH7H2tBvuCoIDJcmq9ZxoGkPL1R10",
	authDomain: "watpad.firebaseapp.com",
	projectId: "watpad",
	storageBucket: "watpad.firebasestorage.app",
	messagingSenderId: "664783349089",
	appId: "1:664783349089:web:7b28efdc2d9d062dddd120",
	measurementId: "G-VL4S9SQG0P"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Fetch data from Firebase
function fetchLatestDetection() {
    db.ref("/").orderByChild("timestamp").limitToLast(1).on("child_added", (snapshot) => {
        const data = snapshot.val();
        document.getElementById("coliformImage").src = data.image_url;
        document.getElementById("ecoliCount").textContent = data.e_coli_count;
        document.getElementById("coliformCount").textContent = data.coliform_count;
        document.getElementById("potability").textContent = data.potable ? "Safe to Drink" : "Not Safe";
    });
}

fetchLatestDetection();
