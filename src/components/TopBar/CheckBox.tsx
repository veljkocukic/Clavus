import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface ICheckBox {
    text: string
    active: boolean
    name: string
    onChange: any
}
export const CheckBox = ({ text, active, name, onChange }: ICheckBox) => {


    const handleChange = () => {
        onChange(name)
    }

    return <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }} onClick={handleChange}>
        <div className="check-box" >
            {active && <FontAwesomeIcon icon={faCheck as IconProp} />}
        </div>
        <p>{text}</p>
    </div>
}