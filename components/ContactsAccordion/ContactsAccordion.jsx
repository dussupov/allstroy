'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ContactsAccordion.module.scss';
import Image from 'next/image';
import arrowUp from '@/public/img/arrow-up.svg';
import arrowDown from '@/public/img/arrow-down.svg';

const ContactsAccordion = () => {
	const { t } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);

	return (
		<div className={styles.accordion}>
			<button
				className={styles.header}
				onClick={toggle}
				aria-expanded={isOpen}
				aria-controls="contacts-content"
			>
				{t('contacts.title')}
				<Image
					src={isOpen ? arrowUp : arrowDown}
					alt={t('contacts.arrowAlt')}
					width={14}
					height={14}
				/>
			</button>

			<div
				id="contacts-content"
				className={`${styles.contentWrapper} ${isOpen ? styles.open : ''}`}
			>
				<div className={styles.content}>
					<div className={styles.contentItem}>
						{t('contacts.person', { name: 'Ильяс' })}{' '}
						<a href="tel:+77066687663">+7 (706) 668-76-63</a>
					</div>
					<div className={styles.contentItem}>
						{t('contacts.person', { name: 'Аллан' })}{' '}
						<a href="tel:+77066552842">+7 (706) 655-28-42</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactsAccordion;
