import styles from './Banner.module.scss'
import banner from '@/public/img/placeholder-banner.png'
import Image from "next/image";

const Banner = () => {
  return(
    <div className={styles.banner}>
      <div className={styles.bannerImg}>
        <Image src={banner} alt="Banner Image"/>
      </div>

      <div className="container">
        <div className={styles.bannerText}>
          <div className={styles.bannerTitle}>
            <h1>ALLSTROY</h1>
          </div>
          <div className={styles.bannerSubtitle}>
            <span>Мы строим доверие - не просто стены.</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner;