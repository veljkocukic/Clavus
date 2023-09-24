/*eslint-disable*/
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import customFetch from 'utils/axios';
import { useOnClickOutside } from 'utils/hooks/useClickOutside';
import { IInput } from './Input';

interface ISelect extends Omit<IInput, 'type' | 'onChange'> {
    options: ISelectValue[]
    onChange: any
}
export const AsyncSelect = ({ name, value, className, invalid, labelText, customInvalidMessage, onChange, link }: any) => {
    const [focused, setFocused] = useState(false);
    const [wasFocused, setWasFocused] = useState(false);
    const [query, setQuery] = useState('');
    const [options, setOptions] = useState([])
    const selectRef = useRef(null)

    let labelCName = 'label'
    let afterCName = 'input-after'

    if (value || focused) {
        labelCName = 'active-label'
    }

    if (invalid && wasFocused) {
        afterCName += ' invalid-background'
    }


    // useEffect(() => {
    //     axios.get(link).then(res => console.log(res.data))
    // }, [])

    const handleSelect = (v: ISelectValue) => {
        onChange(v, name)
        setFocused(false)
    }

    const handleInput = (e) => {
        setQuery(e.target.value)
    }

    useEffect(() => {
        if (query) {
            const service = new google.maps.places.AutocompleteService();
            service.getQueryPredictions({ input: query }, (predictions, status) => {
                if (status === 'OK' && predictions) {
                    setOptions(predictions.map(p => ({ label: p.description, value: p.place_id })))
                }
            });
        }

    }, [query])

    const handleBlur = () => {
        setFocused(false)
        setQuery('')
        setOptions([])
    }

    useOnClickOutside(selectRef, handleBlur)

    return <div className={'input ' + className} tabIndex={1} ref={selectRef} >
        <label className={labelCName} >
            {labelText}
        </label>
        <div className='input-container select-input' >
            {/* <select onChange={(v) => onChange(options.find(o => o.value == v.target.value), name)} name={name} value={value} onFocus={() => setFocused(true)} onBlur={() => {
                setFocused(false);
                setWasFocused(true)
            }}><option hidden></option>
                {options.map((o: ISelectValue, i: number) => <option key={i} value={o.value} >{o.label}</option>)}
            </select> */}
            <input type='text' value={query || value?.label} onChange={handleInput} onFocus={() => setFocused(true)} />
            {focused && <div className='options-container' >
                {options.map((o: ISelectValue, i: number) => <div className='single-option' onClick={() => handleSelect(o)} key={i}  >{o.label}</div>)}
            </div>}
            {invalid && wasFocused && <p className="input-invalid" >{customInvalidMessage ?? 'Polje nije validno'}</p>}
            <div className={afterCName} ></div>
        </div>
    </div>

}

export interface ISelectValue {
    value: string | number
    label: string
}