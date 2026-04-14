export const ClientFormUI = ({ title, children }) => {
    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="font-medium text-lg text-gray-700 capitalize">{title}</h2>

            <div className="gap-2">
                <small className="text-gray-500 capitalize">{children}</small>
            </div>
        </div>
    )
}