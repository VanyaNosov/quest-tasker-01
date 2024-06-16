import { FC } from 'react'

interface ButtonProps {
    bgColor: string
    color: string
    className?: string
    children: React.ReactNode
    onClick?: () => void
    disabled?: boolean
    type?: "submit" | "button" | "reset"
}

const Button: FC<ButtonProps> = ({ bgColor, children, className, type, color, disabled, onClick }) => {
    return <button
        className={`px-3 py-2 ${bgColor} ${color} text-base border border-primary rounded-md transition disabled:bg-content/20 disabled:border-none disabled:text-black disabled:cursor-not-allowed ${className}`}
        disabled={disabled}
        onClick={onClick}
        type={type}
    >
        {children}
    </button>
}

export default Button