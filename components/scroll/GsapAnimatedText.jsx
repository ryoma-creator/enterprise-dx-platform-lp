'use client'

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import dynamic from 'next/dynamic'

const GsapAnimatedText = ({ 
  text, 
  variant = 'default', 
  duration = 1, 
  stagger = 0.02, 
  ease = 'back.out(3)',
  scrollTrigger = false,
  className = ''
}) => {
  const textRef = useRef(null);

    // textが文字列でない場合の処理を追加
    const processedText = String(text || ''); // 文字列に変換

  const variants = {
    default: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
    },
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    slideIn: {
      initial: { opacity: 0, x: -100 },
      animate: { opacity: 1, x: 0 },
    },
    scaleUp: {
      initial: { opacity: 0, scale: 0.5 },
      animate: { opacity: 1, scale: 1 },
    },
    rotation: {
      initial: { opacity: 0, rotation: 180 },
      animate: { opacity: 1, rotation: 0 },
    },
    bounce: {
      initial: { opacity: 0, y: -100 },
      animate: { opacity: 1, y: 0, ease: 'bounce.out' },
    },
    stagger: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0, stagger: 0.1 },
    },
    wave: {
      initial: { y: 0 },
      animate: { y: -20, ease: 'sine.inOut', repeat: -1, yoyo: true },
    },
    typewriter: {
      initial: { width: 0 },
      animate: { width: '100%' },
    },
    blurIn: {
      initial: { opacity: 0, filter: 'blur(10px)' },
      animate: { opacity: 1, filter: 'blur(0px)' },
    },
    splitLines: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0, stagger: 0.2 },
    },
    letterSpacing: {
      initial: { opacity: 0, letterSpacing: '10px' },
      animate: { opacity: 1, letterSpacing: '0px' },
    },
    flip: {
      initial: { opacity: 0, rotationX: 180 },
      animate: { opacity: 1, rotationX: 0 },
    },
    elastic: {
      initial: { scaleX: 2, opacity: 0 },
      animate: { scaleX: 1, opacity: 1, ease: 'elastic.out(1, 0.3)' },
    },
    glitch: {
      initial: { skewX: 0, opacity: 1 },
      animate: { skewX: 20, opacity: 0.3, ease: 'power4.inOut', yoyo: true, repeat: 5 },
    },
    colorChange: {
      initial: { color: '#ff0000' },
      animate: { color: '#00ff00', ease: 'none' },
    },
    reveal: {
      initial: { clipPath: 'inset(0 100% 0 0)' },
      animate: { clipPath: 'inset(0 0% 0 0)' },
    },
    shatter: {
      initial: { opacity: 0, scale: 0, rotation: Math.random() * 360 },
      animate: { opacity: 1, scale: 1, rotation: 0 },
    },
    swing: {
      initial: { opacity: 0, rotation: -45 },
      animate: { opacity: 1, rotation: 0, ease: 'elastic.out(1, 0.3)' },
    },
    spiral: {
      initial: { opacity: 0, scale: 0, rotation: 360 },
      animate: { opacity: 1, scale: 1, rotation: 0 },
    },
    letterShuffle: {
      initial: { opacity: 0, x: () => Math.random() * 100 - 50 },
      animate: { opacity: 1, x: 0 },
    },
    spotlight: {
      initial: { opacity: 0, textShadow: '0 0 0 rgba(255,255,255,0)' },
      animate: { opacity: 1, textShadow: '0 0 10px rgba(255,255,255,1)' },
    },
    perspectiveTilt: {
      initial: { opacity: 0, rotationY: 90, transformPerspective: 500 },
      animate: { opacity: 1, rotationY: 0 },
    },
    rubberBand: {
      initial: { scaleX: 1 },
      animate: { scaleX: 1.25, scaleY: 0.75, ease: 'elastic.out(1, 0.3)', yoyo: true, repeat: 1 },
    },
    neonGlow: {
      initial: { opacity: 0, textShadow: '0 0 0 #fff, 0 0 0 #fff' },
      animate: { opacity: 1, textShadow: '0 0 5px #fff, 0 0 10px #ff00de, 0 0 15px #ff00de' },
    },
    smokeEffect: {
      initial: { opacity: 0, filter: 'blur(10px)' },
      animate: { opacity: 1, filter: 'blur(0px)', ease: 'power2.inOut' },
    },
    magneticLetters: {
      initial: { opacity: 0, x: () => Math.random() * 200 - 100, y: () => Math.random() * 200 - 100 },
      animate: { opacity: 1, x: 0, y: 0 },
    },
    liquidFill: {
      initial: { backgroundSize: '200% 100%', backgroundPosition: '100% 0' },
      animate: { backgroundPosition: '0 0' },
    },
    pixelFormation: {
      initial: { opacity: 0, scale: 0, rotation: () => Math.random() * 360 },
      animate: { opacity: 1, scale: 1, rotation: 0 },
    },
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      
      // 文字要素の取得方法を修正
      const element = textRef.current;
      if (!element) return;

      const chars = element.querySelectorAll('span');
      
      const animation = gsap.fromTo(chars, 
        variants[variant].initial,
        {
          ...variants[variant].animate,
          duration,
          stagger: { each: stagger },
          ease,
          scrollTrigger: scrollTrigger ? {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none none'
          } : null
        }
      );

      return () => {
        if (animation) animation.kill();
      };
    }
  }, [variant, duration, stagger, ease, scrollTrigger]);
  

  return (
    <span ref={textRef} className={`inline-block ${className}`}>
      {processedText.split('').map((char, index) => (
        <span key={index} className="inline-block">
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     gsap.registerPlugin(ScrollTrigger);
      
  //     const chars = textRef.current.children;
      
  //     const animation = gsap.fromTo(chars, 
  //       variants[variant].initial,
  //       {
  //         ...variants[variant].animate,
  //         duration,
  //         stagger: { each: stagger },
  //         ease,
  //         scrollTrigger: scrollTrigger ? {
  //           trigger: textRef.current,
  //           start: 'top 80%',
  //           end: 'bottom 20%',
  //           toggleActions: 'play none none none'  // reverseをnoneに変更
  //         } : null
  //       }
  //     );
  //     // toggleActions🔺 none noneというのは、scroll時に、再び現れるかどうか。ここで操作。

  //     return () => {
  //       if (animation) animation.kill();
  //     };
  //   }
  // }, [variant, duration, stagger, ease, scrollTrigger]);

  // return (
  //   <span ref={textRef} className={`inline-block ${className}`}>
  //     {text.split('').map((char, index) => (
  //       <span key={index} className="inline-block">
  //         {char === ' ' ? '\u00A0' : char}
  //       </span>
  //     ))}
  //   </span>
  );
};

export default GsapAnimatedText;