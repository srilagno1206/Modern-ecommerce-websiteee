import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Play, Pause, Sparkles } from 'lucide-react';

const TOTAL_FRAMES = 60;

export default function StorytellingJourney({ onOpenInquiry }) {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  // 360 Rotational video state for Chapter 3
  const [currentFrame, setCurrentFrame] = useState(1);
  const [isBagPlaying, setIsBagPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const dragStartX = useRef(0);
  const startFrameRef = useRef(1);

  // Preload 60 frames
  useEffect(() => {
    let count = 0;
    const preloaded = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const numStr = String(i).padStart(3, '0');
      img.src = `./frames/frame_${numStr}.jpg`;
      img.onload = () => {
        count++;
        if (count === TOTAL_FRAMES) setIsLoaded(true);
      };
      preloaded.push(img);
    }
    imagesRef.current = preloaded;
  }, []);

  // Render 360 frame on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = imagesRef.current[currentFrame - 1];
    if (img && img.complete && img.naturalWidth > 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  }, [currentFrame, isLoaded]);

  // Play loop for 360 bag
  useEffect(() => {
    if (!isBagPlaying || isDragging) return;
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev % TOTAL_FRAMES) + 1);
    }, 40);
    return () => clearInterval(interval);
  }, [isBagPlaying, isDragging]);

  // Drag to rotate handlers
  const handleDragStart = (clientX) => {
    setIsDragging(true);
    setIsBagPlaying(false);
    dragStartX.current = clientX;
    startFrameRef.current = currentFrame;
  };

  const handleDragMove = (clientX) => {
    if (!isDragging) return;
    const deltaX = clientX - dragStartX.current;
    const frameDelta = Math.round(deltaX / 8);
    let newFrame = (startFrameRef.current - frameDelta) % TOTAL_FRAMES;
    if (newFrame <= 0) newFrame += TOTAL_FRAMES;
    setCurrentFrame(newFrame);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const chapters = [
    {
      id: "origin",
      num: "01",
      eyebrow: "ACT I • THE UNBLEMISHED CANVAS",
      title: "Where Raw Nature Meets Restraint.",
      lead: "Luxury does not begin on the cutting table; it begins in the unhurried curation of the living hide.",
      narrative: "At Droworang International, we reject more than 95% of prospective hides. Sourced exclusively from certified ethical Indian tanneries, each skin is hand-evaluated for fiber density, natural pull-up flexibility, and structural longevity. Tanned with organic vegetable tannins and chrome-free emulsions, our leathers age gracefully—deepening in color and character with every passing journey.",
      accent: "Full-Grain Certified Cowhides • Azo-Free REACH Dyes",
      image: "./assets/leather-bags-hero.webp",
      type: "visual"
    },
    {
      id: "craft",
      num: "02",
      eyebrow: "ACT II • GENERATIONAL METIER",
      title: "The Patience of Tenths of a Millimeter.",
      lead: "In an era of disposable mass production, we measure our pride in millimeters of bevel and stitches per inch.",
      narrative: "Guided by master clickers at our Haldwani atelier, hides are studied along their natural stretch lines before steel blades cut each pattern panel. Seam edges are skived down to 0.4mm to ensure seamless silhouettes without bulk. Using German Adler machinery and 3-ply high-tensile thread, our artisans bind strength with poetry.",
      accent: "German Adler Walking-Foot Stitching • 0.4mm Edge Skiving",
      image: "./assets/1745589766204.jpg",
      type: "visual"
    },
    {
      id: "artefact",
      num: "03",
      eyebrow: "ACT III • THE LIVING ARTEFACT (INTERACTIVE 360°)",
      title: "Inspect the Masterpiece in Motion.",
      lead: "Drag across the canvas to spin our Heritage Cognac Pull-Up Tote 360 degrees. Every seam, edge, and solid brass clasp stands open to scrutiny.",
      narrative: "Notice the natural color migration when the pull-up leather curves under light. Observe the double-box handle rivets, tested to withstand 50 kilograms of continuous load. This is the synthesis of authentic Indian leather craft and European luxury standards.",
      accent: "60-Frame Continuous Studio Capture • Antique Solid Brass",
      type: "interactive_360"
    },
    {
      id: "integrity",
      num: "04",
      eyebrow: "ACT IV • SOVEREIGN COMPLIANCE",
      title: "Trust Certified by Sovereign Standards.",
      lead: "True luxury requires unconditional accountability and seamless cross-border legitimacy.",
      narrative: "Droworang International Pvt. Ltd. holds the coveted No Objection Certificate (NOC) issued by the Government of India, certifying complete adherence to international trade norms. Every single batch is tested for zero chromium-VI hazards, REACH compliance, and subjected to a 100% pre-shipment manual audit under the personal oversight of founder Mr. Yatish Bhandari.",
      accent: "Government of India NOC Certified • 100% Pre-Shipment Audit",
      image: "./assets/cert-1.jpeg",
      type: "visual"
    },
    {
      id: "horizon",
      num: "05",
      eyebrow: "ACT V • THE GLOBAL HORIZON",
      title: "From the Foothills to Global Capitols.",
      lead: "Crafted in Haldwani, Nainital. Carried through Frankfurt, London, Milan, and New York.",
      narrative: "We bridge the gap between traditional Indian leather artisanship and international corporate procurement. Through direct factory export, European wholesalers and luxury fashion brands enjoy direct-from-source pricing, transparent communications, and dependable logistics timelines.",
      accent: "Air & Maritime Multimodal Freight • Direct Factory Sourcing",
      image: "./assets/1743781273105.jpg",
      type: "visual"
    }
  ];

  const current = chapters[currentChapter];

  // Auto-advancement timer if enabled
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentChapter((prev) => (prev + 1) % chapters.length);
    }, 9000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, chapters.length]);

  return (
    <section
      id="story"
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg-primary)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '120px 24px',
        overflow: 'hidden'
      }}
    >
      {/* Background ambient lighting */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '900px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(206, 178, 137, 0.22) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none'
        }}
      />

      <div style={{ maxWidth: '1440px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 5 }}>
        {/* Top Story Chapter Stepper */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(153, 115, 58, 0.2)',
            paddingBottom: '24px',
            marginBottom: '60px',
            flexWrap: 'wrap',
            gap: '20px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '28px', overflowX: 'auto', paddingBottom: '4px' }}>
            {chapters.map((ch, idx) => {
              const isActive = currentChapter === idx;
              return (
                <button
                  key={ch.id}
                  onClick={() => setCurrentChapter(idx)}
                  data-cursor={`ACT ${ch.num}`}
                  style={{
                    background: 'none',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    padding: '8px 0',
                    position: 'relative'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      color: isActive ? 'var(--gold)' : 'var(--text-muted)',
                      transition: 'color 0.3s ease'
                    }}
                  >
                    {ch.num}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      color: isActive ? 'var(--leather-espresso)' : 'var(--text-muted)',
                      textTransform: 'uppercase',
                      transition: 'color 0.3s ease'
                    }}
                  >
                    {ch.id}
                  </span>
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '-25px',
                        left: 0,
                        right: 0,
                        height: '2px',
                        backgroundColor: 'var(--gold)',
                        boxShadow: '0 0 10px var(--gold)'
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Autoplay Story Mode Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              data-cursor={isAutoPlaying ? 'PAUSE STORY' : 'AUTO STORY'}
              style={{
                background: isAutoPlaying ? 'rgba(153, 115, 58, 0.12)' : '#ffffff',
                border: '1px solid var(--gold-border)',
                borderRadius: '99px',
                padding: '8px 18px',
                color: 'var(--leather-espresso)',
                fontFamily: 'var(--font-display)',
                fontSize: '0.74rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 2px 8px rgba(58, 33, 21, 0.05)'
              }}
            >
              {isAutoPlaying ? <Pause size={13} color="var(--gold)" /> : <Play size={13} color="var(--gold)" />}
              <span>{isAutoPlaying ? 'PAUSE STORY' : 'PLAY STORY'}</span>
            </button>
          </div>
        </div>

        {/* Narrative Stage */}
        <div
          key={current.id}
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1.25fr)',
            gap: '80px',
            alignItems: 'center',
            minHeight: '520px',
            animation: 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className="story-narrative-grid"
        >
          {/* Left: Pure Editorial Typography */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.74rem',
                letterSpacing: '0.24em',
                color: 'var(--gold)',
                textTransform: 'uppercase',
                marginBottom: '16px',
                fontWeight: 700
              }}
            >
              {current.eyebrow}
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.4rem, 4.2vw, 3.8rem)',
                lineHeight: 1.1,
                color: 'var(--leather-espresso)',
                marginBottom: '24px'
              }}
            >
              {current.title}
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: 'clamp(1.2rem, 1.8vw, 1.5rem)',
                lineHeight: 1.5,
                color: 'var(--leather-cognac)',
                fontStyle: 'italic',
                marginBottom: '28px'
              }}
            >
              “{current.lead}”
            </p>

            <p
              style={{
                fontSize: '0.96rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
                marginBottom: '36px',
                maxWidth: '560px'
              }}
            >
              {current.narrative}
            </p>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 18px',
                borderRadius: '8px',
                background: '#ffffff',
                border: '1px solid var(--gold-border)',
                boxShadow: '0 4px 15px rgba(58, 33, 21, 0.05)',
                marginBottom: '40px'
              }}
            >
              <Sparkles size={16} color="var(--gold)" />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', color: 'var(--leather-espresso)', fontWeight: 700 }}>
                {current.accent}
              </span>
            </div>

            {/* Stepper Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setCurrentChapter((prev) => (prev + 1) % chapters.length)}
                data-cursor="NEXT ACT"
                className="btn-primary"
                style={{ padding: '14px 32px' }}
              >
                <span>CONTINUE STORY</span>
                <ArrowRight size={15} className="btn-icon" />
              </button>

              <button
                onClick={onOpenInquiry}
                data-cursor="INQUIRE"
                className="btn-secondary"
                style={{ padding: '14px 28px' }}
              >
                <span>START A DIALOGUE</span>
              </button>
            </div>
          </div>

          {/* Right: Focused Visual or Interactive 360 Artefact */}
          <div>
            {current.type === 'interactive_360' ? (
              /* Interactive 360 Canvas Artefact */
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '1/1',
                  maxHeight: '520px',
                  borderRadius: '24px',
                  background: 'radial-gradient(circle at center, #ffffff 0%, #f4efe7 100%)',
                  border: '1px solid var(--gold)',
                  boxShadow: '0 25px 60px -15px rgba(58, 33, 21, 0.18), 0 0 30px rgba(153, 115, 58, 0.15)',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: isDragging ? 'grabbing' : 'grab',
                  touchAction: 'none'
                }}
                data-cursor="DRAG 360°"
                onMouseDown={(e) => handleDragStart(e.clientX)}
                onMouseMove={(e) => handleDragMove(e.clientX)}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={(e) => {
                  if (e.touches.length === 1) handleDragStart(e.touches[0].clientX);
                }}
                onTouchMove={(e) => {
                  if (e.touches.length === 1) handleDragMove(e.touches[0].clientX);
                }}
                onTouchEnd={handleDragEnd}
              >
                <canvas
                  ref={canvasRef}
                  width={1024}
                  height={1024}
                  style={{ width: '92%', height: '92%', objectFit: 'contain', pointerEvents: 'none' }}
                />

                {/* Floating Angle Callout */}
                <div
                  style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    padding: '8px 16px',
                    borderRadius: '99px',
                    background: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid var(--gold-border)',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.72rem',
                    color: 'var(--gold)',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    boxShadow: '0 4px 15px rgba(58, 33, 21, 0.08)'
                  }}
                >
                  ROTATION: {Math.round(((currentFrame - 1) / TOTAL_FRAMES) * 360)}°
                </div>

                {/* Play/Pause Control */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '20px',
                    right: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsBagPlaying(!isBagPlaying);
                    }}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: '#ffffff',
                      border: '1px solid var(--gold-border)',
                      color: 'var(--leather-espresso)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 4px 15px rgba(58, 33, 21, 0.1)'
                    }}
                  >
                    {isBagPlaying ? <Pause size={16} /> : <Play size={16} />}
                  </button>

                  <div
                    style={{
                      padding: '8px 14px',
                      borderRadius: '99px',
                      background: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid rgba(153, 115, 58, 0.2)',
                      fontSize: '0.72rem',
                      color: 'var(--text-secondary)',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      boxShadow: '0 4px 12px rgba(58, 33, 21, 0.06)'
                    }}
                  >
                    DRAG TO ROTATE 360°
                  </div>
                </div>
              </div>
            ) : (
              /* Minimalist Full-Bleed Artwork Card */
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '1/1',
                  maxHeight: '520px',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  border: '1px solid var(--gold-border)',
                  boxShadow: '0 25px 60px -15px rgba(58, 33, 21, 0.15)',
                  background: '#ffffff'
                }}
              >
                <img
                  src={current.image}
                  alt={current.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(26, 17, 11, 0.75) 0%, transparent 50%)'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '24px',
                    left: '24px',
                    right: '24px',
                    padding: '16px 20px',
                    background: 'rgba(255, 255, 255, 0.94)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: '14px',
                    border: '1px solid var(--gold-border)',
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.1rem',
                    color: 'var(--leather-espresso)',
                    boxShadow: '0 8px 25px rgba(58, 33, 21, 0.1)'
                  }}
                >
                  {current.title}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .story-narrative-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
