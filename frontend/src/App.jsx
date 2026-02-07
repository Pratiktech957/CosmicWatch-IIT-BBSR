import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Home from "./pages/Home/Home";
import ForgotPassword from "./pages/ForgotPassword";
import AuthSuccess from "./pages/AuthSuccess";
import LiveFeed from "./pages/LiveFeed/LiveFeed";
import Community from "./pages/Community/Community";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth/success" element={<AuthSuccess />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/live" element={<LiveFeed />} />
            <Route path="/community" element={<Community />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
