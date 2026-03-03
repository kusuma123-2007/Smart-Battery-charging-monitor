// Ask notification permission
Notification.requestPermission();

navigator.getBattery().then(function (battery) {

    // Audio file (inside client folder)
    let sound = new Audio("notification.mp3");

    // Prevent repeated alerts
    let alertedLevels = [];

    function sendBatteryData(level, charging) {

    fetch("http://localhost:5000/battery", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            batteryLevel: level,
            chargingStatus: charging,
            time: new Date()
        })
    })
    .then(res => res.json())
    .then(data => console.log("✅ Sent to server:", data))
    .catch(err => console.error("❌ Fetch Error:", err));
}

    // Function to send notification + sound
    function sendNotification(message, level) {

        if (alertedLevels.includes(level)) return;

        alertedLevels.push(level);

        // Play notification sound
        sound.play();

        // Desktop Notification
        if (Notification.permission === "granted") {
            new Notification("🔋 Smart Battery Charging Monitor", {
                body: message,
                icon: "https://cdn-icons-png.flaticon.com/512/3103/3103446.png"
            });
        }
    }


    // Update Battery Information
    function updateBattery() {

    let level = Math.floor(battery.level * 100);

    document.getElementById("level").textContent = level;

    document.getElementById("status").textContent =
        battery.charging ? "Charging 🔌" : "Discharging ⚡";


    // ======================
    // 🔌 CHARGING LEVELS
    // ======================
    if (battery.charging) {

        if (level >= 50 && !alertedLevels.includes("c50")) {
            sendNotification("Battery reached 50% while charging", "c50");
            alertedLevels.push("c50");
        }

        if (level >= 80 && !alertedLevels.includes("c80")) {
            sendNotification("Battery reached 80% - unplug recommended", "c80");
            alertedLevels.push("c80");
        }

        if (level >= 100 && !alertedLevels.includes("c100")) {
            sendNotification("Battery Fully Charged", "c100");
            alertedLevels.push("c100");
        }
    }


    // ======================
    // ⚡ DISCHARGING LEVELS
    // ======================
    if (!battery.charging) {

        if (level <= 40 && !alertedLevels.includes("d40")) {
            sendNotification("Battery dropped to 40%", "d40");
            alertedLevels.push("d40");
        }

        if (level <= 20 && !alertedLevels.includes("d20")) {
            sendNotification("Battery Low! Plug charger", "d20");
            alertedLevels.push("d20");
        }

        if (level <= 10 && !alertedLevels.includes("d10")) {
            sendNotification("Critical Battery!", "d10");
            alertedLevels.push("d10");
        }
    }

    sendBatteryData(level, battery.charging);
}

    // Initial update
    updateBattery();

    // Detect changes automatically
    battery.addEventListener("levelchange", updateBattery);
    battery.addEventListener("chargingchange", updateBattery);

});


// ✅ Sound test (click anywhere once)
document.body.addEventListener("click", () => {
    let testSound = new Audio("notification.mp3");

    testSound.play();
});
function testNotification() {

    let sound = new Audio("notification.mp3");

    sound.currentTime = 0;
    sound.play();

    if (Notification.permission === "granted") {
        new Notification("Smart Battery Monitor", {
            body: "Test Notification Working ✅"
        });
    }
}

async function loadBatteryData() {

    const response =
        await fetch("http://localhost:5000/battery-data");

    const data = await response.json();

    const table =
        document.getElementById("tableData");

    if(!table) return;

    table.innerHTML = "";

    data.forEach(item => {

        const row = `
        <tr>
            <td>${item.batteryLevel}%</td>
            <td>
            ${item.chargingStatus ?
            "Charging 🔌" :
            "Discharging ⚡"}
            </td>
            <td>
            ${new Date(item.time)
            .toLocaleString()}
            </td>
        </tr>
        `;

        table.innerHTML += row;
    });
}

window.onload = () => {
    loadBatteryData();
    setInterval(loadBatteryData, 5000);
};