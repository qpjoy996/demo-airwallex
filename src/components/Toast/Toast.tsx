import React, { FC, useEffect, useState } from 'react'
import useToastCore from './useToastCore'
import ToastProgress from './progress'

export namespace Toast {
  /**
   * The type display of toast
   */
  export type Type =
    | 'white'
    | 'dark'
    | 'success'
    | 'error'
    | 'warning'
  /**
   * The type position a toast can display on it
   */
  export type Position =
    | 'top-right'
    | 'top-left'
    | 'top-center'
    | 'bottom-right'
    | 'bottom-left'
    | 'bottom-center'
  /**
   * Component can to receive properties
   */
  export interface Props {
    /**
     * Properties stylesheet and feature
     */
    _id: string
    type?: Toast.Type
    message?: string

    position?: Toast.Position
    filled?: boolean

    closeTimeout?: number

    /**
     * Events toast
     */
    onClose?: Function | void
    onOpen?: Function | void
  }
}

const Toast: FC<Toast.Props> = ({
  type,
  message,
  closeTimeout,
  filled,
  _id,

  /**
   * Event callback of toaster
   * @event
   */
  onOpen,
  onClose: onCloseCallback
}) => {
  const [readyDestroy, setReadyDestroy] = useState(false)
  const toast = useToastCore()

  /**
   * When user click to toast alert,
   * We need to destroy it
   * @listens onClick
   */
  const onClose = () => {
    setTimeout(() => {
      toast.destroy(_id, type)
    }, 305)

    // Callback onclose when toaster closed
    onCloseCallback && onCloseCallback()

    setReadyDestroy(true)
  }

  /**
   * Set time out auto close for toast
   * Remember this maybe can have or not
   *
   * @param {Number} closeTimeout
   */
  useEffect(() => {
    let timer: any, timerTransition: any
    if (closeTimeout) {
      // Timer to add class transition destroy before a real destroy active
      timerTransition = setTimeout(() => {
        // Callback onclose when toaster closed
        onCloseCallback && onCloseCallback()

        setReadyDestroy(true)
      }, closeTimeout)

      // Timer to destroy item from the tree DOM
      timer = setTimeout(() => {
        toast.destroy(_id, type)
      }, closeTimeout + 300)
    }

    return () => {
      clearTimeout(timerTransition)
      clearTimeout(timer)
    }
  }, [])

  // After the toast mounted, we can do it in here
  useEffect(() => {
    // Calling event open when the toast mounted
    onOpen && onOpen()
  }, [])

  return (
    <div
      className={`toast ${`toast--${type}`} ${
        readyDestroy ? 'toast--remove' : ''
      } ${filled ? 'toast--filled' : ''}`.trim()}
    >
      <div className="toast__icon">{/* icon */}</div>

      <div
        className="toast__message"
        dangerouslySetInnerHTML={{ __html: message || '' }}
      ></div>

      <div className="toast__close" onClick={onClose}>
        <svg aria-hidden="true" viewBox="0 0 14 16">
          <path
            fillRule="evenodd"
            d="M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"
          ></path>
        </svg>
      </div>

      {/* Only show the timeout progress when close time out have value is bigger 0 */}
      {closeTimeout ? (
        <ToastProgress closeTimeout={closeTimeout} />
      ) : null}
    </div>
  )
}

Toast.defaultProps = {
  type: 'dark',
  message: '',
  closeTimeout: 0,
  filled: false
}

export default Toast
