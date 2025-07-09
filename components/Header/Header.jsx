"use client";

import styles from './Header.module.scss'
import Image from "next/image";
import logo from '@/public/img/logo.png'
import Link from "next/link";
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import ContactsAccordion from "@/components/ContactsAccordion/ContactsAccordion";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className={styles.header}>
      <div className={`${styles.headerInner} container`}>
        <div className={styles.headerLogo}>
          <Image src={logo} alt="logo" fill style={{objectFit: 'contain'}}/>
        </div>

        <ContactsAccordion />

        <nav className={`${styles.headerNav} ${menuOpen ? styles.open : ''}`}>
          <ul>
            <li><Link href="#projects">Проекты</Link></li>
            <li><Link href="#why_us">Почему мы?</Link></li>
            <li><Link href="#pricing">Цены</Link></li>
            <li><Link href="#calculator">Калькулятор</Link></li>
            <li><Link href="#cta">Заявка</Link></li>
          </ul>
        </nav>

        <button className={styles.burger} onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </header>
  )
}

export default Header;
