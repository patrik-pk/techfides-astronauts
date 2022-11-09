import dayjs from 'dayjs'
import axios from 'axios'

import { Astronaut } from './types'

export const getAstronautsFromDb = async () => {
  const { data } = await axios.get('astronaut')
  const formattedData = data.map(
    (item: any): Astronaut => ({
      ...item,
      id: item._id,
      _id: undefined,
    })
  )

  return formattedData
}

export const sortData = (data: any, orderBy: string, order: 'asc' | 'desc') => {
  return data.sort((a: any, b: any) => {
    let orderTypeVal = order == 'desc' ? 1 : -1

    //convert strings to lower case without diacritics first
    const valueA =
      orderBy == 'birthDate'
        ? a[orderBy]
        : a[orderBy]
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
    const valueB =
      orderBy == 'birthDate'
        ? b[orderBy]
        : b[orderBy]
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')

    if (valueB < valueA) {
      return -1 * orderTypeVal
    }
    if (valueB > valueA) {
      return 1 * orderTypeVal
    }
    return 0
  })
}
