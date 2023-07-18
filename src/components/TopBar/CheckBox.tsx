import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const CheckBox = ({ text, active, name, onChange }: any) => {


    const handleChange = () => {
        onChange(name)
    }

    return <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <div className="check-box" onClick={handleChange}>
            {active && <FontAwesomeIcon icon={faCheck} />}
        </div>
        <p>{text}</p>
    </div>
}