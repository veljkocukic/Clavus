import { Home } from 'views'
import { ViewJobOffer } from 'views/JobOffer/ViewJobOffer'
import { ViewProfile } from 'views/Profile/ViewProfile'
import { CreateTask } from 'views/Tasks/CreateTask'
import { Tasks } from 'views/Tasks/Tasks'
import { ViewTask } from 'views/Tasks/ViewTask'
import { WorkerHome } from 'views/WorkerHome'
import { Messages } from 'views/Messages/Messages'
import { WorkerMap } from 'views/WorkerMap/WorkerMap'

export const adminRoutes = [
  {
    path: '/tasks/create',
    element: CreateTask,
  },
  {
    path: '/tasks',
    element: Tasks,
  },
  {
    path: '/tasks/:id',
    element: ViewTask,
  },
  {
    path: '/job-offer/:id',
    element: ViewJobOffer,
  },
  {
    path: '/overview',
    element: Home,
  },
  {
    path: '/profile/:id',
    element: ViewProfile,
  }, 
  {
    path: '/messages',
    element: Messages,
  },
  {
    path: '/messages/:conversationId',
    element: Messages,
  },
]

export const workerRoutes = [
  {
    path: '/worker-overview',
    element: WorkerHome,
  },
  {
    path: '/tasks/:id',
    element: ViewTask,
  },
  {
    path: '/profile/:id',
    element: ViewProfile,
  },
  {
    path: '/messages/:conversationId',
    element: Messages,
  },
  {
    path: '/messages',
    element: Messages,
  },
  {
    path: '/map',
    element: WorkerMap,
  },

]


export const cities = [
  {label:'Beograd',value:'BEOGRAD'},
  {label:'Novi Sad',value:'NOVI_SAD'},
  {label:'Niš',value:'NIS'},
  {label:'Kragujevac',value:'KRAGUJEVAC'},
  {label:'Kraljevo',value:'KRALJEVO'},
  {label:'Kruševac',value:'KRUSEVAC'},
  {label:'Čačak',value:'CACAK'},
  {label:'Vranje',value:'VRANJE'},
  {label:'Leskovac',value:'LESKOVAC'},
  {label:'Subotica',value:'SUBOTICA'},
  {label:'Zrenjanin',value:'ZRENJANIN'},
  {label:'Zaječar',value:'ZAJECAR'},
  {label:'Negotin',value:'ZRENJANIN'},
  {label:'Zrenjanin',value:'NEGOTIN'},
  {label:'Novi Pazar',value:'NOVI_PAZAR'},
  {label:'Sjenica',value:'SJENICA'},
  {label:'Smederevo',value:'SMEDEREVO'},
  {label:'Jagodina',value:'JAGODINA'},
  {label:'Vrnjačka Banja',value:'VRNJACKA_BANJA'},
  {label:'Soko Banja',value:'Soko Banja'},
  {label:'Požarevac',value:'POZAREVAC'},
  {label:'Valjevo',value:'VALJEVO'},
]
/*eslint-disable*/

export const cityPolygons = {
  Novi_Beograd:[
    {
        "lat": 44.80196116618229,
        "lng": 20.361225454340932
    },
    {
        "lat": 44.78843958785019,
        "lng": 20.372469274531362
    },
    {
        "lat": 44.7934700495871,
        "lng": 20.384858096419407
    },
    {
        "lat": 44.79511459175928,
        "lng": 20.396445239363743
    },
    {
        "lat": 44.7968808996693,
        "lng": 20.409868700015252
    },
    {
        "lat": 44.797002712015015,
        "lng": 20.417078477847284
    },
    {
        "lat": 44.79748995882649,
        "lng": 20.427463991152948
    },
    {
        "lat": 44.80073108353223,
        "lng": 20.43704708487907
    },
    {
        "lat": 44.80390748244008,
        "lng": 20.441939434122233
    },
    {
        "lat": 44.80774398052959,
        "lng": 20.445587238382487
    },
    {
        "lat": 44.81359238622347,
        "lng": 20.44764816306176
    },
    {
        "lat": 44.819285453172206,
        "lng": 20.445886208365856
    },
    {
        "lat": 44.82364370727744,
        "lng": 20.442827456926484
    },
    {
        "lat": 44.82525422930407,
        "lng": 20.42754647063923
    },
    {
        "lat": 44.83572399878919,
        "lng": 20.421194999691963
    },
    {
        "lat": 44.84424450014886,
        "lng": 20.41947838592243
    },
    {
        "lat": 44.85032980109943,
        "lng": 20.411581962582588
    },
    {
        "lat": 44.85531926816551,
        "lng": 20.398192375180244
    },
    {
        "lat": 44.8642018834269,
        "lng": 20.378451316830635
    },
    {
        "lat": 44.82902843519849,
        "lng": 20.361456840512275
    }
],
Zemun:[
  {
      "lat": 44.831811361718756,
      "lng": 20.363542718264437
  },
  {
      "lat": 44.83412435085392,
      "lng": 20.34877983984647
  },
  {
      "lat": 44.86057469804951,
      "lng": 20.316280866279914
  },
  {
      "lat": 44.87651230183182,
      "lng": 20.356964612617805
  },
  {
      "lat": 44.860304454493594,
      "lng": 20.379222725717522
  },
  {
      "lat": 44.85616723645018,
      "lng": 20.395358895151116
  },
  {
      "lat": 44.849960852011804,
      "lng": 20.410636757699944
  },
  {
      "lat": 44.84460578681742,
      "lng": 20.418361519662835
  },
  {
      "lat": 44.83462456415615,
      "lng": 20.421108101694085
  }
],
Kruševac:[
  {
      "lat": 43.58641046485714,
      "lng": 21.287858100317568
  },
  {
      "lat": 43.60779321670484,
      "lng": 21.307084174536318
  },
  {
      "lat": 43.60219962603105,
      "lng": 21.327855201147646
  },
  {
      "lat": 43.60003142998736,
      "lng": 21.34343243315306
  },
  {
      "lat": 43.579018987836896,
      "lng": 21.352530486131574
  },
  {
      "lat": 43.57118407029078,
      "lng": 21.353045470262433
  },
  {
      "lat": 43.558621202371214,
      "lng": 21.353217131639386
  },
  {
      "lat": 43.54904181034657,
      "lng": 21.345835692430402
  },
  {
      "lat": 43.54518474207448,
      "lng": 21.32815457060423
  },
  {
      "lat": 43.5613578918364,
      "lng": 21.31047344877806
  }
]
}