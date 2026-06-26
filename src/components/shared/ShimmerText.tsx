// ShimmerText component - Gold shimmer text effect
// Enhanced with CSS animation for continuous shimmer

import { ReactNode } from 'react'

interface ShimmerTextProps {
  children: ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements
}

export default function ShimmerText({
  children,
  className = '',
  as: Component = 'span',
}: ShimmerTextProps) {
  return (
    <Component
      className={`
        inline-block
        bg-gradient-to-r from-[#D4AF6A] via-[#F5ECD7] to-[#D4AF6A]
        bg-[length:200%_100%]
        bg-clip-text text-transparent
        animate-shimmer
        ${className}
      `}
    >
      {children}
    </Component>
  )
}
