'use client'

import styles from './PricingCards.module.scss';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

export default function PricingCards() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // получаем массив пакетов из переводов
  const packages = t('pricing.packages', { returnObjects: true }) || [];

  const openModal = (item) => {
    dispatch({
      type: 'OPEN_MODAL',
      modalData: { packages: item.title }, // передаём локализованное имя пакета
      modalType: 'pricingRequestModal',
      modalSize: 'small',
    });
  };

  return (
    <div className="container">
      <div className={styles.pricing} id="pricing">
        <div className={styles.title}>
          <span>{t('pricing.title')}</span>
        </div>

        <div className={styles.subtitle}>
          <span>{t('pricing.subtitle')}</span>
        </div>

        <div className={styles.wrapper}>
          {packages.map((pack, index) => (
            <div key={index} className={styles.card}>
              <img src={pack.image} alt={pack.title} className={styles.image} />
              <div className={styles.price}>{pack.price}</div>
              <h3 className={styles.title}>{pack.title}</h3>
              <p className={styles.description}>{pack.description}</p>

              <ul className={styles.features}>
                {pack.features.map((feat, i) => (
                  <li key={i}>
                    <span className={styles.check}>✓</span> {feat}
                  </li>
                ))}
              </ul>

              <div className={styles.giftBlock}>
                <div className={styles.giftTitle}>{pack.gift.title}</div>
                <div className={styles.giftDesc}>{pack.gift.description}</div>
              </div>

              <button className={styles.button} onClick={() => openModal(pack)}>
                {t('pricing.button')}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
