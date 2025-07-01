import styles from './WhyUs.module.scss'

const WhyUs = () => {
  return(
    <div className={'container'}>
      <div className={styles.whyus}>
        <div className={styles.whyusTitle}>
          <span>Почему клиенты выбирают ALL Stroy?</span>
        </div>
        <div className={styles.whyusSubtitle}>
          <span>Мы создаём не просто ремонт — мы создаём комфорт, надёжность и доверие. Все процессы выстроены так, чтобы вы чувствовали себя уверенно на каждом этапе.</span>
        </div>

        <div className={styles.whyusItems}>
          <div className={styles.whyusItem}>
            <div className={styles.whyusItemTitle}>
              <span>Качественные материалы от официальных поставщиков</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhyUs;