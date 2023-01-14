import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import productsReducer, { productsFetch } from './features/productsSlice';
import { productsApi } from './features/productsApi';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import cartReducer from './features/cartSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware)
  
});

store.dispatch(productsFetch())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <ApiProvider api={productsApi}> */}
        <App />
      {/* </ApiProvider> */}
    </Provider>
  </React.StrictMode>
);

