'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import langIcon from '@/public/img/icons/lang-icon-1.svg'
import burgerArrow from '@/public/img/burger-language-arrow.svg'
import styles from './LanguageSelector.module.scss'

const LanguageSelector = ({ setCurrentLanguage, language }) => {
	const { t } = useTranslation()
	const [isDropdownOpen, setDropdownOpen] = useState(false)
	const [selectedLanguage, setSelectedLanguage] = useState(language)
	const dropdownRef = useRef(null)

	useEffect(() => { setSelectedLanguage(language) }, [language])

	const languageOptions = [
		{ value: 'en', label: 'En' },
		{ value: 'ru', label: 'Ру' },
		{ value: 'kz', label: 'Кз' },
	]

	const handleToggleDropdown = () => setDropdownOpen(v => !v)
	const handleSelectLanguage = (value) => {
		setSelectedLanguage(value)
		setCurrentLanguage(value)
		setDropdownOpen(false)
	}

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false)
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	return (
		<div className={styles.customLanguageSelector} ref={dropdownRef}>
			<div
				className={`${styles.selectedLanguage} ${isDropdownOpen ? styles.open : ''}`}
				onClick={handleToggleDropdown}
				aria-expanded={isDropdownOpen}
				role="button"
				tabIndex={0}
			>
				<Image src={langIcon} alt="language" width={16} height={16} />
				{t(languageOptions.find(o => o.value === selectedLanguage)?.label)}
				<div className={`${styles.dropdownArrow} ${isDropdownOpen ? styles.open : ''}`}>
					<Image src={burgerArrow} alt="" width={12} height={12} />
				</div>
			</div>

			{isDropdownOpen && (
				<div className={styles.languageOptions}>
					{languageOptions.filter(o => o.value !== selectedLanguage).map(o => (
						<div key={o.value} className={styles.languageOption} onClick={() => handleSelectLanguage(o.value)}>
							{t(o.label)}
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default LanguageSelector
