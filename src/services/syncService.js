export async function uploadRecord(record) {
  // simulate network delay
  await new Promise(res => setTimeout(res, 800))

  console.log('Uploaded to server:', record.healthId)

  // pretend server accepted it
  return { success: true }
}
