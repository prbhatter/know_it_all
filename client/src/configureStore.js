// configureStore.js
 
import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunk from 'redux-thunk'
import rootReducer from './store/reducers/rootReducer'
 
const persistConfig = {
  key: 'root',
  storage,

}

const persistedReducer = persistReducer(persistConfig, rootReducer, applyMiddleware(thunk))
 
const configureStore = () => {
  const store = createStore(persistedReducer)
  const persistor = persistStore(store)
  return { store, persistor }
}

export default configureStore 