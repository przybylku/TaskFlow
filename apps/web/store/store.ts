import persistReducer from "redux-persist/es/persistReducer";
import userSlice from "./features/userSlice";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import storage from "./storage";
import thunk from "redux-thunk";
import { type } from "os";
import { persistStore } from "redux-persist";
const rootReducer = combineReducers({
    user: userSlice,
});

const persisted = persistReducer({key: 'root', storage, whitelist: ['user']}, rootReducer)

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)