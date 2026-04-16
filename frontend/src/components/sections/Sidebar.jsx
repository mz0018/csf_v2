export const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <aside
      className={`fixed top-0 right-0 h-full w-64 bg-gray-800 text-white
      transform transition-transform duration-300
      ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="p-4 space-y-4">
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="px-3 py-1 bg-red-500 rounded"
        >
          Close
        </button>

        <p>Sidebar content here</p>
      </div>
    </aside>
  );
};