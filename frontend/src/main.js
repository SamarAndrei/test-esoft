import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from 'react-redux';
import { Router } from "./Router.tsx";
import store, { persistor } from "./store/store.ts";
createRoot(document.getElementById('root')).render(_jsx(StrictMode, { children: _jsx(Provider, { store: store, children: _jsx(PersistGate, { loading: null, persistor: persistor, children: _jsx(Router, {}) }) }) }));
