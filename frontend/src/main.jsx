import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // Import the Provider
import './index.css';
import App from './App.jsx';
import store from './app/store'; // Import the Redux store

createRoot(document.getElementById('root')).render(
    <Provider store={store}> {/* Wrap App with Provider */}
      <App />
    </Provider>
);
