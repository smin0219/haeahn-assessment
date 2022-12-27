import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import Page404 from './pages/Page404';
import Main from './pages/Main';
import Paper from './pages/Paper';

export default function Router() {
    const routes = [
        { path: '/404/', element: <Page404 /> },
        { path: '*', element: <Navigate to="/" replace /> },
        { path: '/', element: <Main /> },
        { path: '/paper/', element: <Paper/> },
    ];
    return useRoutes(routes);
  }
  