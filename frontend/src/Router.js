import { jsx as _jsx } from "react/jsx-runtime";
import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import AuthorizationPage from "./pages/AuthorizationPage.tsx";
import Spinner from "./components/Spinner.tsx";
const LazyNoMatchPage = React.lazy(() => import('./pages/NoMatchPage.tsx'));
const LazyTasksPage = React.lazy(() => import('./pages/TasksPage.tsx'));
const routes = [
    { path: '', element: _jsx(AuthorizationPage, {}) },
    { path: '*', element: _jsx(LazyNoMatchPage, {}) },
    { path: 'tasks', element: _jsx(LazyTasksPage, {}) },
];
export const Router = () => (_jsx(BrowserRouter, { children: _jsx(Routes, { children: _jsx(Route, { path: "/", element: _jsx(Layout, {}), children: routes.map((route, index) => (_jsx(Route, { path: route.path, element: _jsx(Suspense, { fallback: _jsx(Spinner, {}), children: route.element }) }, index))) }) }) }));
