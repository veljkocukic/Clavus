import React, { useState } from 'react';
import '../sass/components/_inputs.scss';

export interface IInput {
  labelText: string;
  value: string | number;
  type: string;
  name: string;
  className?: string;
  pattern?: () => any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  invalid?: boolean
  customInvalidMessage?: string
}

export const Input = ({ labelText, value, type, onChange, name, className, invalid, customInvalidMessage }: IInput) => {
  const [focused, setFocused] = useState(false);
  const [wasFocused, setWasFocused] = useState(false);

  const parsedValue = value || ''
  let labelCName = 'label'
  let afterCName = 'input-after'

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
      <div className="input-container" >
        <input
          autoComplete="off"
          name={name}
          required
          type={type}
          value={parsedValue}
          onChange={onChange}
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
            setWasFocused(true)
          }}
        />
        {invalid && wasFocused && <p className="input-invalid" >{customInvalidMessage ?? 'Polje nije validno'}</p>}
        <div className={afterCName} ></div>
      </div>

    </div>
  );
};
