import React from 'react';
import { ShieldCheck, Award, Target, Eye, Compass, CheckCircle2, ArrowRight, MapPin } from 'lucide-react';
import { companyData } from '../data/companyData';

export default function AboutView({ onOpenInquiry }) {
  const milestones = [
    {
      year: "FOUNDING",
      title: "Vision of Global Leather Excellence",
      description: "Founded by Mr. Yatish Bhandari at Haldwani, Nainital, Uttarakhand, India, with the mission of establishing an ideal supplying company on a global stage."
    },
    {
      year: "INFRASTRUCTURE",
      title: "Artisanal Factory & Machinery",
      description: "Equipped production lines with precision German Adler stitching units, electronic leather skiving, and certified non-toxic vegetable edge finishing rooms."
    },
    {
      year: "COMPLIANCE",
      title: "Government of India NOC Certification",
      description: "Awarded official sovereign export clearances (NOC) and DGFT authorization certifying full compliance with cross-border trade and European REACH benchmarks."
    },
    {
      year: "INTERNATIONAL EXPANSION",
      title: "European & Global Wholesalers",
      description: "Expanded strategic manufacturing partnerships across Germany, Italy, the United Kingdom, and the United States, delivering custom OEM luxury collections."
    }
  ];

  return (
    <div style={{ paddingTop: '100px', backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
      {/* Hero Banner */}
      <section style={{ padding: '80px 24px 60px', textAlign: 'center', position: 'relative' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
            THE HERITAGE OF <span className="font-brand" style={{ letterSpacing: '0.04em', marginLeft: '5px' }}>DROWORANG</span>
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.8rem, 5.5vw, 5rem)',
              lineHeight: 1.08,
              color: 'var(--leather-espresso)',
              marginBottom: '24px',
              textTransform: 'uppercase',
              fontWeight: 700
            }}
          >
            INDIAN ARTISTRY. <br />
            <span className="gold-gradient-text" style={{ fontStyle: 'italic', fontFamily: 'var(--font-editorial)' }}>
              International
            </span> EXCELLENCE.
          </h1>
          <p className="section-lead" style={{ margin: '0 auto' }}>
            Droworang International Pvt. Ltd. was forged with a single guiding principle: that luxury leather manufacturing should unite traditional artisan soul with strict industrial predictability.
          </p>
        </div>
      </section>

      {/* Founder & Corporate Story Section */}
      <section style={{ padding: '60px 24px 100px' }}>
        <div
          style={{
            maxWidth: '1380px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)',
            gap: '60px',
            alignItems: 'center'
          }}
          className="about-founder-grid"
        >
          {/* Editorial Content */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '99px',
                background: 'rgba(153, 115, 58, 0.1)',
                border: '1px solid var(--gold-border)',
                fontFamily: 'var(--font-display)',
                fontSize: '0.72rem',
                color: 'var(--gold-dark)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '20px',
                fontWeight: 700
              }}
            >
              <Award size={15} /> FOUNDER'S STATEMENT
            </div>

            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: 'var(--leather-espresso)', marginBottom: '20px', fontWeight: 700 }}>
              “You know when it is a right decision.”
            </h2>

            <blockquote
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: '1.35rem',
                lineHeight: 1.6,
                color: 'var(--leather-cognac)',
                marginBottom: '28px',
                fontStyle: 'italic',
                borderLeft: '2px solid var(--gold)',
                paddingLeft: '20px'
              }}
            >
              “Droworang International Pvt Ltd is one of the top leading export companies founded with an aim to own the tag of an ideal supplying company on a global platform. Having a wide portfolio of products, we impressively meet diverse potential buyers’ needs with absolute value and zero quality compromise.”
            </blockquote>

            <div style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '28px' }}>
              <p style={{ marginBottom: '16px' }}>
                Under the direct leadership of <strong>Mr. Yatish Bhandari</strong>, Droworang International operates from its strategic hub in Haldwani, Nainital, Uttarakhand. We perform rigorous manual quality checks on all products before shipping to our international clients, ensuring that every bulk production shipment is an exact match to the approved client sample.
              </p>
              <p>
                Whether tailoring crocodile-embossed structured satchels for European fashion houses or supplying large-scale orders of RFID-shielded wallets to German wholesalers, our end-to-end control of material grading, skiving, and export compliance creates total confidence for overseas procurement teams.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <button
                onClick={onOpenInquiry}
                data-cursor="INQUIRE"
                className="btn-primary"
              >
                <span>INITIATE B2B PARTNERSHIP</span>
                <ArrowRight size={16} className="btn-icon" />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.84rem' }}>
                <MapPin size={16} color="var(--gold)" />
                <span>Haldwani, Nainital, Uttarakhand, India</span>
              </div>
            </div>
          </div>

          {/* Visual Card */}
          <div
            style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '1px solid var(--gold-border)',
              boxShadow: '0 25px 60px rgba(58, 33, 21, 0.12)',
              background: '#ffffff'
            }}
          >
            <img
              src="./assets/1745589766204.jpg"
              alt="Droworang Artisanal Craftsmanship"
              style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                right: '24px',
                padding: '20px 24px',
                background: 'rgba(255, 255, 255, 0.94)',
                backdropFilter: 'blur(16px)',
                borderRadius: '16px',
                border: '1px solid var(--gold-border)',
                boxShadow: '0 8px 24px rgba(58, 33, 21, 0.08)'
              }}
            >
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--leather-espresso)', fontWeight: 700, marginBottom: '4px' }}>
                Mr. Yatish Bhandari
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.74rem', letterSpacing: '0.15em', color: 'var(--gold-dark)', textTransform: 'uppercase', fontWeight: 700 }}>
                FOUNDER & MANAGING DIRECTOR
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Core Values */}
      <section style={{ padding: '80px 24px', backgroundColor: '#f5efe6', borderTop: '1px solid rgba(153, 115, 58, 0.18)', borderBottom: '1px solid rgba(153, 115, 58, 0.18)' }}>
        <div style={{ maxWidth: '1380px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {/* Mission */}
            <div className="luxury-card" style={{ padding: '40px 32px' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(153, 115, 58, 0.12)', border: '1px solid var(--gold-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-dark)', marginBottom: '24px' }}>
                <Target size={24} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--leather-espresso)', marginBottom: '16px', fontWeight: 700 }}>
                Our Mission
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                To reach more and more valuable customers with our premium quality leather products so international businesses can take advantage of authentic Indian craftsmanship and competitive factory-direct pricing.
              </p>
            </div>

            {/* Vision */}
            <div className="luxury-card" style={{ padding: '40px 32px' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(153, 115, 58, 0.12)', border: '1px solid var(--gold-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-dark)', marginBottom: '24px' }}>
                <Eye size={24} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--leather-espresso)', marginBottom: '16px', fontWeight: 700 }}>
                Our Vision
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                To be a globally recognized import-export company that puts quality, service, and value as paramount priorities, satisfying the exacting demands of our global partners and stakeholders.
              </p>
            </div>

            {/* Quality Commitment */}
            <div className="luxury-card" style={{ padding: '40px 32px' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(153, 115, 58, 0.12)', border: '1px solid var(--gold-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-dark)', marginBottom: '24px' }}>
                <ShieldCheck size={24} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--leather-espresso)', marginBottom: '16px', fontWeight: 700 }}>
                Quality Benchmark
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                Every single piece is manually audited stitch-by-stitch under the certificate issued by the Government of India, certifying compliance with international benchmarks of quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Historical Milestones Timeline */}
      <section style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
              OUR JOURNEY
            </div>
            <h2 className="section-title">
              PILLARS OF OUR GROWTH.
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {milestones.map((m, idx) => (
              <div
                key={idx}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '180px 1fr',
                  gap: '30px',
                  padding: '32px',
                  borderRadius: '16px',
                  background: '#ffffff',
                  border: '1px solid var(--gold-border)',
                  boxShadow: '0 8px 25px rgba(58, 33, 21, 0.05)',
                  alignItems: 'center'
                }}
                className="milestone-row"
              >
                <div>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.74rem', letterSpacing: '0.2em', color: 'var(--gold-dark)', fontWeight: 700 }}>
                    {m.year}
                  </span>
                  <div style={{ width: '40px', height: '1.5px', background: 'var(--gold)', marginTop: '8px' }} />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--leather-espresso)', marginBottom: '8px', fontWeight: 700 }}>
                    {m.title}
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .about-founder-grid {
            grid-template-columns: 1fr !important;
          }
          .milestone-row {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}
