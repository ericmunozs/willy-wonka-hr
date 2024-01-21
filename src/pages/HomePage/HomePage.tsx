import React, { useState } from 'react'

import { SearchBar } from '../../components/molecules/SearchBar/SearchBar'
import { OompaLoompaList } from '../../components/organisms/OompaLoompaList/OompaLoompaList'
import './HomePage.css'

export const HomePage: React.FC = () => {
  return (
    <div className='home-page'>
      <SearchBar />
      <h1>Find your Oompa Loompa</h1>
      <h2>There are more than 100k </h2>
      <OompaLoompaList />
    </div>
  )
}
