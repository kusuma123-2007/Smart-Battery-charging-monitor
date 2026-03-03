const mongoose = require("mongoose");
const Battery = require("./models/Battery");

const express = require("express");
const cors = require("cors");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/batteryDB")
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log(err));

app.use(cors());
app.use(express.json());

// API to receive battery data
app.post("/battery", async (req, res) => {

    try {

        const batteryData = new Battery(req.body);

        await batteryData.save();

        console.log("🔋 Battery Saved:", req.body);

        res.json({ message: "Saved Successfully" });

    } catch (error) {
        console.log(error);
    }

});

app.get("/battery-data", async (req, res) => {

    try {
        const data = await Battery.find().sort({ time: -1 });
        res.json(data);
    } catch (error) {
        console.log(error);
    }

});

// ✅ Delete all battery history
app.delete("/delete-data", async (req, res) => {

    try {
        await Battery.deleteMany({});
        console.log("🗑 Battery history deleted");

        res.json({
            message: "All battery data deleted"
        });

    } catch (error) {
        console.log(error);
    }
});

// Start server
app.listen(5000, () => {
    console.log("✅ Server running at http://localhost:5000");
});