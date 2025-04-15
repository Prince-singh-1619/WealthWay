import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from 'redux-persist'
  
import {persistStore, persistReducer} from "redux-persist"
import storage from 'redux-persist/lib/storage'

import navDataReducer from './navSlice'

const persistConfig = {
    key: "auth",
    storage,
};
const persistedAuthReducer = persistReducer(persistConfig, authReducer, navDataReducer);

const rootReducer = combineReducers({
    auth: persistedAuthReducer,
    navData: navDataReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
})

export const persistor = persistStore(store)