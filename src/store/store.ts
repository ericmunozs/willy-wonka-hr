import { combineReducers } from 'redux'
import {
  persistReducer, persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { createLogger } from 'redux-logger'

import { configureStore } from '@reduxjs/toolkit'
import { DetailsSlice } from './slices/DetailsSlice'
import { ListSlice } from './slices/ListSlice'
import { SearchSlice } from './slices/SearchSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['list']
}

const logger = createLogger({
  collapsed: true
})

const persistedReducer = persistReducer(persistConfig, combineReducers({
  list: ListSlice.reducer,
  details: DetailsSlice.reducer,
  search: SearchSlice.reducer
}))

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware): any => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  }).concat(logger)
})

export const persistedStore = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
