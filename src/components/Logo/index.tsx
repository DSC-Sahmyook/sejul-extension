import React from 'react'
import LogoImg from './logo300.png';

interface ILogoProps {
    className?: string;
    width?: Number;
    height?: Number;
}
const Logo = (props: ILogoProps) => {
    const { className, width = 100, height = 100 } = props;

    return (
        <img width={`${width}px`} height={`${height}px`} className={`${className || ""}`} src={LogoImg} alt="로고" />
    )
}

export default Logo;
