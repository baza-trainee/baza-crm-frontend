import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import '../Landing/gallery.css';

import slide1 from '../../assets/images/slide-1.webp';
import slide2 from '../../assets/images/slide-2.webp';
import slide3 from '../../assets/images/slide-3.webp';

const Gallery: React.FC = () => {
  return (
    <section className="pt-[50px] pb-[100px]">
      <Swiper
        spaceBetween={70}
        navigation={true}
        loop={true}
        slidesPerView={'auto'}
        centeredSlides={true}
        modules={[Navigation]}
        className="landingSwiper"
      >
        <SwiperSlide>
          {' '}
          <img src={slide1} alt="Slide 1" />
        </SwiperSlide>{' '}
        <SwiperSlide>
          {' '}
          <img src={slide2} alt="Slide 2" />
        </SwiperSlide>{' '}
        <SwiperSlide>
          {' '}
          <img src={slide3} alt="Slide 3" />
        </SwiperSlide>{' '}
        <SwiperSlide>
          {' '}
          <img src={slide1} alt="Slide 1" />
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Gallery;
