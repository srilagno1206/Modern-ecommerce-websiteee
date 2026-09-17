import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Award, Clock, Sparkles } from 'lucide-react';
import { companyData } from '../data/companyData';

export default function StatsSection() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      category: "QUALITY FIRST",
      value: "100%",
      label: "Selected Genuine Hides",
      subtext: "Top-tier full-grain and vegetable-tanned bovine leathers",
      icon: Award
    },
    {
      category: "GLOBAL EXPORT",
      value: "NOC",
      label: "Government of India Certified",
      subtext: "Statutory sovereign compliance for seamless cross-border shipping",
      icon: ShieldCheck
    },
    {
      category: "CUSTOM SOLUTIONS",
      value: "OEM / ODM",
      label: "Private Label Capabilities",
      subtext: "Bespoke embossing, custom hardware alloys, and custom packaging",
      icon: Sparkles
    },
    {
      category: "ON-TIME DELIVERY",
      value: "24 / 7",
      label: "Dedicated B2B Support",
      subtext: "Direct founder oversight and tracked international logistics",
      icon: Clock
    }
  ];

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        backgroundColor: '#f5efe6',
        padding: '100px 24px',
        borderTop: '1px solid rgba(153, 115, 58, 0.18)',
        borderBottom: '1px solid rgba(153, 115, 58, 0.18)',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px'
        }}
      >
        {stats.map((st, idx) => {
          const Icon = st.icon;
          return (
            <div
              key={idx}
              className="luxury-card"
              style={{
                padding: '40px 32px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: '#ffffff',
                border: '1px solid var(--gold-border)',
                boxShadow: '0 10px 30px rgba(58, 33, 21, 0.06)',
                opacity: hasAnimated ? 1 : 0,
                transform: hasAnimated ? 'translateY(0)' : 'translateY(24px)',
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.12}s`
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'rgba(153, 115, 58, 0.12)',
                  border: '1px solid var(--gold-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--gold-dark)',
                  marginBottom: '20px'
                }}
              >
                <Icon size={22} />
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  color: 'var(--gold-dark)',
                  textTransform: 'uppercase',
                  marginBottom: '12px'
                }}
              >
                {st.category}
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.4rem, 3.5vw, 3.2rem)',
                  fontWeight: 700,
                  color: 'var(--leather-espresso)',
                  lineHeight: 1.1,
                  marginBottom: '8px'
                }}
              >
                {st.value}
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: 'var(--leather-espresso)',
                  marginBottom: '10px'
                }}
              >
                {st.label}
              </div>

              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {st.subtext}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
