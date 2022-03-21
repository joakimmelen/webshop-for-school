import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter } from "react-router-dom"
import { RecoilRoot } from "recoil"
import { QueryClient, QueryClientProvider } from "react-query"

const client = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
     <QueryClientProvider client={client}>
      <RecoilRoot>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RecoilRoot>  
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
