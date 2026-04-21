import { useState, lazy } from 'react'
import { ButtonOpenMainSidebar } from './components/buttons/ButtonOpenMainSidebar'
import { Footer } from './components/sections/Footer'
import { useQR } from './context/QRContext'
import { DisplayQRProvider } from './context/DisplayQRContext'
import { usePreloadQR } from './hooks/usePreloadQR'
import { Sidebar } from './components/sections/Sidebar'

const DisplayActiveQR = lazy(() => import('./components/pages/DisplayActiveQR'))

const App = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { qrData } = useQR()

  const qrUrls = [
    ...(qrData?.local || []).map(qr => qr.url),
    ...(qrData?.remote || []).map(qr => qr.url)
  ]
  usePreloadQR(qrUrls)

  return (
    <>
    <DisplayQRProvider setIsSidebarOpen={setIsSidebarOpen} >
      <main className="flex relative">
        <div className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-150 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} />
        
        <div className="relative flex-1 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/img/main.webp')] bg-cover bg-no-repeat blur-md scale-105"></div>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 p-4">
            <ButtonOpenMainSidebar
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
            <DisplayActiveQR />
          </div>
        </div>

        <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} qrData={qrData} />
      </main>
    </DisplayQRProvider>
    <Footer />
    </>
  );
};

export default App