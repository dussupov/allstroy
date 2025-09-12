"use client";
import styles from './Header.module.scss'
import Image from "next/image";
import logo from '@/public/img/logo.png'
import Link from "next/link";
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import ContactsAccordion from "@/components/ContactsAccordion/ContactsAccordion";
import LanguageSelector from "@/components/LanguageSelector/LanguageSelector";
import useLocalStorage from "@/hooks/useLocalStorage";
import i18n from "@/i18n";
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useLocalStorage('language', 'ru');

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const setCurrentLanguage = (el) => {
    i18n.changeLanguage(el);
    setLanguage(el);
    // перезагрузка не обязательна, но оставляю как у тебя:
    if (typeof window !== 'undefined') window.location.reload();
  }

  return (
    <header className={styles.header}>
      <div className={`${styles.headerInner} container`}>
        <div className={styles.headerLogo}>
          <Image src={logo} alt={t('header.logoAlt')} fill style={{objectFit: 'contain'}}/>
        </div>

        <div className={styles.headerBgUp}>
          <img src={'/img/header-arn.png'} alt={t('header.bgAlt')}/>
        </div>

        <div className={styles.headerBgBottom}>
          <img src={'/img/header-arn.png'} alt={t('header.bgAlt')}/>
        </div>

        <ContactsAccordion/>

        <LanguageSelector setCurrentLanguage={setCurrentLanguage} language={language}/>

        <nav className={`${styles.headerNav} ${menuOpen ? styles.open : ''}`}>
          <ul>
            <li><Link href="#projects">{t('header.nav.projects')}</Link></li>
            <li><Link href="#why_us">{t('header.nav.why')}</Link></li>
            <li><Link href="#pricing">{t('header.nav.pricing')}</Link></li>
            <li><Link href="#calculator">{t('header.nav.calculator')}</Link></li>
            <li><Link href="#cta">{t('header.nav.cta')}</Link></li>
          </ul>
        </nav>

        <button
          className={styles.burger}
          onClick={toggleMenu}
          aria-label={menuOpen ? t('header.burgerClose') : t('header.burgerOpen')}
        >
          {menuOpen ? <FaTimes/> : <FaBars/>}
        </button>
      </div>
    </header>
  )
}

export default Header;
