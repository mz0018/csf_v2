import { useQR } from '@/context/DisplayQRContext'

const DisplayActiveQR = () => {
    const { activeQR } = useQR()

    return (
        <>
            {activeQR.img === null ? (
                <p>Hello there no QR is set</p>
            ) : (
                <div>
                    <p>{activeQR.name}</p>
                    <img src={activeQR.img} alt={activeQR.name} />
                </div>
            )}
        </>
    )
}

export default DisplayActiveQR