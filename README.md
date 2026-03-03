# 🔋 Smart Battery Charging Monitor

A Full Stack Web Application that monitors laptop battery level in real-time, sends smart notifications at specific charging levels, and stores battery history in MongoDB with a dashboard view.

---

## 🚀 Features

- 🔋 Real-time Battery Level Detection
- 🔌 Charging / Discharging Status Detection
- 🔔 Smart Notifications at Custom Levels (20%, 50%, 80%, 100%)
- 🔊 Notification Sound Alert
- 📊 Battery History Dashboard
- 🗄 MongoDB Data Storage
- 🔄 Auto Updating Dashboard (Every 5 Seconds)
- 🧹 Clean GitHub Structure (node_modules ignored)

---

## 🛠 Technologies Used

### Frontend
- HTML
- CSS
- JavaScript
- Battery Status API

### Backend
- Node.js
- Express.js
- CORS

### Database
- MongoDB
- Mongoose

---

## 📁 Project Structure
Smart-Battery-Charging-Monitor
│
├── client
│ ├── index.html
│ ├── style.css
│ ├── script.js
│ └── notification.mp3
│
├── server
│ ├── server.js
│ ├── package.json
│ └── package-lock.json
│
└── .gitignore

### 3️⃣ Start MongoDB
Make sure MongoDB is running locally.

### 4️⃣ Run Server

### 5️⃣ Run Frontend

Open `client/index.html` using Live Server in VS Code.

---

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|------------|
| POST | /battery | Save battery data |
| GET | /battery-data | Get battery history |

---

## 💡 How It Works

1. Browser Battery API detects battery level.
2. JavaScript sends data to Node.js backend.
3. Backend stores data in MongoDB.
4. Dashboard fetches and displays battery history.
5. Notification sound plays at defined battery levels.

---

## 🎯 Future Improvements

- Add battery analytics graph
- Add user authentication
- Deploy online (Render / Railway)
- Add battery health prediction

---

## 👩‍💻 Author

**P Kusuma**

Full Stack Developer Project  
2026

---

## ⭐ If you like this project

Give it a star on GitHub ⭐
