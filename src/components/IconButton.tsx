import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'



export const IconButton = ({ icon, className, options }: { icon: any, className?: string, options?: any }) => {

    const [openOptions, setOpenOptions] = useState(false)

    let cName = 'table-options'
    if (openOptions) {
        cName += ' active-options'
    }



    return <div className={'icon-button ' + className} onClick={() => setOpenOptions(true)} tabIndex={1} onBlur={() => setOpenOptions(false)}   >
        <FontAwesomeIcon icon={icon} />
        <div className={cName} onClick={e => e.stopPropagation()} >
            {options?.map((o: ITableOptions, i: string) => <div key={i} onClick={o.onClick}>
                <FontAwesomeIcon icon={o.icon} color='#8fadf0' />
                <p>{o.name}</p>
            </div>)}
        </div>
    </div >
}

interface ITableOptions {
    name: string,
    icon: IconProp,
    onClick: any
}