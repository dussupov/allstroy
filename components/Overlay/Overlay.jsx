'use client'

import {useDispatch, useSelector} from "react-redux";
import styles from './Overlay.module.scss'

const Overlay = () =>{
  const dispatch = useDispatch();
  const modalIsOpen = useSelector(state => state.multiModal.modal.modalIsOpen);
  const changeShowOverlay = () =>{

    dispatch({type: "CLOSE_MODAL"})
  }

  return(
    <>
      <div
        className={`${styles.overlay}  ${modalIsOpen  ? '' : styles.hide}`}
        onClick={()=> changeShowOverlay()}></div>
    </>
  )
}

export default Overlay;