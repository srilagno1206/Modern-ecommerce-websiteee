import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, ShieldCheck, CheckCircle2, MessageSquare, ArrowRight, Linkedin, Instagram, Facebook, Youtube, Share2 } from 'lucide-react';
import { companyData } from '../data/companyData';

function XIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function ContactView() {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    category: 'Leather Bags',
    quantity: '100 - 300 Units',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div style={{ paddingTop: '100px', backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
      {/* Header */}
      <section style={{ padding: '70px 24px 40px', textAlign: 'center' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
            GLOBAL CLIENT COMMUNICATIONS
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.6rem, 5.2vw, 4.8rem)',
              color: 'var(--leather-espresso)',
              marginBottom: '20px',
              textTransform: 'uppercase',
              fontWeight: 700
            }}
          >
            LET'S CREATE SOMETHING TOGETHER.
          </h1>
          <p className="section-lead" style={{ margin: '0 auto' }}>
            Direct access to our manufacturing leadership and export accounts desk in Haldwani, Nainital. We respond to all overseas wholesale inquiries within 24 hours.
          </p>
        </div>
      </section>

      {/* Main Grid: Contact Cards & Form */}
      <section style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 24px 80px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.2fr)',
            gap: '40px'
          }}
          className="contact-layout-grid"
        >
          {/* Left Column: Authentic Contact Info Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Direct Phone */}
            <div className="luxury-card" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(153, 115, 58, 0.12)', border: '1px solid var(--gold-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-dark)', flexShrink: 0 }}>
                  <Phone size={22} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.72rem', letterSpacing: '0.18em', color: 'var(--gold-dark)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 700 }}>
                    DIRECT B2B HOTLINE & WHATSAPP
                  </div>
                  <a
                    href={`tel:${companyData.contact.phone}`}
                    style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--leather-espresso)', textDecoration: 'none', fontWeight: 700, display: 'block', marginBottom: '4px' }}
                  >
                    {companyData.contact.phoneDisplay}
                  </a>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    Immediate assistance for European & overseas trade inquiries
                  </p>
                </div>
              </div>
            </div>

            {/* Official Email */}
            <div className="luxury-card" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(153, 115, 58, 0.12)', border: '1px solid var(--gold-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-dark)', flexShrink: 0 }}>
                  <Mail size={22} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.72rem', letterSpacing: '0.18em', color: 'var(--gold-dark)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 700 }}>
                    OFFICIAL CORRESPONDENCE
                  </div>
                  <a
                    href={`mailto:${companyData.contact.email}`}
                    style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--leather-espresso)', textDecoration: 'none', fontWeight: 700, display: 'block', marginBottom: '4px' }}
                  >
                    {companyData.contact.email}
                  </a>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    Technical spec sheets, sample requisitions, and contract inquiries
                  </p>
                </div>
              </div>
            </div>

            {/* Registered Factory Address */}
            <div className="luxury-card" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(153, 115, 58, 0.12)', border: '1px solid var(--gold-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-dark)', flexShrink: 0 }}>
                  <MapPin size={22} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.72rem', letterSpacing: '0.18em', color: 'var(--gold-dark)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 700 }}>
                    HEADQUARTERS & MANUFACTURING FACILITY
                  </div>
                  <address style={{ fontStyle: 'normal', fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: 'var(--leather-espresso)', lineHeight: 1.5, marginBottom: '6px', fontWeight: 600 }}>
                    {companyData.headquarters.fullAddress}
                  </address>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    State of Uttarakhand, India • PIN: 263139
                  </p>
                </div>
              </div>
            </div>

            {/* Official Social Channels */}
            <div className="luxury-card" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(153, 115, 58, 0.12)', border: '1px solid var(--gold-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-dark)', flexShrink: 0 }}>
                  <Share2 size={22} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.72rem', letterSpacing: '0.18em', color: 'var(--gold-dark)', textTransform: 'uppercase', marginBottom: '6px', fontWeight: 700 }}>
                    OFFICIAL SOCIAL NETWORKS
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                    Follow our latest runway collections, artisanal workshop updates, and export showcases:
                  </p>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {(companyData.socials || []).map((social) => {
                      const renderSocialIcon = () => {
                        switch (social.name) {
                          case 'LinkedIn': return <Linkedin size={18} />;
                          case 'Instagram': return <Instagram size={18} />;
                          case 'X (Twitter)': return <XIcon size={16} />;
                          case 'Facebook': return <Facebook size={18} />;
                          case 'YouTube': return <Youtube size={18} />;
                          default: return null;
                        }
                      };
                      return (
                        <a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={social.name}
                          data-cursor={social.name.toUpperCase()}
                          style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '50%',
                            background: '#ffffff',
                            border: '1px solid var(--gold-border)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--leather-espresso)',
                            textDecoration: 'none',
                            transition: 'all 0.25s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--leather-espresso)';
                            e.currentTarget.style.color = '#ffffff';
                            e.currentTarget.style.borderColor = 'var(--gold)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#ffffff';
                            e.currentTarget.style.color = 'var(--leather-espresso)';
                            e.currentTarget.style.borderColor = 'var(--gold-border)';
                            e.currentTarget.style.transform = 'translateY(0)';
                          }}
                        >
                          {renderSocialIcon()}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Interactive Embed */}
            <div
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid var(--gold-border)',
                height: '240px',
                position: 'relative',
                boxShadow: '0 8px 24px rgba(58, 33, 21, 0.05)'
              }}
            >
              <iframe
                title="Droworang Haldwani Headquarters"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111533.91859664536!2d79.44474773831818!3d29.219808386348123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a09ad150244799%3A0x6782fb993708e2f6!2sHaldwani%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'contrast(105%)' }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: Embedded RFQ Form */}
          <div
            style={{
              padding: '44px',
              borderRadius: '24px',
              background: '#ffffff',
              border: '1px solid var(--gold-border)',
              boxShadow: '0 20px 50px rgba(58, 33, 21, 0.08)'
            }}
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.72rem', letterSpacing: '0.2em', color: 'var(--gold-dark)', textTransform: 'uppercase', marginBottom: '6px', fontWeight: 700 }}>
                    DIRECT FACTORY QUOTATION
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--leather-espresso)', marginBottom: '8px', fontWeight: 700 }}>
                    Request B2B Pricing & Specifications
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                    Fill out your projected manufacturing requirements for an official dispatch schedule.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--gold-dark)', marginBottom: '6px', fontFamily: 'var(--font-display)', fontWeight: 700 }}>FULL NAME *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Klaus Hoffman"
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', background: '#fbf8f3', border: '1px solid rgba(153, 115, 58, 0.25)', color: 'var(--leather-espresso)', fontSize: '0.9rem', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--gold-dark)', marginBottom: '6px', fontFamily: 'var(--font-display)', fontWeight: 700 }}>COMPANY NAME *</label>
                    <input
                      type="text"
                      required
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="e.g. Bavaria Leather Imports"
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', background: '#fbf8f3', border: '1px solid rgba(153, 115, 58, 0.25)', color: 'var(--leather-espresso)', fontSize: '0.9rem', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--gold-dark)', marginBottom: '6px', fontFamily: 'var(--font-display)', fontWeight: 700 }}>EMAIL ADDRESS *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="buyer@bavaria-leather.de"
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', background: '#fbf8f3', border: '1px solid rgba(153, 115, 58, 0.25)', color: 'var(--leather-espresso)', fontSize: '0.9rem', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--gold-dark)', marginBottom: '6px', fontFamily: 'var(--font-display)', fontWeight: 700 }}>PHONE / WHATSAPP *</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+49 89 555 0192"
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', background: '#fbf8f3', border: '1px solid rgba(153, 115, 58, 0.25)', color: 'var(--leather-espresso)', fontSize: '0.9rem', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--gold-dark)', marginBottom: '6px', fontFamily: 'var(--font-display)', fontWeight: 700 }}>DESTINATION COUNTRY *</label>
                    <input
                      type="text"
                      required
                      value={form.country}
                      onChange={(e) => setForm({ ...form, country: e.target.value })}
                      placeholder="Germany / UK / USA"
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', background: '#fbf8f3', border: '1px solid rgba(153, 115, 58, 0.25)', color: 'var(--leather-espresso)', fontSize: '0.9rem', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--gold-dark)', marginBottom: '6px', fontFamily: 'var(--font-display)', fontWeight: 700 }}>PRODUCT CATEGORY</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', background: '#fbf8f3', border: '1px solid rgba(153, 115, 58, 0.25)', color: 'var(--leather-espresso)', fontSize: '0.9rem', outline: 'none' }}
                    >
                      <option value="Leather Bags">Leather Bags</option>
                      <option value="Leather Ladies Handbags">Leather Ladies Handbags</option>
                      <option value="Leather Wallets & Purses">Leather Wallets & Purses</option>
                      <option value="Small Leather Products">Small Leather Products</option>
                      <option value="Custom OEM / ODM">Custom OEM / ODM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--gold-dark)', marginBottom: '6px', fontFamily: 'var(--font-display)', fontWeight: 700 }}>SPECIFICATIONS / QUANTITY</label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Provide details on quantity, target leather finish, private labeling requirements, and delivery schedule..."
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', background: '#fbf8f3', border: '1px solid rgba(153, 115, 58, 0.25)', color: 'var(--leather-espresso)', fontSize: '0.9rem', outline: 'none', resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  data-cursor="TRANSMIT"
                  className="btn-primary"
                  style={{ width: '100%', padding: '16px' }}
                >
                  {submitting ? 'TRANSMITTING INQUIRY...' : 'TRANSMIT INQUIRY TO FACTORY'}
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <CheckCircle2 size={50} color="var(--gold-dark)" style={{ margin: '0 auto 20px' }} />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--leather-espresso)', marginBottom: '12px', fontWeight: 700 }}>
                  Inquiry Received.
                </h3>
                <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                  Our export procurement team will review your specifications and contact you directly via email and WhatsApp.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-secondary"
                  style={{ padding: '12px 28px' }}
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .contact-layout-grid {
            grid-template-columns: 1fr !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
