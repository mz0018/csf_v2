export const Select = ({ className = '', children, ...props }) => {
    return (
        <select
            {...props}
            className={`cursor-pointer ${className}`}
        >
            {children}
        </select>
    )
}