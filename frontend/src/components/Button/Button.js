import React from 'react'
import './Button.css'

const STYLES = [
    'btn--primary',
    'btn--outline',
    'btn--down',
    'btn--up'
]

const SIZES = [
    'btn--medium',
    'btn--large',
    'btn--small'
]

export const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize,
    href
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0]

    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]

    return(
        <button className={`btn ${checkButtonStyle} ${checkButtonSize}`} onClick={onClick} type={type} href = {href}>
            {children}
        </button>
    )
}