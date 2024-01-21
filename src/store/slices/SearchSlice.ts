import { createSlice } from '@reduxjs/toolkit'

import { type RootState } from '../store'

interface OompaLoompaState {
  query: string
  loading: boolean
  error: string | null
}

const initialState: OompaLoompaState = {
  query: '',
  loading: false,
  error: null
}

export const SearchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload
    }
  }
})

export const selectSearch = (state: RootState) => state.search.query
export const { setSearchQuery } = SearchSlice.actions
