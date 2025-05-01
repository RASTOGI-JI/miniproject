// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Homes from './pages/Home';
import About from './pages/About';
import Service from './pages/Service';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import GuestList from './pages/GuestList';
import BudgetTracker from './pages/BudgetTracker';
import Reminders from './pages/Reminders';
import Navbar from './components/Navbar';
import Pricing from './pages/Pricing';
import SignIn from './pages/SignIn';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import './App.css';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

function AppContent() {
  // Initialize AOS once when the app loads
  useEffect(() => {
    // Wait for DOM to be fully loaded
    if (typeof window !== 'undefined' && window.AOS) {
      // Small timeout to ensure DOM is ready
      setTimeout(() => {
        window.AOS.init({
          duration: 1000,
          once: true,
          disable: 'mobile'
        });
      }, 200);
    }
  }, []);

  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Homes />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/guestlist" element={<GuestList />}/>
          <Route path="/budget" element={<BudgetTracker />}/>
          <Route path="/reminders" element={<Reminders />}/>
          <Route path="/Pricing" element={<Pricing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </AuthProvider>
  );
}

