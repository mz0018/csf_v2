import { usePrintOfficeQr } from "../../hooks/usePrintOfficeQr"

export const PrintOfficeQr = () => {
    const { isLoading, handlePrinting } = usePrintOfficeQr();

    return (
        <button 
        onClick={handlePrinting}
        disabled={isLoading}
        className="p-4 bg-blue-400 text-white rounded text-sm">
            {isLoading ? 'Generating...' : 'Generate all QR Offices'}
        </button>
    )
}
