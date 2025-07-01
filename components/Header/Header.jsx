import styles from './Header.module.scss'
import Image from "next/image";
import logo from '@/public/img/logo.png'
import Link from "next/link";

const Header = () => {
  return (
    <div className="container">
      <div className={styles.header}>
        <div className={styles.headerLogo}>
          <Image src={logo} alt={'logo'}/>
        </div>
        <div></div>
        <nav className={styles.headerNav}>
          <ul>
            <li>
              <Link href="/">Проекты</Link>
            </li>
            <li>
              <Link href="/">Почему мы?</Link>
            </li>
            <li><
              Link href="#services">Цены</Link>
            </li>
            <li>
              <Link href="#portfolio">Калькулятор</Link>
            </li>
            <li>
              <Link href="#about">Заявка</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Header;