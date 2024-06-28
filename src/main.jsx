import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { MainContext } from './context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
   <MainContext>
    <App />
    </MainContext>
  
)
