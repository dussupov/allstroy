import styles from './PricingCards.module.scss';

const packages = [
  {
    title: 'Comfort',
    price: 'от 43 000 ₸/м²',
    description: 'Бюджетный вариант для тех, кто хочет сэкономить или сделать ремонт под сдачу.',
    features: [
      'Демонтаж/возведение перегородок',
      'Все черновые и чистовые работы',
      'Инженерные коммуникации',
      'Контроль качества'
    ],
    image: '/img/optimal.jpg'
  },
  {
    title: 'Comfort+',
    price: 'от 99 000 ₸/м²',
    description: 'Оптимальное решение с материалами и разумной стоимостью.',
    features: [
      'Демонтаж/возведение перегородок',
      'Все черновые и чистовые работы',
      'Инженерные коммуникации',
      'Контроль качества'
    ],
    image: '/img/comfort.jpg'
  },
  {
    title: 'Premium',
    price: 'Индивидуально',
    description: 'Для тех, кто предпочитает доверить всё профессионалам.',
    features: [
      'Демонтаж/возведение перегородок',
      'Все черновые и чистовые работы',
      'Инженерные коммуникации',
      'Контроль качества'
    ],
    image: '/img/premium.jpg'
  }
];

export default function PricingCards() {
  return (
    <div className={'container'}>
      <div className={styles.pricing}>
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
              <div className={styles.gift}>🎁 Подарок</div>
              <button className={styles.button}>Заказать услугу</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
