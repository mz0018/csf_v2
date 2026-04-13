export const Textarea = ({ className = '', ...props }) => {
    return (
        <textarea
            {...props}
            className={`p-2 border border-gray-200 w-full cursor-pointer rounded-sm focus:outline-none ${className}`}
        />
    )
}