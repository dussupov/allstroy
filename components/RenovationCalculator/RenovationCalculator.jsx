'use client';
import { useState } from 'react';
import styles from './RenovationCalculator.module.scss';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// базовые цены пакетов (за м²)
const packages = {
	Comfort: 135000,
	Optimal: 150000,
	Premium: 165000,
};

// стабильные id для опций; текст берём из i18n по id
const optionDefs = [
	{ id: 'aircon', value: 250000, perM2: false, option: true },
	{ id: 'floorheat', value: 30000, perM2: true, option: true },
	{ id: 'newwalls', value: 14000, perM2: true, option: true },
	{ id: 'reinforce', value: 8000, perM2: true, option: true },
	{ id: 'showerglass', value: 200000, perM2: false }, // без поля option => без ввода количества
	{ id: 'demolition', value: 10000, perM2: true, option: true },
];

export default function RenovationCalculator() {
	const { t, i18n } = useTranslation();
	const dispatch = useDispatch();

	const [selectedPackage, setSelectedPackage] = useState('Comfort');
	const [area, setArea] = useState(60);
	const [selectedOptions, setSelectedOptions] = useState({}); // { [id]: qty }

	const locale = ({ ru: 'ru-RU', en: 'en-US', kz: 'kk-KZ' }[i18n.language]) || 'ru-RU';
	const formatNum = (n) => n.toLocaleString(locale);
	const formatTenge = (n) => `${formatNum(n)} ₸`;

	const toggleOption = (id) => {
		setSelectedOptions((prev) => {
			if (prev[id]) {
				const next = { ...prev };
				delete next[id];
				return next;
			}
			return { ...prev, [id]: 1 };
		});
	};

	const changeOptionQuantity = (id, value) => {
		const numberValue = Number(value);
		if (numberValue >= 1) {
			setSelectedOptions((prev) => ({ ...prev, [id]: numberValue }));
		}
	};

	const calculateTotalRaw = () => {
		let total = (packages[selectedPackage] || 0) * area;
		optionDefs.forEach((opt) => {
			const qty = selectedOptions[opt.id];
			if (qty) total += opt.value * qty;
		});
		return total;
	};

	const calculateTotal = () => formatTenge(calculateTotalRaw());

	const openModal = () => {
		dispatch({
			type: 'OPEN_MODAL',
			modalData: {
				packages: t(`calc.packages.${selectedPackage}`),
				area,
				options: selectedOptions, // ключи — стабильные id
				total: calculateTotal(),
			},
			modalType: 'calculatorRequestModal',
			modalSize: 'small',
		});
	};

	return (
		<div className="container">
			<div className={styles.renovationCalc} id="calculator">
				<h2 className={styles.title}>{t('calc.title')}</h2>

				<div className={styles.calculator}>
					<div className={styles.left}>
						<h3>{t('calc.leftTitle')}</h3>

						<div className={styles.options}>
							{optionDefs.map((opt) => {
								const checked = Object.prototype.hasOwnProperty.call(selectedOptions, opt.id);
								const label = t(`calc.options.${opt.id}.name`);
								const addPrice = `(+${formatNum(opt.value)} ₸${opt.perM2 ? t('calc.units.perSqm') : ''})`;
								return (
									<div key={opt.id} className={styles.optionRow}>
										<label className={styles.checkbox}>
											<input
												type="checkbox"
												checked={checked}
												onChange={() => toggleOption(opt.id)}
											/>
											<span className={styles.checkmark} />
											<span>{label} {addPrice}</span>
										</label>

										{checked && opt.option && (
											<input
												type="number"
												className={styles.optionInput}
												min="1"
												value={selectedOptions[opt.id]}
												onChange={(e) => changeOptionQuantity(opt.id, e.target.value)}
												placeholder={opt.perM2 ? t('calc.units.sqm') : t('calc.units.pcs')}
											/>
										)}
									</div>
								);
							})}
						</div>
					</div>

					<div className={styles.right}>
						<label className={styles.label}>
							{t('calc.labelPackage')}
							<select
								value={selectedPackage}
								onChange={(e) => setSelectedPackage(e.target.value)}
								className={styles.select}
							>
								{Object.keys(packages).map((pkg) => (
									<option key={pkg} value={pkg}>
										{t(`calc.packages.${pkg}`)}
									</option>
								))}
							</select>
						</label>

						<label className={styles.label}>
							{t('calc.labelArea')}
							<input
								type="number"
								value={area}
								onChange={(e) => setArea(Number(e.target.value))}
								className={styles.input}
								placeholder={t('calc.areaPlaceholder')}
								min="1"
							/>
						</label>

						<div className={styles.total}>
							<span>{t('calc.total')}</span>
							<span className={styles.amount}>{calculateTotal()}</span>
						</div>

						<button className={styles.button} onClick={openModal}>
							{t('calc.button')}
						</button>

						<p className={styles.note}>{t('calc.note')}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
