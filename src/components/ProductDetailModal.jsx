import React, { useState, useEffect } from 'react';
import { X, Check, ShieldCheck, ArrowRight, Clock, Box, Sparkles, Sliders } from 'lucide-react';

export default function ProductDetailModal({ product, onClose, onRequestProduct }) {
  const [activeImage, setActiveImage] = useState(product?.image);

  useEffect(() => {
    setActiveImage(product?.image);
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [product, onClose]);

  if (!product) return null;

  const images = [product.image, product.secondaryImage].filter(Boolean);

  return (
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
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1060px',
          maxHeight: '90vh',
          backgroundColor: '#ffffff',
          border: '1px solid var(--gold-border)',
          borderRadius: '24px',
          boxShadow: '0 30px 80px rgba(58, 33, 21, 0.2), 0 0 50px rgba(153, 115, 58, 0.15)',
          overflowY: 'auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 1.25fr)'
        }}
        className="product-modal-grid"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          data-cursor="CLOSE"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 20,
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: '#f5efe6',
            border: '1px solid var(--gold-border)',
            color: 'var(--leather-espresso)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--gold)';
            e.currentTarget.style.transform = 'scale(1.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--gold-border)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <X size={20} />
        </button>

        {/* LEFT COLUMN: Image Gallery Showcase */}
        <div
          style={{
            padding: '36px',
            backgroundColor: '#fbf8f3',
            borderRight: '1px solid rgba(153, 115, 58, 0.18)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '20px'
          }}
        >
          <div>
            <div
              style={{
                width: '100%',
                height: '380px',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid var(--gold-border)',
                marginBottom: '16px',
                background: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(58, 33, 21, 0.06)'
              }}
            >
              <img
                src={activeImage}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>

            {/* Thumbnail Selectors */}
            {images.length > 1 && (
              <div style={{ display: 'flex', gap: '12px' }}>
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: activeImage === img ? '2px solid var(--gold)' : '1px solid rgba(153, 115, 58, 0.25)',
                      background: 'none',
                      padding: 0,
                      cursor: 'pointer'
                    }}
                  >
                    <img src={img} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Compliance Guarantee Strip */}
          <div
            style={{
              padding: '16px',
              borderRadius: '12px',
              background: 'rgba(153, 115, 58, 0.08)',
              border: '1px solid var(--gold-border)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <ShieldCheck size={24} color="var(--gold)" />
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              <strong style={{ color: 'var(--gold-dark)', display: 'block' }}>100% Export Ready</strong>
              Government of India NOC Certified • REACH Compliant
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Specifications, Customization & RFQ Trigger */}
        <div style={{ padding: '40px 36px', overflowY: 'auto' }}>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.72rem',
              letterSpacing: '0.22em',
              color: 'var(--gold-dark)',
              textTransform: 'uppercase',
              marginBottom: '6px',
              fontWeight: 700
            }}
          >
            {product.category} • {product.sku}
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.8rem, 2.5vw, 2.4rem)',
              lineHeight: 1.15,
              color: 'var(--leather-espresso)',
              marginBottom: '16px',
              fontWeight: 700
            }}
          >
            {product.name}
          </h2>

          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '28px' }}>
            {product.description}
          </p>

          {/* Manufacturing Specifications Table */}
          <div style={{ marginBottom: '28px' }}>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.8rem',
                letterSpacing: '0.15em',
                color: 'var(--gold-dark)',
                textTransform: 'uppercase',
                marginBottom: '12px',
                fontWeight: 700
              }}
            >
              Technical Specifications
            </h4>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px',
                padding: '16px',
                borderRadius: '12px',
                background: '#f8f4ee',
                border: '1px solid rgba(153, 115, 58, 0.18)'
              }}
            >
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Leather Type:</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--leather-espresso)', fontWeight: 600 }}>{product.leatherType}</div>

              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Hardware:</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--leather-espresso)', fontWeight: 600 }}>{product.hardware}</div>

              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Lining:</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--leather-espresso)', fontWeight: 600 }}>{product.lining}</div>

              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Dimensions:</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--leather-espresso)', fontWeight: 600 }}>{product.dimensions}</div>
            </div>
          </div>

          {/* B2B Procurement Terms */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '28px' }}>
            <div
              style={{
                padding: '14px 18px',
                borderRadius: '10px',
                background: 'rgba(153, 115, 58, 0.08)',
                border: '1px solid var(--gold-border)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-dark)', marginBottom: '4px' }}>
                <Box size={16} />
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Minimum Order (MOQ)
                </span>
              </div>
              <div style={{ fontSize: '0.95rem', color: 'var(--leather-espresso)', fontWeight: 700 }}>
                {product.moq}
              </div>
            </div>

            <div
              style={{
                padding: '14px 18px',
                borderRadius: '10px',
                background: 'rgba(153, 115, 58, 0.08)',
                border: '1px solid var(--gold-border)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-dark)', marginBottom: '4px' }}>
                <Clock size={16} />
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Lead Time
                </span>
              </div>
              <div style={{ fontSize: '0.95rem', color: 'var(--leather-espresso)', fontWeight: 700 }}>
                {product.leadTime}
              </div>
            </div>
          </div>

          {/* Custom OEM / Private Label Capabilities */}
          {product.customization && (
            <div style={{ marginBottom: '32px' }}>
              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.15em',
                  color: 'var(--gold-dark)',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                  fontWeight: 700
                }}
              >
                OEM / Private Label Options
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {product.customization.map((c, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                    <Check size={14} color="var(--gold)" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                onClose();
                onRequestProduct(product);
              }}
              data-cursor="INQUIRE"
              className="btn-primary"
              style={{ flex: '1', minWidth: '220px', padding: '16px 28px' }}
            >
              <span>REQUEST THIS PRODUCT</span>
              <ArrowRight size={16} className="btn-icon" />
            </button>

            <button
              onClick={onClose}
              className="btn-secondary"
              style={{ padding: '16px 24px' }}
            >
              <span>CLOSE</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .product-modal-grid {
            grid-template-columns: 1fr !important;
            max-height: 95vh !important;
          }
        }
      `}</style>
    </div>
  );
}
