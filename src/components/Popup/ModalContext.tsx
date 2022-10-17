import React, { createContext, useMemo } from 'react'

const ModalContext = createContext<any>({
  background: ''
})

export const ModalProvider = ({
  background,
  children
}: any) => {
  const defaults = useMemo(
    () => ({
      background: background || ''
    }),
    [background]
  )
  return (
    <ModalContext.Provider value={defaults}>
      {children}
    </ModalContext.Provider>
  )
}

export default ModalContext
