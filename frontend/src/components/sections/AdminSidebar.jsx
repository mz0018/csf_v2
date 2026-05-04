import { Buttons } from '@/components/ui/Buttons'

export const AdminSidebar = ({ user, userType, onSignOut }) => {
    const navItems = userType === 'hr_admin'
        ? [{ label: 'Dashboard', path: '/hr-dashboard' }]
        : [{ label: 'Dashboard', path: '/infotech' }]

    return (
        <aside className="w-64 bg-gray-900 text-white h-screen p-4 flex flex-col">
            <div className="mb-8">
                <h2 className="text-xl font-bold">Admin Panel</h2>
                <p className="text-sm text-gray-400 mt-1">{user?.username}</p>
                <p className="text-xs text-gray-500">{user?.user_type}</p>
            </div>

            <nav className="flex-1 space-y-2">
                {navItems.map((item) => (
                    <a
                        key={item.path}
                        href={item.path}
                        className="block px-4 py-2 rounded hover:bg-gray-800 transition-colors"
                    >
                        {item.label}
                    </a>
                ))}
            </nav>

            <Buttons
                onClick={onSignOut}
                className="p-2 text-sm bg-red-600 hover:bg-red-700 w-full"
            >
                Sign Out
            </Buttons>
        </aside>
    )
}
