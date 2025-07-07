'use client'

import styles from './MultiModal.module.scss'
import {useDispatch, useSelector} from "react-redux";
import ProjectModal from "@/modals/ProjectModal/ProjectModal";
import closeModalSvg from '@/public/img/closeModal.svg';
import Image from "next/image";

const MultiModal = () => {
  const {modalIsOpen, modalType, modalData} = useSelector(state => state.multiModal.modal);

  const dispatch = useDispatch();

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