export const Buttons = ({ className, children, ...props }) => {
    return (
        <button
            {...props}
            className={`cursor-pointer p-4 rounded-sm bg-blue-500 text-white tracking-wide ${className}`}
        >
            {children}
        </button>
    )
}