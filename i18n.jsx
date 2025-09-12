import en from './trans/en.json'
import ru from './trans/ru.json'
import kz from './trans/kz.json'

import {initReactI18next} from "react-i18next";
import i18n from 'i18next'

const resources = {
	en:{
		translation : en
	},
	ru:{
		translation : ru
	},
	kz:{
		translation : kz
	},
}

i18n.use(initReactI18next).init({resources, lng:JSON.parse(localStorage?.getItem('language')), fallbackLng:'ru'})

export default i18n;