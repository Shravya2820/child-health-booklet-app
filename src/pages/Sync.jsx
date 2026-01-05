import { useState } from "react";
import { syncRecord } from "../services/syncService";
import { markAsSynced } from "../services/offlineDB";

export default function Sync({ record }) {
  const [status, setStatus] = useState("idle");

  const startSync = async () => {
    setStatus("syncing");

    const result = await syncRecord(record);

    if (result.success) {
      setStatus("synced");

      // 🔥 VERY IMPORTANT
      await markAsSynced(record.healthId);

    } else {
      setStatus("failed");

      // 🔁 retry after 5 seconds
      setTimeout(() => startSync(), 5000);
    }
  };

  return (
    <div>
      <button onClick={startSync}>Sync Now</button>

      {status === "synced" && (
        <p style={{ color: "green" }}>✔ Synced successfully</p>
      )}

      {status === "failed" && (
        <p style={{ color: "red" }}>
          ❌ Sync failed. Retrying...
        </p>
      )}
    </div>
  );
}