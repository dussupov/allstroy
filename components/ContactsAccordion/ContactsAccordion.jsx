'use client';

import { useState } from 'react';
import styles from './ContactsAccordion.module.scss';
import Image from "next/image";
import arrowUp from '@/public/img/arrow-up.svg'
import arrowDown from '@/public/img/arrow-down.svg'

const ContactsAccordion = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<div className={styles.accordion}>
			<button className={styles.header} onClick={toggle}>
				Контакты
				<Image src={isOpen ? arrowUp : arrowDown} alt={'arrow'} />
			</button>

			<div className={`${styles.contentWrapper} ${isOpen ? styles.open : ''}`}>
				<div className={styles.content}>
					<div className={styles.contentItem}>
						Ильяс: <a href={"tel:+77066687663"}>+7 (706) 668-76-63</a>
					</div>
					<div className={styles.contentItem}>
						Аллан: <a href={"tel:+77066552842"}>+7 (706) 655-28-42</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactsAccordion;
