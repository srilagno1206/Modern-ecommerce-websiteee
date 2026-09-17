import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, ShieldCheck, Sparkles, PhoneCall } from 'lucide-react';
import { companyData } from '../data/companyData';

export default function Navbar({ activeView, setActiveView, onOpenInquiry }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'HOME', view: 'home' },
    { label: 'STORY', view: 'home', hash: '#story' },
    { label: 'COLLECTIONS', view: 'products' },
    { label: '3D VIEW', view: 'home', hash: '#view-3d' },
    { label: 'CRAFT', view: 'craft' },
    { label: 'WHY US', view: 'why-us' },
    { label: 'CERTIFICATIONS', view: 'certifications' },
    { label: 'INSIGHTS', view: 'blog' },
    { label: 'CONTACT', view: 'contact' }
  ];

  const handleNavClick = (item) => {
    setMobileOpen(false);
    if (activeView !== item.view) {
      setActiveView(item.view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (item.hash) {
        const el = document.querySelector(item.hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 1000,
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          padding: scrolled ? '12px 32px' : '22px 40px',
          backgroundColor: scrolled ? 'rgba(251, 248, 243, 0.94)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(153, 115, 58, 0.2)' : '1px solid transparent',
          boxShadow: scrolled ? '0 10px 30px rgba(58, 33, 21, 0.08)' : 'none'
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {/* Logo & Brand Identity */}
          <button
            onClick={() => {
              setActiveView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            data-cursor="DROWORANG"
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '3px',
              cursor: 'pointer',
              textAlign: 'left',
              padding: 0,
              marginRight: '32px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img
                src="./assets/logo.png"
                alt="DROWORANG"
                style={{
                  height: '34px',
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  const fallback = document.getElementById('navbar-brand-text-fallback');
                  if (fallback) fallback.style.display = 'block';
                }}
              />
              <span
                id="navbar-brand-text-fallback"
                className="font-brand"
                style={{
                  display: 'none',
                  fontSize: '1.4rem',
                  letterSpacing: '0.04em',
                  fontWeight: 700,
                  color: 'var(--leather-espresso)',
                  lineHeight: 1
                }}
              >
                DROWORANG
              </span>
            </div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.62rem',
                letterSpacing: '0.34em',
                color: 'var(--gold)',
                fontWeight: 700,
                marginTop: '4px',
                paddingLeft: '2px'
              }}
            >
              INTERNATIONAL
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '28px'
            }}
            className="desktop-nav"
          >
            {navItems.map((item) => {
              const isActive = activeView === item.view;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  data-cursor="GO"
                  style={{
                    background: 'none',
                    border: 'none',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    color: isActive ? 'var(--gold)' : 'var(--text-secondary)',
                    padding: '8px 0',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'color var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--gold)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = isActive ? 'var(--gold)' : 'var(--text-secondary)';
                  }}
                >
                  {item.label}
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: isActive ? '100%' : '0%',
                      height: '2px',
                      backgroundColor: 'var(--gold)',
                      transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  />
                </button>
              );
            })}
          </nav>

          {/* Right Action CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={onOpenInquiry}
              data-cursor="INQUIRE"
              className="btn-primary"
              style={{
                padding: scrolled ? '11px 24px' : '13px 28px',
                fontSize: '0.78rem',
                letterSpacing: '0.12em',
                display: 'none'
              }}
              id="desktop-inquiry-btn"
            >
              <span>REQUEST AN INQUIRY</span>
              <ArrowUpRight size={15} className="btn-icon" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              data-cursor="MENU"
              style={{
                background: '#ffffff',
                border: '1px solid var(--gold-border)',
                borderRadius: '8px',
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--leather-espresso)',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(58, 33, 21, 0.08)'
              }}
              className="mobile-menu-toggle"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu (Light Luxury Theme) */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999,
          backgroundColor: 'rgba(251, 248, 243, 0.98)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '110px 32px 40px',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
          pointerEvents: mobileOpen ? 'auto' : 'none'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.72rem',
              letterSpacing: '0.2em',
              color: 'var(--gold)',
              textTransform: 'uppercase',
              marginBottom: '8px',
              fontWeight: 700
            }}
          >
            Navigation
          </div>

          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item)}
              style={{
                background: 'none',
                border: 'none',
                textAlign: 'left',
                fontFamily: 'var(--font-serif)',
                fontSize: '1.8rem',
                color: activeView === item.view ? 'var(--gold)' : 'var(--leather-espresso)',
                cursor: 'pointer',
                padding: '6px 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <span>{item.label}</span>
              <ArrowUpRight size={20} color="var(--gold)" opacity={0.6} />
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '30px' }}>
          <button
            onClick={() => {
              setMobileOpen(false);
              onOpenInquiry();
            }}
            className="btn-primary"
            style={{ width: '100%', padding: '16px' }}
          >
            <span>REQUEST AN INQUIRY</span>
            <ArrowUpRight size={16} />
          </button>

          <a
            href={`tel:${companyData.contact.phone}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '14px',
              borderRadius: '99px',
              background: '#ffffff',
              border: '1px solid var(--gold-border)',
              color: 'var(--leather-espresso)',
              textDecoration: 'none',
              fontFamily: 'var(--font-display)',
              fontSize: '0.85rem',
              fontWeight: 700
            }}
          >
            <PhoneCall size={16} color="var(--gold)" />
            <span>Call: {companyData.contact.phoneDisplay}</span>
          </a>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav {
            display: flex !important;
          }
          #desktop-inquiry-btn {
            display: inline-flex !important;
          }
          .mobile-menu-toggle {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
