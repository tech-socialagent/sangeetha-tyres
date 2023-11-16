import Footer from '@/Components/Common/Footer'
import Navbar from '@/Components/Common/Navbar'
import Loading from '@/Components/loading'
import '@/styles/globals.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  // const [route, setRoute] = useState(router.pathname)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (router.asPath != '/#contactUs') {
      setLoading(true)
      setTimeout(async () => {
        setLoading(false);
      }, 1000);
    }
    else {
      setLoading(false);
    }
  }, [router.pathname])

  return (
    <>
      {
        loading ? <Loading /> : <Component {...pageProps} />
      }
    </>
  )
}
