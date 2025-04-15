import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { persistor, store } from './store/store.jsx'
import UserProvider from './context/UserContext.jsx'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>

      <UserProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </UserProvider>

    </PersistGate>
  </Provider>
)
