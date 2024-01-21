import { useEffect, useState, type FC } from 'react'

import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './ScrollToTop.css'

export const ScrollToTop: FC = () => {
  const [showButton, setShowButton] = useState(false)

  const handleScroll = (): void => {
    const scrollTop = window.scrollY
    setShowButton(scrollTop > 200)
  }

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className={`scrollToTop ${showButton ? 'visible' : ''}`} onClick={scrollToTop} >
      <FontAwesomeIcon icon={faArrowUp} />
    </div>
  )
}
