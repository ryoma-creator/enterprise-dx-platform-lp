'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const variants = {
  default:       { initial: { opacity: 0, y: 50 },            animate: { opacity: 1, y: 0 } },
  fadeIn:        { initial: { opacity: 0 },                   animate: { opacity: 1 } },
  slideIn:       { initial: { opacity: 0, x: -100 },          animate: { opacity: 1, x: 0 } },
  scaleUp:       { initial: { opacity: 0, scale: 0.5 },       animate: { opacity: 1, scale: 1 } },
  blurIn:        { initial: { opacity: 0, filter: 'blur(10px)' }, animate: { opacity: 1, filter: 'blur(0px)' } },
  flip:          { initial: { opacity: 0, rotationX: 180 },   animate: { opacity: 1, rotationX: 0 } },
  elastic:       { initial: { scaleX: 2, opacity: 0 },        animate: { scaleX: 1, opacity: 1, ease: 'elastic.out(1, 0.3)' } },
  reveal:        { initial: { clipPath: 'inset(0 100% 0 0)' }, animate: { clipPath: 'inset(0 0% 0 0)' } },
  swing:         { initial: { opacity: 0, rotation: -45 },    animate: { opacity: 1, rotation: 0, ease: 'elastic.out(1, 0.3)' } },
  spiral:        { initial: { opacity: 0, scale: 0, rotation: 360 }, animate: { opacity: 1, scale: 1, rotation: 0 } },
  letterShuffle: { initial: { opacity: 0, x: () => Math.random() * 100 - 50 }, animate: { opacity: 1, x: 0 } },
  magneticLetters: { initial: { opacity: 0, x: () => Math.random() * 200 - 100, y: () => Math.random() * 200 - 100 }, animate: { opacity: 1, x: 0, y: 0 } },
  neonGlow:      { initial: { opacity: 0, textShadow: '0 0 0 #fff, 0 0 0 #fff' }, animate: { opacity: 1, textShadow: '0 0 5px #fff, 0 0 10px #ff00de, 0 0 15px #ff00de' } },
}

const GsapAnimatedText = ({
  text,
  variant = 'default',
  duration = 1,
  stagger = 0.02,
  ease = 'back.out(3)',
  scrollTrigger = false,
  className = '',
}) => {
  const textRef = useRef(null)
  const processedText = String(text || '')

  useEffect(() => {
    const element = textRef.current
    if (!element) return

    const chars = element.querySelectorAll('span')
    const v = variants[variant] ?? variants.default

    const animation = gsap.fromTo(chars,
      v.initial,
      {
        ...v.animate,
        duration,
        stagger: { each: stagger },
        ease,
        scrollTrigger: scrollTrigger ? {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none none',
        } : null,
      }
    )

    return () => { animation.kill() }
  }, [variant, duration, stagger, ease, scrollTrigger])

  return (
    <span ref={textRef} className={`inline-block ${className}`}>
      {processedText.split('').map((char, index) => (
        <span key={index} className="inline-block">
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </span>
  )
}

export default GsapAnimatedText
