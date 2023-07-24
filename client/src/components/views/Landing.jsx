import Events from "../landing/Events.jsx";
import Footer from "../landing/Footer.jsx";
import Hero from "../landing/Hero.jsx";
import Recomend from "../landing/Recomend.jsx";
import Reviews from "../landing/Reviews.jsx";
import Services from "../landing/Services.jsx";
// import Header from "../landing/Header.jsx";

const Landing = () => {
  return (
    <div>
      {/* <Header /> */}
      <Hero />
      <Recomend />
      <Events />
      <Reviews />
      <Services />
      <Footer />
    </div>
  );
};

export default Landing;
