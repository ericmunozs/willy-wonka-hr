import { type FC } from 'react'

import { SearchBar } from '../../components/molecules/SearchBar/SearchBar'
import { EntityList } from '../../components/organisms/EntityList/EntityList'
import './HomePage.css'
import { ScrollToTop } from '../../components/atoms/ScrollToTop/ScrollToTop'

export const HomePage: FC = () => {
  return (
    <div className='home-page'>
      <SearchBar />
      <h1>Find your Oompa Loompa</h1>
      <h2>There are more than 100k </h2>
      <EntityList />
      <ScrollToTop />
    </div>
  )
}
