import { useState } from 'react'

export const useSetQRDefault = () => {
    const [activeQR, setActiveQR] = useState({
        name: '',
        img: null
    })

    const showAsDefault = (name, url) => {
        const confirmed = window.confirm(`Set "${name}" as default QR?`)
        
        if (confirmed) {
            setActiveQR({
                name: name,
                img: url
            })
        }
    }

    return { activeQR, showAsDefault }
}