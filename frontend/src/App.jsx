import { useState } from 'react'
import { ButtonOpenMainSidebar } from './components/buttons/ButtonOpenMainSidebar'
import { Sidebar } from './components/sections/Sidebar'
import { motion } from 'framer-motion';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <main className="flex h-screen relative">

      {isSidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 z-40"
        />
      )}
      
      <div className="flex-1 p-4 bg-[url('/img/main.webp')] bg-cover bg-no-repeat">
        <ButtonOpenMainSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      </div>

      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

    </main>
  );
};

export default App