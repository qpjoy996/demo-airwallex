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

function App() {
  const [client, setClient] = useState(null)
  useEffect(() => {
    const uri = process.env.REACT_APP_API ?? 'https://'
    const client = getClient(uri)
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
