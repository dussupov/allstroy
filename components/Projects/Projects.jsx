import styles from './Projects.module.scss'
import projectImg from '@/public/img/project-placeholder.jpg'
import Image from "next/image";

const Projects = () => {
  return(
    <div className={'container'}>
      <div className={styles.projects}>
        <div className={styles.projectsTitle}>
          <span>Готовые проекты</span>
        </div>
        <div className={styles.projectsSubtitle}>
          <span>Фотографии которые говорят сами за себя</span>
        </div>
        <div className={styles.projectItems}>
          <div className={styles.projectItem}>
            <Image src={projectImg} alt="Project 1"/>
            <div className={styles.projectItemText}>
              <div className={styles.projectItemTitle}>
                <span>Проект 1</span>
              </div>
            </div>
          </div>
          <div className={styles.projectItem}>
            <Image src={projectImg} alt="Project 1"/>
            <div className={styles.projectItemText}>
              <div className={styles.projectItemTitle}>
                <span>Проект 2</span>
              </div>
            </div>
          </div>
          <div className={styles.projectItem}>
            <Image src={projectImg} alt="Project 1"/>
            <div className={styles.projectItemText}>
              <div className={styles.projectItemTitle}>
                <span>Проект 3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects;