import { useQR } from '@/context/DisplayQRContext'

const DisplayActiveQR = () => {
    const { activeQR } = useQR()

    return (
        <div className="flex items-center justify-center min-h-screen">
            {activeQR.img === null ? (
                <div className="text-white px-4 max-w-4xl">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                        
                        <img
                            src="/img/logo.png"
                            alt="Logo"
                            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
                        />

                        <div className="text-center sm:text-start">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold uppercase">
                                Client Satisfactory Feedback Form
                            </h2>

                            <p className="mt-4 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300">
                                Municipality of Solano Province of Nueva Vizcaya
                            </p>

                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-black/70 p-9 text-center text-white rounded-sm">
                    <img
                        className="rounded-sm mx-auto w-[400px] sm:w-[500px] md:w-[600px]"
                        src={activeQR.img}
                        alt={activeQR.name}
                    />
                    <p className="mt-5 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
                        {activeQR.name}
                    </p>
                </div>
            )}
        </div>
    )
}

export default DisplayActiveQR