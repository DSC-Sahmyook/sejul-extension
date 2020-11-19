import React, { useState } from 'react'
import './TextInput.scss';

interface ITextInputProps {
    className?: string;
    id: string;
    label: string;
    placeholder: string;
    value: string;
    setValue: Function;
    type?: string;
}

const TextInput = (props: ITextInputProps) => {
    const { className, id, label, type, value, setValue, placeholder } = props;
    const [focused, setFocused] = useState(false);
    return (
        <div className={`input-wrapper ${className || ''} ${focused ? 'focused' : ''}`}>
            <input type={type || "text"}
                className={`input-text `}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                id={id}
                required />
            <label htmlFor={id} className="input-label">{
                label
            }</label>
        </div>
    )
}

export default TextInput;
