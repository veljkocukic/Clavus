import { useState } from 'react';
import { IInput } from './Input';

interface ISelect extends Omit<IInput, 'type' | 'onChange'> {
    options: any
    onChange: any
}
export const Select = ({ name, value, options, className, invalid, labelText, customInvalidMessage, onChange }: ISelect) => {


    const [focused, setFocused] = useState(false);
    const [wasFocused, setWasFocused] = useState(false);

    let labelCName = 'label'
    let afterCName = 'input-after'

    if (value || focused) {
        labelCName = 'active-label'
    }

    if (invalid && wasFocused) {
        afterCName += ' invalid-background'
    }

    return <div className={'input ' + className}>
        <label
            className={labelCName}
        >
            {labelText}
        </label>
        <div className='input-container' >
            <select onChange={(v) => onChange(options.find(o => o.value == v.target.value), name)} name={name} value={value} onFocus={() => setFocused(true)} onBlur={() => {
                setFocused(false);
                setWasFocused(true)
            }}><option hidden></option>
                {options.map((o: ISelectValue, i: number) => <option key={i} value={o.value} >{o.label}</option>)}
            </select>
            {invalid && wasFocused && <p className="input-invalid" >{customInvalidMessage ?? 'Polje nije validno'}</p>}
            <div className={afterCName} ></div>
        </div>
    </div>

}

export interface ISelectValue {
    value: string | number
    label: string
}