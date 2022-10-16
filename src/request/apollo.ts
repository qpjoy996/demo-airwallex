import { ApolloClient, InMemoryCache } from '@apollo/client'
import { RestLink } from 'apollo-link-rest'

function getClient(uri: string): any {
  const restLink = new RestLink({
    uri
  })

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: restLink
  })
  return client
}

export { getClient }
