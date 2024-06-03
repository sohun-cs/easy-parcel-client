import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/router.jsx'
import { HelmetProvider } from 'react-helmet-async'
import AuthProvider from './providers/AuthProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </HelmetProvider>
  </>,
)
