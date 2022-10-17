import { gql } from '@apollo/client'

export const SEND_USER = gql`
  query SendUser($input: Payload!) {
    user(input: $input)
      @rest(
        type: "User"
        path: "prod/fake-auth"
        method: "post"
      ) {
      errorMessage
    }
  }
`
