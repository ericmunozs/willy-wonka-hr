import { type FC } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { AppRoutes } from './routes/routes'
import { persistedStore, store } from './store/store'
import './styles/reset.css'
import './styles/globals.css'

export const App: FC = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistedStore}>
          <AppRoutes />
        </PersistGate>
      </Provider>
    </div>
  )
}

export default App
