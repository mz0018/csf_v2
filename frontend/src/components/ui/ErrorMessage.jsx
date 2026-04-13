export const ErrorMessage = ({ message }) => {
    if (!message) return null

    return (
        <p className="text-red-500">{message}</p>
    )
}