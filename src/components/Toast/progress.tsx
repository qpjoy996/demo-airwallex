import React, { FC } from 'react'

export interface ToastProgressProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'className'
  > {
  closeTimeout: number
}

const ToastProgress: FC<ToastProgressProps> = ({
  closeTimeout,
  ...props
}) => {
  return (
    <div
      {...props}
      className="toast__progress"
      style={{ animationDuration: `${closeTimeout}ms` }}
    ></div>
  )
}

export default ToastProgress
