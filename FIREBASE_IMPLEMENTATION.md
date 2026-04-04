# 🔥 Firebase Realtime Database Implementation Complete

## What's Been Implemented

### ✅ Complete User Flow:
1. **Login Page** - Google OAuth via Firebase
2. **Registration Page** - Auto-populated user data + phone & dance style
3. **Pass Page** - Display user pass with unique ID and QR code
4. **Database Storage** - All data saved in Firebase Realtime DB

---

## 📋 Step-by-Step: What to Do Next

### STEP 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **Create a new project**
3. Enter project name (e.g., `ronin-rhythm`)
4. Enable Google Analytics (optional)
5. Create project

### STEP 2: Enable Authentication

1. Navigate to **Authentication** section
2. Click **Get started**
3. Select **Google** provider
4. Enable it
5. Add your project name in Authorized domains

### STEP 3: Create Realtime Database

1. Go to **Realtime Database**
2. Click **Create Database**
3. Select **Start in test mode** (for development)
4. Choose your region closest to your users
5. Click **Enable**
6. **Copy the Database URL** (format: `https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com`)

### STEP 4: Get Your Credentials

1. Click **Project Settings** (gear icon) → **Project Settings**
2. Scroll to **Your apps** section
3. Click your web app (or create one if needed)
4. Copy these values:
```
apiKey
authDomain
databaseURL
projectId
storageBucket (optional)
messagingSenderId (optional)
appId
```

### STEP 5: Update Firebase Config

Open `src/config/firebase.ts` and replace the placeholder values:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID", 
  appId: "YOUR_APP_ID",
};
```

### STEP 6: Set Firebase Security Rules (IMPORTANT!)

⚠️ **Test mode rules expire after 30 days!**

Go to **Realtime Database** → **Rules** tab and replace with:

```json
{
  "rules": {
    "meta": {
      "counter": {
        ".read": true,
        ".write": true
      }
    },
    "users": {
      "$key": {
        ".read": "auth != null",
        ".write": "auth != null",
        ".indexOn": ["email"]
      }
    },
    "battles": {
      "$uid": {
        ".read": "$uid === auth.uid || root.child('users').child($uid).exists()",
        ".write": "$uid === auth.uid"
      }
    },
    "leaderboard": {
      "$key": {
        ".read": true,
        ".write": "auth != null"
      }
    }
  }
}
```

Click **Publish** to apply.

---

## 🧠 How It Works

### Login Flow:
```
User clicks "Sign In With Google"
  ↓
Firebase authentication popup
  ↓
User approves
  ↓
Firebase returns user data (name, email, picture, UID)
  ↓
Check if user exists in Realtime DB
  ↓
  ├─ Exists → Fetch user data → Redirect to /pass
  └─ New → Create profile with unique ID → Redirect to /register
```

### Unique ID Generation:
- Uses a counter stored in Firebase: `meta/counter`
- Format: `RONINRHYTHM` + padded number
- Example: `RONINRHYTHM00001`, `RONINRHYTHM00002`, etc.

### Email Handling:
⚠️ **Important**: Firebase DB keys cannot contain dots (.)
- Email: `samarth07@gmail.com` 
- Stored as: `samarth07@gmail_com` (dots replaced with underscores)

### Registration:
- Pre-populated with user name & email from login
- User enters phone number & dance style
- Data saved to Firebase under the user's email key

### Pass Display:
- Shows user info, unique ID, dance style, phone
- Displays QR code (from assets)
- Final confirmation before entering arena

---

## 📁 Database Structure

```
firebase-realtime-db/
├── meta/
│   └── counter: 5
├── users/
│   ├── samarth07@gmail_com/
│   │   ├── name: "Samarth"
│   │   ├── email: "samarth07@gmail.com"
│   │   ├── picture: "https://..."
│   │   ├── id: "RONINRHYTHM00001"
│   │   ├── phone: "+91 9876543210"
│   │   ├── danceStyle: "hip-hop"
│   │   ├── perks: "WORKSHOP + RONIN RHYTHM BATTLE"
│   │   ├── createdAt: 1712284800000
│   │   ├── googleId: "uid_from_firebase"
│   │   └── updatedAt: 1712285400000
│   └── another@email_com/...
├── battles/
│   ├── uid_1/
│   │   ├── battle_1712284900000/
│   │   │   ├── score: 1000
│   │   │   ├── accuracy: 92.5
│   │   │   └── timestamp: "2024-04-05T..."
│   │   └── battle_1712285000000/...
│   └── uid_2/...
└── leaderboard/
    ├── uid_1/
    │   ├── name: "Samarth"
    │   ├── score: 5000
    │   └── timestamp: "2024-04-05T..."
    └── uid_2/...
```

---

## 🎯 Available Functions

### Authentication (`src/lib/auth.ts`)
```typescript
import { loginWithGoogle, logout } from "@/lib/auth";

const user = await loginWithGoogle(); // Returns Firebase User
await logout(); // Sign out user
```

### User Service (`src/lib/userService.ts`)
```typescript
import {
  handleUser,          // Main function for login
  getUser,             // Get user by email
  saveRegistration,    // Save phone & dance style
  updateUserProfile,   // Update user data
  getAllUsers          // Get all users (for leaderboard)
} from "@/lib/userService";

// Login flow
const googleUser = await loginWithGoogle();
const userData = await handleUser(googleUser);

// Get user
const user = await getUser("samarth07@gmail.com");

// Save registration
await saveRegistration("samarth07@gmail.com", {
  phone: "+91 9876543210",
  danceStyle: "hip-hop"
});

// Update profile
await updateUserProfile("samarth07@gmail.com", {
  phone: "+91 9876543210"
});
```

### Firebase DB Operations (`src/lib/firebase-db.ts`)
```typescript
// Battle operations
import { saveBattleScore, getUserBattles } from "@/lib/firebase-db";

await saveBattleScore(userId, {
  score: 1000,
  accuracy: 92.5,
  difficulty: "hard"
});

const battles = await getUserBattles(userId);

// Leaderboard
import { updateLeaderboard, getLeaderboard, onLeaderboardChange } from "@/lib/firebase-db";

await updateLeaderboard(userId, 5000, "Samarth");

const leaderboard = await getLeaderboard();

// Real-time updates
const unsubscribe = onLeaderboardChange((data) => {
  console.log("Leaderboard updated:", data);
});
```

---

## 🚀 Testing the Flow

1. **Update Config** → `src/config/firebase.ts`
2. **Run App** → `npm run dev`
3. **Test Login**:
   - Click "Sign In With Google"
   - Select your Google account
   - Should redirect to `/register`
4. **Test Registration**:
   - Name and email should be pre-filled
   - Enter phone and dance style
   - Click "Lock Your Spot"
   - Should show pass and redirect to `/pass`
5. **Check Firebase**:
   - Go to Firebase Console → Realtime Database
   - Should see your user data under `users/`

---

## ⚠️ Common Issues & Solutions

### 1. **No users being created**
- Check Firebase config is correct
- Ensure Realtime Database is created
- Check browser console for errors

### 2. **Permission Denied errors**
- Update Firebase Rules (see STEP 6)
- Make sure you're signed in

### 3. **Email key issues**
- Remember: dots (.) are replaced with underscores (_)
- Email `test@gmail.com` becomes `test@gmail_com`
- This is handled automatically in the code

### 4. **Unique ID not incrementing**
- Check `meta/counter` exists in database
- It should exist after first user registration

### 5. **QR Code not showing**
- Ensure `/public/assets/qr.png` exists
- Or replace with generated QR code using `qrcode.react` package

---

## 🔐 Production Checklist

- [ ] Update Firebase Rules for production
- [ ] Remove test mode from database
- [ ] Setup Firebase Hosting
- [ ] Enable CORS for your domain
- [ ] Review security rules
- [ ] Setup database backups
- [ ] Monitor Firebase usage/costs
- [ ] Setup error logging

---

## 📦 Files Modified/Created

**Created:**
- `src/config/firebase.ts` - Firebase configuration
- `src/lib/auth.ts` - Google OAuth with Firebase
- `src/lib/userService.ts` - User management logic
- `src/pages/Pass.tsx` - Event pass display

**Modified:**
- `src/pages/Login.tsx` - Firebase Google login
- `src/pages/Register.tsx` - Save to Firebase
- `src/App.tsx` - Added /pass route
- `package.json` - Firebase dependency added

**Config Updated:**
- `src/config/firebase.ts` - Needs your credentials

---

## 🎮  Next Steps

1. **Add Battle System**:
   - Create battle page
   - Save scores using `saveBattleScore()`
   - Update leaderboard

2. **Create Leaderboard Page**:
   - Display top players
   - Real-time updates with `onLeaderboardChange()`

3. **Add User Profile**:
   - Display user stats
   - Edit profile functionality

4. **Setup Deployment**:
   - Deploy to Vercel with Firebase
   - Update authorized domains

---

## 📚 Useful Resources

- [Firebase Docs](https://firebase.google.com/docs)
- [Realtime Database Guide](https://firebase.google.com/docs/database)
- [Authentication Setup](https://firebase.google.com/docs/auth/web/google-signin)
- [Rules Playground](https://firebase.google.com/docs/database/security)

---

**Your Firebase integration is ready! 🚀**
**Update your config and test thoroughly before going live.**
