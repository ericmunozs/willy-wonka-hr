import { type FC, type ReactNode } from 'react'

import { NavBar } from '../../molecules/NavBar/NavBar'
import './Layout.css'

interface ILayoutProps {
  children: ReactNode
}

export const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <div className='layout'>
      <NavBar />
      <main className='layout__container'>{children}</main>
    </div>
  )
}
