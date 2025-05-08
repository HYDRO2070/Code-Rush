# ⚡ CodeRush — Interactive Coding Practice Platform

**CodeRush** is a dynamic, full-stack coding platform that enables users to solve programming challenges across multiple languages: **C++**, **JavaScript**, **Python**, and **Java**. With topic-based question generation, live code execution via **Docker containers**, and immersive visuals powered by **Three.js**, CodeRush helps you learn, practice, and grow—smarter and faster.

---

![CodeRush Banner](https://img.freepik.com/free-vector/laptop-with-program-code-isometric-icon-software-development-programming-applications-dark-neon_39422-971.jpg?semt=ais_hybrid&w=740) <!-- Optional visual -->

## 🚀 Core Features

- 🎯 **Topic-Based Coding Challenges**
  - Select a topic (e.g., arrays, loops, recursion) and receive randomized questions based on it.

- 💻 **Multi-Language Code Execution**
  - Supports **C++**, **JavaScript**, **Python**, and **Java** with secure, isolated runtime environments powered by **Docker**.

- 🧠 **Smart Progress Tracking**
  - Track your solved problems and view historical data to monitor improvement.

- 👤 **User Profiles**
  - Store individual user activity, languages used, and topic mastery for personalized growth.

- 🌀 **3D-Enhanced UI**
  - Built with **React Three Fiber** and **Three.js** to deliver a modern, immersive experience.

---

## 🧱 Tech Stack

| Layer          | Technology Used                            |
|----------------|---------------------------------------------|
| **Frontend**   | Next.js, React, Redux, TailwindCSS          |
| **3D Engine**  | Three.js, React Three Fiber                 |
| **Backend**    | Node.js, Express.js                         |
| **Database**   | MongoDB                                     |
| **Code Runtime** | Docker (language-specific containers)      |
| **Auth**       | JWT / OAuth (based on implementation)       |

---

## ⚙️ Local Setup & Installation

### 📦 Prerequisites

- Node.js v18+
- Docker
- MongoDB (local or Atlas)
- npm / yarn

### 🔧 Steps

```bash
# Clone the repository
git clone https://github.com/HYDRO2070/coderush.git
cd coderush

# Install frontend & backend dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start Docker daemon
docker --version  # Ensure Docker is running

# Start development server
npm run dev
````

💡 Make sure your `.env` includes:

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
DOCKER_SOCKET=/var/run/docker.sock
PORT=5000
```

---

## 🧪 How It Works

1. **User selects** a topic and language.
2. A **random question** is pulled from the database based on the selected topic.
3. The user writes code in the in-browser editor.
4. Code is sent to the backend and **executed inside a Docker container** for that language.
5. Output or errors are returned in real time.

---

## 📈 Roadmap

* [x] Docker-based isolated code execution
* [ ] AI-based hint system and solution feedback
* [ ] Leaderboards and community challenges
* [ ] Light/Dark mode and editor theming
* [ ] Mobile-first responsive design
* [ ] Time-based coding contests

---

## 🤝 Contributing

We welcome all contributions, big or small!

```bash
# Fork the repo
# Create your feature branch
git checkout -b feature/YourFeature

# Commit your changes
git commit -m "Add YourFeature"

# Push and create a pull request
git push origin feature/YourFeature
```

---
## 🌍 Live URL

🔗 [Coming Soon – Stay Tuned!](https://coderush.live)


