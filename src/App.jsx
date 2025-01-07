import './App.css';
import Homepage from './Pages/Homepage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Career from './Career/Careers'; 
import SubCareer from './Career/SubCar';
import CareerDetail from './Career/SubCareerDetails';
import Background from './Background';
import './index.css';
import Strategies from './Pages/Strategies';
import ScrollToTop from './Components/ui/ScrollToTop';

function App() {
  return (
    <Router>
      <Background />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Homepage />} /> 
        <Route path="/career" element={<Career />} /> 
        <Route path="/category/:id" element={<SubCareer />} />
        <Route path="/career/:careerName" element={<CareerDetail />} /> 
        <Route path="/strategies" element={<Strategies />} />
      </Routes>
    </Router>
  );
}

export default App;

