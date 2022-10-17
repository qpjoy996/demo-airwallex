import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'

import React from 'react'
import ReactDOM from 'react-dom/client'
import 'styles/index.scss'
import App from './App'
import { ToastProvider } from 'components/Toast'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <ToastProvider>
    <App />
  </ToastProvider>
)
