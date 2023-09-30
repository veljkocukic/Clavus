import { useEffect } from 'react'
import axios from 'axios'
/* eslint-disable*/

const usePaginate = (
  link,
  params,
  fixedList,
  parserFunction,
  setList,
  additionalTrigger?,
  resetList?,
) => {
  useEffect(() => {
    const fetchData = async () => {
    const token = localStorage.getItem('token')

      link &&
        axios
          .get(process.env.REACT_APP_API + '/' + link, {
            headers: { Authorization: `Bearer ${token}` },
            params
          })
          .then((res) => {
            setList((prev) => {
              let copy = prev ? structuredClone(prev) : []

              if (resetList) {
                copy = res.data.data
              } else {
                if (parserFunction) {
                  copy = [...copy, ...parserFunction(res.data)]
                } else {
                  copy = [...copy, ...res.data.data]
                }
              }
              return  copy
            })
          })
    }
    if (!fixedList) {
      fetchData()
    }
  }, [params, additionalTrigger])
}

export default usePaginate
