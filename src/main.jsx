import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';

import { router } from './Routes/index.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer autoClose={2000} theme="light" />
    <RouterProvider router={router} />
  </StrictMode>
);
