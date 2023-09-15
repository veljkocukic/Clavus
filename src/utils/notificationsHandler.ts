export const handleNotification = (data:INotificationData,setNotification,localUser, navigate) =>{

    const closeNotification = () =>{
        setNotification(prev=>{
            const copy = {...prev}
            copy.on = false
            return copy
        })
    }

    const openNotification = (text:string,onClick:any, type?:string) =>{
        setNotification(prev=>{
            const copy = {...prev}
            copy.on = true
            copy.text = text
            copy.onClick = onClick
            if(type){
                copy.type = type
            }
            return copy
        })
    }
    const isAdmin = localUser.role === 'ADMIN'
    console.log(data)

        if(isAdmin){
            switch(data.type){
                case 'offer-received' :
                    console.log(localUser.id)
                    if(localUser.id === data.receiverId){
                        const timer = setTimeout(() => {
                            closeNotification()
                            return () => clearTimeout(timer);
                          }, 5000);
                        openNotification('Na vaš oglas je postavljena ponuda',()=>navigate('job-offer/'+data.id))
                    }
                    break;
            }

        }else{
            switch(data.type){
                case 'job-created':
                    if(localUser.categories.includes(data.category)){
                        const timer = setTimeout(() => {
                            closeNotification()
                            return () => clearTimeout(timer);
                          }, 5000);
                        openNotification('Postavljen je novi oglas u vašoj kategoriji',()=>navigate('worker-task/'+data.id))
                    }
                    break;
                case 'offer-accepted':
                    if(localUser.id === data.receiverId){
                        const timer = setTimeout(() => {
                            closeNotification()
                            return () => clearTimeout(timer);
                          }, 5000);
                          openNotification('Vaša ponuda za posao je prihvaćena',()=>navigate('worker-task/'+data.id))
                    }
                    break;
            }
        }

}

export interface INotificationData{
    category: string,
    id: number,
    type: string,
    receiverId:number
}