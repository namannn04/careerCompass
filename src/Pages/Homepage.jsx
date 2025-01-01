import Footer from '../Components/Footer/Footer';
import Navbar from '../Components/Navbar/Navbar';
import Home from "../Components/Home/home";
import About from "../Components/Home/about";
import { Contact } from 'lucide-react';

export default function Homepage() {
    return (
      <div className='home-page'>
        <Navbar/>
        <Home/>
        <About/>
        <Contact/>
        <Footer/>
      </div>
    )
  }