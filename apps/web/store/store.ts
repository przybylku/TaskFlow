import persistReducer from "redux-persist/es/persistReducer";
import userSlice from "./features/userSlice";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import storage from "./storage";
import thunk from "redux-thunk";
import { type } from "os";
import { persistStore } from "redux-persist";
import storageSession from 'redux-persist/lib/storage/session'
const rootReducer = combineReducers({
    user: userSlice,
});

const persisted = persistReducer({key: 'root', storage: storageSession, whitelist: ['user']}, rootReducer)

export const store = configureStore({
    reducer: persisted,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)