import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import ServiceDetail from './pages/ServiceDetail'
import MyToken from './pages/MyToken'
import OperatorDashboard from './pages/OperatorDashboard'
import AdminOverview from './pages/AdminOverview'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/service/:id" element={<ServiceDetail />} />
        <Route path="/my-token" element={<MyToken />} />
        <Route path="/operator" element={<OperatorDashboard />} />
        <Route path="/admin" element={<AdminOverview />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App