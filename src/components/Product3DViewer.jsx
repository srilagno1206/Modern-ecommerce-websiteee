import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCw, Eye, ShieldCheck, ArrowRight, Sparkles, Sliders, CheckCircle2, Maximize2, FileText, ChevronRight } from 'lucide-react';

const TOTAL_FRAMES = 60;

export default function Product3DViewer({ onOpenInquiry }) {
  const [currentFrame, setCurrentFrame] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [framesLoaded, setFramesLoaded] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [activeAngle, setActiveAngle] = useState('front');

  const canvasRef = useRef(null);
  const frameImagesRef = useRef([]);
  const dragStartXRef = useRef(0);
  const startFrameRef = useRef(1);
  const playIntervalRef = useRef(null);

  // 1. Preload 60 rotational frames
  useEffect(() => {
    let count = 0;
    const preloaded = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const numStr = String(i).padStart(3, '0');
      img.src = `./frames/frame_${numStr}.jpg`;
      img.onload = () => {
        count++;
        if (count === TOTAL_FRAMES) setFramesLoaded(true);
      };
      preloaded.push(img);
    }
    frameImagesRef.current = preloaded;
  }, []);

  // 2. Render current frame on canvas
  const renderFrame = (frameNum) => {
    const canvas = canvasRef.current;
    if (!canvas || !frameImagesRef.current.length) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    const safeFrame = (((frameNum - 1) % TOTAL_FRAMES) + TOTAL_FRAMES) % TOTAL_FRAMES;
    const img = frameImagesRef.current[safeFrame];

    if (img && img.complete) {
      ctx.clearRect(0, 0, w, h);

      // Luxury soft floor shadow
      const shadowY = h * 0.88;
      const shadowGrad = ctx.createRadialGradient(w * 0.5, shadowY, 15, w * 0.5, shadowY, w * 0.42);
      shadowGrad.addColorStop(0, 'rgba(58, 33, 21, 0.22)');
      shadowGrad.addColorStop(0.6, 'rgba(58, 33, 21, 0.05)');
      shadowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = shadowGrad;
      ctx.beginPath();
      ctx.ellipse(w * 0.5, shadowY, w * 0.42, 24, 0, 0, Math.PI * 2);
      ctx.fill();

      // Draw product frame
      ctx.drawImage(img, 0, 0, w, h);

      // Specular sheen
      const sheenGrad = ctx.createRadialGradient(w * 0.5, h * 0.45, 10, w * 0.5, h * 0.45, w * 0.5);
      sheenGrad.addColorStop(0, 'rgba(255, 255, 255, 0.32)');
      sheenGrad.addColorStop(0.6, 'rgba(255, 255, 255, 0.06)');
      sheenGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = sheenGrad;
      ctx.fillRect(0, 0, w, h);
    }
  };

  useEffect(() => {
    renderFrame(currentFrame);
  }, [currentFrame, framesLoaded]);

  // 3. Auto-play loop
  useEffect(() => {
    if (isPlaying && !isDragging) {
      playIntervalRef.current = setInterval(() => {
        setCurrentFrame((prev) => (prev % TOTAL_FRAMES) + 1);
      }, 45); // Smooth ~22fps rotation
    } else {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
    }
    return () => {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
    };
  }, [isPlaying, isDragging]);

  // 4. Mouse and Touch drag handlers
  const handleDragStart = (clientX) => {
    setIsDragging(true);
    setIsPlaying(false);
    dragStartXRef.current = clientX;
    startFrameRef.current = currentFrame;
  };

  const handleDragMove = (clientX) => {
    if (!isDragging) return;
    const deltaX = clientX - dragStartXRef.current;
    const frameDelta = Math.round(deltaX / 8);
    let newFrame = ((startFrameRef.current - frameDelta - 1) % TOTAL_FRAMES) + 1;
    if (newFrame <= 0) newFrame += TOTAL_FRAMES;
    setCurrentFrame(newFrame);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Angle preset snapping
  const snapToPreset = (angleName, targetFrame) => {
    setActiveAngle(angleName);
    setIsPlaying(false);
    setCurrentFrame(targetFrame);
  };

  const hotspots = [
    {
      id: 1,
      title: 'Full-Grain Vegetable Tanned Cowhide',
      desc: 'Selected from certified ethical Indian tanneries. Tanned with natural chestnut and mimosa organic tannins with zero toxic azo dyes.',
      badge: 'LWG Certified Gold',
      top: '35%',
      left: '30%'
    },
    {
      id: 2,
      title: 'German Adler Walking-Foot Stitching',
      desc: 'Heavy-gauge 3-ply bonded nylon thread sewn at 7 stitches per inch, tested to endure >280N stress along high-load stress vectors.',
      badge: '280N Tensile Rated',
      top: '48%',
      left: '70%'
    },
    {
      id: 3,
      title: 'Solid Brass Corrosion-Free Hardware',
      desc: 'Hand-forged antiqued solid brass buckles, D-rings, and swivel snaps subjected to 72-hour salt-spray climate endurance testing.',
      badge: '72h Salt-Spray Tested',
      top: '68%',
      left: '50%'
    }
  ];

  return (
    <section
      id="view-3d"
      style={{
        position: 'relative',
        padding: '120px 24px',
        backgroundColor: 'var(--bg-primary)',
        borderTop: '1px solid rgba(153, 115, 58, 0.15)',
        borderBottom: '1px solid rgba(153, 115, 58, 0.15)',
        overflow: 'hidden'
      }}
    >
      {/* Background ambient luxury lighting */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '-10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212, 175, 105, 0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }}
      />

      <div style={{ maxWidth: '1440px', margin: '0 auto', position: 'relative', zIndex: 5 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
            INTERACTIVE 360° ATELIER INSPECTION
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.6rem, 5.2vw, 4.4rem)',
              lineHeight: 1.1,
              color: 'var(--leather-espresso)',
              marginBottom: '20px',
              textTransform: 'uppercase'
            }}
          >
            VIEW PRODUCT IN 3D
          </h2>

          <p
            style={{
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              maxWidth: '680px',
              margin: '0 auto',
              lineHeight: 1.7
            }}
          >
            Experience Droworang craftsmanship in full 360-degree fidelity. Drag horizontally to rotate, inspect architectural saddle seams, and explore bespoke OEM customization options.
          </p>
        </div>

        {/* Main 3D Stage Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1fr)',
            gap: '60px',
            alignItems: 'center'
          }}
          className="product-3d-grid"
        >
          {/* Left Column: Interactive 360 Canvas Viewport */}
          <div
            style={{
              position: 'relative',
              background: '#ffffff',
              borderRadius: '28px',
              border: '1px solid var(--gold-border)',
              padding: '36px',
              boxShadow: '0 20px 50px rgba(58, 33, 21, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              userSelect: 'none'
            }}
          >
            {/* Top Toolbar */}
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#10b981',
                    display: 'inline-block',
                    boxShadow: '0 0 8px #10b981'
                  }}
                />
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.74rem', fontWeight: 700, color: 'var(--leather-espresso)', letterSpacing: '0.1em' }}>
                  360° ATELIER FEED • 60 HIGH-RES FRAMES
                </span>
              </div>

              {/* Play / Pause Toggle */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                data-cursor={isPlaying ? 'PAUSE' : 'PLAY'}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: '99px',
                  background: isPlaying ? 'rgba(153, 115, 58, 0.12)' : '#ffffff',
                  border: '1px solid var(--gold-border)',
                  color: 'var(--leather-espresso)',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {isPlaying ? <Pause size={12} color="var(--gold)" /> : <Play size={12} color="var(--gold)" />}
                <span>{isPlaying ? 'PAUSE ROTATION' : 'AUTO ROTATE'}</span>
              </button>
            </div>

            {/* Canvas Container with Drag Event Handlers */}
            <div
              style={{
                position: 'relative',
                width: 'min(100%, 540px)',
                aspectRatio: '1/1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: isDragging ? 'grabbing' : 'grab'
              }}
              onMouseDown={(e) => handleDragStart(e.clientX)}
              onMouseMove={(e) => handleDragMove(e.clientX)}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
              onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
              onTouchEnd={handleDragEnd}
            >
              {/* Luxury Circular Pedestal */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '7%',
                  width: '85%',
                  height: '34px',
                  borderRadius: '50%',
                  background: 'radial-gradient(ellipse at center, #ffffff 0%, rgba(245, 239, 230, 0.9) 70%, transparent 100%)',
                  boxShadow: '0 20px 40px rgba(58, 33, 21, 0.08)',
                  border: '1px solid rgba(153, 115, 58, 0.15)'
                }}
              />

              <canvas
                ref={canvasRef}
                width={540}
                height={540}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  position: 'relative',
                  zIndex: 2
                }}
              />

              {/* Hotspot Indicators */}
              {hotspots.map((hs) => (
                <button
                  key={hs.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveHotspot(activeHotspot === hs.id ? null : hs.id);
                  }}
                  data-cursor="INSPECT"
                  style={{
                    position: 'absolute',
                    top: hs.top,
                    left: hs.left,
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: '#ffffff',
                    border: '2px solid var(--gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 0 12px rgba(153, 115, 58, 0.45)',
                    zIndex: 10,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--gold-dark)' }}>{hs.id}</span>
                </button>
              ))}

              {/* Active Hotspot Detail Card */}
              {activeHotspot && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '20px',
                    right: '20px',
                    background: 'rgba(255, 255, 255, 0.96)',
                    backdropFilter: 'blur(15px)',
                    border: '1px solid var(--gold)',
                    borderRadius: '16px',
                    padding: '16px 20px',
                    boxShadow: '0 12px 30px rgba(58, 33, 21, 0.15)',
                    zIndex: 20
                  }}
                >
                  {(() => {
                    const hs = hotspots.find((h) => h.id === activeHotspot);
                    if (!hs) return null;
                    return (
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                          <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.72rem', fontWeight: 700, color: 'var(--gold-dark)', textTransform: 'uppercase' }}>
                            {hs.title}
                          </span>
                          <span style={{ fontSize: '0.68rem', fontWeight: 700, background: 'var(--gold)', color: '#ffffff', padding: '2px 8px', borderRadius: '99px' }}>
                            {hs.badge}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                          {hs.desc}
                        </p>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>

            {/* Bottom Controls: Slider & Angle Buttons */}
            <div style={{ width: '100%', marginTop: '20px' }}>
              {/* Frame Scrubber Range Slider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.7rem', fontWeight: 700, color: 'var(--gold-dark)' }}>
                  01
                </span>
                <input
                  type="range"
                  min="1"
                  max={TOTAL_FRAMES}
                  value={currentFrame}
                  onChange={(e) => {
                    setIsPlaying(false);
                    setCurrentFrame(parseInt(e.target.value, 10));
                  }}
                  style={{
                    flex: 1,
                    accentColor: 'var(--gold)',
                    cursor: 'pointer'
                  }}
                />
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.7rem', fontWeight: 700, color: 'var(--gold-dark)' }}>
                  60
                </span>
              </div>

              {/* Angle Quick-Snap Buttons */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button
                  onClick={() => snapToPreset('front', 1)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '99px',
                    background: activeAngle === 'front' ? 'var(--leather-espresso)' : '#ffffff',
                    border: '1px solid var(--gold-border)',
                    color: activeAngle === 'front' ? '#ffffff' : 'var(--text-secondary)',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  FRONT (0°)
                </button>

                <button
                  onClick={() => snapToPreset('quarter', 15)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '99px',
                    background: activeAngle === 'quarter' ? 'var(--leather-espresso)' : '#ffffff',
                    border: '1px solid var(--gold-border)',
                    color: activeAngle === 'quarter' ? '#ffffff' : 'var(--text-secondary)',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  45° PROFILE
                </button>

                <button
                  onClick={() => snapToPreset('side', 30)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '99px',
                    background: activeAngle === 'side' ? 'var(--leather-espresso)' : '#ffffff',
                    border: '1px solid var(--gold-border)',
                    color: activeAngle === 'side' ? '#ffffff' : 'var(--text-secondary)',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  SIDE (90°)
                </button>

                <button
                  onClick={() => snapToPreset('back', 45)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '99px',
                    background: activeAngle === 'back' ? 'var(--leather-espresso)' : '#ffffff',
                    border: '1px solid var(--gold-border)',
                    color: activeAngle === 'back' ? '#ffffff' : 'var(--text-secondary)',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  REAR DETAIL
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Product B2B Dossier & OEM Specifications */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                borderRadius: '99px',
                background: '#ffffff',
                border: '1px solid var(--gold-border)',
                marginBottom: '16px'
              }}
            >
              <ShieldCheck size={14} color="var(--gold)" />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.74rem', fontWeight: 700, color: 'var(--gold-dark)', letterSpacing: '0.12em' }}>
                DIRECT EXPORT SPECIFICATION
              </span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
                lineHeight: 1.15,
                color: 'var(--leather-espresso)',
                marginBottom: '16px'
              }}
            >
              THE EXECUTIVE HERITAGE BRIEFCASE
            </h3>

            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.84rem',
                color: 'var(--gold-dark)',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '20px'
              }}
            >
              MODEL REF: DRW-804 &bull; OEM / PRIVATE LABEL AVAILABLE
            </div>

            <p
              style={{
                fontSize: '1rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginBottom: '32px'
              }}
            >
              Architecturally constructed from selected unblemished Indian vegetable-tanned hides. Fitted with anti-corrosion forged brass locks and dual-compartment laptop protection designed for international executive retailers and luxury boutique brands.
            </p>

            {/* Specifications Matrix Table */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: '18px',
                border: '1px solid var(--gold-border)',
                padding: '20px 24px',
                marginBottom: '32px',
                boxShadow: '0 4px 15px rgba(58, 33, 21, 0.04)'
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-display)', color: 'var(--gold-dark)', fontWeight: 700, textTransform: 'uppercase' }}>
                    PRIMARY MATERIAL
                  </div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--leather-espresso)', marginTop: '2px' }}>
                    Full-Grain Ethical Cowhide
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-display)', color: 'var(--gold-dark)', fontWeight: 700, textTransform: 'uppercase' }}>
                    TANNING PROCESS
                  </div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--leather-espresso)', marginTop: '2px' }}>
                    Azo-Free Organic Vegetable Tannins
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-display)', color: 'var(--gold-dark)', fontWeight: 700, textTransform: 'uppercase' }}>
                    MINIMUM ORDER (MOQ)
                  </div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--leather-espresso)', marginTop: '2px' }}>
                    100 Units (Flexible for Initial OEM)
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-display)', color: 'var(--gold-dark)', fontWeight: 700, textTransform: 'uppercase' }}>
                    CUSTOM BRANDING
                  </div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--leather-espresso)', marginTop: '2px' }}>
                    Hot-Foil Stamping, Blind Deboss, Custom Hardware
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button
                onClick={() =>
                  onOpenInquiry({
                    id: 'drw-804',
                    title: 'The Executive Heritage Briefcase (DRW-804)',
                    moq: '100 Units'
                  })
                }
                data-cursor="INQUIRE"
                className="btn-primary"
                style={{ padding: '16px 36px', fontSize: '0.86rem' }}
              >
                <span>REQUEST B2B QUOTE & SAMPLE</span>
                <ArrowRight size={16} className="btn-icon" />
              </button>

              <button
                onClick={() =>
                  onOpenInquiry({
                    id: 'drw-804-cad',
                    title: 'DRW-804 Technical CAD & Specification Pack',
                    moq: 'OEM Procurement'
                  })
                }
                data-cursor="SPECS"
                className="btn-secondary"
                style={{ padding: '16px 28px', fontSize: '0.86rem' }}
              >
                <FileText size={15} style={{ marginRight: '6px' }} />
                <span>REQUEST TECH PACK</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
