import { useState } from 'react';
import { IInput } from './Input'


interface ITextArea extends Omit<IInput, 'type'> {
    onChange: any
}


export const TextArea = ({ labelText, value, onChange, name, className, invalid, customInvalidMessage }: ITextArea) => {
    const [focused, setFocused] = useState(false);
    const [wasFocused, setWasFocused] = useState(false);

    let labelCName = 'label'
    let afterCName = 'input-after h100 '

    if (value || focused) {
        labelCName = 'active-label'
    }

    if (invalid && wasFocused) {
        afterCName += ' invalid-background'
    }


    return (
        <div
            className={'input ' + className}
        >
            <label
                className={labelCName}
            >
                {labelText}
            </label>
            <div className='input-container h100' >
                <textarea autoComplete="off"
                    name={name}
                    required
                    value={value}
                    className='h100'
                    onChange={onChange}
                    onFocus={() => {
                        setFocused(true);
                    }}
                    onBlur={() => {
                        setFocused(false);
                        setWasFocused(true)
                    }}></textarea>
                {invalid && wasFocused && <p className="input-invalid" >{customInvalidMessage ?? 'Polje nije validno'}</p>}
                <div className={afterCName} ></div>
            </div>

        </div>
    );
}