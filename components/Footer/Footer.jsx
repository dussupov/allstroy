'use client';

import styles from './Footer.module.scss';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.footerInner} container`}>

        <div className={styles.col}>
          <div className={styles.logo}>ALLSTROY</div>
          <p>Ремонт под ключ квартир и домов в Алматы и области.</p>
        </div>

        <div className={styles.col}>
          <h4>Контакты</h4>
          <p>(оставим пустыми)</p>
        </div>

        <div className={styles.col}>
          <h4>Офис</h4>
          <p>Кабдолова улица, 2<br/>3 этаж</p>
        </div>

        <div className={styles.col}>
          <h4>Навигация</h4>
          <ul>
            <li><Link href="#projects">Проекты</Link></li>
            <li><Link href="#why_us">Почему мы?</Link></li>
            <li><Link href="#pricing">Цены</Link></li>
            <li><Link href="#calculator">Калькулятор</Link></li>
            <li><Link href="#cta">Заявка</Link></li>
          </ul>
        </div>

      </div>

      <div className={styles.bottom}>
        <p>ALLSTROY © Все права защищены</p>
      </div>
    </footer>
  )
}

export default Footer;
