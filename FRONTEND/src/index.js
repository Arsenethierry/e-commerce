import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import productsReducer, { productsFetch } from './features/productsSlice';
import { productsApi } from './features/productsApi';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import cartReducer, { getTotals } from './features/cartSlice';
import { CssBaseline } from '@material-ui/core';
import authReducer, { loadUser } from './features/authSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware)
  
});

store.dispatch(productsFetch())
store.dispatch(getTotals())
store.dispatch(loadUser())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <ApiProvider api={productsApi}> */}
      <CssBaseline />
        <App />
      {/* </ApiProvider> */}
    </Provider>
  </React.StrictMode>
);

