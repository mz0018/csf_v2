import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './services/i18n.js'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QRProvider } from './context/QRContext.jsx'

const PageNotFound = lazy(() => import('./components/pages/PageNotFound.jsx'))
const InfoTechPage = lazy(() => import('./components/pages/IT/InfoTechPage.jsx'))
const ClientFeedbackForm = lazy(() => import('./components/pages/Client/ClientFeedbackForm.jsx'))
const SuccessFeedback = lazy(() => import('./components/pages/SuccessFeedback.jsx'))

const router = createBrowserRouter([
  { path: "/", element: <App />},
  { path: "/client/:office", element: <ClientFeedbackForm />},
  { path: "/client/success-feedback/:office", element: <SuccessFeedback />},
  { 
    path: "/infotech", 
    element: (
      <Suspense fallback={<>Loading IT Page!</>}>
        <InfoTechPage />
      </Suspense>
    )
  },
  { path: "*", element: <PageNotFound />}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QRProvider><RouterProvider router={router} /></QRProvider>
  </StrictMode>,
)
