import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
// import configureStore from './configureStore'
import { PersistGate } from 'redux-persist/integration/react'

// const store = createStore(rootReducer, applyMiddleware(thunk));

import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunk from 'redux-thunk'
import rootReducer from './store/reducers/rootReducer'
 
const persistConfig = { 
  key: 'root', 
  storage,
}

// console.log(storage)

const persistedReducer = persistReducer(persistConfig, rootReducer)

  const store = createStore(persistedReducer, applyMiddleware(thunk))
  // const store = createStore(rootReducer, applyMiddleware(thunk))
  const persistor = persistStore(store)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <App />
    </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
