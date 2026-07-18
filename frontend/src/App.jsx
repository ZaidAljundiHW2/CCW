import Hero from './CustomComponents/Hero/Hero'
import Loader from './CustomComponents/Loader/Loader'
import { useState, useEffect } from 'react'

const App = () => {

  const [isLoading, setIsLoading] = useState(true);

  

  useEffect(() => {
    const handleLoad = () => setIsLoading(false)

    if (document.readyState === 'complete') {
      // page already fully loaded (images, fonts, etc.)
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
      return () => window.removeEventListener('load', handleLoad)
    }
  }, [])

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className='overflow-hidden'>
      
      <Hero />
      
    </div>
  )
}

export default App
