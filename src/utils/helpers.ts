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
