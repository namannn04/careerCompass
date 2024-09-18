import Home from './Home/home';
import Navbar from './Navbar/Navbar'
import "./Homepage.css"
import Footer from './Footer/Footer';
import AboutSection from './Home/about';

export default function Homepage() {
    return (
      <div className='home-page'>
        <Navbar/> 
        <Home/>
        <AboutSection/>
        <Footer/>
      </div>
    )
  }