import React, { FC, useContext } from 'react'
import { ToastContext } from './ToastProvider'
import Toast, { Toast as ToastNamespace } from './Toast'

export interface ToastStackProps {}

const ToastStack: FC<ToastStackProps> = ({}) => {
  const { state } = useContext(ToastContext)
  const { archives } = state

  const topLeftStack = archives.filter(
    (arch) => arch.position === 'top-left'
  )
  const topCenterStack = archives.filter(
    (arch) => arch.position === 'top-center'
  )
  const topRightStack = archives.filter(
    (arch) => arch.position === 'top-right'
  )
  const bottomLeftStack = archives.filter(
    (arch) => arch.position === 'bottom-left'
  )
  const bottomCenterStack = archives.filter(
    (arch) => arch.position === 'bottom-center'
  )
  const bottomRightStack = archives.filter(
    (arch) => arch.position === 'bottom-right'
  )

  const renderToast = (stack: ToastNamespace.Props[]) => {
    return stack.map((item) => (
      <Toast
        _id={item._id}
        key={item._id}
        message={item.message}
        type={item.type}
        closeTimeout={item.closeTimeout}
        filled={item.filled}
        onClose={item.onClose}
        onOpen={item.onOpen}
      />
    ))
  }

  return (
    <div className="toast-stack">
      {topLeftStack.length ? (
        <div className="toast-stack__container toast-stack__top-left">
          {renderToast(topLeftStack)}
        </div>
      ) : null}
      {topCenterStack.length ? (
        <div className="toast-stack__container toast-stack__top-center">
          {renderToast(topCenterStack)}
        </div>
      ) : null}
      {topRightStack.length ? (
        <div className="toast-stack__container toast-stack__top-right">
          {renderToast(topRightStack)}
        </div>
      ) : null}
      {bottomLeftStack.length ? (
        <div className="toast-stack__container toast-stack__bottom-left">
          {renderToast(bottomLeftStack)}
        </div>
      ) : null}
      {bottomCenterStack.length ? (
        <div className="toast-stack__container toast-stack__bottom-center">
          {renderToast(bottomCenterStack)}
        </div>
      ) : null}
      {bottomRightStack.length ? (
        <div className="toast-stack__container toast-stack__bottom-right">
          {renderToast(bottomRightStack)}
        </div>
      ) : null}
    </div>
  )
}

export default ToastStack
