'use client';
import styles from './Cta.module.scss';
import { IMaskInput } from 'react-imask';

const Cta = () => {

  return (
    <div className={'container'}>
      <section className={styles.ctaSection}>
        <div className={styles.content}>
          <div className={styles.text}>
            <span className={styles.badge}>Бесплатно в день обращения</span>
            <h2>Получите бесплатный замер и консультацию</h2>
            <p>Узнайте стоимость ремонта вашей квартиры прямо сейчас</p>
            <form className={styles.form}>
              <input type="text" placeholder="Ваше имя"/>
              <IMaskInput
                mask="+7 (000) 000-00-00"
                placeholder="+7 (___) ___-__-__"
                className={styles.input}
              />
              <button type="submit">Отправить</button>
            </form>
          </div>
          <div className={styles.decor}>
            <img src="/img/details/cta.png" alt="Рулон чертежа"/>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Cta;