import { useState, lazy, Suspense } from 'react'
import { ButtonOpenMainSidebar } from './components/buttons/ButtonOpenMainSidebar'
import { Footer } from './components/sections/Footer'
import { motion, AnimatePresence } from 'framer-motion'
import { useQR } from './context/QRContext'
import { DisplayQRProvider } from './context/DisplayQRContext'

const Sidebar = lazy(() => import('./components/sections/Sidebar').then(m => ({ default: m.Sidebar })))
const DisplayActiveQR = lazy(() => import('./components/pages/DisplayActiveQR'))

const App = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { qrData } = useQR()

  return (
    <>
    <DisplayQRProvider>
      <main className="flex h-screen relative">
        <AnimatePresence mode="sync">
          {isSidebarOpen && (
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 bg-black/30 z-40"
            />
          )}
        </AnimatePresence>
        
        <div className="flex-1 p-4 bg-[url('/img/main.webp')] bg-cover bg-no-repeat">
          <ButtonOpenMainSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          <DisplayActiveQR />
        </div>
        <AnimatePresence mode="sync">
          {isSidebarOpen && (
            <Suspense fallback={null}>
              <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} qrData={qrData} />
            </Suspense>
          )}
        </AnimatePresence>
      </main>
    </DisplayQRProvider>
    <Footer />
    </>
  );
};

export default App