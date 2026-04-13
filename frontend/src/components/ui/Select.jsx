export const Select = ({ className = '', children, ...props }) => {
    return (
        <select
            {...props}
            className={`p-2 cursor-pointer focus:outline-none ${className}`}
        >
            {children}
        </select>
    )
}