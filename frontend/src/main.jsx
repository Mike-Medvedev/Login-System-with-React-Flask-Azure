import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import ErrorPage from './error-page.jsx';
import './index.css';
import Test from './components/layout/test.jsx';
import { loginLoader } from './loaders/loaders.js';
import { Provider } from 'react-redux';
import store from './state/store.js';
import { Toaster } from '@/components/ui/toaster';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    loader: loginLoader,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
  </React.StrictMode>,
);
