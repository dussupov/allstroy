'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'

import styles from './Partners.module.scss'
import {useEffect, useState} from "react";
import {API_URL} from "@/config";

const Partners = () => {
  const [partners, setPartners] = useState([])

  const getData = async () => {
    try{
      const response = await fetch(`${API_URL}/api/brands?populate=*`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      })

      const json = await response.json();
      setPartners(json.data)

      console.log(json.data)
    }catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getData()
  }, []);

  return (
    <div className="container">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        loop={true}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
        speed={1000} // плавность прокрутки
        grabCursor={true}
        allowTouchMove={false}
        style={{ padding: '10px 0' }}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          480: {
            slidesPerView: 3,
            spaceBetween: 20
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 25
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 30
          }
        }}
      >
        {partners.length > 0 && partners.map((item, index) => {
          return(
            <SwiperSlide key={index} className={styles.slide}>
              <img src={`${API_URL}` + item.logo[0].url} alt="logo" width={200} />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default Partners
