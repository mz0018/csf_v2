import { usePrintOfficeQr } from "../../hooks/usePrintOfficeQr"

export const PrintOfficeQr = ({ isGenerated, setIsGenerated }) => {
    const { isLoading, handlePrinting } = usePrintOfficeQr({ setIsGenerated });

    return (
        <button 
        onClick={handlePrinting}
        disabled={isLoading}
        hidden={isGenerated}
        className={`p-4 bg-blue-400 text-white rounded text-sm`}>
            {isLoading ? 'Generating...' : 'Generate all QR Offices'}
        </button>
    )
}
