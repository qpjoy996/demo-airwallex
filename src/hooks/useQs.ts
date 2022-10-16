import { useMemo } from 'react'

const useQuery = () => {
  const { search } = window.location
  return useMemo(() => {
    return new URLSearchParams(search)
  }, [search])
}

export default useQuery
