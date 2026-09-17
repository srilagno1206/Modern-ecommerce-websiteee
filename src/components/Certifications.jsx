import React, { useState } from 'react';
import { ShieldCheck, FileCheck, ExternalLink, X, Award, CheckCircle } from 'lucide-react';
import { certifications } from '../data/certificationsData';

export default function Certifications() {
  const [activeCert, setActiveCert] = useState(null);

  // 3D Card tilt calculation
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  };

  const handleCardMouseLeave = (e) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  return (
    <section
      id="certifications"
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
            REGULATORY CREDENTIALS & COMPLIANCE
          </div>
          <h2 className="section-title">
            TRUSTED. COMPLIANT. GLOBAL.
          </h2>
          <p className="section-lead" style={{ margin: '0 auto' }}>
            Droworang International Pvt. Ltd. holds sovereign export clearances issued by the Government of India, certifying compliance with international benchmarks of quality and cross-border standards.
          </p>
        </div>

        {/* Certificate Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px'
          }}
        >
          {certifications.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setActiveCert(cert)}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              data-cursor="INSPECT"
              style={{
                borderRadius: '20px',
                background: '#ffffff',
                border: '1px solid var(--gold-border)',
                padding: '32px 28px',
                boxShadow: '0 12px 35px rgba(58, 33, 21, 0.06)',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              className="cert-card"
            >
              {/* Top Authority Badge */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '20px'
                }}
              >
                <div
                  style={{
                    padding: '6px 14px',
                    borderRadius: '99px',
                    background: 'rgba(153, 115, 58, 0.1)',
                    border: '1px solid var(--gold-border)',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    color: 'var(--gold-dark)',
                    textTransform: 'uppercase'
                  }}
                >
                  {cert.badge}
                </div>

                <ExternalLink size={18} color="var(--gold-dark)" opacity={0.8} />
              </div>

              {/* Certificate Image Thumbnail */}
              <div
                style={{
                  width: '100%',
                  height: '180px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  background: '#fbf8f3',
                  border: '1px solid rgba(153, 115, 58, 0.2)',
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    padding: '8px',
                    transition: 'transform 0.4s ease'
                  }}
                  className="cert-img-zoom"
                />
              </div>

              {/* Title & Authority */}
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.4rem',
                  color: 'var(--leather-espresso)',
                  marginBottom: '6px',
                  fontWeight: 700
                }}
              >
                {cert.title}
              </h3>

              <div
                style={{
                  fontSize: '0.78rem',
                  color: 'var(--gold-dark)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  marginBottom: '14px'
                }}
              >
                {cert.subtitle}
              </div>

              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '20px' }}>
                {cert.description}
              </p>

              {/* Verified Status Tag */}
              <div
                style={{
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(153, 115, 58, 0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.78rem',
                  color: 'var(--leather-espresso)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700
                }}
              >
                <ShieldCheck size={16} color="var(--gold-dark)" />
                <span>{cert.verificationStatus}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Lightbox Modal */}
      {activeCert && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100000,
            backgroundColor: 'rgba(26, 17, 11, 0.55)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
          onClick={() => setActiveCert(null)}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '640px',
              backgroundColor: '#ffffff',
              border: '1px solid var(--gold-border)',
              borderRadius: '24px',
              padding: '36px',
              boxShadow: '0 30px 80px rgba(58, 33, 21, 0.2)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveCert(null)}
              data-cursor="CLOSE"
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#f5efe6',
                border: '1px solid var(--gold-border)',
                color: 'var(--leather-espresso)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ width: '100%', maxHeight: '320px', overflow: 'hidden', borderRadius: '12px', background: '#fbf8f3', padding: '16px', marginBottom: '20px', border: '1px solid rgba(153, 115, 58, 0.15)' }}>
                <img
                  src={activeCert.image}
                  alt={activeCert.title}
                  style={{ maxHeight: '280px', maxWidth: '100%', objectFit: 'contain' }}
                />
              </div>

              <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.72rem', letterSpacing: '0.2em', color: 'var(--gold-dark)', textTransform: 'uppercase', marginBottom: '6px', fontWeight: 700 }}>
                DOCUMENT REF: {activeCert.documentNumber}
              </div>

              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--leather-espresso)', marginBottom: '8px', fontWeight: 700 }}>
                {activeCert.title}
              </h3>

              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                Issuing Authority: {activeCert.authority}
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
                {activeCert.description}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
              {activeCert.highlights.map((h, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: 'var(--leather-espresso)', fontWeight: 600 }}>
                  <CheckCircle size={15} color="var(--gold-dark)" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveCert(null)}
              className="btn-primary"
              style={{ width: '100%', padding: '14px' }}
            >
              <span>CONFIRM & CLOSE</span>
            </button>
          </div>
        </div>
      )}

      <style>{`
        .cert-card:hover {
          border-color: var(--gold) !important;
          box-shadow: 0 25px 50px -10px rgba(58, 33, 21, 0.14), 0 0 30px var(--gold-glow) !important;
        }
        .cert-card:hover .cert-img-zoom {
          transform: scale(1.08);
        }
      `}</style>
    </section>
  );
}
