import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import Reducer from "./reducer";

// Setup the persist config
const persistConfig = {
  key: "root",
  storage,
};

// Wrap your existing reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, Reducer);

// Create the store with the persisted reducer
const store = createStore(persistedReducer);
// Create the persistor
const persistor = persistStore(store);

// Function to get the store and persistor for backward compatibility
export const getStoreAndPersistor = () => ({ store, persistor });

export default store;
