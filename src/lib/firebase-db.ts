import { ref, set, get, update, remove, onValue, query, orderByChild, equalTo } from "firebase/database";
import { database } from "@/config/firebase";

// User operations
export const createUser = async (userId: string, userData: any) => {
  try {
    await set(ref(database, `users/${userId}`), {
      ...userData,
      createdAt: new Date().toISOString(),
    });
    console.log("User created successfully");
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const getUser = async (userId: string) => {
  try {
    const snapshot = await get(ref(database, `users/${userId}`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No user data available");
      return null;
    }
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
};

export const updateUser = async (userId: string, updates: any) => {
  try {
    await update(ref(database, `users/${userId}`), {
      ...updates,
      updatedAt: new Date().toISOString(),
    });
    console.log("User updated successfully");
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUser = async (userId: string) => {
  try {
    await remove(ref(database, `users/${userId}`));
    console.log("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// Battle/Score operations
export const saveBattleScore = async (userId: string, battleData: any) => {
  try {
    const battleId = `battle_${Date.now()}`;
    await set(ref(database, `battles/${userId}/${battleId}`), {
      ...battleData,
      timestamp: new Date().toISOString(),
    });
    console.log("Battle score saved");
    return battleId;
  } catch (error) {
    console.error("Error saving battle score:", error);
    throw error;
  }
};

export const getUserBattles = async (userId: string) => {
  try {
    const snapshot = await get(ref(database, `battles/${userId}`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return {};
    }
  } catch (error) {
    console.error("Error getting user battles:", error);
    throw error;
  }
};

// Leaderboard operations
export const updateLeaderboard = async (userId: string, score: number, userName: string) => {
  try {
    await set(ref(database, `leaderboard/${userId}`), {
      name: userName,
      score: score,
      timestamp: new Date().toISOString(),
    });
    console.log("Leaderboard updated");
  } catch (error) {
    console.error("Error updating leaderboard:", error);
    throw error;
  }
};

export const getLeaderboard = async () => {
  try {
    const snapshot = await get(ref(database, "leaderboard"));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return {};
    }
  } catch (error) {
    console.error("Error getting leaderboard:", error);
    throw error;
  }
};

// Real-time listener for leaderboard
export const onLeaderboardChange = (callback: (data: any) => void) => {
  const leaderboardRef = ref(database, "leaderboard");
  return onValue(leaderboardRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.val());
    } else {
      callback({});
    }
  });
};

// General utility for reading data
export const readData = async (path: string) => {
  try {
    const snapshot = await get(ref(database, path));
    return snapshot.exists() ? snapshot.val() : null;
  } catch (error) {
    console.error(`Error reading data from ${path}:`, error);
    throw error;
  }
};

// General utility for writing data
export const writeData = async (path: string, data: any) => {
  try {
    await set(ref(database, path), data);
    console.log(`Data written to ${path}`);
  } catch (error) {
    console.error(`Error writing data to ${path}:`, error);
    throw error;
  }
};
