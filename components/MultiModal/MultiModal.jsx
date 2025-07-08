'use client'

import styles from './MultiModal.module.scss'
import {useDispatch, useSelector} from "react-redux";
import ProjectModal from "@/modals/ProjectModal/ProjectModal";
import closeModalSvg from '@/public/img/closeModal.svg';
import Image from "next/image";
import {useEffect} from "react";

const MultiModal = () => {
  const {modalIsOpen, modalType, modalData} = useSelector(state => state.multiModal.modal);

  const dispatch = useDispatch();


  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Optional cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalIsOpen]);

  // Закрытие модального окна по нажатию на Escape
  const handleKeyDown = (event) => {

    if (event.key === 'Escape') {
      // Проходимся по массиву c конца , и если модальное окно открыто , то закрываем его и выходим с цикла
      // Метод find() находит первый открытый модал.
      const openModal = modalIsOpen === true;

      if (openModal) {
        dispatch({ type: "CLOSE_MODAL"});
      }

    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalIsOpen]);

  return(
    <div className={`${styles.modal} ${modalIsOpen ? styles.open : ''}`}>
      <div className={styles.modalContent}>
        <div className={styles.modalClose} onClick={()=>{dispatch({type: "CLOSE_MODAL"})}}>
          <Image src={closeModalSvg} alt={'x'} />
        </div>
        {modalType === 'projectModal' && <ProjectModal />}
      </div>
    </div>
  )
}

export default MultiModal;