import React from 'react';
import { ArrowRight, CheckCircle2, FileCheck2 } from 'lucide-react';
import { companyData } from '../data/companyData';

export default function SplitIntro({ onReadStory, onOpenInquiry }) {
  return (
    <section
      id="intro"
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid rgba(153, 115, 58, 0.15)',
        borderBottom: '1px solid rgba(153, 115, 58, 0.15)',
        padding: '120px 24px',
        overflow: 'hidden'
      }}
    >
      {/* Ambient background glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(206, 178, 137, 0.2) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none'
        }}
      />

      <div
        style={{
          maxWidth: '1380px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.15fr)',
          gap: '70px',
          alignItems: 'center'
        }}
        className="split-intro-grid"
      >
        {/* LEFT COLUMN: Large Typography & Badge */}
        <div>
          <div className="section-eyebrow">ABOUT <span className="font-brand" style={{ letterSpacing: '0.04em', marginLeft: '5px' }}>DROWORANG</span></div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.4rem, 4.4vw, 4rem)',
              lineHeight: 1.1,
              color: 'var(--leather-espresso)',
              marginBottom: '32px',
              textTransform: 'uppercase'
            }}
          >
            YOUR TRUSTED <br />
            <span className="gold-gradient-text" style={{ fontStyle: 'italic', fontFamily: 'var(--font-editorial)' }}>
              Leather
            </span> <br />
            MANUFACTURER.
          </h2>

          <div
            style={{
              padding: '24px',
              borderRadius: '16px',
              background: '#ffffff',
              border: '1px solid var(--gold-border)',
              boxShadow: '0 8px 25px rgba(58, 33, 21, 0.06)',
              display: 'flex',
              gap: '18px',
              alignItems: 'flex-start',
              maxWidth: '460px'
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                background: 'rgba(153, 115, 58, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                color: 'var(--gold)'
              }}
            >
              <FileCheck2 size={24} />
            </div>
            <div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--leather-espresso)', marginBottom: '4px' }}>
                Government of India NOC Issued
              </h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Statutory export compliance allowing seamless cross-border shipment into Europe, North America, and worldwide jurisdictions.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Editorial Narrative & Pillars */}
        <div>
          <p
            style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: 'clamp(1.25rem, 1.8vw, 1.6rem)',
              lineHeight: 1.5,
              color: 'var(--leather-espresso)',
              marginBottom: '24px',
              fontWeight: 400
            }}
          >
            “Europe’s and global markets’ dependable leather manufacturer is <strong style={{ color: 'var(--leather-cognac)', fontWeight: 600 }}>Droworang International Pvt. Ltd.</strong> We aim to provide unparalleled service with leather goods of absolute value, backed by reliable and prompt delivery.”
          </p>

          <p
            style={{
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.75,
              marginBottom: '32px'
            }}
          >
            As custom leather bag manufacturers for European wholesalers and luxury brands worldwide, we deal in fine leather handbags, executive briefcases, wallets, purses, and bespoke accessories. Founded by visionary business leader <strong>Mr. Yatish Bhandari</strong> at Haldwani, Nainital, Uttarakhand, India, our relentless attention to detail and rigorous compliance protocols place us at the forefront of international B2B leather exports.
          </p>

          {/* Key Pillars Checklist */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '14px',
              marginBottom: '36px'
            }}
          >
            {[
              "Custom OEM & Private Label",
              "Direct Factory Export Pricing",
              "REACH Chemical Compliance",
              "100% Pre-Shipment Inspection",
              "Guaranteed Delivery Schedules",
              "Comprehensive Export Documentation"
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={16} color="var(--gold)" />
                <span style={{ fontSize: '0.88rem', color: 'var(--leather-espresso)', fontWeight: 600 }}>
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap' }}>
            <button
              onClick={onReadStory}
              data-cursor="STORY"
              className="btn-primary"
            >
              <span>READ OUR STORY</span>
              <ArrowRight size={16} className="btn-icon" />
            </button>

            <button
              onClick={onOpenInquiry}
              data-cursor="INQUIRE"
              className="btn-secondary"
            >
              <span>REQUEST A QUOTE</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .split-intro-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
