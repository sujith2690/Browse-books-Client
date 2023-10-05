import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userSlice from '../Features/userSlice';
import bookSlice from '../Features/bookSlice';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['bookStore','user']
};
const reducer = combineReducers({
    user: userSlice,
    bookStore:bookSlice,
})
const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
    reducer: persistedReducer
});
const persister = persistStore(store);
export { store, persister };

