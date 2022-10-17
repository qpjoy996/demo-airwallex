import {
  ApolloClient,
  ApolloLink,
  InMemoryCache
} from '@apollo/client'
import { RestLink } from 'apollo-link-rest'
import {
  ErrorResponse,
  onError
} from '@apollo/client/link/error'

// function isOwnPropertyWritable(obj:any, prop:any) {
//   // 判断 null 和 undefined
//   if(obj == null) return false;

//   // 判断其他原始类型
//   const type = typeof obj;
//   if(type !== 'object' && type !== 'function') return false;

//   // 判断是否被冻结
//   if(Object.isFrozen(obj)) return false;

//   // 判断sealed的新增属性
//   if(!(prop in obj) && Object.isSealed(obj)) return false;

//   // 判断属性描述符
//   const des = Object.getOwnPropertyDescriptor(obj, prop);
//   return des == null || des.writable || !!des.set;
// }

const getErrorLink = (toast: any) => {
  return onError((data: ErrorResponse) => {
    const { graphQLErrors, networkError } = data
    if (graphQLErrors)
      graphQLErrors.forEach(
        ({ message, locations, path }) => {
          let errorMsg = `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          console.log(errorMsg)
          toast.error(errorMsg)
        }
      )
    if (networkError) {
      try {
        const networkErrorMsg: any = JSON.parse(
          JSON.stringify(networkError)
        )
        toast.error(networkErrorMsg?.result?.errorMessage, {
          closeTimeout: 3000
        })
      } catch (e) {
        console.log(`[Network error]: `, e)
      }
    }
  })
}

function getClient(uri: string, params: any): any {
  const restLink = new RestLink({
    uri,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([getErrorLink(params), restLink]),
    defaultOptions: {
      query: {
        errorPolicy: 'all'
      },
      mutate: {
        errorPolicy: 'all'
      }
    }
  })
  return client
}

export { getClient }
