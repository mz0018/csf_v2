export const ClientFormUI = ({ title, children }) => {
    return (
        <div>
            <h2 className="font-medium text-lg text-gray-700 capitalize">{title}</h2>

            <div>
                <small className="text-gray-500 capitalize">{children}</small>
            </div>
        </div>
    )
}