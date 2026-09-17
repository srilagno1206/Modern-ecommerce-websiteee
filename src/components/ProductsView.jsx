import React, { useState } from 'react';
import { Search, SlidersHorizontal, ArrowRight, ShieldCheck, Box } from 'lucide-react';
import { categories, products } from '../data/productsData';

export default function ProductsView({ onSelectProduct, onOpenInquiry }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = products.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.categorySlug === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.leatherType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div style={{ paddingTop: '100px', backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
      {/* Header */}
      <section style={{ padding: '70px 24px 40px', textAlign: 'center' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
            EXPORT PRODUCT CATALOG
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.6rem, 5vw, 4.4rem)',
              color: 'var(--leather-espresso)',
              marginBottom: '20px',
              textTransform: 'uppercase',
              fontWeight: 700
            }}
          >
            HANDCRAFTED FOR GLOBAL MARKETS
          </h1>
          <p className="section-lead" style={{ margin: '0 auto' }}>
            Browse our certified export portfolio. All articles are manufactured to international luxury benchmarks and available for private label OEM/ODM development.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 24px 40px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
            flexWrap: 'wrap',
            padding: '20px 28px',
            borderRadius: '16px',
            background: '#ffffff',
            border: '1px solid var(--gold-border)',
            boxShadow: '0 8px 30px rgba(58, 33, 21, 0.06)'
          }}
        >
          {/* Category Pills */}
          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
            <button
              onClick={() => setSelectedCategory('all')}
              style={{
                padding: '8px 18px',
                borderRadius: '99px',
                background: selectedCategory === 'all' ? 'linear-gradient(135deg, #241810, #160e09)' : '#f5efe6',
                border: selectedCategory === 'all' ? '1px solid var(--gold)' : '1px solid rgba(153, 115, 58, 0.2)',
                color: selectedCategory === 'all' ? '#ffffff' : 'var(--text-secondary)',
                fontFamily: 'var(--font-display)',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              ALL ARTICLES ({products.length})
            </button>

            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.slug)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '99px',
                  background: selectedCategory === c.slug ? 'linear-gradient(135deg, #241810, #160e09)' : '#f5efe6',
                  border: selectedCategory === c.slug ? '1px solid var(--gold)' : '1px solid rgba(153, 115, 58, 0.2)',
                  color: selectedCategory === c.slug ? '#ffffff' : 'var(--text-secondary)',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {c.title.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 18px',
              borderRadius: '99px',
              background: '#fbf8f3',
              border: '1px solid var(--gold-border)',
              minWidth: '260px'
            }}
          >
            <Search size={16} color="var(--gold-dark)" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by leather or style..."
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--leather-espresso)',
                fontSize: '0.84rem',
                outline: 'none',
                width: '100%',
                fontFamily: 'var(--font-sans)'
              }}
            />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <section style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 24px 100px' }}>
        {filtered.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '30px'
            }}
          >
            {filtered.map((prod) => (
              <div
                key={prod.id}
                onClick={() => onSelectProduct(prod)}
                data-cursor="INSPECT"
                style={{
                  borderRadius: '20px',
                  background: '#ffffff',
                  border: '1px solid var(--gold-border)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: '0 12px 30px rgba(58, 33, 21, 0.06)',
                  transition: 'transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease'
                }}
                className="catalog-product-card"
              >
                <div
                  style={{
                    height: '280px',
                    width: '100%',
                    backgroundColor: '#fbf8f3',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px'
                  }}
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '12px',
                      transition: 'transform 0.6s ease'
                    }}
                    className="catalog-img"
                  />

                  {prod.badge && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '16px',
                        left: '16px',
                        padding: '4px 12px',
                        borderRadius: '99px',
                        background: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid var(--gold-border)',
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.66rem',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        color: 'var(--gold-dark)',
                        textTransform: 'uppercase',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                      }}
                    >
                      {prod.badge}
                    </div>
                  )}
                </div>

                <div style={{ padding: '24px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.68rem', letterSpacing: '0.18em', color: 'var(--gold-dark)', textTransform: 'uppercase', marginBottom: '6px', fontWeight: 700 }}>
                    {prod.category}
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--leather-espresso)', marginBottom: '8px', lineHeight: 1.3, fontWeight: 700 }}>
                    {prod.name}
                  </h3>

                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
                    {prod.shortDescription}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '1px solid rgba(153, 115, 58, 0.15)' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      MOQ: <strong style={{ color: 'var(--leather-espresso)' }}>{prod.moq}</strong>
                    </span>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.76rem', color: 'var(--gold-dark)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      SPECS <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '16px' }}>No products match your current search query.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="btn-secondary"
            >
              RESET FILTERS
            </button>
          </div>
        )}

        {/* Bespoke OEM Inquiry Banner */}
        <div
          style={{
            marginTop: '80px',
            padding: '50px 40px',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, #f5efe6 0%, #ebe3d7 100%)',
            border: '1px solid var(--gold-border)',
            boxShadow: '0 15px 40px rgba(58, 33, 21, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '30px'
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.72rem', letterSpacing: '0.2em', color: 'var(--gold-dark)', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 700 }}>
              CUSTOM PRODUCT ENGINEERING
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--leather-espresso)', marginBottom: '8px', fontWeight: 700 }}>
              Require a Custom Leather Design or Tech Pack Development?
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', maxWidth: '640px' }}>
              We engineer custom molds, bespoke leather embossing plates, and proprietary hardware alloys tailored for overseas brand collections.
            </p>
          </div>

          <button
            onClick={onOpenInquiry}
            data-cursor="INQUIRE"
            className="btn-primary"
            style={{ padding: '16px 36px' }}
          >
            <span>REQUEST BESPOKE OEM PROPOSAL</span>
            <ArrowRight size={16} className="btn-icon" />
          </button>
        </div>
      </section>

      <style>{`
        .catalog-product-card:hover {
          transform: translateY(-8px);
          border-color: var(--gold) !important;
          box-shadow: 0 25px 50px -10px rgba(58, 33, 21, 0.16), 0 0 30px var(--gold-glow) !important;
        }
        .catalog-product-card:hover .catalog-img {
          transform: scale(1.06);
        }
      `}</style>
    </div>
  );
}
