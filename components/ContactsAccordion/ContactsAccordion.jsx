'use client';

import { useState } from 'react';
import styles from './ContactsAccordion.module.scss';

const ContactsAccordion = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<div className={styles.accordion}>
			<button className={styles.header} onClick={toggle}>
				📱 Контакты
				<span className={styles.icon}>{isOpen ? '▲' : '▼'}</span>
			</button>

			<div className={`${styles.contentWrapper} ${isOpen ? styles.open : ''}`}>
				<div className={styles.content}>
					<div>
						<strong>Пункт выдачи заказов</strong><br/>
						Кайрат, Семиречье<br/>
						+7 (705) 850 12 08<br/>
						пн-вс: 10:00 - 17:00
					</div>

					<div>
						ул. Кунаева, 51<br/>
						+7 (747) 379 36 12<br/>
						пн-вс: 10:00 - 20:00
					</div>

					<div>
						пр. Гагарина, 10<br/>
						+7 (707) 716 38 25<br/>
						пн-вс: 10:00 - 20:00
					</div>

					<div>
						ул. Навои, 37<br/>
						+7 (707) 192 19 12<br/>
						пн-вс: 10:00 - 20:00
					</div>

					<div>
						ул. Рихарда Зорге, 18, ТЦ MART Village<br/>
						+7 (778) 538 31 32<br/>
						пн-вс: 10:00 - 22:00
					</div>

					<div>
						ул. Сатпаева, 90/21, ТРЦ Riviera Park<br/>
						+7 (747) 052 39 01<br/>
						пн-вс: 10:00 - 22:00
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactsAccordion;
