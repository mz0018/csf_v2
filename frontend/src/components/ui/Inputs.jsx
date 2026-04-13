export const Inputs = ({ className = '', ...props }) => {
    return (
        <input 
            {...props}
            className={`p-2 border border-gray-200 cursor-pointer focus:outline-none rounded-sm ${className}`}
        />
    )
}