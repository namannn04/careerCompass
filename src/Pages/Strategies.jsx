import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar";
import StrategySection from "../Components/Strategies/StrategySection";
import StratFront from "../Components/Strategies/stratFront";

const Strategies = () => {
  return (
    <main>
      <Navbar />
      <StratFront />
      <hr/>
      <StrategySection />
      <Footer />
    </main>
  );
};

export default Strategies;
