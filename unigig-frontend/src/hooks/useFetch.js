import { useState, useEffect } from 'react'

const useFetch = (apiFunc, params = null) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await apiFunc(params)
        if (res.success) {
          setData(res.data)
        } else {
          setError(res.message)
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

export default useFetch