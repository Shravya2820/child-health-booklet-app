import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { saveRecord } from '../services/offlineDB'
import { generateHealthId } from '../utils/healthId'

export default function NewChild() {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const navigate = useNavigate()

  async function handleSave() {
    const healthId = generateHealthId()

    const record = {
      healthId,
      name,
      age,
      synced: false,
      createdAt: new Date().toISOString(),
    }

    await saveRecord(record)
    navigate('/records')
  }

  return (
    <div>
      <h2>New Child Form</h2>

      <input
        placeholder="Child Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Age"
        value={age}
        onChange={e => setAge(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSave}>Save Offline</button>
    </div>
  )
}
