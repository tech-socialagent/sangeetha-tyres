import Footer from '@/Components/Common/Footer'
import Navbar from '@/Components/Common/Navbar'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* <Navbar /> */}
      <Component {...pageProps} />
      {/* <Footer /> */}
    </>
  )
}
