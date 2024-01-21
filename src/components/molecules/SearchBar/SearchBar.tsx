import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setSearchQuery } from '../../../store/slices/searchSlice'
import { type RootState } from '../../../store/store'
import './SearchBar.css'

export const SearchBar: React.FC = () => {
  const dispatch = useDispatch()
  const searchQuery = useSelector((state: RootState) => state.search.query)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value))
  }

  return (
    <div className="search-bar">
      <input type="text" placeholder="Search" className="search-bar__input" value={searchQuery}
        onChange={handleSearchChange} />
      {/* <button type="button" className="search-bar__button"> */}

      <div className='search-bar__icon--container'>
        <div className='search-bar__icon--separator' />
        <span className="search-bar__icon--image">
          <FontAwesomeIcon icon={faSearch} color='gray' size='xs' />
        </span>
      </div>
      {/* </button> */}
    </div>
  )
}
