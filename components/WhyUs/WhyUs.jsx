'use client';

import styles from './WhyUs.module.scss';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const WhyUs = () => {
  const { t } = useTranslation();
  const items = t('whyus.items', { returnObjects: true }) || [];

  return (
    <div className="container">
      <div className={styles.whyus} id="why_us">
        <div className={styles.whyusTitle}>
          <span>{t('whyus.title')}</span>
        </div>
        <div className={styles.whyusSubtitle}>
          <span>{t('whyus.subtitle')}</span>
        </div>
      </div>

      <section className={styles.whySection}>
        <div className={styles.grid}>
          {items.map((item, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.iconWrapper}>
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={64}
                  height={64}
                />
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDescription}>{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WhyUs;
