import { isValidPhoneNumber } from 'libphonenumber-js'

export const minimumTwoCharacters = (value: string, name: string, setInvalidFields: any) => {
  setInvalidFields((prev: string[]) => {
    let copy = [...prev]
    if (value.length >= 2) {
      copy = copy.filter((i) => i !== name)
    } else {
      !copy.includes(name) && copy.push(name)
    }
    return copy
  })
}

export const greaterThanZero = (value: number, name: string, setInvalidFields: any) => {
  setInvalidFields((prev: string[]) => {
    let copy = [...prev]
    if (value > 0) {
      copy = copy.filter((i) => i !== name)
    } else {
      !copy.includes(name) && copy.push(name)
    }
    return copy
  })
}

export const validateDate = (name: string, setInvalidFields: any) => {
  setInvalidFields((prev: any) => {
    let copy = [...prev]
    copy = copy.filter((f) => f !== name)
    return copy
  })
}

export const validateSelect = (value: any, name: string, setInvalidFields: any) => {
  setInvalidFields((prev: string[]) => {
    let copy = [...prev]
    if (value.value || (Array.isArray(value) && value.length > 0) || value.label === 'multiNone') {
      copy = copy.filter((i) => i !== name)
    } else {
      !copy.includes(name) && copy.push(name)
    }
    return copy
  })
}

export const hasValue = (value: string | number, name: string, setInvalidFields: any) => {
  const checkValue = value

  //   if (name === 'latitude') {
  //     checkValue = isValidCoordinates.latitude(value)
  //   }
  //   if (name === 'longitude') {
  //     checkValue = isValidCoordinates.longitude(value)
  //   }

  setInvalidFields((prev: string[]) => {
    let copy = [...prev]
    if (checkValue) {
      copy = copy.filter((i) => i !== name)
    } else {
      !copy.includes(name) && copy.push(name)
    }
    return copy
  })
}

// export const validationWithCoordinates = (
//   e: React.FormEvent<HTMLInputElement>,
//   setInvalidFields: any,
// ) => {
//   const { name, value } = e.target as HTMLInputElement
//   let checkValue = value

//   if (name === 'coordinates-latitude' || 'coordinates-longitude' || 'lat' || 'lng') {
//     checkValue =
//       name === 'coordinates-latitude' || 'lat'
//         ? isValidCoordinates.latitude(parseFloat(value))
//         : isValidCoordinates.longitude(parseFloat(value))
//     setInvalidFields((prev: string[]) => {
//       let copy = [...prev]
//       if (checkValue) {
//         copy = copy.filter((i) => i !== name)
//       } else {
//         !copy.includes(name) && copy.push(name)
//       }
//       return copy
//     })
//   } else {
//     standardFieldValidation(e, setInvalidFields)
//   }
// }

const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )
}

export const inComparisonValidation = (
  e: React.FormEvent<HTMLInputElement>,
  setInvalidFields: any,
  targetValue: number,
  isGreater: boolean,
) => {
  const { name, value } = e.target as HTMLInputElement
  setInvalidFields((prev: any) => {
    let copy = [...prev]

    if (isGreater && Number(value) > targetValue) {
      copy = copy.filter((f: string) => f !== name)
    } else if (!isGreater && Number(value) < targetValue) {
      copy = copy.filter((f: string) => f !== name)
    } else {
      copy.push(name)
    }
    return copy
  })
}

export const standardFieldValidation = (
  e: React.FormEvent<HTMLInputElement>,
  setInvalidFields: any,
) => {
  const { name, value } = e.target as HTMLInputElement
  switch ((e.target as HTMLInputElement).type) {
    case 'text':
      minimumTwoCharacters(value, name, setInvalidFields)
      break
    case 'email':
      setInvalidFields((prev: string[]) => {
        let copy = [...prev]
        if (validateEmail(value)) {
          copy = copy.filter((f) => f !== name)
        } else {
          !copy.includes(name) && copy.push(name)
          return copy
        }
        return copy
      })
      break
    case 'tel':
      setInvalidFields((prev: string[]) => {
        let copy = [...prev]
        if (isValidPhoneNumber(value)) {
          copy = copy.filter((f) => f !== name)
        } else {
          !copy.includes(name) && copy.push(name)
        }
        return copy
      })
      break
    case 'password':
      setInvalidFields((prev: string[]) => {
        let copy = [...prev]
        if (value.length > 5) {
          copy = copy.filter((f) => f !== name)
        } else {
          !copy.includes(name) && copy.push(name)
        }
        return copy
      })
      break
    case 'date':
      setInvalidFields((prev: string[]) => {
        let copy = [...prev]
        if (value) {
          copy = copy.filter((f) => f !== name)
        } else {
          !copy.includes(name) && copy.push(name)
        }
        return copy
      })
      break
    default:
      greaterThanZero(Number(value), name, setInvalidFields)
      break
  }
}
