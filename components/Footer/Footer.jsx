'use client';

import styles from './Footer.module.scss';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <div className={`${styles.footerInner} container`}>

        <div className={styles.col}>
          <div className={styles.logo}>{t('footer.brand')}</div>
          <p>{t('footer.slogan')}</p>
        </div>

        <div className={styles.col}>
          <h4>{t('footer.contactsTitle')}</h4>
          <div className={styles.contentItem}>
            Ильяс: <a href="tel:+77066687663">+7 (706) 668-76-63</a>
          </div>
          <div className={styles.contentItem}>
            Аллан: <a href="tel:+77066552842">+7 (706) 655-28-42</a>
          </div>
        </div>

        <div className={styles.col}>
          <h4>{t('footer.officeTitle')}</h4>
          <p>
            {t('footer.addressLine1')}<br />
            {t('footer.addressLine2')}
          </p>
        </div>

        <div className={styles.col}>
          <h4>{t('footer.navTitle')}</h4>
          <ul>
            <li><Link href="#projects">{t('header.nav.projects')}</Link></li>
            <li><Link href="#why_us">{t('header.nav.why')}</Link></li>
            <li><Link href="#pricing">{t('header.nav.pricing')}</Link></li>
            <li><Link href="#calculator">{t('header.nav.calculator')}</Link></li>
            <li><Link href="#cta">{t('header.nav.cta')}</Link></li>
          </ul>
        </div>

      </div>

      <div className={styles.bottom}>
        <p>{t('footer.bottom')}</p>
      </div>
    </footer>
  );
}

export default Footer;
