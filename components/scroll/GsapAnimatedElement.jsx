'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const variants = {
  default:          { initial: { opacity: 0, y: 50 },            animate: { opacity: 1, y: 0 } },
  fadeIn:           { initial: { opacity: 0 },                   animate: { opacity: 1 } },
  slideIn:          { initial: { opacity: 0, x: -100 },          animate: { opacity: 1, x: 0 } },
  scaleUp:          { initial: { opacity: 0, scale: 0.5 },       animate: { opacity: 1, scale: 1 } },
  rotation:         { initial: { opacity: 0, rotation: 180 },    animate: { opacity: 1, rotation: 0 } },
  bounce:           { initial: { opacity: 0, y: -100 },          animate: { opacity: 1, y: 0, ease: 'bounce.out' } },
  stagger:          { initial: { opacity: 0, y: 50 },            animate: { opacity: 1, y: 0, stagger: 0.1 } },
  wave:             { initial: { y: 0 },                         animate: { y: -20, ease: 'sine.inOut', repeat: -1, yoyo: true } },
  blurIn:           { initial: { opacity: 0, filter: 'blur(10px)' }, animate: { opacity: 1, filter: 'blur(0px)' } },
  flip:             { initial: { opacity: 0, rotationX: 180 },   animate: { opacity: 1, rotationX: 0 } },
  elastic:          { initial: { scaleX: 2, opacity: 0 },        animate: { scaleX: 1, opacity: 1, ease: 'elastic.out(1, 0.3)' } },
  glitch:           { initial: { skewX: 0, opacity: 1 },         animate: { skewX: 20, opacity: 0.3, ease: 'power4.inOut', yoyo: true, repeat: 5 } },
  reveal:           { initial: { clipPath: 'inset(0 100% 0 0)' }, animate: { clipPath: 'inset(0 0% 0 0)' } },
  swing:            { initial: { opacity: 0, rotation: -45 },    animate: { opacity: 1, rotation: 0, ease: 'elastic.out(1, 0.3)' } },
  spiral:           { initial: { opacity: 0, scale: 0, rotation: 360 }, animate: { opacity: 1, scale: 1, rotation: 0 } },
  perspectiveTilt:  { initial: { opacity: 0, rotationY: 90, transformPerspective: 500 }, animate: { opacity: 1, rotationY: 0 } },
  smokeEffect:      { initial: { opacity: 0, filter: 'blur(10px)' }, animate: { opacity: 1, filter: 'blur(0px)', ease: 'power2.inOut' } },
}

const GsapAnimatedElement = ({
  children,
  variant = 'default',
  duration = 1,
  delay = 0,
  stagger = 0.02,
  ease = 'back.out(3)',
  scrollTrigger = false,
  className = '',
}) => {
  const elementRef = useRef(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const v = variants[variant] ?? variants.default
    const animation = gsap.fromTo(element,
      v.initial,
      {
        ...v.animate,
        duration,
        delay,
        stagger: { each: stagger },
        ease,
        scrollTrigger: scrollTrigger ? {
          trigger: element,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        } : null,
      }
    )

    return () => { animation.kill() }
  }, [variant, duration, delay, stagger, ease, scrollTrigger])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

export default GsapAnimatedElement
