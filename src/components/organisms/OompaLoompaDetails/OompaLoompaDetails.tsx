import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { fetchDetails, selectDetails } from '../../../store/slices/DetailsSlice'
import { genderFormat } from '../../../utils/genderFormat'
import './OompaLoompaDetails.css'

export const OompaLoompaDetails: React.FC = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const oompaLoompaDetails = useSelector(selectDetails)

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(fetchDetails(id))
  }, [dispatch, id])

  if (!oompaLoompaDetails) {
    return <div className=''>No details available</div>
  }

  return (
    <div className="oompa-details__container">
      <div className="oompa-details__image">
        <img src={oompaLoompaDetails.image} alt={oompaLoompaDetails.first_name} />
      </div>

      <div className="oompa-details__info">
        <h3 className='oompa-details__info__title'>{`${oompaLoompaDetails.first_name} ${oompaLoompaDetails.last_name}`}</h3>
        <span className='oompa-details__info__subtitle'>{genderFormat[oompaLoompaDetails.gender]}</span>
        <span className='oompa-details__info__subtitle--position'>{oompaLoompaDetails.profession}</span>
        <p className='oompa-details__info__description' dangerouslySetInnerHTML={{ __html: oompaLoompaDetails.description }} />
      </div>
    </div>
  )
}
