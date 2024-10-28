import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AuthProvider from '@/components/AuthProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '@/assets/styles/globals.css'
import 'photoswipe/dist/photoswipe.css'

export const metadata = {
  title: 'Property Pulse',
  keywords: 'rental, propert, real estate, airbnb',
  description: 'Find the perfect rental property',
}

const MainLayout = ({ children }) => {
  return (
    <html>
      <body>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ToastContainer />
        </AuthProvider>
      </body>
    </html>
  )
}

export default MainLayout
