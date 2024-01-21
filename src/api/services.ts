import { type IOompaLoompa, type IOompaLoompasDetails } from '../types/oompaLoompa'
import { API_BASE_URL } from './config'

export const fetchList = async (page: number): Promise<IOompaLoompa[]> => {
  const response: Response = await fetch(`${API_BASE_URL}?page=${page}`)
  if (!response.ok) {
    throw new Error('Failed to fetch Oompa Loompa List')
  }
  const data: { results: IOompaLoompa[] } = await response.json()
  return data.results
}

export const fetchDetails = async (id: number): Promise<IOompaLoompasDetails> => {
  const response: Response = await fetch(`${API_BASE_URL}/${id}`)

  if (!response.ok || id === 0 || isNaN(id)) {
    throw new Error('Failed to fetch Oompa Loompa details')
  }
  const data: IOompaLoompasDetails = await response.json()
  return data
}
