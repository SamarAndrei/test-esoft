import React, { Suspense } from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./components/Layout/Layout.tsx";
import MainPage from "./Pages/MainPage/MainPage.tsx";

const LazyNoMatchPage = React.lazy(() => import('./Pages/NoMatchPage/NoMatchPage.tsx'));
const LazyCartPage = React.lazy(() => import('./Pages/Cart/MyCart.tsx'));
const LazyFavouritesPage = React.lazy(() => import('./Pages/Favorites/MyFavourites.tsx'));
const LazyOneItemPage = React.lazy(() => import('./Pages/OneItemPage/OneItemPage.tsx'));

const routes = [
    { path: '', element: <MainPage /> },
    { path: '*', element: <LazyNoMatchPage /> },
    { path: 'cart', element: <LazyCartPage /> },
    { path: 'favourite', element: <LazyFavouritesPage /> },
    { path: 'item/:itemId', element: <LazyOneItemPage /> },
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
                            <Suspense fallback={<CustomSpinner />}>
                                {route.element}
                            </Suspense>
                        }
                    />
                ))}
            </Route>
        </Routes>
    </BrowserRouter>
);