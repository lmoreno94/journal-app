import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import { setupListeners } from '@reduxjs/toolkit/query'
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist'

import sidebarReducer from './features/Sidebar';
import categoriesReducer from './features/Categories';
import notesReducer from './features/Notes';
import themeReducer from './features/Theme';

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
    whitelist: ['sidebarState', 'categorieState', 'noteState'] // State slices to persist
}

const rootReducer = combineReducers({
    sidebarState: sidebarReducer,
    categorieState: categoriesReducer,
    noteState: notesReducer,
    themeState: themeReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            // Ignore these action types
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            // Ignore these field paths in all actions
            ignoredActionPaths: ['meta.arg', 'payload.timestamp', 'payload.menu', 'meta.baseQueryMeta'],
            // Ignore these paths in the state
            ignoredPaths: ['items.dates', 'sidebarState.menu'],
        },
    }).concat(logger)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch