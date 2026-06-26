// FloatingBalloons component - Decorative animated balloons with parallax
// Enhanced with GSAP ScrollTrigger for parallax effect

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface BalloonProps {
  color: string
  size: number
  left: string
  top: string
  delay: number
  parallaxSpeed: number
}

function BalloonSVG({ color, size }: { color: string; size: number }) {
  return (
    <svg
      width={size}
      height={size * 1.4}
      viewBox="0 0 100 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Balloon body */}
      <ellipse
        cx="50"
        cy="45"
        rx="45"
        ry="50"
        fill={color}
        opacity="0.8"
      />
      {/* Highlight */}
      <ellipse
        cx="35"
        cy="30"
        rx="15"
        ry="20"
        fill="white"
        opacity="0.3"
      />
      {/* Knot */}
      <path
        d="M45 95 L50 105 L55 95"
        fill={color}
      />
      {/* String */}
      <path
        d="M50 105 Q45 120 50 135 Q55 150 50 160"
        stroke="#1A0A00"
        strokeWidth="1.5"
        strokeOpacity="0.3"
        fill="none"
      />
    </svg>
  )
}

function Balloon({ color, size, left, top, delay, parallaxSpeed }: BalloonProps) {
  const balloonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!balloonRef.current) return

    const ctx = gsap.context(() => {
      // Gentle floating animation
      gsap.to(balloonRef.current, {
        y: -25,
        duration: 2 + Math.random() * 1.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay,
      })

      // Gentle horizontal sway
      gsap.to(balloonRef.current, {
        x: 15,
        rotation: 5,
        duration: 3 + Math.random() * 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: delay + 0.5,
      })

      // Parallax scroll effect
      gsap.to(balloonRef.current, {
        y: `-=${200 * parallaxSpeed}`,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
        },
      })
    }, balloonRef)

    return () => ctx.revert()
  }, [delay, parallaxSpeed])

  return (
    <div
      ref={balloonRef}
      className="absolute pointer-events-none"
      style={{
        left,
        top,
        transform: 'translateZ(0)',
        willChange: 'transform',
      }}
    >
      <BalloonSVG color={color} size={size} />
    </div>
  )
}

interface FloatingBalloonsProps {
  variant?: 'hero' | 'section'
}

export default function FloatingBalloons({ variant = 'hero' }: FloatingBalloonsProps) {
  const balloons = variant === 'hero'
    ? [
        { color: '#C9A96E', size: 70, left: '5%', top: '15%', delay: 0, parallaxSpeed: 0.3 },
        { color: '#E8A598', size: 50, left: '15%', top: '60%', delay: 0.5, parallaxSpeed: 0.5 },
        { color: '#C9A96E', size: 55, left: '80%', top: '20%', delay: 1, parallaxSpeed: 0.4 },
        { color: '#E8A598', size: 65, left: '88%', top: '55%', delay: 1.5, parallaxSpeed: 0.7 },
        { color: '#C9A96E', size: 45, left: '92%', top: '75%', delay: 2, parallaxSpeed: 0.35 },
      ]
    : [
        { color: '#C9A96E', size: 40, left: '3%', top: '20%', delay: 0, parallaxSpeed: 0.25 },
        { color: '#E8A598', size: 35, left: '95%', top: '40%', delay: 0.5, parallaxSpeed: 0.4 },
      ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {balloons.map((balloon, index) => (
        <Balloon key={index} {...balloon} />
      ))}
    </div>
  )
}
