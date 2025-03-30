import React, { Suspense } from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./components/Layout.tsx";
import AuthorizationPage from "./pages/AuthorizationPage.tsx";
import Spinner from "./components/Spinner.tsx";

const LazyNoMatchPage = React.lazy(() => import('./pages/NoMatchPage.tsx'));
const LazyTasksPage = React.lazy(() => import('./pages/TasksPage.tsx'));


const routes = [
    { path: '', element: <AuthorizationPage /> },
    { path: '*', element: <LazyNoMatchPage /> },
    { path: 'tasks', element: <LazyTasksPage /> },
];

export const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                {routes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <Suspense fallback={<Spinner  />}>
                                {route.element}
                            </Suspense>
                        }
                    />
                ))}
            </Route>
        </Routes>
    </BrowserRouter>
);