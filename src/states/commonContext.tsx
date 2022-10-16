import React, { useMemo, useState } from 'react'
import useQs from 'hooks/useQs'

const commonState = {
  theme: '',
  setTheme: () => {},
  code: '',
  setCode: () => {}
}
const CommonContext: any = React.createContext(commonState)

export const CommonProvider = ({ children }: any) => {
  const [theme, setTheme] = useState('')
  let query = useQs()
  const [code, setCode] = useState(query.get('code'))

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      code,
      setCode
    }),
    [theme, code]
  )
  return (
    <CommonContext.Provider value={value}>
      {children}
    </CommonContext.Provider>
  )
}

export default CommonContext
