# 🥷 Ronin Rhythm

<p align="center">
  <img src="public/favicon.ico" alt="Ronin Rhythm Logo" width="150"/>
</p>

<p align="center">
  <strong>A modern event management platform built with React, Vite, and Firebase.</strong><br>
  Register participants, authenticate users, store registrations in Firestore, and automatically generate unique digital ID cards for every attendee.
</p>

<p align="center">

![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</p>

---

# 📖 Overview

**Ronin Rhythm** is a full-stack event registration website designed for hackathons, dance battles, college fests, workshops, competitions, and community events.

The platform provides a seamless registration experience by allowing users to create an account, register for an event, securely store participant information in Firebase Firestore, and instantly receive a uniquely generated digital participant ID card.

Although originally developed for the **Ronin Rhythm Dance Battle**, the platform has been built in a reusable way and can easily be adapted for virtually any event.

---

# ✨ Features

## 🔐 Authentication

- Secure user registration
- Login & authentication
- Firebase Authentication support
- Protected user dashboard

## 📝 Event Registration

- Simple registration workflow
- Participant information collection
- Real-time Firestore database storage
- Duplicate registration prevention

## 🆔 Automatic ID Card Generation

Every successful registration generates:

- Unique Participant ID
- Personalized Digital ID Card
- Downloadable Event Pass
- Easy attendee verification

## ☁️ Firebase Integration

- Firebase Authentication
- Firestore Database
- Real-time data synchronization
- Scalable cloud backend

## 💻 Modern Frontend

- React
- Vite
- Responsive UI
- Fast loading
- Mobile friendly
- Clean component architecture

---

# 🚀 Why Use This Project?

This project serves as an excellent starter template for creating modern event management websites.

It can be customized for:

- 🎤 College Fests
- 💻 Hackathons
- 💃 Dance Competitions
- 🏆 Sports Events
- 🎨 Workshops
- 📚 Seminars
- 🎭 Cultural Events
- 🎮 Gaming Tournaments
- 📅 Conferences

Instead of building an event portal from scratch, organizers can customize this project to launch a fully functional registration website within minutes.

---

# 🛠 Tech Stack

### Frontend

- React
- Vite
- JavaScript
- HTML5
- CSS3

### Backend

- Firebase Authentication
- Cloud Firestore

### Package Manager

- npm

---

# 📂 Project Structure

```
RoninRhythm/
│
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── firebase/
│   ├── utils/
│   └── App.jsx
│
├── package.json
├── vite.config.js
└── README.md
```

---

# ⚡ Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/samarth-07z/roninrhythm.git
```

Move into the project folder

```bash
cd roninrhythm
```

---

## 2. Install dependencies

```bash
npm install
```

---

## 3. Configure Firebase

Create a `.env` file in the project root and add your Firebase configuration.

Example:

```env
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
```

---

## 4. Start the development server

```bash
npm run dev
```

The application will be available at

```
http://localhost:5173
```

---

# 📦 Build for Production

```bash
npm run build
```

Preview the production build

```bash
npm run preview
```

---

# 💡 Example Workflow

1. User signs up.
2. User logs in.
3. User completes event registration.
4. Registration details are stored in Firestore.
5. A unique participant ID is generated.
6. A personalized digital ID card is created.
7. Event organizers can verify participants using their unique ID.

---

# 📸 Screenshots

> Add screenshots of the following pages:

- Home Page
- Registration Page
- Login Page
- Dashboard
- Generated ID Card

---

# 🔒 Firebase Services Used

- Firebase Authentication
- Cloud Firestore

The project stores participant information securely in Firestore while using Firebase Authentication for secure account management.

---

# 🎯 Future Improvements

- QR Code verification
- Admin dashboard
- Attendance tracking
- Email confirmation
- Payment gateway integration
- Multi-event support
- Event analytics
- PDF ID card download
- Role-based authentication
- SMS notifications

---

# 🤝 Contributing

Contributions are welcome!

If you'd like to improve the project:

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/awesome-feature
```

3. Commit your changes

```bash
git commit -m "Add awesome feature"
```

4. Push to your branch

```bash
git push origin feature/awesome-feature
```

5. Open a Pull Request

Please keep your code clean, well-documented, and follow the existing project structure.

---

# 🆘 Support

If you encounter any issues or have suggestions:

- Open an Issue on GitHub
- Submit a Pull Request
- Start a Discussion

---

# 👨‍💻 Maintainer

### Samarth S

AI & ML Engineering Student  
Frontend Developer • UI/UX Designer • Cloud & AI Enthusiast

GitHub:
> https://github.com/samarth-07z

---

# ⭐ If you found this project useful...

Please consider giving it a ⭐ on GitHub.

It helps others discover the project and motivates future development.

---

<p align="center">
Made with ❤️ using React, Vite & Firebase
</p>
