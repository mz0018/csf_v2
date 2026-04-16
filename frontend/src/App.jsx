import { useState } from 'react'
import { ButtonOpenMainSidebar } from './components/buttons/ButtonOpenMainSidebar'
import { Sidebar } from './components/sections/Sidebar'

const App = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <main className="flex h-screen relative">
      
      <div className="flex-1 bg-gray-200 p-4">
        <ButtonOpenMainSidebar setIsSidebarOpen={setIsSidebarOpen} />
      </div>

      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

    </main>
  );
};

export default App