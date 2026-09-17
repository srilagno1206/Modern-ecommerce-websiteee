import React, { useState } from 'react';
import { Award, Users, Headphones, Eye, DollarSign, Clock, ChevronDown, Sparkles } from 'lucide-react';

export default function WhyChooseUs() {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [activeAccordion, setActiveAccordion] = useState(0);

  const features = [
    {
      number: "01",
      icon: Award,
      title: "Quality Products",
      tagline: "Uncompromising Material Integrity",
      originalQuote: "We are here to provide the best quality products to our precious customer.",
      deepDetail: "Crafted exclusively from selected full-grain and top-grain hides sourced from certified tanneries. Every production batch undergoes multi-axis tension testing and REACH chemical safety verification.",
      spec: "A+ Hide Grading • Tear-Resistant Bonded Seams"
    },
    {
      number: "02",
      icon: Users,
      title: "Qualified Staff",
      tagline: "Decades of Artisan Mastery",
      originalQuote: "We have well trained and well qualified staff who are working hard for our company.",
      deepDetail: "Our clickers, skivers, and master stitchers bring generational craftsmanship combined with modern German CNC and Adler industrial machinery operating under zero-defect protocols.",
      spec: "Adler & Juki Precision • Master Artisan Clickers"
    },
    {
      number: "03",
      icon: Headphones,
      title: "Dedicated Support",
      tagline: "Direct Executive B2B Desk",
      originalQuote: "We are here to provide 24x7 dedicated help support to our clients.",
      deepDetail: "Direct point-of-contact with dedicated export account managers and direct supervision by founder Mr. Yatish Bhandari. Instant communication via WhatsApp, video conferences, and live production feeds.",
      spec: "24/7 Timezone Coverage • Dedicated Account Lead"
    },
    {
      number: "04",
      icon: Eye,
      title: "Full Transparency",
      tagline: "Integrity in Every Agreement",
      originalQuote: "We are here to provide fully transparency with clients in every deals.",
      deepDetail: "Complete open-book costing on volume contracts, transparent material spec sheets, shared inspection reports prior to dispatch, and verified statutory export customs documentation.",
      spec: "Verified Pre-Shipment Audit • Open Spec Sheets"
    },
    {
      number: "05",
      icon: DollarSign,
      title: "Affordable Pricing",
      tagline: "Direct Factory Advantage",
      originalQuote: "We are providing our quality products in an affordable rate.",
      deepDetail: "By manufacturing directly at our Haldwani, Uttarakhand facility and eliminating trading intermediaries, we provide Tier-1 luxury quality at competitive factory-gate pricing.",
      spec: "Zero Intermediary Markups • Scalable Volume Tiers"
    },
    {
      number: "06",
      icon: Clock,
      title: "On-Time Delivery",
      tagline: "Strict International Schedules",
      originalQuote: "We know the value of time so we deliver your order on time.",
      deepDetail: "Guaranteed production lead times backed by audited capacity planning. Direct partnerships with premier international air and ocean carriers ensure timely arrival at European and global ports.",
      spec: "Air Express & Container Multimodal Freight"
    }
  ];

  // 3D Card tilt calculation
  const handleCardMouseMove = (e, index) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  };

  const handleCardMouseLeave = (e) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    setHoveredIdx(null);
  };

  return (
    <section
      id="why-us"
      style={{
        position: 'relative',
        backgroundColor: '#f5efe6',
        padding: '130px 24px',
        borderTop: '1px solid rgba(153, 115, 58, 0.18)',
        borderBottom: '1px solid rgba(153, 115, 58, 0.18)',
        overflow: 'hidden'
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '70px' }}>
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
            THE <span className="font-brand" style={{ letterSpacing: '0.04em', margin: '0 5px' }}>DROWORANG</span> ADVANTAGE
          </div>
          <h2 className="section-title">
            WHY PARTNERS CHOOSE US.
          </h2>
          <p className="section-lead" style={{ margin: '0 auto' }}>
            Built on transparency, certified Indian craftsmanship, and international benchmarks of excellence.
          </p>
        </div>

        {/* Desktop 3D Interactive Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '28px'
          }}
          className="desktop-feature-grid"
        >
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={feat.number}
                onMouseMove={(e) => {
                  handleCardMouseMove(e, idx);
                  setHoveredIdx(idx);
                }}
                onMouseLeave={handleCardMouseLeave}
                data-cursor="INSPECT"
                style={{
                  position: 'relative',
                  padding: '40px 32px',
                  borderRadius: '20px',
                  background: '#ffffff',
                  border: isHovered ? '1px solid var(--gold)' : '1px solid var(--gold-border)',
                  boxShadow: isHovered
                    ? '0 25px 50px -12px rgba(58, 33, 21, 0.14), 0 0 30px var(--gold-glow)'
                    : '0 10px 30px rgba(58, 33, 21, 0.05)',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
                  cursor: 'pointer',
                  overflow: 'hidden'
                }}
              >
                {/* Glowing Number in background */}
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '24px',
                    fontFamily: 'var(--font-serif)',
                    fontSize: '4.5rem',
                    fontWeight: 700,
                    color: isHovered ? 'rgba(153, 115, 58, 0.16)' : 'rgba(153, 115, 58, 0.07)',
                    lineHeight: 1,
                    pointerEvents: 'none',
                    transition: 'color 0.3s ease'
                  }}
                >
                  {feat.number}
                </div>

                {/* Card Icon */}
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '12px',
                    background: isHovered ? 'rgba(153, 115, 58, 0.2)' : 'rgba(153, 115, 58, 0.1)',
                    border: '1px solid var(--gold-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--gold-dark)',
                    marginBottom: '28px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Icon size={26} />
                </div>

                {/* Subtitle & Title */}
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.74rem',
                    letterSpacing: '0.2em',
                    color: 'var(--gold-dark)',
                    textTransform: 'uppercase',
                    marginBottom: '6px',
                    fontWeight: 700
                  }}
                >
                  {feat.tagline}
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.6rem',
                    color: 'var(--leather-espresso)',
                    marginBottom: '16px',
                    fontWeight: 700
                  }}
                >
                  {feat.title}
                </h3>

                <p
                  style={{
                    fontStyle: 'italic',
                    fontFamily: 'var(--font-editorial)',
                    fontSize: '1.15rem',
                    color: 'var(--leather-cognac)',
                    lineHeight: 1.5,
                    marginBottom: '18px'
                  }}
                >
                  “{feat.originalQuote}”
                </p>

                <p
                  style={{
                    fontSize: '0.88rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    marginBottom: '24px'
                  }}
                >
                  {feat.deepDetail}
                </p>

                {/* Bottom spec strip */}
                <div
                  style={{
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(153, 115, 58, 0.18)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.76rem',
                    color: 'var(--gold-dark)',
                    fontWeight: 700
                  }}
                >
                  <Sparkles size={14} />
                  <span>{feat.spec}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Vertical Accordion Mode */}
        <div className="mobile-accordion">
          {features.map((feat, idx) => {
            const isOpen = activeAccordion === idx;
            const Icon = feat.icon;
            return (
              <div
                key={feat.number}
                style={{
                  marginBottom: '12px',
                  borderRadius: '12px',
                  background: '#ffffff',
                  border: isOpen ? '1px solid var(--gold)' : '1px solid var(--gold-border)',
                  overflow: 'hidden',
                  boxShadow: '0 4px 15px rgba(58, 33, 21, 0.05)'
                }}
              >
                <button
                  onClick={() => setActiveAccordion(isOpen ? -1 : idx)}
                  style={{
                    width: '100%',
                    padding: '20px 18px',
                    background: 'none',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    color: 'var(--leather-espresso)',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <span style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-dark)', fontSize: '1.2rem', fontWeight: 700 }}>
                      {feat.number}
                    </span>
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 700 }}>
                      {feat.title}
                    </span>
                  </div>
                  <ChevronDown
                    size={20}
                    color="var(--gold-dark)"
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease'
                    }}
                  />
                </button>

                {isOpen && (
                  <div style={{ padding: '0 18px 20px', borderTop: '1px solid rgba(153, 115, 58, 0.18)' }}>
                    <p style={{ fontStyle: 'italic', fontFamily: 'var(--font-editorial)', color: 'var(--leather-cognac)', margin: '14px 0 10px' }}>
                      “{feat.originalQuote}”
                    </p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '14px' }}>
                      {feat.deepDetail}
                    </p>
                    <div style={{ fontSize: '0.75rem', color: 'var(--gold-dark)', fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                      {feat.spec}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .mobile-accordion {
          display: none;
        }
        @media (max-width: 768px) {
          .desktop-feature-grid {
            display: none !important;
          }
          .mobile-accordion {
            display: block !important;
          }
        }
      `}</style>
    </section>
  );
}
