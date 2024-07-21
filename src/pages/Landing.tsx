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
      className="bg-no-repeat bg-cover bg-start bg-top-menu-dark"
      style={{
        backgroundImage: `url(${bgImage})
      `,
        backgroundSize: '1564px 1452px',
        backgroundPosition: '178px 43px',
        // minHeight: '1452px',
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
