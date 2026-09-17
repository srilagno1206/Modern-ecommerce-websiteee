import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { companyData } from '../data/companyData';

export default function Hero({ onExploreProducts, onOpenInquiry }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const canvasRef = useRef(null);
  const heroRef = useRef(null);

  // Mouse parallax tracking
  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = window.innerHeight;
      const progress = Math.min(1, Math.max(0, scrollY / height));
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Gold dust particle canvas (Calibrated for light luxury background)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.6 + 0.4,
      color: Math.random() > 0.4 ? 'rgba(153, 115, 58, ' : 'rgba(138, 87, 54, ',
      alpha: Math.random() * 0.45 + 0.15,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: -Math.random() * 0.5 - 0.15
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < 0) p.y = canvas.height;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#c5a46d';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '130px 24px 80px',
        overflow: 'hidden',
        backgroundColor: 'var(--bg-primary)'
      }}
    >
      {/* LAYER 1: Deep Ambient Radial Warm Ivory Lighting */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at 65% 45%, rgba(206, 178, 137, 0.22) 0%, transparent 60%),
            radial-gradient(circle at 20% 70%, rgba(224, 212, 194, 0.4) 0%, transparent 65%),
            radial-gradient(circle at 50% 20%, rgba(184, 147, 85, 0.1) 0%, transparent 50%),
            var(--bg-primary)
          `,
          transform: `scale(${1 + scrollProgress * 0.15})`,
          transition: 'transform 0.1s ease-out'
        }}
      />

      {/* Subtle Architectural Lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(153, 115, 58, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(153, 115, 58, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '120px 120px',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)',
          pointerEvents: 'none'
        }}
      />

      {/* LAYER 2: Warm Amber Floating Particle Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 2,
          opacity: 1 - scrollProgress * 1.5
        }}
      />

      {/* HERO CONTENT CONTAINER */}
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          maxWidth: '1440px',
          width: '100%',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)',
          alignItems: 'center',
          gap: '60px'
        }}
        className="hero-grid"
      >
        {/* LEFT COLUMN: Editorial Typography & CTAs */}
        <div
          style={{
            transform: `translate3d(${mousePos.x * -12}px, ${mousePos.y * -12}px, 0)`,
            transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            opacity: 1 - scrollProgress * 1.2
          }}
        >
          {/* Eyebrow with Govt NOC Certification Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '6px 16px',
              borderRadius: '99px',
              background: '#ffffff',
              border: '1px solid var(--gold-border)',
              boxShadow: '0 4px 15px rgba(58, 33, 21, 0.06)',
              marginBottom: '28px'
            }}
          >
            <ShieldCheck size={16} color="var(--gold)" />
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.74rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                color: 'var(--gold)',
                textTransform: 'uppercase'
              }}
            >
              GOVERNMENT OF INDIA NOC CERTIFIED
            </span>
          </div>

          {/* Editorial Main Heading */}
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.8rem, 5.8vw, 5.6rem)',
              lineHeight: 1.04,
              letterSpacing: '-0.025em',
              color: 'var(--leather-espresso)',
              marginBottom: '28px',
              textTransform: 'uppercase'
            }}
          >
            CRAFTING <br />
            <span className="gold-gradient-text" style={{ fontStyle: 'italic', fontFamily: 'var(--font-editorial)', fontWeight: 400 }}>
              Leather
            </span> <br />
            FOR THE WORLD.
          </h1>

          {/* Supporting Subtext */}
          <p
            style={{
              fontSize: 'clamp(1.05rem, 1.35vw, 1.25rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              maxWidth: '560px',
              marginBottom: '42px',
              fontWeight: 400
            }}
          >
            {companyData.subheading}
          </p>

          {/* Action CTAs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '20px'
            }}
          >
            <button
              onClick={onExploreProducts}
              data-cursor="EXPLORE"
              className="btn-primary"
            >
              <span>EXPLORE THE STORY</span>
              <ArrowRight size={16} className="btn-icon" />
            </button>

            <button
              onClick={onOpenInquiry}
              data-cursor="INQUIRE"
              className="btn-secondary"
            >
              <span>START A CONVERSATION</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: 3D Layered Product Showcase */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `translate3d(${mousePos.x * 20}px, ${mousePos.y * 20}px, 0)`,
            transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Ambient Lighting Behind Product */}
          <div
            style={{
              position: 'absolute',
              width: 'min(480px, 85vw)',
              height: 'min(480px, 85vw)',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(206, 178, 137, 0.35) 0%, rgba(184, 147, 85, 0.15) 50%, transparent 75%)',
              filter: 'blur(40px)',
              pointerEvents: 'none'
            }}
          />

          {/* Product Frame with Luxury Light Card Styling */}
          <div
            data-cursor="DISCOVER"
            onClick={onExploreProducts}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '480px',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 25px 60px -15px rgba(58, 33, 21, 0.18), 0 0 30px rgba(153, 115, 58, 0.15)',
              border: '1px solid var(--gold-border)',
              background: '#ffffff',
              cursor: 'pointer',
              transition: 'transform var(--transition-smooth), box-shadow var(--transition-smooth)'
            }}
            className="hero-image-card"
          >
            <img
              src="./assets/1743781273105.jpg"
              alt="Droworang Emerald Croc Luxury Satchel"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'cover',
                transform: `scale(${1 + scrollProgress * 0.08})`,
                transition: 'transform 0.5s ease'
              }}
            />

            {/* Floating Info Tag on Product */}
            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                right: '20px',
                padding: '16px 20px',
                background: 'rgba(255, 255, 255, 0.94)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderRadius: '14px',
                border: '1px solid var(--gold-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 8px 25px rgba(58, 33, 21, 0.08)'
              }}
            >
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.68rem', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '2px', fontWeight: 700 }}>
                  NEW LAUNCH / BESPOKE
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--leather-espresso)', fontWeight: 600 }}>
                  Sovereign Croc Handbag
                </div>
              </div>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--leather-espresso), #3a2115)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff'
                }}
              >
                <ArrowRight size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LAYER 6: Bottom Circular Scroll Indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '28px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          opacity: 1 - scrollProgress * 2.5,
          pointerEvents: 'none'
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.68rem',
            letterSpacing: '0.28em',
            color: 'var(--gold)',
            textTransform: 'uppercase',
            fontWeight: 700
          }}
        >
          SCROLL
        </span>
        <div
          style={{
            width: '26px',
            height: '42px',
            borderRadius: '99px',
            border: '1px solid var(--gold-border)',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '6px',
            background: 'rgba(255, 255, 255, 0.6)'
          }}
        >
          <div
            style={{
              width: '4px',
              height: '8px',
              borderRadius: '99px',
              backgroundColor: 'var(--gold)',
              animation: 'scrollDown 2s cubic-bezier(0.65, 0, 0.35, 1) infinite'
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes scrollDown {
          0% { transform: translateY(0); opacity: 1; }
          60% { transform: translateY(14px); opacity: 0; }
          61% { transform: translateY(0); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
            gap: 40px !important;
          }
          .hero-grid > div:first-child {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-grid p {
            margin-left: auto;
            margin-right: auto;
          }
        }
      `}</style>
    </section>
  );
}
