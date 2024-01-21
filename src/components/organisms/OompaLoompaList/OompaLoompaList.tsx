import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { clearCache, fetchList, selectCurrentPage, selectError, selectLastFetchTime, selectList, selectLoading, setLastFetchTime } from '../../../store/slices/ListSlice'
import { selectSearch } from '../../../store/slices/SearchSlice'
import { genderFormat } from '../../../utils/genderFormat'
import { isMoreThanOneDayAgo } from '../../../utils/isMoreThanOneDayAgo'
import './OompaLoompaList.css'

export const OompaLoompaList: React.FC = () => {
  const dispatch = useDispatch()
  const oompaLoompaList = useSelector(selectList)
  const oompaLoompaLoading = useSelector(selectLoading)
  const oompaLoompaCurrentPage = useSelector(selectCurrentPage)
  const oompaLoompaError = useSelector(selectError)
  const oompaLoompaLastFetchTime = useSelector(selectLastFetchTime)
  const searchQuery = useSelector(selectSearch)

  const containerRef = useRef<HTMLDivElement>(null)
  const [hasLoaded, setHasLoaded] = useState(false)

  window.onbeforeunload = () => {
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    if (!oompaLoompaLastFetchTime || isMoreThanOneDayAgo(oompaLoompaLastFetchTime)) {
      console.log('clear cache')
      dispatch(clearCache())
      dispatch(fetchList(1))
      dispatch(setLastFetchTime())
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      console.log('handleScroll')
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement

      console.log('handleScroll', (Math.ceil(scrollTop) + clientHeight) >= scrollHeight, !hasLoaded, searchQuery === '')
      if ((Math.ceil(scrollTop) + clientHeight) >= scrollHeight && !hasLoaded && searchQuery === '') {
        console.log('handleScroll hace el dispatch')
        setHasLoaded(true)
        dispatch(fetchList(oompaLoompaCurrentPage))
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [dispatch, oompaLoompaCurrentPage, hasLoaded])

  useEffect(() => {
    setHasLoaded(false)
  }, [oompaLoompaList])

  const filteredList = oompaLoompaList?.filter(
    (oompaLoompa) =>
      oompaLoompa.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      oompaLoompa.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      oompaLoompa.profession.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div ref={containerRef} className="oompa-list" style={{ height: '100vh' }}>
      {filteredList?.map((oompaLoompa) => (
        <div key={oompaLoompa.id} className="oompa-item">
          <Link to={`/${oompaLoompa.id}`}>
            <div className="oompa-container">
              <img className="oompa-container__image" src={oompaLoompa.image} alt={oompaLoompa.first_name} />
              <div className="oompa-container__description">
                <span className="oompa-container__description-title">{oompaLoompa.first_name} {oompaLoompa.last_name} {oompaLoompa.id} </span>
                <span className="oompa-container__description-subtitle">{genderFormat[oompaLoompa.gender]}</span>
                <span className="oompa-container__description-subtitle">{oompaLoompa.profession}</span>
              </div>
            </div>
          </Link>
        </div>
      ))}
      {filteredList.length === 0 && <div>No results found</div>}
      {oompaLoompaLoading && <div>Loading...</div>}
      {oompaLoompaError !== null && oompaLoompaError !== undefined && <div>Error: {oompaLoompaError}</div>}
    </div>
  )
}
