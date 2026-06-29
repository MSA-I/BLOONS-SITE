// GoldText — static metallic foil text (no animation; anti-slop).
// Renders children with the .text-foil gradient clip.

import { ReactNode, ElementType } from 'react'

interface GoldTextProps {
  children: ReactNode
  className?: string
  as?: ElementType
}

export function GoldText({
  children,
  className = '',
  as: Component = 'span',
}: GoldTextProps) {
  return (
    <Component className={`text-foil ${className}`.trim()}>{children}</Component>
  )
}
