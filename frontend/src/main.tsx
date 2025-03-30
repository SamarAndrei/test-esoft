import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {PersistGate} from "redux-persist/integration/react";
import { Provider } from 'react-redux';
import {Router} from "./Router.tsx";
import store, {persistor} from "./store/store.ts";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Router />
          </PersistGate>
      </Provider>
  </StrictMode>,
)
