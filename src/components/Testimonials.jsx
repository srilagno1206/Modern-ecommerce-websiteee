import React, { useState, useEffect } from 'react';
import { Star, ArrowLeft, ArrowRight, Quote, ShieldCheck } from 'lucide-react';
import { testimonials } from '../data/testimonialsData';

export default function Testimonials() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const current = testimonials[currentIdx];

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="testimonials"
      style={{
        position: 'relative',
        backgroundColor: '#f5efe6',
        padding: '130px 24px',
        borderTop: '1px solid rgba(153, 115, 58, 0.18)',
        borderBottom: '1px solid rgba(153, 115, 58, 0.18)',
        overflow: 'hidden'
      }}
    >
      {/* Background radial glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(153, 115, 58, 0.08) 0%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none'
        }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 5 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
            GLOBAL PARTNER TESTIMONIALS
          </div>
          <h2 className="section-title">
            LOVE FROM OUR CLIENTS.
          </h2>
          <p className="section-lead" style={{ margin: '0 auto' }}>
            Endorsed by international wholesale partners, European luxury boutique buyers, and bespoke private labels.
          </p>
        </div>

        {/* Large Editorial Quote Card */}
        <div
          style={{
            position: 'relative',
            borderRadius: '24px',
            background: '#ffffff',
            border: '1px solid var(--gold-border)',
            boxShadow: '0 20px 50px rgba(58, 33, 21, 0.08)',
            padding: '60px 48px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}
          className="testimonial-card"
        >
          {/* Quote Icon */}
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(153, 115, 58, 0.1)',
              border: '1px solid var(--gold-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--gold-dark)',
              marginBottom: '32px'
            }}
          >
            <Quote size={28} />
          </div>

          {/* 5-Star Rating */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '28px' }}>
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} size={18} fill="var(--gold)" color="var(--gold)" />
            ))}
          </div>

          {/* Editorial Quote */}
          <blockquote
            style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)',
              lineHeight: 1.45,
              color: 'var(--leather-espresso)',
              maxWidth: '880px',
              marginBottom: '36px',
              fontWeight: 500
            }}
          >
            “{current.quote}”
          </blockquote>

          {/* Client Details */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '36px' }}>
            <div
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid var(--gold)',
                background: '#fbf8f3'
              }}
            >
              <img
                src={current.avatar}
                alt={current.clientName}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div style={{ textAlign: 'left' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--leather-espresso)', fontWeight: 700 }}>
                {current.clientName}
              </div>
              <div style={{ fontSize: '0.84rem', color: 'var(--gold-dark)', fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                {current.company} • {current.location}
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                {current.verifiedPurchase}
              </div>
            </div>
          </div>

          {/* Navigation Controls & Slide Dots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <button
              onClick={handlePrev}
              data-cursor="PREV"
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: '#fbf8f3',
                border: '1px solid var(--gold-border)',
                color: 'var(--leather-espresso)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <ArrowLeft size={18} />
            </button>

            <div style={{ display: 'flex', gap: '8px' }}>
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIdx(idx)}
                  style={{
                    width: currentIdx === idx ? '28px' : '8px',
                    height: '8px',
                    borderRadius: '99px',
                    backgroundColor: currentIdx === idx ? 'var(--gold)' : 'rgba(153, 115, 58, 0.25)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              data-cursor="NEXT"
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: '#fbf8f3',
                border: '1px solid var(--gold-border)',
                color: 'var(--leather-espresso)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
