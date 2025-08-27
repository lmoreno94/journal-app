import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { PersistGate } from 'redux-persist/integration/react'
import { store } from './redux/store.ts'
import persistStore from 'redux-persist/es/persistStore'
import { Provider } from 'react-redux'
import { routerNavigator } from './router/browser.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const persistor = persistStore(store);
const router = createBrowserRouter(routerNavigator);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
          <Suspense
            fallback={
              <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
              >
                Loading...
              </div>
            }
          >
            <RouterProvider router={router} />
          </Suspense>
        </Provider>
      </PersistGate>
  </StrictMode>,
)
