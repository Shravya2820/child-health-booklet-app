import { useEffect, useState } from 'react'
import { getAllRecords } from '../services/offlineDB'

export default function Records() {
  const [records, setRecords] = useState([])

  useEffect(() => {
    getAllRecords().then(setRecords)
  }, [])

  return (
    <div>
      <h2>Saved Records</h2>

      {records.length === 0 && <p>No records yet</p>}

      {records.map(r => (
        <div key={r.healthId}>
          <b>{r.name}</b> – {r.age} yrs –{' '}
          {r.synced ? '✅ Synced' : '⏳ Pending'}
        </div>
      ))}
    </div>
  )
}
