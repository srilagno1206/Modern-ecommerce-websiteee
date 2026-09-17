import React, { useEffect, useState } from 'react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 800);
          }, 300);
          return 100;
        }
        const remaining = 100 - prev;
        const increment = Math.max(1, Math.floor(Math.random() * (remaining > 20 ? 8 : 4)));
        return Math.min(100, prev + increment);
      });
    }, 40);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f4fbff',
        transition: 'opacity 0.8s cubic-bezier(0.19, 1, 0.22, 1), transform 0.8s cubic-bezier(0.19, 1, 0.22, 1), filter 0.8s cubic-bezier(0.19, 1, 0.22, 1)',
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? 'scale(1.04)' : 'scale(1)',
        filter: isExiting ? 'blur(10px)' : 'blur(0)',
        pointerEvents: isExiting ? 'none' : 'auto',
        overflow: 'hidden'
      }}
    >
      {/* Background Ambient Sky Glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(154, 215, 255, 0.8) 0%, rgba(244, 251, 255, 0.98) 75%)',
          pointerEvents: 'none'
        }}
      />

      {/* Decorative Gold Geometric Crest Ring */}
      <div
        style={{
          position: 'relative',
          width: '120px',
          height: '120px',
          marginBottom: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            border: '1px solid rgba(91, 184, 246, 0.28)',
            borderRadius: '50%',
            transform: `rotate(${progress * 3.6}deg)`,
            transition: 'transform 0.1s linear'
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: '8px',
            border: '1px dashed rgba(91, 184, 246, 0.52)',
            borderRadius: '50%',
            transform: `rotate(-${progress * 1.8}deg)`,
            transition: 'transform 0.1s linear'
          }}
        />
        <img
          src="./assets/logo.png"
          alt="Droworang Crest"
          style={{
            width: '64px',
            height: 'auto',
            filter: 'drop-shadow(0 4px 12px rgba(91, 184, 246, 0.25))'
          }}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </div>

      {/* Brand Title */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 10, padding: '0 20px' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 0.82,
            marginBottom: '12px'
          }}
        >
          <h1
            className="font-brand"
            style={{
              fontSize: 'clamp(3.4rem, 8vw, 11rem)',
              letterSpacing: '-0.11em',
              textTransform: 'uppercase',
              color: '#0f2740',
              margin: 0,
              fontWeight: 700,
              fontFamily: 'Georgia, "Times New Roman", serif',
              whiteSpace: 'nowrap',
              transform: 'scaleY(1.06)'
            }}
          >
            DR<span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '0.52em',
                height: '0.52em',
                border: '3px solid #5bb8f6',
                borderRadius: '50%',
                margin: '0 0.08em',
                verticalAlign: 'middle',
                boxSizing: 'border-box',
                transform: 'translateY(-0.04em)'
              }}
            />
            WORANG
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(0.9rem, 2vw, 3rem)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#5bb8f6',
              margin: '10px 0 0',
              fontWeight: 700,
              lineHeight: 1,
              whiteSpace: 'nowrap'
            }}
          >
            INTERNATIONAL
          </p>
        </div>
      </div>

      {/* Progress Counter & Line */}
      <div
        style={{
          width: 'min(300px, 80vw)',
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        <div
          style={{
            width: '100%',
            height: '3px',
            backgroundColor: 'rgba(91, 184, 246, 0.15)',
            borderRadius: '99px',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #2e7ec0, #5bb8f6, #9ad7ff)',
              transition: 'width 0.1s linear',
              boxShadow: '0 0 10px rgba(91, 184, 246, 0.4)'
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            fontFamily: 'var(--font-display)',
            fontSize: '0.78rem',
            letterSpacing: '0.18em',
            color: '#6b5749'
          }}
        >
          <span>CRAFTING FOR THE WORLD</span>
          <span style={{ color: '#2e7ec0', fontWeight: 700 }}>{progress}%</span>
        </div>
      </div>
    </div>
  );
}
