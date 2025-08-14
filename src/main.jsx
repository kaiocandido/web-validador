import { createRoot } from 'react-dom/client'
import React from 'react'
import {Login} from './containers/Login'
import GlobalStyles from './styles/globalStyles'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Login/>
    <GlobalStyles/>
  </React.StrictMode>,
)
