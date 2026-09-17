import React from 'react';
import { ArrowUpRight, Phone, Mail, MapPin, ShieldCheck, Heart, Linkedin, Instagram, Facebook, Youtube } from 'lucide-react';
import { companyData } from '../data/companyData';
import { categories } from '../data/productsData';

// Custom sharp X (Twitter) icon
function XIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Footer({ onNavigate, onOpenInquiry }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        position: 'relative',
        backgroundColor: '#f2ebe1',
        borderTop: '1px solid rgba(153, 115, 58, 0.25)',
        padding: '100px 24px 40px',
        overflow: 'hidden'
      }}
    >
      {/* Background ambient lighting */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '240px',
          background: 'radial-gradient(ellipse at top, rgba(153, 115, 58, 0.1) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none'
        }}
      />

      <div style={{ maxWidth: '1440px', margin: '0 auto', position: 'relative', zIndex: 5 }}>
        {/* Top Grand Brandmark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            paddingBottom: '60px',
            borderBottom: '1px solid rgba(153, 115, 58, 0.18)',
            marginBottom: '70px',
            flexWrap: 'wrap',
            gap: '30px'
          }}
        >
          <div>
            <div style={{ marginBottom: '16px' }}>
              <img
                src="./assets/logo.png"
                alt="DROWORANG"
                style={{
                  height: '44px',
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  const fb = document.getElementById('footer-brand-fallback');
                  if (fb) fb.style.display = 'block';
                }}
              />
              <div
                id="footer-brand-fallback"
                className="font-brand"
                style={{
                  display: 'none',
                  fontSize: 'clamp(2.2rem, 5vw, 4.4rem)',
                  lineHeight: 1,
                  letterSpacing: '0.04em',
                  color: 'var(--leather-espresso)',
                  fontWeight: 700
                }}
              >
                DROWORANG
              </div>
            </div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(0.85rem, 1.4vw, 1.2rem)',
                letterSpacing: '0.35em',
                color: 'var(--gold)',
                textTransform: 'uppercase',
                fontWeight: 700,
                marginBottom: '18px'
              }}
            >
              INTERNATIONAL PVT. LTD.
            </div>
            <p style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.25rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
              “Premium Leather. Global Standards.”
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '14px' }}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.72rem',
                letterSpacing: '0.22em',
                color: 'var(--gold-dark)',
                fontWeight: 700,
                textTransform: 'uppercase'
              }}
            >
              CONNECT WITH US
            </div>

            {/* Social Media Logos Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              {(companyData.socials || []).map((social) => {
                const renderIcon = () => {
                  switch (social.name) {
                    case 'LinkedIn': return <Linkedin size={19} />;
                    case 'Instagram': return <Instagram size={19} />;
                    case 'X (Twitter)': return <XIcon size={17} />;
                    case 'Facebook': return <Facebook size={19} />;
                    case 'YouTube': return <Youtube size={19} />;
                    default: return null;
                  }
                };

                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor={social.name.toUpperCase()}
                    aria-label={`Droworang on ${social.name}`}
                    title={`Follow Droworang on ${social.name}`}
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      background: '#ffffff',
                      border: '1.5px solid var(--gold-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--leather-espresso)',
                      boxShadow: '0 4px 15px rgba(58, 33, 21, 0.06)',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--leather-espresso)';
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.borderColor = 'var(--gold)';
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 8px 22px rgba(153, 115, 58, 0.25)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#ffffff';
                      e.currentTarget.style.color = 'var(--leather-espresso)';
                      e.currentTarget.style.borderColor = 'var(--gold-border)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(58, 33, 21, 0.06)';
                    }}
                  >
                    {renderIcon()}
                  </a>
                );
              })}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold)', fontSize: '0.82rem', fontFamily: 'var(--font-display)', fontWeight: 600, marginTop: '4px' }}>
              <ShieldCheck size={16} />
              <span>Government of India NOC Certified Exporter</span>
            </div>
          </div>
        </div>

        {/* 4 Navigation Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '40px',
            marginBottom: '70px'
          }}
        >
          {/* Col 1: Corporate Essence */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.78rem', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '20px', fontWeight: 700 }}>
              CORPORATE PROFILE
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '20px' }}>
              Founded by Mr. Yatish Bhandari in Haldwani, Uttarakhand, India. Serving international fashion labels, department stores, and European wholesalers with bespoke leather OEM/ODM manufacturing.
            </p>
            <div style={{ fontSize: '0.82rem', color: 'var(--cream-muted)' }}>
              Registration: <strong style={{ color: 'var(--cream)' }}>DGFT / Govt of India Compliant</strong>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.78rem', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '20px', fontWeight: 700 }}>
              QUICK NAVIGATION
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'Home Experience', view: 'home' },
                { label: 'About Our Atelier', view: 'about' },
                { label: 'Export Catalog', view: 'products' },
                { label: 'Artisanal Craftsmanship', view: 'home', hash: '#craft' },
                { label: 'Government Certifications', view: 'certifications' },
                { label: 'Market Insights & Blog', view: 'blog' },
                { label: 'Contact Leadership', view: 'contact' }
              ].map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => {
                      onNavigate(link.view);
                      if (link.hash) {
                        setTimeout(() => {
                          const el = document.querySelector(link.hash);
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      } else {
                        scrollToTop();
                      }
                    }}
                    data-cursor="GO"
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-secondary)',
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'color var(--transition-fast)',
                      padding: 0
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Export Product Categories */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.78rem', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '20px', fontWeight: 700 }}>
              EXPORT PRODUCT PILLARS
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {categories.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => {
                      onNavigate('products');
                      scrollToTop();
                    }}
                    data-cursor="VIEW"
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-secondary)',
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'color var(--transition-fast)',
                      padding: 0
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
                  >
                    {c.title}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    onNavigate('products');
                    scrollToTop();
                  }}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '0.88rem', cursor: 'pointer', padding: 0 }}
                >
                  Custom OEM / Private Label Tech Packs
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Contact Coordinates */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.78rem', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '20px', fontWeight: 700 }}>
              FACTORY & EXPORT HEADQUARTERS
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <MapPin size={18} color="var(--gold)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>{companyData.headquarters.fullAddress}</span>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Phone size={18} color="var(--gold)" style={{ flexShrink: 0 }} />
                <a href={`tel:${companyData.contact.phone}`} style={{ color: 'var(--leather-espresso)', textDecoration: 'none', fontWeight: 600 }}>
                  {companyData.contact.phoneDisplay}
                </a>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Mail size={18} color="var(--gold)" style={{ flexShrink: 0 }} />
                <a href={`mailto:${companyData.contact.email}`} style={{ color: 'var(--leather-espresso)', textDecoration: 'none', fontWeight: 500 }}>
                  {companyData.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Strip */}
        <div
          style={{
            paddingTop: '32px',
            borderTop: '1px solid rgba(153, 115, 58, 0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '0.78rem',
            color: 'var(--text-muted)'
          }}
        >
          <div>
            © {new Date().getFullYear()} Droworang International Pvt. Ltd. All Rights Reserved. Founded by Mr. Yatish Bhandari.
          </div>

          <div style={{ display: 'flex', gap: '24px' }}>
            <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
            <span style={{ cursor: 'pointer' }}>Terms & Conditions</span>
            <span style={{ cursor: 'pointer' }}>Export Compliance Notice</span>
          </div>

          <button
            onClick={scrollToTop}
            data-cursor="TOP"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--gold)',
              fontFamily: 'var(--font-display)',
              fontSize: '0.76rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              cursor: 'pointer',
              textTransform: 'uppercase'
            }}
          >
            BACK TO TOP ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
