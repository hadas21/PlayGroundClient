import React from 'react'
import ReactDOM from 'react-dom'
import 'mapbox-gl/dist/mapbox-gl.css'
import './index.scss'

import App from './App'
import { BrowserRouter } from 'react-router-dom'

const appJsx = (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <App />
  </BrowserRouter>
)

ReactDOM.render(appJsx, document.getElementById('root'))
