'use client';
import { useEffect, useState } from 'react';
import styles from './RenovationCalculator.module.scss';
import { useDispatch } from 'react-redux';

const packages = {
	'Comfort': 135000,
	'Optimal': 150000,
	'Premium': 165000
};

const options = [
	{ name: 'Кондиционер с установкой', value: 250000, perM2: false, option:true },
	{ name: 'Тёплый пол', value: 30000, perM2: true, option:true },
	{ name: 'Возведение новых стен', value: 14000, perM2: true, option:true },
	{ name: 'Усиление стен', value: 8000, perM2: true, option:true },
	{ name: 'Душевая перегородка', value: 200000, perM2: false },
	{ name: 'Демонтаж старого ремонта', value: 10000, perM2: true, option:true }
];

export default function RenovationCalculator() {
	const [selectedPackage, setSelectedPackage] = useState('Comfort');
	const [area, setArea] = useState(60);
	const [selectedOptions, setSelectedOptions] = useState({});
	const dispatch = useDispatch();

	const toggleOption = (name) => {
		setSelectedOptions((prev) => {
			if (prev[name]) {
				const newOptions = { ...prev };
				delete newOptions[name];
				return newOptions;
			} else {
				return { ...prev, [name]: 1 };
			}
		});
	};

	const changeOptionQuantity = (name, value) => {
		const numberValue = Number(value);
		if (numberValue >= 1) {
			setSelectedOptions((prev) => ({
				...prev,
				[name]: numberValue,
			}));
		}
	};

	const calculateTotal = () => {
		let total = packages[selectedPackage] * area;

		options.forEach((opt) => {
			if (selectedOptions[opt.name]) {
				const quantity = selectedOptions[opt.name];
				total += opt.value * quantity;
			}
		});

		return total.toLocaleString('ru-RU') + ' ₸';
	};

	const openModal = () => {
		dispatch({
			type: "OPEN_MODAL",
			modalData: {
				packages: selectedPackage,
				area: area,
				options: selectedOptions,
				total: calculateTotal()
			},
			modalType: 'calculatorRequestModal',
			modalSize: 'small'
		});
	};

	return (
		<div className={'container'}>
			<div className={styles.renovationCalc} id={'calculator'}>
				<h2 className={styles.title}>Калькулятор ремонта</h2>
				<div className={styles.calculator}>
					<div className={styles.left}>
						<h3>Выберите опции</h3>
						<div className={styles.options}>
							{options.map((opt) => (
								<div key={opt.name} className={styles.optionRow}>
									<label className={styles.checkbox}>
										<input
											type="checkbox"
											checked={selectedOptions.hasOwnProperty(opt.name)}
											onChange={() => toggleOption(opt.name)}
										/>
										<span className={styles.checkmark} />
										<span>
                      {opt.name}{' '}
											{opt.perM2
												? `( +${opt.value.toLocaleString()} ₸/м² )`
												: `( +${opt.value.toLocaleString()} ₸ )`}
                    </span>
									</label>

									{selectedOptions.hasOwnProperty(opt.name) && opt.option && (
										<input
											type="number"
											className={styles.optionInput}
											min="1"
											value={selectedOptions[opt.name]}
											onChange={(e) =>
												changeOptionQuantity(opt.name, e.target.value)
											}
											placeholder={opt.perM2 ? "м²" : "шт"}
										/>
									)}
								</div>
							))}
						</div>
					</div>

					<div className={styles.right}>
						<label className={styles.label}>
							Пакет ремонта
							<select
								value={selectedPackage}
								onChange={(e) => setSelectedPackage(e.target.value)}
								className={styles.select}
							>
								{Object.keys(packages).map((pkg) => (
									<option key={pkg} value={pkg}>
										{pkg}
									</option>
								))}
							</select>
						</label>

						<label className={styles.label}>
							Площадь (м²)
							<input
								type="number"
								value={area}
								onChange={(e) => setArea(Number(e.target.value))}
								className={styles.input}
								placeholder="например 60"
								min="1"
							/>
						</label>

						<div className={styles.total}>
							<span>Итого:</span>
							<span className={styles.amount}>{calculateTotal()}</span>
						</div>

						<button className={styles.button} onClick={openModal}>
							Рассчитать
						</button>
						<p className={styles.note}>
							Другие работы можно уточнить при консультации
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
