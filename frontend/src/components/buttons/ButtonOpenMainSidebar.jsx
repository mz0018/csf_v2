export const ButtonOpenMainSidebar = ({ setIsSidebarOpen }) => {

    return (
        <button className="cursor-pointer" onClick={() => setIsSidebarOpen(true)}>Open Sidebar</button>
    )
}