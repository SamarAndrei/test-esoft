import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

import userReducer from "./userSlice.ts";


const rootReducer = combineReducers({
    user: userReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: hardSet,
};

// @ts-ignore
const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof store.getState>;  // Тип для состояния Redux
export type AppDispatch = typeof store.dispatch;