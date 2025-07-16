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

const Projects = () => {

  const dispatch = useDispatch();
  const [projects, setProjects] = useState(null)

  const getData = async () => {
    try{
      const response = await fetch(`${API_URL}/api/projects?populate=*`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const json = await response.json();
      setProjects(json.data)

      console.log(json.data)
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
          <span>Готовые проекты</span>
        </div>
        <div className={styles.projectsSubtitle}>
          <span>Фотографии которые говорят сами за себя</span>
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
              <img src={project.image !== null ? `${API_URL}`+ project.image[0].formats.medium.url : projectImg.src} alt={project.title} />
              <div className={styles.projectItemText}>
                <div className={styles.projectItemTitle}>
                  <span>{project.title}</span>
                </div>
                <div className={styles.projectItemContent}>
                  <div className={styles.projectItemPackage}>
                    <span>{project.packageType}</span>
                  </div>
                  <div className={styles.projectItemSquare}>
                    <span>{project.square} м²</span>
                  </div>
                  <div className={styles.projectItemTerm}>
                    <span>{project.term} месяца</span>
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
