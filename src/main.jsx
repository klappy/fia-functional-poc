import {storedTheme} from './lib/workspace.js';
import {browserStorage} from './lib/session.js';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/app.css';
document.documentElement.dataset.theme=storedTheme(browserStorage());
createRoot(document.getElementById('root')).render(<App/>);
