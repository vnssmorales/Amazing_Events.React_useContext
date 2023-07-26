import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.css';
import EventProvider from './context/EventProvider.jsx';
import AuthProvider from './contextAuth/AuthProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <EventProvider>
    <App />
    </EventProvider>
    </AuthProvider>
  </React.StrictMode>,
)
