import React from 'react';
import { Linkedin, Instagram, Facebook, Youtube } from 'lucide-react';
import { companyData } from '../data/companyData';

// Custom sharp X (Twitter) icon
function XIcon({ size = 16, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const getSocialIcon = (name, size = 18) => {
  switch (name) {
    case 'LinkedIn':
      return <Linkedin size={size} />;
    case 'Instagram':
      return <Instagram size={size} />;
    case 'X (Twitter)':
      return <XIcon size={size - 2} />;
    case 'Facebook':
      return <Facebook size={size} />;
    case 'YouTube':
      return <Youtube size={size} />;
    default:
      return null;
  }
};

export default function SocialSidebar() {
  const socials = companyData.socials || [];

  return (
    <aside
      aria-label="Social Media Channels"
      style={{
        position: 'fixed',
        left: '16px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 990,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
      className="floating-social-sidebar"
    >
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid var(--gold-border)',
          borderRadius: '999px',
          padding: '12px 6px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 12px 35px rgba(58, 33, 21, 0.12)'
        }}
      >
        {/* Subtle Vertical Label */}
        <div
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            fontFamily: 'var(--font-display)',
            fontSize: '0.55rem',
            letterSpacing: '0.25em',
            fontWeight: 800,
            color: 'var(--gold)',
            textTransform: 'uppercase',
            paddingBottom: '4px',
            userSelect: 'none'
          }}
        >
          CONNECT
        </div>

        <div style={{ width: '16px', height: '1px', backgroundColor: 'var(--gold-border)' }} />

        {/* Social Links List */}
        {socials.map((social) => {
          return (
            <div
              key={social.name}
              className="social-item-wrap"
              style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
            >
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor={social.name.toUpperCase()}
                aria-label={social.name}
                className="social-sidebar-btn"
              >
                {getSocialIcon(social.name, 17)}
              </a>

              {/* Fly-out Tooltip */}
              <div className="social-sidebar-tooltip">
                <span>{social.name}</span>
                <span style={{ color: 'var(--gold)' }}>↗</span>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .social-sidebar-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--leather-espresso);
          background-color: transparent;
          border: 1px solid transparent;
          transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
          text-decoration: none;
        }
        .social-sidebar-btn:hover {
          color: #ffffff;
          background-color: var(--leather-espresso);
          border-color: var(--gold);
          transform: scale(1.12);
          box-shadow: 0 4px 14px rgba(153, 115, 58, 0.28);
        }
        .social-sidebar-tooltip {
          position: absolute;
          left: 100%;
          margin-left: 12px;
          white-space: nowrap;
          padding: 6px 14px;
          border-radius: 8px;
          background: var(--leather-espresso);
          color: #ffffff;
          font-family: var(--font-display);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          box-shadow: 0 6px 20px rgba(26, 17, 11, 0.25);
          border: 1px solid var(--gold-border);
          pointer-events: none;
          display: flex;
          align-items: center;
          gap: 6px;
          opacity: 0;
          visibility: hidden;
          transform: translateX(-8px);
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 1000;
        }
        .social-item-wrap:hover .social-sidebar-tooltip {
          opacity: 1;
          visibility: visible;
          transform: translateX(0);
        }
        @media (max-width: 768px) {
          .floating-social-sidebar {
            left: 8px !important;
            transform: scale(0.85) translateY(-50%) !important;
            transform-origin: left center !important;
          }
        }
      `}</style>
    </aside>
  );
}
