import { createSlice } from '@reduxjs/toolkit'

import { type RootState } from '../store'

interface OompaLoompaState {
  query: string
}

const initialState: OompaLoompaState = {
  query: ''
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

export const selectSearch = (state: RootState): string => state.search.query
export const { setSearchQuery } = SearchSlice.actions
