import React, { useState, useEffect } from 'react';
import CinematicStorytelling from './components/CinematicStorytelling';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import SplitIntro from './components/SplitIntro';
import ProductShowcase from './components/ProductShowcase';
import Product3DViewer from './components/Product3DViewer';
import ProductDetailModal from './components/ProductDetailModal';
import Craftsmanship from './components/Craftsmanship';
import GlobalExportMap from './components/GlobalExportMap';
import WhyChooseUs from './components/WhyChooseUs';
import Certifications from './components/Certifications';
import StatsSection from './components/StatsSection';
import Testimonials from './components/Testimonials';
import BlogSection from './components/BlogSection';
import InquiryModal from './components/InquiryModal';
import AboutView from './components/AboutView';
import ProductsView from './components/ProductsView';
import ContactView from './components/ContactView';
import WhatsAppButton from './components/WhatsAppButton';
import Footer from './components/Footer';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryProduct, setInquiryProduct] = useState(null);
  const [scrollWidth, setScrollWidth] = useState('0%');

  // Top scroll progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scrollPercentage = (totalScroll / windowHeight) * 100;
        setScrollWidth(`${scrollPercentage}%`);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenInquiry = (product = null) => {
    setInquiryProduct(product);
    setInquiryOpen(true);
  };

  const handleNavigate = (view) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-root" style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* Top Scroll Progress Indicator */}
      <div id="scroll-progress-bar" style={{ width: scrollWidth }} />

      {/* Interactive Magnetic Custom Cursor */}
      <CustomCursor />

      {/* Sticky Glassmorphic Navbar (Light Luxury Theme) */}
      <Navbar
        activeView={activeView}
        setActiveView={handleNavigate}
        onOpenInquiry={() => handleOpenInquiry(null)}
      />

      {/* Main View Router */}
      <main style={{ minHeight: '80vh' }}>
        {activeView === 'home' && (
          <>
            {/* GSAP ScrollTrigger Master Timeline Storytelling Section */}
            <CinematicStorytelling
              onOpenInquiry={() => handleOpenInquiry(null)}
            />

            {/* Seamless Main Homepage Flow (Zero-Gap Release from Pinned Storytelling) */}
            <div id="homepage-content">
              {/* 1. Editorial Split Introduction */}
              <SplitIntro
                onReadStory={() => handleNavigate('about')}
                onOpenInquiry={() => handleOpenInquiry(null)}
              />

              {/* 2. Curated 4-Pillar Export Showcase (Spacious & Minimal) */}
              <ProductShowcase
                onSelectProduct={(prod) => setSelectedProduct(prod)}
                onExploreAll={() => handleNavigate('products')}
              />

              {/* 3. Interactive 3D Product Inspection ("VIEW PRODUCT IN 3D") */}
              <Product3DViewer onOpenInquiry={handleOpenInquiry} />

              {/* 4. Global Export Map (Sovereign Origin & Global Trade Corridors) */}
              <GlobalExportMap />

            {/* 5. Minimalist B2B Partnership Banner */}
            <section
              style={{
                position: 'relative',
                padding: '120px 24px',
                backgroundColor: 'var(--bg-secondary)',
                borderTop: '1px solid rgba(153, 115, 58, 0.15)',
                borderBottom: '1px solid rgba(153, 115, 58, 0.15)',
                overflow: 'hidden',
                textAlign: 'center'
              }}
            >
              <div style={{ maxWidth: '960px', margin: '0 auto', position: 'relative', zIndex: 5 }}>
                <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
                  DIRECT FACTORY PROCUREMENT
                </div>

                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(2.4rem, 4.5vw, 4.2rem)',
                    lineHeight: 1.1,
                    color: 'var(--leather-espresso)',
                    marginBottom: '24px',
                    textTransform: 'uppercase'
                  }}
                >
                  BESPOKE OEM & VOLUME EXPORT CONTRACTS.
                </h2>

                <p
                  style={{
                    fontSize: '1.05rem',
                    color: 'var(--text-secondary)',
                    maxWidth: '680px',
                    margin: '0 auto 40px',
                    lineHeight: 1.75
                  }}
                >
                  Serving European wholesale distributors, boutique retail chains, and international luxury fashion houses with direct factory pricing and Government of India NOC clearance.
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => handleOpenInquiry(null)}
                    data-cursor="INQUIRE"
                    className="btn-primary"
                    style={{ padding: '18px 42px', fontSize: '0.88rem' }}
                  >
                    <span>REQUEST OFFICIAL EXPORT PROPOSAL</span>
                    <ArrowRight size={16} className="btn-icon" />
                  </button>

                  <button
                    onClick={() => handleNavigate('contact')}
                    data-cursor="CONTACT"
                    className="btn-secondary"
                    style={{ padding: '18px 36px', fontSize: '0.88rem' }}
                  >
                    <span>CONTACT FACTORY LEADERSHIP</span>
                  </button>
                </div>
              </div>
            </section>
            </div>
          </>
        )}

        {activeView === 'about' && (
          <AboutView onOpenInquiry={() => handleOpenInquiry(null)} />
        )}

        {activeView === 'products' && (
          <ProductsView
            onSelectProduct={(prod) => setSelectedProduct(prod)}
            onOpenInquiry={() => handleOpenInquiry(null)}
          />
        )}

        {activeView === 'craft' && (
          <div style={{ paddingTop: '80px' }}>
            <Craftsmanship />
            <GlobalExportMap />
          </div>
        )}

        {activeView === 'why-us' && (
          <div style={{ paddingTop: '80px' }}>
            <WhyChooseUs />
            <StatsSection />
            <Testimonials />
          </div>
        )}

        {activeView === 'certifications' && (
          <div style={{ paddingTop: '80px' }}>
            <Certifications />
            <StatsSection />
          </div>
        )}

        {activeView === 'blog' && (
          <div style={{ paddingTop: '80px' }}>
            <BlogSection />
          </div>
        )}

        {activeView === 'contact' && (
          <ContactView />
        )}
      </main>

      {/* Floating WhatsApp Quick-Concierge */}
      <WhatsAppButton />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onRequestProduct={(prod) => handleOpenInquiry(prod)}
        />
      )}

      {/* B2B RFQ Inquiry Modal */}
      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => {
          setInquiryOpen(false);
          setInquiryProduct(null);
        }}
        initialProduct={inquiryProduct}
      />

      {/* Grand Luxury Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenInquiry={() => handleOpenInquiry(null)}
      />
    </div>
  );
}
