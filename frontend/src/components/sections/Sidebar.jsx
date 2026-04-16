import { OfficeQR } from './OfficeQRs'
import { useQR } from '../../context/QRContext'
import { PanelRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { UseTooltip } from '@/helpers/UseTooltip'

export const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {

  const { isGenerated, setIsGenerated } = useQR()

  return (
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: isSidebarOpen ? 0 : "100%" }}
        transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
        className="fixed top-0 right-0 h-full w-1/2 bg-gray-800 text-white z-50"
      >
      <div className="p-4 space-y-4 h-full overflow-y-auto">
        <UseTooltip content={'Close sidebar'}>
          <motion.button
            onClick={() => setIsSidebarOpen(false)}
            className="cursor-pointer"
            whileHover={{scale: 1, y: -2}}
            whileTap={{ scale: 0.95 }}
          >
            <PanelRight size={24} color='white' />
          </motion.button>
        </UseTooltip>

        <OfficeQR setIsGenerated={setIsGenerated} isGenerated={isGenerated} />
      </div>
    </motion.aside>
  );
};