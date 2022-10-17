import React, { createContext, useReducer } from 'react'
import { Toast } from 'components/Toast/Toast'
import ToastStack from 'components/Toast/ToastStack'

export namespace ToastProvider {
  /**
   * The Props for ToastProvider component
   */
  export interface Props {}

  /**
   * Interface state reducer for context
   *
   * @param archives To stored list toast
   */
  export interface State {
    archives: Toast.Props[]
  }

  /**
   * Interface action reducer for context
   *
   * @param type Type action to change data toast
   * @param payload Payload when hook sending request
   */
  export interface Action<T = Toast.Props> {
    type: 'type' | 'destroy' | 'destroyAll'
    payload: T
  }
}

const initialState: ToastProvider.State = {
  archives: []
}

const reducer = (
  state: ToastProvider.State,
  action: ToastProvider.Action
) => {
  const archive = { ...action.payload }

  switch (action.type) {
    case 'type':
      state = {
        ...state,
        archives: [...state.archives, archive]
      }
      break
    case 'destroy':
      // Removing toast
      const archives = state.archives.filter(
        (currentArchive) =>
          currentArchive._id !== archive._id
      )
      // Re-set state
      state = {
        ...state,
        archives: archives
      }
      break
    case 'destroyAll':
      state = {
        ...state,
        archives: []
      }
      break
    default:
      return state
  }

  return state
}

export const ToastContext = createContext<{
  state: ToastProvider.State
  dispatch: React.Dispatch<ToastProvider.Action>
}>({
  state: initialState,
  dispatch: () => undefined
})

const ToastProvider: React.FC<ToastProvider.Props> = ({
  children
}: any) => {
  const { Provider } = ToastContext

  const [state, dispatch] = useReducer(
    reducer,
    initialState
  )

  const providerValue = { state, dispatch }

  return (
    <Provider value={providerValue}>
      {children}
      <ToastStack />
    </Provider>
  )
}

export default ToastProvider
