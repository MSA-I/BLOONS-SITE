// ShimmerText component - Gold shimmer text effect
// Enhanced with CSS animation for continuous shimmer

import { ReactNode, ElementType } from 'react'

interface ShimmerTextProps {
  children: ReactNode
  className?: string
  as?: ElementType
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
        bg-gradient-to-r from-[#C9A96E] via-[#F5EDD6] to-[#C9A96E]
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
