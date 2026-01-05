// src/services/syncService.js
import { API_BASE } from "../config";

export async function syncRecord(record) {
  try {
    const response = await fetch(`${API_BASE}/records`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(record),
    });

    if (!response.ok) {
      throw new Error(`Server error ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };

  } catch (error) {
    console.error("SYNC FAILED:", error.message);
    return { success: false };
  }
}
