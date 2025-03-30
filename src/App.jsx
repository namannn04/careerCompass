import "./App.css";
import Homepage from "./Pages/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Career from "./Pages/Careers";
import SubCareer from "./Pages/SubCareer";
import CareerDetail from "./Pages/SubCareerDetails";
import Background from "./Background";
import "./index.css";
import Strategies from "./Pages/Strategies";
import ScrollToTop from "./Components/ui/ScrollToTop";
import AuthPage from "./Pages/AuthPage";
import ProfilePage from "./Pages/ProfilePage";
import Chatbot from "./Components/Chatbot";
import Counselling from "./Pages/Counselling";
import { useState } from "react";
import "./Admin/admin-dashboard.css";
import LoginForm from "./Admin/LoginForm";
import AdminDashboard from "./Admin/AdminDashboard";
import AccessDenied from "./Admin/AccessDenied";
import ScheduleMeeting from "./Components/ScheduleMeeting";
import AdminPage from "./Pages/AdminPage";
// import useThemeStore from "./Context/useThemeStroe";
// import Settings from "./Components/Settings";

function App() {
  // const { theme } = useThemeStore();
  const [authState, setAuthState] = useState("login"); // 'login', 'authenticated', 'denied'

  const handleLogin = () => {
    setAuthState("authenticated");
  };

  const handleLogout = () => {
    setAuthState("login");
  };

  const handleAccessDenied = () => {
    setAuthState("denied");
  };

  const handleBackToLogin = () => {
    setAuthState("login");
  };
  return (
    <div>
      <Router>
        <Background />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/career" element={<Career />} />
          <Route path="/category/:id" element={<SubCareer />} />
          <Route path="/career/:careerName" element={<CareerDetail />} />
          <Route path="/strategies" element={<Strategies />} />
          <Route path="/authentication" element={<AuthPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/counselling" element={<Counselling />} />
          <Route path="/schedule" element={<ScheduleMeeting />} />
          <Route path="/admin" element={<AdminPage/>}/>
          {/* <Route path="/setting" element={<Settings />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
