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

export const convertToHoursMins = date =>{
  const dt = new Date(date)
  let hours:any = (dt.getHours())

  if(hours<=9 ){
    hours = '0'+hours
  }
  let mins:any = dt.getMinutes()

  if(mins<=9){
    mins = '0'+mins
  }
  return hours + ':' + mins
}

export const handlePagination = (page: number, setParams: React.Dispatch<any>, limit?: number) => {
  setParams((prev: any) => {
    const copy = { ...prev }
    copy.page = page
    copy.limit = limit ? limit : 5
    return copy
  })
}

export const getCategoryIcon = (category: string) => {
  const cat = Categories.find((c) => c.value == category)
  return cat.icon
}

export const handleNameCase = (name: string): string => {
  const e = ['n', 'r', 's', 'š', 'p', 't']
  const ar = ['aleksandar', 'mitar', 'александар', 'митар', 'petar', 'петар']

  if (ar.includes(name.toLowerCase())) {
    return name.slice(0, -2) + 're' // cirilica treba da se hendla
  }

  if (e.includes(name.toLowerCase().charAt(name.length - 1))) {
    return name + 'e'
  }

  return name
}
