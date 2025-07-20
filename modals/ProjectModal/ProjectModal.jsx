'use client'

import {useEffect, useState} from 'react';
import styles from './ProjectModal.module.scss';
import ScrollBox from "@/components/ScrollBox/ScrollBox";
import {Swiper, SwiperSlide} from "swiper/react";
import {API_URL} from "@/config";
import {useSelector} from "react-redux";

const ProjectModal = () => {
  const projectId = useSelector(state => state.multiModal.modal.modalData.projectId)

  const [video, setVideo] = useState(null);
  const [images, setImages] = useState([]);
  const [square, setSquare] = useState(null);
  const [packageType, setPackageType] = useState(null);
  const [term, setTerm] = useState(null);
  const [description, setDescription] = useState(null);

  const getData = async () => {
    try{
      const response = await fetch(`${API_URL}/api/projects/${projectId}?populate=*`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      })

      const json = await response.json();
      setSquare(json.data?.square)
      setTerm(json.data?.term)
      setPackageType(json.data?.packageType)
      setDescription(json.data?.content[0]?.children[0].text)
      setImages(
        json.data.images.map(img =>
          img.formats?.medium?.url
            ? `${API_URL}${img.formats.medium.url}`
            : `${API_URL}${img.url}`
        )
      );
      setVideo(json.data.video ? `${API_URL}${json.data.video[0].url}` : null)
    }catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getData()
  }, []);


  return(
    <div className={styles.modal}>
      <div className={styles.modalTitle}>
        <span>ЖК "Акварель"</span>
      </div>

      <ScrollBox>
        <div className={styles.modalContent}>

          {/* Видео */}
          {/*{video && (*/}
          {/*  <div className={styles.videoSection}>*/}
          {/*    <video controls width="100%">*/}
          {/*      <source src={video} type="video/quicktime"/>*/}
          {/*      Your browser does not support the video tag.*/}
          {/*    </video>*/}
          {/*  </div>*/}
          {/*)}*/}

          {images?.length > 0 && (
            <div className={styles.photoSection}>
              <Swiper
                spaceBetween={10}
                slidesPerView={1}
                pagination={{ clickable: true }}
                className={styles.swiper}
              >
                {images.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <img src={img} alt={`photo-${idx}`} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}

          {/* Параметры */}
          {(square || packageType || term) && (
            <div className={styles.paramsSection}>
              {square && <div><span>Квадратура:</span> {square} м²</div>}
              {packageType && <div><span>Пакет:</span> {packageType}</div>}
              {term && <div><span>Срок выполнения:</span> {term}</div>}
            </div>
          )}

          {/* Описание */}
          {description && (
            <div className={styles.descriptionSection}>
              <p>{description}</p>
            </div>
          )}

        </div>
      </ScrollBox>
    </div>
  )
}

export default ProjectModal;
