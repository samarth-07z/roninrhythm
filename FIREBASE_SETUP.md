# Firebase Realtime Database Setup Guide

## Step 1: Get Your Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click on **Project Settings** (gear icon)
4. Go to **Your apps** section
5. Click on your web app
6. Copy the config object

## Step 2: Update Firebase Config

Edit `src/config/firebase.ts` and replace the placeholder values with your actual credentials:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

## Step 3: Enable Realtime Database

1. In Firebase Console, go to **Realtime Database**
2. Click **Create Database**
3. Choose **Start in test mode** (for development)
4. Select your region
5. Copy the database URL and update `src/config/firebase.ts`

## Step 4: Firebase Rules (Important!)

For production, update your security rules in Firebase Console:

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    },
    "leaderboard": {
      ".read": true,
      ".write": "auth != null"
    },
    "battles": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

## Step 5: Using Firebase in Your Components

### Save User Data
```typescript
import { createUser } from "@/lib/firebase-db";

const handleGoogleSuccess = async (userData) => {
  await createUser(userData.googleId, {
    name: userData.name,
    email: userData.email,
    picture: userData.picture,
  });
};
```

### Save Battle Score
```typescript
import { saveBattleScore } from "@/lib/firebase-db";

const saveBattle = async () => {
  await saveBattleScore(userId, {
    score: 1000,
    accuracy: 95.5,
    difficulty: "hard"
  });
};
```

### Get Leaderboard (Real-time)
```typescript
import { onLeaderboardChange } from "@/lib/firebase-db";
import { useEffect, useState } from "react";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState({});

  useEffect(() => {
    const unsubscribe = onLeaderboardChange((data) => {
      setLeaderboard(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {Object.entries(leaderboard).map(([userId, data]: any) => (
        <div key={userId}>
          <h3>{data.name}</h3>
          <p>Score: {data.score}</p>
        </div>
      ))}
    </div>
  );
};
```

## Available Functions

### User Operations
- `createUser(userId, userData)` - Create a new user
- `getUser(userId)` - Get user data
- `updateUser(userId, updates)` - Update user data
- `deleteUser(userId)` - Delete user

### Battle Operations
- `saveBattleScore(userId, battleData)` - Save battle score
- `getUserBattles(userId)` - Get all battles for a user

### Leaderboard
- `updateLeaderboard(userId, score, userName)` - Update leaderboard
- `getLeaderboard()` - Get all leaderboard data
- `onLeaderboardChange(callback)` - Real-time leaderboard updates

### General Utilities
- `readData(path)` - Read data from any path
- `writeData(path, data)` - Write data to any path

## Database Structure

```
├── users/
│   ├── userId1/
│   │   ├── name
│   │   ├── email
│   │   ├── picture
│   │   └── createdAt
│   └── userId2/...
├── battles/
│   ├── userId1/
│   │   ├── battle_1/
│   │   │   ├── score
│   │   │   ├── accuracy
│   │   │   └── timestamp
│   │   └── battle_2/...
│   └── userId2/...
└── leaderboard/
    ├── userId1/
    │   ├── name
    │   ├── score
    │   └── timestamp
    └── userId2/...
```

## Environment Variables (Optional)

For better security, you can store credentials in `.env`:

```bash
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
VITE_FIREBASE_DATABASE_URL=YOUR_DATABASE_URL
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
```

Then update `src/config/firebase.ts`:
```typescript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
```

## Testing

1. Add a test user through the functions
2. Check Firebase Console to verify data is being saved
3. Check that Google Sign-In saves user data automatically

## Troubleshooting

- **Permission Denied errors**: Check your Firebase security rules
- **Database URL not found**: Ensure Realtime Database is created in Firebase Console
- **Data not saving**: Check browser console for error messages

---

**Next Steps:**
1. Update `src/config/firebase.ts` with your credentials
2. Update your Login.tsx to save user data on Google login
3. Create a Leaderboard component
4. Add battle score saving functionality
