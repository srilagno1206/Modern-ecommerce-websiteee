import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Sparkles, Layers, ChevronRight } from 'lucide-react';
import { craftsmanshipStages } from '../data/craftsmanshipData';

export default function Craftsmanship() {
  const [activeStage, setActiveStage] = useState(0);
  const current = craftsmanshipStages[activeStage];

  return (
    <section
      id="craft"
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg-primary)',
        padding: '130px 24px',
        borderTop: '1px solid rgba(153, 115, 58, 0.18)',
        borderBottom: '1px solid rgba(153, 115, 58, 0.18)',
        overflow: 'hidden'
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
            ARTISANAL MANUFACTURING PIPELINE
          </div>
          <h2 className="section-title">
            FROM CRAFT TO CREATION.
          </h2>
          <p className="section-lead" style={{ margin: '0 auto' }}>
            Every heirloom product travels through 8 strict stages of manual precision and quality assurance at our Haldwani, Uttarakhand facility.
          </p>
        </div>

        {/* Interactive Step Navigator Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '20px',
            marginBottom: '40px',
            borderBottom: '1px solid rgba(153, 115, 58, 0.18)'
          }}
          className="stage-step-bar"
        >
          {craftsmanshipStages.map((stage, idx) => {
            const isActive = activeStage === idx;
            return (
              <button
                key={stage.step}
                onClick={() => setActiveStage(idx)}
                data-cursor={stage.step}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 18px',
                  borderRadius: '12px',
                  background: isActive ? 'linear-gradient(135deg, #241810, #160e09)' : 'transparent',
                  border: isActive ? '1px solid var(--gold)' : '1px solid transparent',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: isActive ? 'var(--gold-light)' : 'var(--text-muted)'
                  }}
                >
                  {stage.step}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    color: isActive ? '#ffffff' : 'var(--text-secondary)',
                    textTransform: 'uppercase'
                  }}
                >
                  {stage.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Featured Display */}
        <div
          style={{
            borderRadius: '24px',
            background: '#ffffff',
            border: '1px solid var(--gold-border)',
            boxShadow: '0 20px 50px rgba(58, 33, 21, 0.08)',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.95fr)',
            alignItems: 'center'
          }}
          className="craft-stage-grid"
        >
          {/* Left: Editorial Information */}
          <div style={{ padding: '50px 45px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '6px 14px',
                borderRadius: '99px',
                background: 'rgba(153, 115, 58, 0.1)',
                border: '1px solid var(--gold-border)',
                marginBottom: '20px'
              }}
            >
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.72rem', fontWeight: 700, color: 'var(--gold-dark)', letterSpacing: '0.18em' }}>
                STAGE {current.step} OF 08
              </span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                color: 'var(--leather-espresso)',
                marginBottom: '8px',
                fontWeight: 700
              }}
            >
              {current.title}
            </h3>

            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.85rem',
                letterSpacing: '0.15em',
                color: 'var(--gold-dark)',
                textTransform: 'uppercase',
                marginBottom: '24px',
                fontWeight: 700
              }}
            >
              {current.tagline}
            </div>

            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '36px' }}>
              {current.description}
            </p>

            {/* Quality Standard Highlights */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px' }}>
              {current.specs.map((sp, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CheckCircle size={16} color="var(--gold-dark)" />
                  <span style={{ fontSize: '0.88rem', color: 'var(--leather-espresso)', fontWeight: 600 }}>
                    {sp}
                  </span>
                </div>
              ))}
            </div>

            {/* Stage Navigation Arrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <button
                onClick={() => setActiveStage((prev) => (prev + 1) % craftsmanshipStages.length)}
                data-cursor="NEXT"
                className="btn-secondary"
                style={{ padding: '12px 24px', fontSize: '0.8rem' }}
              >
                <span>NEXT STEP ({craftsmanshipStages[(activeStage + 1) % craftsmanshipStages.length].title})</span>
                <ArrowRight size={14} className="btn-icon" />
              </button>
            </div>
          </div>

          {/* Right: Stage Visual */}
          <div
            style={{
              position: 'relative',
              height: '100%',
              minHeight: '440px',
              backgroundColor: '#fbf8f3',
              overflow: 'hidden'
            }}
          >
            <img
              src={current.image}
              alt={current.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.8s ease'
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, rgba(255, 255, 255, 0.7) 0%, transparent 40%, rgba(255, 255, 255, 0.1) 100%)'
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        .stage-step-bar::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 900px) {
          .craft-stage-grid {
            grid-template-columns: 1fr !important;
          }
          .craft-stage-grid > div:last-child {
            min-height: 280px !important;
          }
        }
      `}</style>
    </section>
  );
}
