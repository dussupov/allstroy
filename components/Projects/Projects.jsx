'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {API_URL} from "@/config";

import styles from './Projects.module.scss';
import projectImg from '@/public/img/project-placeholder.jpg';
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

const Projects = () => {
  const mapLngToStrapiLocale = (lng) => (
    { ru: 'ru-RU', en: 'en', kz: 'kz' }[lng] || 'ru-RU'
  );

  const dispatch = useDispatch();
  const [projects, setProjects] = useState(null)
  const { t, i18n } = useTranslation();

  const getData = async () => {
    try{
      const locale = mapLngToStrapiLocale(i18n.language);

      const response = await fetch(`${API_URL}/api/projects?locale=${encodeURIComponent(locale)}&populate=*`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      })

      const json = await response.json();
      setProjects(json.data)
    }catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getData()
  }, []);


  const openModal = (projectId) => {
    dispatch({type: "OPEN_MODAL", modalData: { projectId }, modalType: 'projectModal'});
  }

  return (
    <div className="container">
      <div className={styles.projects} id={'projects'}>
        <div className={styles.projectsTitle}>
          <span>{t('projects.title')}</span>
        </div>
        <div className={styles.projectsSubtitle}>
          <span>{t('projects.subtitle')}</span>
        </div>

        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          pagination={{ clickable: true }}
          breakpoints={{
            0: {
              slidesPerView: 1
            },
            768: {
              slidesPerView: 2
            },
            1024: {
              slidesPerView: 3
            }
          }}
          className={styles.projectsSwiper}
        >
          {projects?.map((project) => (
            <SwiperSlide key={project.id} className={styles.projectItem} onClick={()=>{openModal(project.documentId)}}>
              <img src={project.images !== null ? `${API_URL}`+ project.images[0].formats.medium.url : projectImg.src} alt={project.title} />
              <div className={styles.projectItemText}>
                <div className={styles.projectItemTitle}>
                  <span>{project.title}</span>
                </div>
                <div className={styles.projectItemContent}>
                  <div className={styles.projectItemPackage}>
                    <span>{project.packageType}</span>
                  </div>
                  <div className={styles.projectItemSquare}>
                    <span>{project.square} {t('projects.sqUnit')}</span>
                  </div>
                  <div className={styles.projectItemTerm}>
                    <span>{project.term}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Projects;
