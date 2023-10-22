import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from '@arcana/auth';
import App from "./App";
import { ProvideAuth } from "@arcana/auth-react";
import reportWebVitals from './reportWebVitals';
import './index.css';


const provider = new AuthProvider(`8afe688dafd1119144bb600dae348c712add9daf`);
provider.init();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ProvideAuth provider={provider}>
    <App />
    </ProvideAuth>
);

reportWebVitals();
