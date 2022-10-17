import { useContext } from 'react'
import { Toast } from 'components/Toast/Toast'
import { ToastContext } from './ToastProvider'

export interface ToastCoreConfigI
  extends Omit<Toast.Props, 'message' | '_id' | 'type'> {}

function useToastCore() {
  const { dispatch } = useContext(ToastContext)

  const generateUID = () => {
    return `${Date.now()}-${Math.random()}`
  }

  const success = (
    message: string,
    config?: ToastCoreConfigI
  ) => {
    return dispatch({
      type: 'type',
      payload: {
        ...config,
        message: message,
        type: 'success',
        _id: generateUID(),
        position: config?.position || 'top-right'
      }
    })
  }

  const error = (
    message: string,
    config?: ToastCoreConfigI
  ) => {
    return dispatch({
      type: 'type',
      payload: {
        ...config,
        message: message,
        type: 'error',
        _id: generateUID(),
        position: config?.position || 'top-right'
      }
    })
  }

  const warning = (
    message: string,
    config?: ToastCoreConfigI
  ) => {
    return dispatch({
      type: 'type',
      payload: {
        ...config,
        message: message,
        type: 'warning',
        _id: generateUID(),
        position: config?.position || 'top-right'
      }
    })
  }

  const core = (
    message: string,
    config?: ToastCoreConfigI
  ) => {
    return dispatch({
      type: 'type',
      payload: {
        ...config,
        message: message,
        type: 'dark',
        _id: generateUID(),
        position: config?.position || 'top-right'
      }
    })
  }

  const destroy = (_id: string, type?: Toast.Type) => {
    dispatch({
      type: 'destroy',
      payload: {
        _id: _id,
        type: type
      }
    })
  }

  const destroyAll = () => {
    dispatch({
      type: 'destroyAll',
      payload: {
        _id: '',
        type: 'dark'
      }
    })
  }

  return {
    success,
    error,
    warning,
    core,
    destroy,
    destroyAll
  }
}

export default useToastCore
