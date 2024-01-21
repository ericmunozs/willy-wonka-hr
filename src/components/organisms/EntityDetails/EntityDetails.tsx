import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { fetchDetailsThunk, selectDetails } from '../../../store/slices/DetailsSlice'
import { type EGender } from '../../../types/oompaLoompa'
import { genderFormat } from '../../../utils/genderFormat'
import { sanitizeHTML } from '../../../utils/sanitizeHTML'
import './EntityDetails.css'

export const EntityDetails: React.FC = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const entityDetails = useSelector(selectDetails)

  useEffect(() => {
    window.scrollTo(0, 0)

    if (id !== undefined) {
      dispatch(fetchDetailsThunk(Number(id)) as any)
    }
  }, [dispatch, id])

  if (entityDetails === null || entityDetails === undefined) {
    return <div>No details available</div>
  }

  return (
    <div className="entity-details__container">
      <div className="entity-details__image">
        <img src={entityDetails.image} alt={entityDetails.first_name} />
      </div>

      <div className="entity-details__info">
        <h3 className='entity-details__info__title'>{`${entityDetails.first_name} ${entityDetails.last_name}`}</h3>
        <span className='entity-details__info__subtitle'>{genderFormat[entityDetails.gender as EGender]}</span>
        <span className='entity-details__info__subtitle--position'>{entityDetails.profession}</span>
        <p className='entity-details__info__description' dangerouslySetInnerHTML={{ __html: sanitizeHTML(entityDetails.description) }} />
      </div>
    </div>
  )
}
