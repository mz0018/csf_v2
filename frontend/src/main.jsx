import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './services/i18n.js'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QRProvider } from './context/QRContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'

const PageNotFound = lazy(() => import('./components/pages/PageNotFound.jsx'))
const InfoTechPage = lazy(() => import('./components/pages/IT/InfoTechPage.jsx'))
const ClientFeedbackForm = lazy(() => import('./components/pages/Client/ClientFeedbackForm.jsx'))
const SuccessFeedback = lazy(() => import('./components/pages/SuccessFeedback.jsx'))
const AuthenticateForm = lazy(() => 
    import('./components/pages/AuthenticateForm.jsx')
        .then(module => ({ default: module.AuthenticateForm }))
)
const HRDashboard = lazy(() => import('./components/pages/HRDashboard.jsx'))

const router = createBrowserRouter([
  { path: "/signin", element: <AuthenticateForm />},
  { path: "/", element: <App />},
  { 
    path: "/infotech", 
    element: (
      <ProtectedRoute>
        <Suspense fallback={<>Loading IT Page!</>}>
          <InfoTechPage />
        </Suspense>
      </ProtectedRoute>
    )
  },
  { 
    path: "/hr-dashboard", 
    element: (
      <ProtectedRoute requiredUserType="hr_admin">
        <Suspense fallback={<>Loading HR Dashboard!</>}>
          <HRDashboard />
        </Suspense>
      </ProtectedRoute>
    )
  },
  { path: "/client/:office", element: <ClientFeedbackForm />},
  { path: "/client/success-feedback/:office", element: <SuccessFeedback />},
  { path: "*", element: <PageNotFound />}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TooltipProvider delayDuration={700}>
      <AuthProvider>
        <QRProvider>
          <RouterProvider router={router} />
        </QRProvider>
      </AuthProvider>
    </TooltipProvider>
  </StrictMode>,
)
