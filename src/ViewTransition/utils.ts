
import { isNil } from 'lodash-es'

export function validateId(id: string | number) {
    if (isNil(id)) {
      console.error()
      throw Error('id is required!')
    }
}