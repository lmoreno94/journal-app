import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { PersistGate } from 'redux-persist/integration/react'
import { store } from './redux/store.ts'
import persistStore from 'redux-persist/es/persistStore'
import { Provider } from 'react-redux'
import App from './components/App'

const persistor = persistStore(store);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <App />
      </Provider>
    </PersistGate>
  </StrictMode>,
)
