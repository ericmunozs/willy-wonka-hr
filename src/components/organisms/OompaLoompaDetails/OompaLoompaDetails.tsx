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
    // Realiza el dispatch para obtener los detalles del Oompa Loompa con el ID proporcionado
    dispatch(fetchDetails(id))
  }, [dispatch, id])
  // Obtén los detalles del Oompa Loompa del estado

  if (!oompaLoompaDetails) {
    return <div>No details available</div>
  }

  return (
    <div className="oompa-details-container">
      {/* Imagen a la izquierda */}
      <div className="oompa-details-image">
        <img src={oompaLoompaDetails.image} alt={oompaLoompaDetails.first_name} />
      </div>

      {/* Información a la derecha */}
      <div className="oompa-details-info">
        <h2>{`${oompaLoompaDetails.first_name} ${oompaLoompaDetails.last_name}`}</h2>
        <span>Gender: {genderFormat[oompaLoompaDetails.gender]}</span>
        <span>Position: {oompaLoompaDetails.profession}</span>
        <span>Description: {oompaLoompaDetails.description}</span>
      </div>
    </div>
  )
}
