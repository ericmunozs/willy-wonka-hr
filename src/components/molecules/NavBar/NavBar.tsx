import { type FC } from 'react'
import { Link } from 'react-router-dom'

import './NavBar.css'

export const NavBar: FC = () => (
  <div className='navbar'>
    <Link to="/" className='navbar__link'>
      <img src="src/assets/logo-oompa-loompa.png" alt="logo" />
    </Link>
    <span className='navbar__title'>Oompa Lompa&apos;s Crew</span>
  </div>
)
