import About_q from './About/About-q';
import Home from './Home/home';
import Navbar from './Navbar/Navbar'
import "./Homepage.css"
import About_s from './About/About-s';
import Techn from './About/Tecn';
import Footer from './Footer/Footer';

export default function Homepage() {
    return (
      <div className='home-page'>
        <Navbar/> 
        <Home/> 
        <About_q/>
        <About_s/>
        <Techn/>
        <Footer/>
      </div>
    )
  }