import {
  faBroom,
  faCancel,
  faCheckCircle,
  faClock,
  faDoorOpen,
  faHardDrive,
  faPaintRoller,
  faPlugCircleBolt,
  faTemperatureArrowDown,
  faToilet,
} from '@fortawesome/free-solid-svg-icons'

export const Categories = [
  {
    label: 'Moleraj',
    icon: faPaintRoller,
    value: 'PAINTING',
    keyWords: ['Moler', 'Farbanje', 'Krecenje', 'Krečenje'],
  },
  {
    label: 'Elektrika',
    icon: faPlugCircleBolt,
    value: 'ELECTRICS',
    keyWords: ['Struja', 'Elektrika', 'Elektro', 'Elektroinstalater', 'Osigurac'],
  },
  {
    label: 'Čišćenje',
    icon: faBroom,
    value: 'CLEANING',
    keyWords: [
      'Čišćenje',
      'Ciscenje',
      'Spremanje',
      'Čistačica',
      'Cistacica',
      'Higijena',
      'Higijenic',
      'Higijenič',
    ],
  },
  {
    label: 'Vodni Radovi',
    icon: faToilet,
    value: 'PLUMBING',
    keyWords: ['Vodoinstalater', 'Cev', 'Ventil', 'Merac', 'Merač'],
  },
  {
    label: 'Stolarija',
    icon: faDoorOpen,
    value: 'CARPENTRY',
    keyWords: [
      'Stolarija',
      'Prozor',
      'Vrata',
      'PVC',
      'Aluminijum',
      'Profili',
      'Tisljeraj',
      'Tišljeraj',
      'Ugradnja',
    ],
  },
  {
    label: 'Rashladni Uređaji',
    icon: faTemperatureArrowDown,
    value: 'COOLING_MACHINES',
    keyWords: ['Klime'],
  },
  {
    label: 'Bela Tehnika',
    icon: faHardDrive,
    value: 'APPLIANCES',
    keyWords: ['Masina', 'Bela Tehnika', 'Ves Masina', 'Veš Mašina', 'Sporet', 'Šporet'],
  },
]

export const colorCombinations = [
  { backgroundColor: '#F1F5FE', iconColor: '#8FADF0' },
  { backgroundColor: '#EDF8F0', iconColor: '#01A05D' },
  { backgroundColor: '#FBEFED', iconColor: '#D42B20' },
  { backgroundColor: '#F7F5EC', iconColor: '#F0E68F' },
]

export const currencies = [
  {
    label: 'RSD',
    value: 'RSD',
  },
  {
    label: 'EUR',
    value: 'EUR',
  },
  {
    label: 'CHF',
    value: 'CHF',
  },
  {
    label: 'USD',
    value: 'USD',
  },
]

export const priceTypes = [
  {
    label: 'Ukupno',
    value: 'WHOLE',
  },
  {
    label: 'Po m2',
    value: 'PER_M2',
  },
  {
    label: 'Po satu',
    value: 'PER_HOUR',
  },
  {
    label: 'Po danu',
    value: 'PER_DAY',
  },
]

export const tasksValidation = ['name', 'price', 'currency', 'priceType', 'location', 'date']

export const tasksInitialState: ITaskState = {
  name: '',
  price: null,
  currency: '',
  priceType: '',
  location: '',
  date: '',
  category: '',
  description: '',
  withoutMonitoring: false,
}

export interface ITaskState {
  name: string
  price: number
  currency: string
  priceType: string
  location: string
  date: string
  withoutMonitoring: false
  description: string
  category: string
  status?: string
  amount?: number
}

export const statusStyles = [
  {
    status: 'ACTIVE',
    label: 'Čeka se radnik',
    color: '#F7F5EC',
    iconColor: '#ADAC10',
    icon: faClock,
  },
  {
    status: 'IN_PROGRESS',
    label: 'Obavlja:',
    color: '#F1F5FE',
  },
  {
    status: 'DONE',
    label: 'Završen',
    color: '#EDF8F0',
    iconColor: '#01A05D',
    icon: faCheckCircle,
  },
  {
    status: 'ABORTED',
    label: 'Otkazan',
    color: '#FBEFED',
    iconColor: '#D42B20',
    icon: faCancel,
  },
]

export interface ITableTask {
  id: number
  name: string
  status: string
  date: Date
}
