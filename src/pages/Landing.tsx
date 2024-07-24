import bgImage from '../assets/common/Logo-bg.svg';
import About from '../components/Landing/About';
import Footer from '../components/Landing/Footer';
import Gallery from '../components/Landing/Gallery';
import Header from '../components/Landing/Header';
import Hero from '../components/Landing/Hero';
import Invocation from '../components/Landing/Invocation';

const Landing = () => {
  return (
    <div
      className="bg-no-repeat bg-start bg-top-menu-dark bg-contain md:bg-contain lg:bg-[length:1564px_1452px] bg-custom-position "
      style={{
        backgroundImage: `url(${bgImage})
      `,
      }}
    >
      <Header />
      <main>
        <Hero />
        <About />
        <Gallery />
        <Invocation />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
