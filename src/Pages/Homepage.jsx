import Footer from '../Components/Footer/Footer';
import Navbar from '../Components/Navbar/Navbar';
import Home from "../Components/Home/home";
import About from "../Components/Home/about";

export default function Homepage() {
    return (
      <div className='home-page'>
        <Navbar/>
        <Home/>
        <About/>
        <Footer/>
      </div>
    )
  }