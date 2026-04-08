import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

const resources = {
    en: {
        translation: {
            service_title: {
                responsiveness: "Responsiveness",
                reliability: "Reliability",
                access: "Access & Facilities",
                communication: "Communication",
                costs: "Costs",
                integrity: "Integrity",
                assurance: "Assurance",
                outcome: "Outcome"
            },
            services: {
                responsiveness: "The service was willingly and promptly extended to the client/customer.",
                reliability: "Performed the service within the expectation of the client/customer.",
                access: "Facilities/resources/modes of technology were readily available for convenient transactions.",
                communication: "Materials associated with the service are easily understood and feedback mechanisms are present relevant to the client's concern.",
                costs: "Value for money spent on services rendered.",
                integrity: "Provided services with high morale and spirit of honesty.",
                assurance: "The service was provided by competent personnel.",
                outcome: "The overall expectations of the client are met."
            },
            ratings: {
                stronglyAgree: "Strongly Agree",
                agree: "Agree",
                neutral: "Neutral",
                disagree: "Disagree",
                stronglyDisagree: "Strongly Disagree"
            }
        }
    },
    tl: {
        translation: {
            service_title: {
                responsiveness: "Pagkasagot",
                reliability: "Pagiging maaasahan",
                access: "Access at pasilidad",
                communication: "Komunikasyon",
                costs: "Mga gastos",
                integrity: "Integridad",
                assurance: "Katiyakan",
                outcome: "Resulta"
            },
            services: {
                responsiveness: "Maagap na naibigay and serbisyo sa kliyente.",
                reliability: "Naisagawa ang serbisyo ayon sa inaasahan ng kliyente.",
                access: "May maayos at angkop na pasilidad at sistema para sa serbisyo.",
                communication: "May sapat na impormasyon na madaling maunawaan at may mekanismo para matugunan ang mga puna o mungkahi.",
                costs: "Tama ang kaukulang bayad para sa serbisyo o iba pang gastos sa transaction.",
                integrity: "Naglingkod nang may katapatan at mataas na intergridad.",
                assurance: "Naibigay and serbisyo nang may sapat na kakayahan at kaalaman.",
                outcome: "Nakamit and kabuuang serbisyong inaasahan."
            },
            ratings: {
                stronglyAgree: "Sumasang-ayon",
                agree: "Sang-ayon",
                neutral: "Neutral",
                disagree: "Hindi sumasang-ayon",
                stronglyDisagree: "Hindi talaga sumasang-ayon"
            }
        }
    }
}

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        debug: true,
        detection: {
            order: ['localStorage', 'navigator'],
            lookupLocalStorage: 'i18nextLng',
        },
        interpolation: {
            escapeValue: false
        }

    })

export default i18n