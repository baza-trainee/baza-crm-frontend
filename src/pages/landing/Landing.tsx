import Header from './Header';
import Hero from './Hero';
import About from './About';
import Invocation from './Invocation';
import Gallery from './Gallery';
import Footer from './Footer';

const Landing = () => {
  return (
    <div className="bg-top-menu-dark">
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
