'use client';

import { motion } from 'framer-motion';
import styles from './Banner.module.scss';
import Image from 'next/image';
import Link from "next/link";
import {useTranslation} from "react-i18next";

export default function Banner() {
  const { t } = useTranslation();


  return (
    <section className={styles.hero}>
      <Image
        src="/img/hero-loft.jpg"
        alt="Loft интерьер"
        fill
        priority
        className={styles.bgImage}
      />

      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
      >
        <h1>
          {t('banner.title_1')} <br /> — {t('banner.title_2')}
        </h1>
        <button className={styles.ctaButton}>
          <Link href={'#cta'}>
            {t('banner.btn')}
          </Link>
        </button>
      </motion.div>
    </section>
  );
}
