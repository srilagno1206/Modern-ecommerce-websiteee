import React, { useState } from 'react';
import { ArrowRight, Clock, Calendar, X } from 'lucide-react';
import { blogPosts } from '../data/blogData';

export default function BlogSection({ onSelectPost }) {
  const [readingPost, setReadingPost] = useState(null);

  return (
    <section
      id="blog"
      style={{
        position: 'relative',
        backgroundColor: '#fbf8f3',
        padding: '130px 24px',
        borderTop: '1px solid rgba(153, 115, 58, 0.18)',
        borderBottom: '1px solid rgba(153, 115, 58, 0.18)',
        overflow: 'hidden'
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
            INDUSTRY PERSPECTIVES & EXPORT INTELLIGENCE
          </div>
          <h2 className="section-title">
            INSIGHTS & STORIES.
          </h2>
          <p className="section-lead" style={{ margin: '0 auto' }}>
            Analysis and guidance on European procurement benchmarks, material craftsmanship, and international B2B export logistics.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px'
          }}
        >
          {blogPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setReadingPost(post)}
              data-cursor="READ"
              style={{
                borderRadius: '20px',
                background: '#ffffff',
                border: '1px solid var(--gold-border)',
                boxShadow: '0 12px 35px rgba(58, 33, 21, 0.06)',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease'
              }}
              className="blog-card"
            >
              {/* Image Container */}
              <div
                style={{
                  height: '240px',
                  width: '100%',
                  overflow: 'hidden',
                  position: 'relative',
                  backgroundColor: '#f5efe6'
                }}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  className="blog-img"
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    padding: '6px 14px',
                    borderRadius: '99px',
                    background: 'rgba(255, 255, 255, 0.94)',
                    border: '1px solid var(--gold-border)',
                    backdropFilter: 'blur(10px)',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    color: 'var(--gold-dark)',
                    textTransform: 'uppercase',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                  }}
                >
                  {post.category}
                </div>
              </div>

              {/* Text Body */}
              <div style={{ padding: '32px 28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '14px', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={14} /> {post.date}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={14} /> {post.readTime}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.45rem',
                    lineHeight: 1.25,
                    color: 'var(--leather-espresso)',
                    marginBottom: '14px',
                    fontWeight: 700,
                    transition: 'color 0.2s ease'
                  }}
                  className="blog-title"
                >
                  {post.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.88rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    marginBottom: '24px'
                  }}
                >
                  {post.excerpt}
                </p>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    color: 'var(--gold-dark)',
                    textTransform: 'uppercase'
                  }}
                >
                  <span>READ ARTICLE</span>
                  <ArrowRight size={15} className="blog-arrow" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Reader Lightbox Modal */}
      {readingPost && (
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
          onClick={() => setReadingPost(null)}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '820px',
              maxHeight: '90vh',
              overflowY: 'auto',
              backgroundColor: '#ffffff',
              border: '1px solid var(--gold-border)',
              borderRadius: '24px',
              padding: '40px',
              boxShadow: '0 30px 80px rgba(58, 33, 21, 0.2)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setReadingPost(null)}
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
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>

            <div style={{ height: '320px', borderRadius: '16px', overflow: 'hidden', marginBottom: '28px', background: '#f5efe6' }}>
              <img src={readingPost.image} alt={readingPost.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.72rem', letterSpacing: '0.2em', color: 'var(--gold-dark)', textTransform: 'uppercase', marginBottom: '10px', fontWeight: 700 }}>
              {readingPost.category} • {readingPost.readTime}
            </div>

            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 2.8vw, 2.4rem)', color: 'var(--leather-espresso)', lineHeight: 1.2, marginBottom: '20px', fontWeight: 700 }}>
              {readingPost.title}
            </h2>

            <p style={{ fontStyle: 'italic', fontFamily: 'var(--font-editorial)', fontSize: '1.25rem', color: 'var(--leather-cognac)', lineHeight: 1.5, marginBottom: '24px' }}>
              {readingPost.excerpt}
            </p>

            <div style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '32px' }}>
              {readingPost.content}
            </div>

            <button
              onClick={() => setReadingPost(null)}
              className="btn-primary"
              style={{ padding: '14px 30px' }}
            >
              <span>RETURN TO INSIGHTS</span>
            </button>
          </div>
        </div>
      )}

      <style>{`
        .blog-card:hover {
          transform: translateY(-8px);
          border-color: var(--gold) !important;
          box-shadow: 0 25px 50px -10px rgba(58, 33, 21, 0.14), 0 0 30px var(--gold-glow) !important;
        }
        .blog-card:hover .blog-img {
          transform: scale(1.08);
        }
        .blog-card:hover .blog-arrow {
          transform: translateX(6px);
        }
        .blog-arrow {
          transition: transform 0.2s ease;
        }
      `}</style>
    </section>
  );
}
