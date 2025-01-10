import Footer from '../Components/Footer/Footer';
import Navbar from '../Components/Navbar';
import Home from "../Components/Home/home";
import About from "../Components/Home/about";
import Contact from '../Components/Contact';

export default function Homepage() {
    return (
      <main>
        <Navbar/>
        <Home/>
        <About/>
        <Contact/>
        <Footer/>
      </main>
    )
  }