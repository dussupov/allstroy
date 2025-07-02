import styles from './WhyUs.module.scss'
import Image from "next/image";

const WhyUs = () => {

  const features = [
    {
      title: 'Качественные материалы',
      description: 'Сотрудничаем с сертифицированными брендами. Гарантируем стабильное качество.',
      icon: '/img/whyus/materials.png'
    },
    {
      title: 'Фиксированная цена и сроки',
      description: 'Смета и сроки утверждаются до начала работ. Всё зафиксировано документально.',
      icon: '/img/whyus/price.png'
    },
    {
      title: 'Официальная гарантия',
      description: 'Выдаём гарантийный документ. Устраняем недочёты при необходимости.',
      icon: '/img/whyus/warranty.png'
    },
    {
      title: 'Подробный технический проект',
      description: 'Чёткое планирование этапов. Всё согласовывается заранее.',
      icon: '/img/whyus/project.png'
    },
    {
      title: 'Закуп и доставка под ключ',
      description: 'Подбираем, закупаем и доставляем материалы. Вы отдыхаете без суеты.',
      icon: '/img/whyus/delivery.png'
    },
    {
      title: 'Генеральная уборка после ремонта',
      description: 'Наводим порядок перед сдачей. Пространство готово к заселению.',
      icon: '/img/whyus/cleaning.png'
    }
  ];

  return(
    <div className={'container'}>
      <div className={styles.whyus}>
        <div className={styles.whyusTitle}>
          <span>Почему клиенты выбирают ALL Stroy?</span>
        </div>
        <div className={styles.whyusSubtitle}>
          <span>Мы создаём не просто ремонт — мы создаём комфорт, надёжность и доверие. Все процессы выстроены так, чтобы вы чувствовали себя уверенно на каждом этапе.</span>
        </div>
      </div>
      <section className={styles.whySection}>
        <div className={styles.grid}>
          {features.map((item, index) => (
            <div key={index} className={styles.card}>
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
  )
}

export default WhyUs;