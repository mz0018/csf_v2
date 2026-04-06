export const Inputs = ({ className = '', ...props }) => {
    return (
        <input 
            {...props}
            className={`cursor-pointer ${className}`}
        />
    )
}