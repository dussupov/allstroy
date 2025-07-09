import wppIcon from '@/public/img/whatsapp-icon.png'
import Image from "next/image";
import styles from './WhatsAppBtn.module.scss'

const WhatsAppBtn = () => {
	return (
		<div className={styles.wppBtn}>
			<a
				href="https://wa.me/77066687663?text=Здравствуйте!%20Хочу%20заказать%20ремонт%20в%20вашей%20компании.%20Расскажите,%20пожалуйста,%20о%20ваших%20услугах.%20Спасибо!"
				target="_blank"
				rel="noopener noreferrer"
				className="whatsapp-btn"
			>
				<Image
					src={wppIcon}
					alt="WhatsApp Icon"
					className="whatsapp-icon"
				/>
			</a>
		</div>

	);
}

export default WhatsAppBtn;