import './App.css'
import Home from './Home/home'
import Navbar from './Navbar/Navbar'
import Career from './Career/Careers'
// import SubCareer from './Career/SubCar'
import CareerDetails from './Career/careerDetails';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SubCareer from './Career/SubCar';


function App() {
  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Career/Careers" element={<Career />} />
      <Route path="/category/:id" element={<SubCareer/>} />
      <Route path="/career/:careerName" element={<CareerDetails />} /> 
      </Routes>
    </Router>
    </>
  )
}

export default App;
