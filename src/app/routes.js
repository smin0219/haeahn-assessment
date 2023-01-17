import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import Page404 from './pages/Page404';
import Main from './pages/Main';
import Paper from './pages/Paper';
import Preparation from './pages/Preparation';
import End from './pages/End';
import Admin from './pages/Admin';
import Result from './pages/Result';

export default function Router() {
    const routes = [
        { path: '/404/', element: <Page404 /> },
        { path: '*', element: <Navigate to="/" replace /> },
        { path: '/', element: <Main /> },
        { path: '/result/', element: <Result/> },
        { path: '/admin', element: <Admin /> },
        { path: '/preparation', element: <Preparation /> },
        { path: '/paper/', element: <Paper/> },
        { path: '/end/', element: <End/> },

    ];
    return useRoutes(routes);
  }
  