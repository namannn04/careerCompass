import './App.css'
import Home from './Home/home';
import Homepage from './Homepage';
import Navbar from './Navbar/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Career from './Career/Careers'; 
import SubCareer from './Career/SubCar';
import CareerDetail from './Career/SubCareerDetails';
import Strategies from './Strategies/stratFront';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} /> 
        <Route path="/career" element={<Career />} /> 
        <Route path="/category/:id" element={<SubCareer/>} />
        <Route path="/career/:careerName" element={<CareerDetail/>} /> 
        <Route path="/Strategies" element={<Strategies/>} /> 
      </Routes>
    </Router>
  )
}

export default App;
