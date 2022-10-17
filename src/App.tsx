import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import { CommonProvider } from 'states/commonContext'

import Layout from 'components/Layout'

import { getClient } from 'request/apollo'
import Home from 'pages/Home'
import NotFound from 'pages/NotFound'

import 'index.css'
import { useToast } from 'components/Toast'

function App() {
  const [client, setClient] = useState(null)
  const { success, error } = useToast()

  useEffect(() => {
    const uri =
      process.env.REACT_APP_API ??
      'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/'
    const client = getClient(uri, { success, error })
    setClient(client)
  }, [])

  return (
    <div className="app">
      <Layout>
        <CommonProvider>
          {client ? (
            <ApolloProvider client={client}>
              <Router>
                <Routes>
                  <Route
                    path="/"
                    element={<Home />}
                  ></Route>
                  <Route
                    path="*"
                    element={<NotFound />}
                  ></Route>
                </Routes>
              </Router>
            </ApolloProvider>
          ) : null}
        </CommonProvider>
      </Layout>
    </div>
  )
}

export default App
