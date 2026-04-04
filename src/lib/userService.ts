import { db } from "@/config/firebase";
import { ref, get, set, update } from "firebase/database";

// Generate unique ID with counter
async function generateUniqueId() {
  const counterRef = ref(db, "meta/counter");
  const snapshot = await get(counterRef);

  let count = 1;

  if (snapshot.exists()) {
    count = snapshot.val() + 1;
  }

  await set(counterRef, count);

  return "RONINRHYTHM" + String(count).padStart(5, "0");
}

// Main user handling function
export async function handleUser(user: any) {
  // Replace dots with underscores in email for Firebase key compatibility
  const emailKey = user.email.replace(/\./g, "_");
  const userRef = ref(db, "users/" + emailKey);
  const snapshot = await get(userRef);

  // ✅ EXISTING USER
  if (snapshot.exists()) {
    console.log("Existing user found");
    return snapshot.val();
  }

  // 🆕 NEW USER - Create profile
  console.log("Creating new user");
  const uniqueId = await generateUniqueId();

  const newUser = {
    name: user.displayName || "",
    email: user.email,
    picture: user.photoURL || "",
    id: uniqueId,
    phone: "",
    danceStyle: "",
    perks: "WORKSHOP + RONIN RHYTHM BATTLE",
    createdAt: Date.now(),
    googleId: user.uid,
  };

  try {
    await set(userRef, newUser);
    console.log("New user created with ID:", uniqueId);
    return newUser;
  } catch (error) {
    console.error("Error creating new user:", error);
    throw error;
  }
}

// Get user by email
export async function getUser(email: string) {
  const emailKey = email.replace(/\./g, "_");
  const userRef = ref(db, "users/" + emailKey);
  const snapshot = await get(userRef);

  if (snapshot.exists()) {
    return snapshot.val();
  }
  return null;
}

// Save registration data
export async function saveRegistration(email: string, data: any) {
  const emailKey = email.replace(/\./g, "_");
  const userRef = ref(db, "users/" + emailKey);

  try {
    await update(userRef, {
      phone: data.phone,
      danceStyle: data.danceStyle,
    });
    console.log("Registration saved successfully");
  } catch (error) {
    console.error("Error saving registration:", error);
    throw error;
  }
}

// Update user profile
export async function updateUserProfile(email: string, updates: any) {
  const emailKey = email.replace(/\./g, "_");
  const userRef = ref(db, "users/" + emailKey);

  try {
    await update(userRef, {
      ...updates,
      updatedAt: Date.now(),
    });
    console.log("User profile updated");
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
}

// Get all users (for leaderboard)
export async function getAllUsers() {
  const usersRef = ref(db, "users");
  const snapshot = await get(usersRef);

  if (snapshot.exists()) {
    return snapshot.val();
  }
  return {};
}
