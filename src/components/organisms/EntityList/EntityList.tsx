import { useEffect, useRef, useState, type FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { clearCache, fetchList, selectCurrentPage, selectError, selectLastFetchTime, selectList, selectLoading, setLastFetchTime } from '../../../store/slices/ListSlice'
import { selectSearch } from '../../../store/slices/SearchSlice'
import { genderFormat } from '../../../utils/genderFormat'
import { isMoreThanOneDayAgo, type IIsMoreThanOneDayAgo } from '../../../utils/isMoreThanOneDayAgo'
import './EntityList.css'

export const EntityList: FC = () => {
  const dispatch = useDispatch()
  const entityList = useSelector(selectList)
  const entityLoading = useSelector(selectLoading)
  const entityCurrentPage = useSelector(selectCurrentPage)
  const entityError = useSelector(selectError)
  const entityLastFetchTime = useSelector(selectLastFetchTime)
  const searchQuery = useSelector(selectSearch)

  const containerRef = useRef<HTMLDivElement>(null)
  const [hasLoaded, setHasLoaded] = useState(false)

  window.onbeforeunload = () => {
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    if (entityLastFetchTime === null || entityLastFetchTime === undefined || isMoreThanOneDayAgo(entityLastFetchTime as unknown as IIsMoreThanOneDayAgo) as boolean) {
      dispatch(clearCache())
      dispatch(fetchList(1) as any)
      dispatch(setLastFetchTime())
    }
  }, [])

  useEffect(() => {
    const handleScroll = (): void => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement

      if ((Math.ceil(scrollTop) + clientHeight) >= scrollHeight && !hasLoaded && searchQuery === '') {
        setHasLoaded(true)
        dispatch(fetchList(entityCurrentPage) as any)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [dispatch, entityCurrentPage, hasLoaded])

  useEffect(() => {
    setHasLoaded(false)
  }, [entityList])

  const filteredList = entityList?.filter(
    (entity) =>
      entity.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entity.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entity.profession.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div ref={containerRef} className="entity-list" style={{ height: '100vh' }}>
      {filteredList?.map((entity) => (
        <div key={entity.id} className="entity-list__item">
          <Link to={`/${entity.id}`}>
            <div className="entity-list__container">
              <img className="entity-list__container__image" src={entity.image} alt={entity.first_name} />
              <div className="entity-list__container__description">
                <span className="entity-list__container__description-title">{entity.first_name} {entity.last_name} {entity.id} </span>
                <span className="entity-list__container__description-subtitle">{genderFormat[entity.gender]}</span>
                <span className="entity-list__container__description-subtitle entity-list__container__description-subtitle--position">{entity.profession}</span>
              </div>
            </div>
          </Link>
        </div>
      ))}
      {filteredList.length === 0 && <div>No results found</div>}
      {entityLoading && <div className='entity-list__item--loading'>Loading...</div>}
      {entityError !== null && entityError !== undefined && <div>Error: {entityError}</div>}
    </div>
  )
}
