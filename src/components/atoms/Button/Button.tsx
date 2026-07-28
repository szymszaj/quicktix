import React from 'react'
import Link from 'next/link'
import { cn } from '@/utils/cn'
import { ButtonVariant } from './types'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string
  variant?: ButtonVariant
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  [ButtonVariant.PRIMARY]:
    'bg-orange-500 text-white hover:bg-orange-600 border border-orange-500',
  [ButtonVariant.SECONDARY]:
    'bg-white text-gray-900 border border-gray-300 hover:border-gray-500',
  [ButtonVariant.GHOST]:
    'bg-transparent text-gray-500 border border-gray-200 hover:border-gray-400 hover:text-gray-800',
}

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-13 px-8 text-base',
}

const Button = ({
  children,
  className,
  href,
  variant = ButtonVariant.PRIMARY,
  size = 'md',
  fullWidth,
  disabled,
  type = 'button',
  ...rest
}: ButtonProps) => {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-xl font-semibold cursor-pointer',
    'transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-orange-400',
    sizeClasses[size],
    disabled ? 'opacity-50 pointer-events-none' : variantClasses[variant],
    fullWidth && 'w-full',
    className
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={classes} disabled={disabled} {...rest}>
      {children}
    </button>
  )
}

export default Button
