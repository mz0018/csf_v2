import { useTranslation } from 'react-i18next'
import { Select } from '../ui/Select'

export const LanguageSwitcher = () => {
    const { i18n } = useTranslation()
    const handleLanguageChange = (e) => {
        const lang = e.target.value
        i18n.changeLanguage(lang)
        localStorage.setItem('i18nextLng', lang)
    }

    return (
        <Select value={i18n.language} onChange={handleLanguageChange}>
            <option value="en">English</option>
            <option value="tl">Tagalog</option>
        </Select>
    )
}