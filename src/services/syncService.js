export async function uploadRecord(record) {
  const response = await fetch("http://localhost:4000/records", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(record)
  });

  if (!response.ok) {
    throw new Error("Failed to upload record");
  }

  return await response.json();
}