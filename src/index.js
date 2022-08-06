import React from 'react';
import ReactDOM from 'react-dom/client';
import "./styles/reset.css"
import "./styles/styles.css";
import { AppProvider } from "./context"
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AppProvider>
        <App />
    </AppProvider>
);