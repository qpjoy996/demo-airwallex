import React, {
  useCallback,
  useMemo,
  useState
} from 'react'
import { Input } from 'components/Input'
import Button from 'components/Button'

import { useValidate } from 'hooks/useValidate'
import { SEND_USER } from 'request/gql'

import './invite.scss'
import { useApolloClient } from '@apollo/client'
import { useToast } from 'components/Toast'

function Invite() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [email2, setEmail2] = useState('')

  const [isSending, setIsSending] = useState(false)

  const { success } = useToast()
  const {
    result: formValidResult,
    validate,
    setError
  } = useValidate(
    useMemo(
      () => ({
        name: {
          value: name,
          rules: [
            {
              reg: /.{6,20}/,
              message: 'Name length is between 6-20 digits'
            }
          ]
        },
        email: {
          value: email,
          rules: [
            {
              reg: /^(test[1-3]:)?[A-Za-z0-9-_\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.(com|cn|net|org|so|gov|edu|mil|int|biz|info))+$/,
              message: 'Please enter your vaild email'
            }
          ]
        },
        email2: {
          value: email2,
          rules: [
            {
              equal: email,
              message: 'Emails are not identical'
            }
          ]
        }
      }),
      [name, email, email2]
    )
  )

  const { error, warning } = useToast()
  const client = useApolloClient()

  const sendUser = () => {
    setIsSending(true)
    if (!name || !email) {
      error('name or email not filled', {
        closeTimeout: 3000
      })
    }
    if (
      validate({
        name,
        email,
        email2
      })
    ) {
      client
        .query({
          query: SEND_USER,
          fetchPolicy: 'network-only',
          variables: {
            input: {
              name,
              email
            }
          }
        })
        .then((res) => {
          console.log(`[SendReq res]: `, res)
          success('Registered', {
            closeTimeout: 3000
          })
        })
        .catch((e) => {
          console.log(
            `[SendReq e]: `,
            e.result,
            e.message,
            JSON.stringify(e)
          )
        })
        .finally(() => {
          setIsSending(false)
        })
    } else {
      setIsSending(false)
      warning('please check the form rules', {
        closeTimeout: 3000
      })
    }
  }

  return (
    <div className="invite-form">
      <div className="invite-form-header">
        Request an invite
      </div>
      <div className="invite-form-underline mb-[60px]"></div>
      <div className="invite-form-body">
        <div className="w-full relative mb-[40px]">
          <Input
            size="large"
            value={name}
            onInput={setName}
            placeholder="Name"
            style={{
              width: '100%'
            }}
          />
          {!formValidResult.name.valid && (
            <div className="absolute text-[10px] text-fuchsia-500 h-[18px] leading-[18px] top-[-30px] px-[4px] bg-danger text-text rounded-b-sm after:absolute after:bottom-[-8px] after:left-2/4 after:-translate-x-2/4 after:border-4 after:border-solid after:border-transparent after:border-t-4 after:border-t-danger">
              {formValidResult.name.message}
            </div>
          )}
        </div>
        <div className="w-full relative mb-[40px]">
          <Input
            size="large"
            value={email}
            onInput={setEmail}
            placeholder="email (usedemail@airwallex.com)"
            style={{
              width: '100%'
            }}
          />
          {!formValidResult.email.valid && (
            <div className="absolute text-[10px] text-fuchsia-500 h-[18px] leading-[18px] top-[-30px] px-[4px] bg-danger text-text rounded-b-sm after:absolute after:bottom-[-8px] after:left-2/4 after:-translate-x-2/4 after:border-4 after:border-solid after:border-transparent after:border-t-4 after:border-t-danger">
              {formValidResult.email.message}
            </div>
          )}
        </div>
        <div className="w-full relative mb-[40px]">
          <Input
            size="large"
            value={email2}
            onInput={setEmail2}
            placeholder="Confirm email"
            style={{
              width: '100%'
            }}
          />
          {!formValidResult.email2.valid && (
            <div className="absolute text-[10px] text-fuchsia-500 h-[18px] leading-[18px] top-[-30px] px-[4px] bg-danger text-text rounded-b-sm after:absolute after:bottom-[-8px] after:left-2/4 after:-translate-x-2/4 after:border-4 after:border-solid after:border-transparent after:border-t-4 after:border-t-danger">
              {formValidResult.email2.message}
            </div>
          )}
        </div>
      </div>

      <Button
        className="w-full mt-[60px]"
        size="md"
        onClick={sendUser}
        disabled={isSending}
      >
        {isSending ? 'Sending, please wait...' : 'Send'}
      </Button>
    </div>
  )
}

export default Invite
