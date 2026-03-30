import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const PageNotFound = lazy(() => import('./components/pages/PageNotFound.jsx'))
const InfoTechPage = lazy(() => import('./components/pages/IT/InfoTechPage.jsx'))
const ClientFeedbackForm = lazy(() => import('./components/pages/Client/ClientFeedbackForm.jsx'))

const router = createBrowserRouter([
  { path: "/", element: <App />},
  { path: "/client/:office", element: <ClientFeedbackForm />},
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
    <RouterProvider router={router} />
  </StrictMode>,
)
