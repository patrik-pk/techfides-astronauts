import { getDocs } from 'firebase/firestore'
import { astronautsCollectionRef } from '../firebase/firebase'
import { Astronaut } from './types'

export const getAstronautsFromDb = async () => {
  const data = await getDocs(astronautsCollectionRef)
  const formattedData: Astronaut[] = data.docs.map(
    doc => ({ ...doc.data(), id: doc.id } as Astronaut)
  )

  return formattedData
}

export const sortData = (data: any, orderBy: string, order: 'asc' | 'desc') => {
  return data.sort((a: any, b: any) => {
    let orderTypeVal = order == 'desc' ? 1 : -1

    // sort dates - compare timestamps
    if (orderBy == 'birthDate') {
      const dateA = Date.parse(a[orderBy])
      const dateB = Date.parse(b[orderBy])

      // if value is not parsable to timestamp, make sure the item stays on the bottom
      if (isNaN(dateA)) {
        return 1
      }

      if (isNaN(dateB)) {
        return -1
      }

      if (dateB < dateA) {
        return -1 * orderTypeVal
      }
      if (dateB > dateA) {
        return 1 * orderTypeVal
      }
    }
    // sort strings - convert to lower case without diacritics first
    else {
      const valueA = a[orderBy]
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
      const valueB = b[orderBy]
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
    }
  })
}
