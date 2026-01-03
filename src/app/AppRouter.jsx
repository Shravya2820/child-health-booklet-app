import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import NewChild from '../pages/NewChild'
import Records from '../pages/Records'
import Sync from '../pages/Sync'
import Profile from '../pages/Profile'

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/new" element={<NewChild />} />
      <Route path="/records" element={<Records />} />
      <Route path="/sync" element={<Sync />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  )
}
