import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
// StrictMode removido para não renderizar os componentes duas vezes