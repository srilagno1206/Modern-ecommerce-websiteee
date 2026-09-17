import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ringPos = useRef({ x: -100, y: -100 });
  const reqRef = useRef();

  useEffect(() => {
    // Check if touch device
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    setIsVisible(true);

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check hovered element
      const target = e.target.closest('[data-cursor], button, a, input, select, textarea, .interactive-item');
      if (target) {
        setIsHovered(true);
        const text = target.getAttribute('data-cursor');
        if (text) {
          setCursorText(text);
        } else if (target.tagName.toLowerCase() === 'button' || target.closest('button')) {
          setCursorText('SELECT');
        } else if (target.tagName.toLowerCase() === 'a' || target.closest('a')) {
          setCursorText('VIEW');
        } else {
          setCursorText('');
        }
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth lerp for outer ring
    const animateRing = () => {
      ringPos.current.x += (position.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (position.y - ringPos.current.y) * 0.15;
      const ring = document.getElementById('custom-cursor-ring-el');
      if (ring) {
        ring.style.left = `${ringPos.current.x}px`;
        ring.style.top = `${ringPos.current.y}px`;
      }
      reqRef.current = requestAnimationFrame(animateRing);
    };
    reqRef.current = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(reqRef.current);
    };
  }, [position]);

  if (!isVisible) return null;

  return (
    <>
      <div
        className="custom-cursor-dot"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: isHovered ? 0.3 : 1
        }}
      />
      <div
        id="custom-cursor-ring-el"
        className={`custom-cursor-ring ${isHovered ? 'active-hover' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        {cursorText && (
          <span className="custom-cursor-label">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
}
