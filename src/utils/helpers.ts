import { Categories } from 'views/Tasks/tasksData'

export const checkValid = (invalidFields: string[], name: string) => {
  return invalidFields.includes(name)
}

const months = [
  'Januar',
  'Februar',
  'April',
  'Maj',
  'Jun',
  'Jul',
  'Avgust',
  'Septembar',
  'Oktobar',
  'Novembar',
  'Decembar',
]

export const convertTaskDate = (date) => {
  const dt = new Date(date)
  let day: any = dt.getDate()
  const mnth = months[dt.getMonth()]
  if (day < 10) {
    day = '0' + String(day)
  }

  return day + '. ' + mnth
}

export const handlePagination = (page: number, setParams: React.Dispatch<any>, limit?: number) => {
  setParams((prev: any) => {
    const copy = { ...prev }
    copy.page = page
    copy.limit = limit ? limit : 30
    return copy
  })
}

export const getCategoryIcon = (category: string) => {
  const cat = Categories.find((c) => c.value == category)
  return cat.icon
}
