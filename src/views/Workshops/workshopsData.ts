
export const workshopsInitialState: IWorkshopState = {
    name: '',
    location: null,
    type:null,
    services:[],
    days:{
        monday:{
            checked:true,
            from:null,
            to:null,
        },
        tuesday:{
            checked:true,
            from:null,
            to:null,
        },
        wednesday:{
            checked:true,
            from:null,
            to:null,
        },
        thursday:{
            checked:true,
            from:null,
            to:null,
        },
        friday:{
            checked:true,
            from:null,
            to:null,
        },
        saturday:{
            checked:false,
            from:null,
            to:null,
        },
        sunday:{
            checked:false,
            from:null,
            to:null,
        },
    }
  }

  export interface IWorkshopState {
    name: string
    type:number
    location: {
      value:string | number,
      label:string
      lat:number,
      lng:number
    }
    services:IService[]
    days:{
        monday:{
            checked:boolean
            from:number
            to:number
        }
        tuesday:{
            checked:boolean
            from:number
            to:number
        }
        wednesday:{
            checked:boolean
            from:number
            to:number
        }
        thursday:{
            checked:boolean
            from:number
            to:number
        }
        friday:{
            checked:boolean
            from:number
            to:number
        }
        saturday:{
            checked:boolean
            from:number
            to:number
        }
        sunday:{
            checked:boolean
            from:number
            to:number
        }
    }
  }

  export interface IService {
      id: number | string
      name: string
      price: number
  }

export const days = [
    {
    label:'Ponedeljak',
    value:'monday'
    },
    {
    label:'Utorak',
    value:'tuesday'
    },
    {
    label:'Sreda',
    value:'wednesday'
    },
    {
    label:'Cetvrtak',
    value:'thursday'
    },
    {
    label:'Petak',
    value:'friday'
    },
    {
    label:'Subota',
    value:'saturday'
    },
    {
    label:'Nedelja',
    value:'sunday'
    },
]


export const workshopTypes = [
    {
        label:'Mehanicarska radnja',
        value:1
        },
        {
        label:'Autoperionica',
        value:2
        },
]

