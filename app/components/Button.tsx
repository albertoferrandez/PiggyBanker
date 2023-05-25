'use client'

interface ButtonProps {
    type?: 'button' | 'submit' | 'reset' | undefined
    children?: React.ReactNode
    onClick?: () => void
    disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({ children, type, onClick, disabled }) => {
  return (
    <button 
        type={type} 
        onClick={onClick} 
        disabled={disabled}
        className={`inline-flex w-full justify-center rounded-md
        px-4 py-2 bg-gray-500 text-white
        ${disabled && "opacity-50 cursor-default"}`}
    >
      {children}
    </button>
  )
}

export default Button
