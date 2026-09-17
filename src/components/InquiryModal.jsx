import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ShieldCheck, ArrowRight, Upload, Send, Building, Mail, Phone, Globe } from 'lucide-react';
import { companyData } from '../data/companyData';
import { categories } from '../data/productsData';

export default function InquiryModal({ isOpen, onClose, initialProduct = null }) {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    country: '',
    category: initialProduct ? initialProduct.category : 'Leather Bags',
    quantity: '100 - 300 Units',
    message: initialProduct ? `Inquiring about specifications and OEM production for ${initialProduct.name} (${initialProduct.sku}).` : '',
    fileName: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (initialProduct) {
      setFormData((prev) => ({
        ...prev,
        category: initialProduct.category,
        message: `Inquiring about pricing, MOQ, and customization options for ${initialProduct.name} (${initialProduct.sku}).`
      }));
    }
  }, [initialProduct]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Valid corporate email required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone / WhatsApp number required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    // Simulate luxury API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

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
          maxWidth: '840px',
          maxHeight: '92vh',
          backgroundColor: '#ffffff',
          border: '1px solid var(--gold-border)',
          borderRadius: '24px',
          boxShadow: '0 30px 80px rgba(58, 33, 21, 0.2), 0 0 50px rgba(153, 115, 58, 0.15)',
          overflowY: 'auto',
          padding: '48px 40px'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          data-cursor="CLOSE"
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            width: '40px',
            height: '40px',
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
          <X size={18} />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '36px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.2em',
                  color: 'var(--gold-dark)',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                  fontWeight: 700
                }}
              >
                <ShieldCheck size={16} /> B2B EXPORT PROCUREMENT DESK
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2rem, 3.2vw, 2.8rem)',
                  color: 'var(--leather-espresso)',
                  lineHeight: 1.15,
                  marginBottom: '12px',
                  fontWeight: 700
                }}
              >
                LET'S CREATE SOMETHING TOGETHER.
              </h2>

              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', maxWidth: '580px', margin: '0 auto' }}>
                Request wholesale quotations, sample lead times, or private label manufacturing direct from our Haldwani factory.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Row 1: Full Name & Company Name */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }} className="form-grid-2">
                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--gold-dark)', fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Alexander Vance"
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      borderRadius: '10px',
                      background: '#fbf8f3',
                      border: errors.fullName ? '1px solid #e53935' : '1px solid rgba(153, 115, 58, 0.25)',
                      color: 'var(--leather-espresso)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      fontFamily: 'var(--font-sans)'
                    }}
                  />
                  {errors.fullName && <span style={{ fontSize: '0.72rem', color: '#c62828', marginTop: '4px', display: 'block' }}>{errors.fullName}</span>}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--gold-dark)', fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Company / Brand Name *
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. Vance Leatherworks GmbH"
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      borderRadius: '10px',
                      background: '#fbf8f3',
                      border: errors.companyName ? '1px solid #e53935' : '1px solid rgba(153, 115, 58, 0.25)',
                      color: 'var(--leather-espresso)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      fontFamily: 'var(--font-sans)'
                    }}
                  />
                  {errors.companyName && <span style={{ fontSize: '0.72rem', color: '#c62828', marginTop: '4px', display: 'block' }}>{errors.companyName}</span>}
                </div>
              </div>

              {/* Row 2: Corporate Email & Phone / WhatsApp */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }} className="form-grid-2">
                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--gold-dark)', fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="buyer@domain.com"
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      borderRadius: '10px',
                      background: '#fbf8f3',
                      border: errors.email ? '1px solid #e53935' : '1px solid rgba(153, 115, 58, 0.25)',
                      color: 'var(--leather-espresso)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      fontFamily: 'var(--font-sans)'
                    }}
                  />
                  {errors.email && <span style={{ fontSize: '0.72rem', color: '#c62828', marginTop: '4px', display: 'block' }}>{errors.email}</span>}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--gold-dark)', fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+49 89 123456"
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      borderRadius: '10px',
                      background: '#fbf8f3',
                      border: errors.phone ? '1px solid #e53935' : '1px solid rgba(153, 115, 58, 0.25)',
                      color: 'var(--leather-espresso)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      fontFamily: 'var(--font-sans)'
                    }}
                  />
                  {errors.phone && <span style={{ fontSize: '0.72rem', color: '#c62828', marginTop: '4px', display: 'block' }}>{errors.phone}</span>}
                </div>
              </div>

              {/* Row 3: Destination Country & Product Category */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }} className="form-grid-2">
                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--gold-dark)', fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Destination Country / Port *
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="Germany / Hamburg Port"
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      borderRadius: '10px',
                      background: '#fbf8f3',
                      border: errors.country ? '1px solid #e53935' : '1px solid rgba(153, 115, 58, 0.25)',
                      color: 'var(--leather-espresso)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      fontFamily: 'var(--font-sans)'
                    }}
                  />
                  {errors.country && <span style={{ fontSize: '0.72rem', color: '#c62828', marginTop: '4px', display: 'block' }}>{errors.country}</span>}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--gold-dark)', fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Product Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      borderRadius: '10px',
                      background: '#fbf8f3',
                      border: '1px solid rgba(153, 115, 58, 0.25)',
                      color: 'var(--leather-espresso)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      fontFamily: 'var(--font-sans)',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="Leather Bags">Leather Bags (Briefcases, Totes, Duffels)</option>
                    <option value="Leather Ladies Handbags">Leather Ladies Handbags (Satchels, Clutches)</option>
                    <option value="Leather Wallets & Purses">Leather Wallets & Purses (RFID Shielded)</option>
                    <option value="Small Leather Products">Small Leather Products (Holsters, Clips, Tech)</option>
                    <option value="Custom OEM / ODM Project">Custom OEM / ODM Bespoke Project</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Quantity & File Attachment */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }} className="form-grid-2">
                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--gold-dark)', fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Projected Order Volume
                  </label>
                  <select
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      borderRadius: '10px',
                      background: '#fbf8f3',
                      border: '1px solid rgba(153, 115, 58, 0.25)',
                      color: 'var(--leather-espresso)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      fontFamily: 'var(--font-sans)',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="Sample Order (10 - 50 Units)">Sample Evaluation (10 - 50 Units)</option>
                    <option value="100 - 300 Units">100 - 300 Units (Standard Initial Run)</option>
                    <option value="300 - 1,000 Units">300 - 1,000 Units (Commercial Bulk)</option>
                    <option value="1,000+ Units">1,000+ Units (Enterprise Production)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--gold-dark)', fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Upload Tech Pack / Logo (Optional)
                  </label>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      background: '#fbf8f3',
                      border: '1px dashed rgba(153, 115, 58, 0.35)',
                      cursor: 'pointer',
                      color: 'var(--text-secondary)'
                    }}
                    onClick={() => {
                      const sampleFiles = ['Technical_Spec_Sheet_v1.pdf', 'Brand_Logo_Vector.ai', 'Sample_Color_Palette.pdf'];
                      const randomFile = sampleFiles[Math.floor(Math.random() * sampleFiles.length)];
                      setFormData({ ...formData, fileName: randomFile });
                    }}
                  >
                    <Upload size={18} color="var(--gold)" />
                    <span style={{ fontSize: '0.84rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {formData.fileName || 'Attach PDF / AI / CAD specs'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--gold-dark)', fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Project Details / Customization Specifications
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Detail leather temper, preferred hardware color, target delivery date, or private label debossing requirements..."
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    borderRadius: '10px',
                    background: '#fbf8f3',
                    border: '1px solid rgba(153, 115, 58, 0.25)',
                    color: 'var(--leather-espresso)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    fontFamily: 'var(--font-sans)',
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                data-cursor="SUBMIT"
                className="btn-primary"
                style={{ width: '100%', padding: '16px', marginTop: '10px' }}
              >
                {isSubmitting ? (
                  <span>TRANSMITTING TO FACTORY DESK...</span>
                ) : (
                  <>
                    <span>TRANSMIT OFFICIAL B2B INQUIRY</span>
                    <Send size={16} className="btn-icon" />
                  </>
                )}
              </button>

              {/* Security note */}
              <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Directly reviewed by Founder <strong>Mr. Yatish Bhandari</strong> & the Export Procurement Team. Confidentiality NDA guaranteed.
              </div>
            </form>
          </div>
        ) : (
          /* Animated Luxury Success State */
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'rgba(153, 115, 58, 0.12)',
                border: '2px solid var(--gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--gold-dark)',
                margin: '0 auto 28px',
                boxShadow: '0 0 30px var(--gold-glow)'
              }}
            >
              <CheckCircle2 size={44} />
            </div>

            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', letterSpacing: '0.22em', color: 'var(--gold-dark)', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 700 }}>
              TRANSMISSION SUCCESSFUL
            </div>

            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: 'var(--leather-espresso)', marginBottom: '16px', fontWeight: 700 }}>
              Inquiry Dispatched to Factory Desk.
            </h3>

            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '540px', margin: '0 auto 32px', lineHeight: 1.6 }}>
              Thank you, <strong>{formData.fullName}</strong>. Your export inquiry for <strong>{formData.companyName}</strong> has been assigned to a Senior B2B Accounts Officer. You will receive an official technical estimate and sample lead-time schedule within 24 business hours.
            </p>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 24px',
                borderRadius: '12px',
                background: '#f8f4ee',
                border: '1px solid var(--gold-border)',
                marginBottom: '32px',
                fontSize: '0.85rem',
                color: 'var(--leather-espresso)'
              }}
            >
              <span>Emergency or immediate WhatsApp inquiry:</span>
              <a
                href={`https://wa.me/${companyData.contact.whatsapp}?text=Hello%2C%20I%20have%20submitted%20an%20inquiry%20for%20${formData.companyName}`}
                target="_blank"
                rel="noreferrer"
                style={{ color: '#128C7E', fontWeight: 700, textDecoration: 'none' }}
              >
                +91 82738 00957
              </a>
            </div>

            <div>
              <button
                onClick={handleReset}
                className="btn-primary"
                style={{ padding: '14px 36px' }}
              >
                <span>RETURN TO BROWSING</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 680px) {
          .form-grid-2 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
