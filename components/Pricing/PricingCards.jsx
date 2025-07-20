'use client'

import styles from './PricingCards.module.scss';
import {useDispatch} from "react-redux";

const packages = [
  {
    title: 'Comfort',
    price: '135 000 ₸/м²',
    description: 'Бюджетный вариант для тех, кто хочет сэкономить или сделать ремонт под сдачу.',
    features: [
      'Керамогранит форматом 60х60',
      'Ламинат 33 класс 8мм',
      'Сантехника LeMark (Чехия)',
      'Потолок - натяжной матовый',
      'Краска Dulux bindo 7',
      'Двери высотой - 2 метра',
      'Розетки/выключатели - IEK Vita'
    ],
    gift: {
      title: '🎁 Подарок для пакета "Comfort"',
      description: 'Умная колонка Яндекс Алиса Мини'
    },
    image: '/img/optimal.jpg'
  },
  {
    title: 'Optimal',
    price: '150 000 ₸/м²',
    description: 'Оптимальное решение с материалами и разумной стоимостью.',
    features: [
      'Керамогранит форматом 120х60',
      'Кварцвинил либо ламинат 33 класс 8мм на выбор',
      'Сантехника Bravat (Германия)',
      'Потолок - гипсокартон, натяжной матовый с теневым профилем на выбор',
      'Краска Dulux bindo 7, декоративная штукатурка или молдинги на акцентую стену на выбор',
      'Двери высотой 2м или 2.10м на выбор',
      'Розетки/выключатели IEK Brite на выбор по цвету'
    ],
    gift: {
      title: '🎁 Подарок для пакета "Optimal"',
      description: 'Электрочайник Smeg'
    },
    image: '/img/comfort.jpg'
  },
  {
    title: 'Premium',
    price: '165 000 ₸/м²',
    description: 'Для тех, кто предпочитает доверить всё профессионалам.',
    features: [
      'Керамогранит форматом 120х60 премиального качества',
      'Сантехника - Grohe (Германия)',
      'Потолок - гипсокартон или натяжной парящий с подсветкой по периметру на выбор',
      'Краска Dulux bindo 7, декоративная штукатурка + молдинги на несколько стен на выбор',
      'Двери высотой от 2м до 2.2м на выбор',
      'Ламинат 33 класс от 8-12мм классический или елочкой, кварцвинил на выбор',
      'Розетки/Выключатели - Schneider electric Atlas цвета на выбор'
    ],
    gift: {
      title: '🎁 Подарок для пакета "Premium"',
      description: 'Мультиварка Tefal'
    },
    image: '/img/premium.jpg'
  }
];

export default function PricingCards() {

  const dispatch = useDispatch()

  const openModal = (item) => {
    dispatch({
      type: "OPEN_MODAL",
      modalData: {
        packages: item.title,
      },
      modalType: 'pricingRequestModal',
      modalSize: 'small'
    });
  };

  return (
    <div className={'container'}>
      <div className={styles.pricing} id={'pricing'}>
        <div className={styles.title}>
          <span>Выбирайте пакет - мы сделаем остальное</span>
        </div>
        <div className={styles.subtitle}>
          <span></span>
        </div>
        <div className={styles.wrapper}>
          {packages.map((pack, index) => (
            <div key={index} className={styles.card}>
              <img src={pack.image} alt={pack.title} className={styles.image}/>
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
              <button className={styles.button} onClick={()=>{openModal(pack)}}>Заказать услугу</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
