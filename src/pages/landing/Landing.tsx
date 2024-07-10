import Header from './Header';
import Hero from './Hero';
import About from './About';
import Invocation from './Invocation';
import Gallery from './Gallery';
import Footer from './Footer';
import bgImage from '../../assets/common/Logo-bg.svg';

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
