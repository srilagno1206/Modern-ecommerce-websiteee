import React, { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { categories, products } from '../data/productsData';

export default function ProductShowcase({ onSelectProduct, onExploreAll }) {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
  };

  const handleScroll = (direction) => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = window.innerWidth > 768 ? 650 : 320;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const filteredProducts = activeTab === 'all'
    ? products
    : products.filter(p => p.categorySlug === activeTab);

  return (
    <section
      id="products"
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg-secondary)',
        padding: '130px 0 110px',
        overflow: 'hidden'
      }}
    >
      {/* Background ambient lighting */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          right: '-5%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(206, 178, 137, 0.2) 0%, transparent 65%)',
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }}
      />

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 24px' }}>
        {/* Section Header with Navigation Controls */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '40px',
            flexWrap: 'wrap',
            gap: '24px'
          }}
        >
          <div>
            <div className="section-eyebrow">GLOBAL EXPORT PORTFOLIO</div>
            <h2 className="section-title" style={{ marginBottom: '12px' }}>
              WHAT WE EXPORT.
            </h2>
            <p className="section-lead">
              Precision-crafted leather goods certified for European & international markets.
            </p>
          </div>

          {/* Controls: Prev/Next Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              onClick={() => handleScroll('left')}
              data-cursor="PREV"
              aria-label="Scroll left"
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: '#ffffff',
                border: '1px solid var(--gold-border)',
                color: canScrollLeft ? 'var(--gold)' : 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: canScrollLeft ? 'pointer' : 'default',
                transition: 'all var(--transition-fast)',
                boxShadow: '0 4px 15px rgba(58, 33, 21, 0.08)'
              }}
            >
              <ArrowLeft size={20} />
            </button>

            <button
              onClick={() => handleScroll('right')}
              data-cursor="NEXT"
              aria-label="Scroll right"
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: '#ffffff',
                border: '1px solid var(--gold)',
                color: 'var(--gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: canScrollRight ? 'pointer' : 'default',
                transition: 'all var(--transition-fast)',
                boxShadow: '0 4px 15px rgba(58, 33, 21, 0.08)'
              }}
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            overflowX: 'auto',
            paddingBottom: '16px',
            marginBottom: '40px'
          }}
        >
          <button
            onClick={() => setActiveTab('all')}
            style={{
              padding: '10px 22px',
              borderRadius: '99px',
              border: activeTab === 'all' ? '1px solid var(--gold)' : '1px solid rgba(153, 115, 58, 0.25)',
              backgroundColor: activeTab === 'all' ? '#1a110b' : '#ffffff',
              color: activeTab === 'all' ? '#ffffff' : 'var(--text-secondary)',
              fontFamily: 'var(--font-display)',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 8px rgba(58, 33, 21, 0.05)',
              transition: 'all var(--transition-fast)'
            }}
          >
            ALL COLLECTIONS ({products.length})
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.slug)}
              style={{
                padding: '10px 22px',
                borderRadius: '99px',
                border: activeTab === cat.slug ? '1px solid var(--gold)' : '1px solid rgba(153, 115, 58, 0.25)',
                backgroundColor: activeTab === cat.slug ? '#1a110b' : '#ffffff',
                color: activeTab === cat.slug ? '#ffffff' : 'var(--text-secondary)',
                fontFamily: 'var(--font-display)',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 8px rgba(58, 33, 21, 0.05)',
                transition: 'all var(--transition-fast)'
              }}
            >
              {cat.number} / {cat.title.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* HORIZONTAL SCROLLING GALLERY (LIGHT LUXURY) */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        style={{
          display: 'flex',
          gap: '32px',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          padding: '20px 24px 40px',
          maxWidth: '100%',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
        className="horizontal-product-track"
      >
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            onClick={() => onSelectProduct(prod)}
            data-cursor="INSPECT"
            style={{
              flex: '0 0 min(680px, 86vw)',
              scrollSnapAlign: 'start',
              position: 'relative',
              borderRadius: '24px',
              background: '#ffffff',
              border: '1px solid var(--gold-border)',
              boxShadow: '0 20px 45px -10px rgba(58, 33, 21, 0.12)',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform var(--transition-smooth), border-color var(--transition-smooth), box-shadow var(--transition-smooth)'
            }}
            className="product-card-hover"
          >
            {/* Split layout: Large Product Visual + Editorial Details */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                minHeight: '440px'
              }}
              className="product-card-grid"
            >
              {/* Product Visual Container */}
              <div
                style={{
                  position: 'relative',
                  backgroundColor: '#f8f4ee',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '24px'
                }}
              >
                <img
                  src={prod.image}
                  alt={prod.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '16px',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  className="product-img-zoom"
                />

                {/* Badge */}
                {prod.badge && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '20px',
                      left: '20px',
                      padding: '6px 14px',
                      borderRadius: '99px',
                      background: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid var(--gold-border)',
                      backdropFilter: 'blur(10px)',
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      letterSpacing: '0.15em',
                      color: 'var(--gold)',
                      textTransform: 'uppercase',
                      boxShadow: '0 4px 12px rgba(58, 33, 21, 0.08)'
                    }}
                  >
                    {prod.badge}
                  </div>
                )}
              </div>

              {/* Product Editorial Details */}
              <div
                style={{
                  padding: '36px 32px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.7rem',
                      letterSpacing: '0.22em',
                      color: 'var(--gold)',
                      textTransform: 'uppercase',
                      marginBottom: '8px',
                      fontWeight: 700
                    }}
                  >
                    {prod.category}
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.55rem',
                      lineHeight: 1.25,
                      color: 'var(--leather-espresso)',
                      marginBottom: '12px'
                    }}
                  >
                    {prod.name}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                      marginBottom: '20px'
                    }}
                  >
                    {prod.shortDescription}
                  </p>

                  {/* Micro Specs */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      padding: '14px',
                      borderRadius: '10px',
                      background: 'var(--bg-secondary)',
                      border: '1px solid rgba(153, 115, 58, 0.15)',
                      marginBottom: '20px'
                    }}
                  >
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      <strong style={{ color: 'var(--leather-espresso)' }}>Leather:</strong> {prod.leatherType}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      <strong style={{ color: 'var(--leather-espresso)' }}>MOQ:</strong> {prod.moq}
                    </div>
                  </div>
                </div>

                {/* Explore Action Button */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(153, 115, 58, 0.15)'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      color: 'var(--gold)',
                      textTransform: 'uppercase',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    VIEW SPECIFICATIONS <ArrowRight size={15} />
                  </span>

                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.74rem',
                      color: 'var(--text-muted)'
                    }}
                  >
                    {prod.sku}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Full Catalog Action */}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button
          onClick={onExploreAll}
          data-cursor="ALL"
          className="btn-secondary"
        >
          <span>VIEW COMPLETE B2B CATALOG ({products.length} PRODUCTS)</span>
          <ArrowRight size={16} className="btn-icon" />
        </button>
      </div>

      <style>{`
        .horizontal-product-track::-webkit-scrollbar {
          display: none;
        }
        .product-card-hover:hover {
          border-color: var(--gold) !important;
          box-shadow: 0 25px 55px -12px rgba(58, 33, 21, 0.2) !important;
          transform: translateY(-6px);
        }
        .product-card-hover:hover .product-img-zoom {
          transform: scale(1.05);
        }
        @media (max-width: 768px) {
          .product-card-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
