/**
 * @see: https://swiperjs.com/react
 */
import { FC, ReactNode } from 'react';
import {
  Swiper as ReactSwiper,
  SwiperSlide,
  SwiperProps as ReactSwiperProps,
} from 'swiper/react';
import { Pagination } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

interface SwiperProps extends ReactSwiperProps {
  children: ReactNode;
}
const Swiper: FC<SwiperProps> = ({ children, ...props }) => {
  return (
    <ReactSwiper
      {...props}
      modules={[Pagination]}
      navigation
      pagination={{ clickable: true, dynamicBullets: true }}
    >
      {children}
    </ReactSwiper>
  );
};

export { Swiper, SwiperSlide };
