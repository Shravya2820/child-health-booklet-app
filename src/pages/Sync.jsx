import { useEffect, useState } from 'react'
import { getAllRecords, markAsSynced } from '../services/offlineDB'
import { uploadRecord } from '../services/syncService'
import { isOnline } from '../services/network'

export default function Sync() {
  const [records, setRecords] = useState([])
  const [status, setStatus] = useState('')

  useEffect(() => {
    getAllRecords().then(setRecords)
  }, [])

  async function handleSync() {
    if (!isOnline()) {
      setStatus('❌ No internet connection')
      return
    }

    setStatus('🔄 Syncing...')

    for (const record of records.filter(r => !r.synced)) {
      const res = await uploadRecord(record)
      if (res.success) {
        await markAsSynced(record.healthId)
      }
    }

    const updated = await getAllRecords()
    setRecords(updated)
    setStatus('✅ Sync complete')
  }

  return (
    <div>
      <h2>Upload & Sync</h2>

      <button onClick={handleSync}>Sync Now</button>

      <p>{status}</p>

      {records.map(r => (
        <div key={r.healthId}>
          {r.name} — {r.synced ? '✅ Synced' : '⏳ Pending'}
        </div>
      ))}
    </div>
  )
}
