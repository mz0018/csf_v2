export const ErrorMessage = ({ message }) => {
    if (!message) return null

    return (
        <p className="text-xs mt-1 text-red-400">{message}</p>
    )
}