import React from 'react'
import './Button.scss';

interface IbuttonProps {
    className?: string;
    onClick: Function;
    text: string;
}

const Button = (props: IbuttonProps) => {
    const { className, onClick, text } = props;
    return (
        <button className={`btn ${className}`} type='button' onClick={() => onClick()}>{text}</button>
    )
}

export default Button;
