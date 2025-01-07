import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar";
import StrategySection from "../Components/Strategies/StrategySection";
import StratFront from "../Components/Strategies/stratFront";

const Strategies = () => {
  return (
    <div>
      <Navbar />
      <StratFront />
      <hr/>
      <StrategySection />
      <Footer />
    </div>
  );
};

export default Strategies;
