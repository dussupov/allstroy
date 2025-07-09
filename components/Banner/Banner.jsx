'use client';

import { motion } from 'framer-motion';
import styles from './Banner.module.scss';
import Image from 'next/image';
import Link from "next/link";

export default function Banner() {
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
          Мы строим доверие <br /> — не просто стены
        </h1>
        <button className={styles.ctaButton}>
          <Link href={'#cta'}>
            Получить консультацию
          </Link>
        </button>
      </motion.div>
    </section>
  );
}
