

### 📦 README.md 

# 🎵 Tunes – Music Streaming Web App

A full-stack music streaming platform where users can upload and stream MP3 files. Built using **React**, **Node.js**, and **MongoDB**, the app demonstrates how to handle audio upload, real-time streaming, and secure backend communication.

---

## 🚀 Features

- Upload MP3 files and store metadata
- Stream audio directly from the server
- Real-time play/pause functionality with HTML5 `<audio>`
- MongoDB to store song info (title, artist, etc.)
- Responsive UI with player controls
- REST API for file handling and data retrieval

---

## 🛠 Tech Stack

**Frontend**
- React.js (Hooks + Functional Components)
- HTML5 `<audio>` element
- CSS3 / Bootstrap / Material UI (based on your usage)

**Backend**
- Node.js + Express.js
- Multer (for file uploads)
- MongoDB (with Mongoose)

**DevOps**
- Docker-ready (if containerized)
- CORS enabled for frontend-backend communication

---

## 📁 Project Structure

```

/client       → React app
/server       → Node.js backend
/uploads      → Uploaded music files

````

---

## ⚙️ Setup Instructions

### ▶️ Local Setup

#### 1. Clone the repo

```bash
git clone https://github.com/amarbalu/tunes.git
cd tunes
````

#### 2. Backend Setup

```bash
cd server
npm install
npm start
```

Backend will run at: `http://localhost:5000`

#### 3. Frontend Setup

```bash
cd client
npm install
npm start
```

Frontend will run at: `http://localhost:3000`

---

## 🔌 API Endpoints

| Method | Endpoint      | Description                |
| ------ | ------------- | -------------------------- |
| POST   | `/upload`     | Uploads an MP3 file        |
| GET    | `/songs`      | Returns all uploaded songs |
| GET    | `/stream/:id` | Streams selected MP3 file  |

---

## 📷 Screenshots

> *\[Include screenshots or a short GIF of the player UI + upload functionality]*
> *(You can add them in a `/screenshots` folder and link them here)*

---

## 💡 Future Enhancements

* User authentication & playlists
* Lyrics integration (e.g., Musixmatch API)
* Search & filter songs
* Stream from AWS S3 / Cloudinary
* Dark mode player UI

---

## 👨‍💻 Author

**Amar Balu**

* 💼 [GitHub](https://github.com/amarbalu)
* ✍️ [Medium](https://medium.com/@inboxamarbalu)
* 🌐 [Portfolio](https://amarbalu.github.io/portfolio)

> ⭐ If you like this project, star the repo and follow for more!


