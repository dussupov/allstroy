'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'

import Image from 'next/image'
import logo from '@/public/img/12mesyacev.png'
import styles from './Partners.module.scss'

const Partners = () => {
  return (
    <div className="container">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={4}
        loop={true}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
        speed={1000} // плавность прокрутки
        grabCursor={true}
        allowTouchMove={false}
        style={{ padding: '10px 0' }}
      >
        {[...Array(10)].map((_, i) => (
          <SwiperSlide key={i} className={styles.slide}>
            <Image src={logo} alt="logo" width={200} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Partners
