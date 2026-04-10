export const Textarea = ({ className = '', ...props }) => {
    return (
        <textarea
            {...props}
            className={`cursor-pointer ${className}`}
        />
    )
}