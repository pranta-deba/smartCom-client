import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  RouterProvider,
} from "react-router-dom";
import { router } from './routers/Routers.jsx';
import AuthProvider from './provider/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
        <Toaster
          position="top-left"
          reverseOrder={false}
        />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
