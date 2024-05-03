import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Attendance from './pages/Attendance'
import Attendees from './pages/Attendees'
import Edit from './pages/Edit'
import Register from './pages/Register'
import { LoginDataProvider } from './context/LoginDataContext';

function App() {
    return (
      <div className="page-wrapper shadow d-flex flex-column justify-content-center align-items-center">
        <Router>
            <LoginDataProvider>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/attendees" element={<Attendees />} />
                <Route path="/edit" element={<Edit />} />
              </Routes>
            <Footer />
            </LoginDataProvider>
        </Router>
    </div>
  )
}

export default App
