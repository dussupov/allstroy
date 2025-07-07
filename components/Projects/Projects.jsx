'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from './Projects.module.scss';
import projectImg from '@/public/img/project-placeholder.jpg';
import Image from "next/image";
import {useDispatch} from "react-redux";

const Projects = () => {

  const dispatch = useDispatch();

  const projects = [
    { id: 1, title: 'Проект 1' },
    { id: 2, title: 'Проект 2' },
    { id: 3, title: 'Проект 3' },
    { id: 4, title: 'Проект 4' },
    { id: 5, title: 'Проект 5' }
  ];

  const openModal = (projectId) => {
    dispatch({type: "OPEN_MODAL", modalData: { projectId }, modalType: 'projectModal'});
  }

  return (
    <div className="container">
      <div className={styles.projects}>
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
          {projects.map((project) => (
            <SwiperSlide key={project.id} className={styles.projectItem} onClick={()=>{openModal(project.id)}}>
              <Image src={projectImg} alt={project.title} />
              <div className={styles.projectItemText}>
                <div className={styles.projectItemTitle}>
                  <span>{project.title}</span>
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
