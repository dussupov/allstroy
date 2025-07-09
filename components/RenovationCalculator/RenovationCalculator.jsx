'use client';
import { useState } from 'react';
import styles from './RenovationCalculator.module.scss';

const packages = {
	'Комфорт': 135000,
	'Оптимал': 150000,
	'Премиум': 165000
};

const options = [
	{ name: 'Кондиционер с установкой', value: 250000, perM2: false },
	{ name: 'Тёплый пол', value: 30000, perM2: true },
	{ name: 'Возведение новых стен', value: 14000, perM2: true },
	{ name: 'Усиление стен', value: 8000, perM2: true },
	{ name: 'Душевая перегородка', value: 200000, perM2: false },
	{ name: 'Демонтаж старого ремонта', value: 10000, perM2: true }
];

export default function RenovationCalculator() {
	const [selectedPackage, setSelectedPackage] = useState('Комфорт');
	const [area, setArea] = useState(60);
	const [selectedOptions, setSelectedOptions] = useState([]);

	const toggleOption = (name) => {
		setSelectedOptions((prev) =>
			prev.includes(name)
				? prev.filter((o) => o !== name)
				: [...prev, name]
		);
	};

	const calculateTotal = () => {
		let total = packages[selectedPackage] * area;
		options.forEach((opt) => {
			if (selectedOptions.includes(opt.name)) {
				total += opt.perM2 ? opt.value * area : opt.value;
			}
		});
		return total.toLocaleString('ru-RU') + ' ₸';
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
								<label key={opt.name} className={styles.checkbox}>
									<input
										type="checkbox"
										checked={selectedOptions.includes(opt.name)}
										onChange={() => toggleOption(opt.name)}
									/>
									<span className={styles.checkmark}/>
									<span>
                {opt.name} {opt.perM2 ? `( +${opt.value.toLocaleString()} ₸/м² )` : `( +${opt.value.toLocaleString()} ₸ )`}
              </span>
								</label>
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
									<option key={pkg} value={pkg}>{pkg}</option>
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

						<button className={styles.button}>Рассчитать</button>
						<p className={styles.note}>
							Другие работы можно уточнить при консультации
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
