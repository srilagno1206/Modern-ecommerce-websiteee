import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCw, ZoomIn, ZoomOut, Sparkles, Layers, ShieldCheck, Compass, Sliders, Maximize2 } from 'lucide-react';

const TOTAL_FRAMES = 60;

export default function InteractiveVideoShowcase({ onRequestQuote }) {
  const [currentFrame, setCurrentFrame] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1); // 0.5x, 1x, 1.5x
  const [isDragging, setIsDragging] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const containerRef = useRef(null);
  const dragStartX = useRef(0);
  const startFrameRef = useRef(1);
  const animFrameIdRef = useRef(null);
  const lastFrameTimeRef = useRef(0);

  // Preload all 60 frames into memory
  useEffect(() => {
    let count = 0;
    const preloadedImages = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const numStr = String(i).padStart(3, '0');
      img.src = `./frames/frame_${numStr}.jpg`;

      img.onload = () => {
        count++;
        setLoadedCount(count);
        if (count === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };
      preloadedImages.push(img);
    }

    imagesRef.current = preloadedImages;
  }, []);

  // Draw current frame to canvas
  const renderFrame = useCallback((frameNum) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = imagesRef.current[frameNum - 1];

    if (img && img.complete && img.naturalWidth > 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isZoomed) {
        // 1.7x Zoom centered on bag details
        const zoom = 1.7;
        const sw = img.naturalWidth / zoom;
        const sh = img.naturalHeight / zoom;
        const sx = (img.naturalWidth - sw) / 2;
        const sy = (img.naturalHeight - sh) / 2 + 30;
        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
      } else {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    }
  }, [isZoomed]);

  // Redraw when frame or zoom changes
  useEffect(() => {
    renderFrame(currentFrame);
  }, [currentFrame, renderFrame]);

  // Video playback loop
  useEffect(() => {
    if (!isPlaying || isDragging) return;

    const frameInterval = (1000 / 24) / playbackSpeed; // 24 fps adjusted by speed

    const loop = (timestamp) => {
      if (!lastFrameTimeRef.current) lastFrameTimeRef.current = timestamp;
      const delta = timestamp - lastFrameTimeRef.current;

      if (delta >= frameInterval) {
        setCurrentFrame((prev) => (prev % TOTAL_FRAMES) + 1);
        lastFrameTimeRef.current = timestamp;
      }

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [isPlaying, isDragging, playbackSpeed]);

  // Mouse / Touch drag interaction
  const handleDragStart = (clientX) => {
    setIsDragging(true);
    setIsPlaying(false);
    dragStartX.current = clientX;
    startFrameRef.current = currentFrame;
  };

  const handleDragMove = (clientX) => {
    if (!isDragging) return;
    const deltaX = clientX - dragStartX.current;
    // Every 8px dragged moves 1 frame
    const frameDelta = Math.round(deltaX / 8);
    let newFrame = (startFrameRef.current - frameDelta) % TOTAL_FRAMES;
    if (newFrame <= 0) newFrame += TOTAL_FRAMES;
    setCurrentFrame(newFrame);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Calculate current rotation angle in degrees (0 to 360)
  const rotationDegrees = Math.round(((currentFrame - 1) / TOTAL_FRAMES) * 360);

  // Dynamic Hotspots depending on rotation angle
  const hotspots = [
    {
      id: 'leather',
      title: 'Full-Grain Oil Pull-Up',
      desc: 'Selected bovine hide with deep natural grain and dynamic vintage pull-up patina.',
      visibleRange: [0, 90],
      top: '55%',
      left: '38%'
    },
    {
      id: 'hardware',
      title: 'Solid Brass Swivel Clasps',
      desc: 'Heavy-gauge antique brass swivel clasps with 50kg tensile pull resistance.',
      visibleRange: [0, 75],
      top: '80%',
      left: '68%'
    },
    {
      id: 'handle',
      title: 'Reinforced Box Stitching',
      desc: 'Double-riveted full-grain shoulder straps with high-tensile 3-ply nylon threads.',
      visibleRange: [270, 360],
      top: '32%',
      left: '42%'
    },
    {
      id: 'corner',
      title: 'Beeswax Corner Reinforcement',
      desc: 'Triple hand-skived base corners reinforced against transit wear and friction.',
      visibleRange: [90, 270],
      top: '82%',
      left: '30%'
    }
  ];

  return (
    <section
      id="interactive-showcase"
      style={{
        position: 'relative',
        backgroundColor: '#120c08',
        padding: '120px 24px',
        overflow: 'hidden',
        borderTop: '1px solid rgba(197, 164, 109, 0.15)',
        borderBottom: '1px solid rgba(197, 164, 109, 0.15)'
      }}
    >
      {/* Background ambient lighting */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(138, 87, 54, 0.22) 0%, rgba(58, 33, 21, 0.1) 50%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none'
        }}
      />

      <div style={{ maxWidth: '1440px', margin: '0 auto', position: 'relative', zIndex: 5 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
            CINEMATIC 360° PRODUCT INSPECTION
          </div>
          <h2 className="section-title">
            INTERACTIVE ROTATIONAL ATELIER.
          </h2>
          <p className="section-lead" style={{ margin: '0 auto' }}>
            Drag horizontally across the frame or use the timeline scrubber to inspect structural balance, hide grain, and hardware alignment from every single degree.
          </p>
        </div>

        {/* Central Interactive Video Card */}
        <div
          ref={containerRef}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1100px',
            margin: '0 auto',
            borderRadius: '24px',
            background: 'radial-gradient(circle at center, rgba(36, 24, 16, 0.95) 0%, rgba(18, 12, 8, 0.98) 80%)',
            border: '1px solid var(--gold-border)',
            boxShadow: '0 30px 80px -20px rgba(0, 0, 0, 0.95), 0 0 40px rgba(197, 164, 109, 0.25)',
            overflow: 'hidden'
          }}
        >
          {/* Top Status Header */}
          <div
            style={{
              padding: '20px 28px',
              borderBottom: '1px solid rgba(197, 164, 109, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
              background: 'rgba(18, 12, 8, 0.65)',
              backdropFilter: 'blur(12px)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: isPlaying ? '#25D366' : 'var(--gold)',
                  boxShadow: `0 0 10px ${isPlaying ? '#25D366' : 'var(--gold)'}`
                }}
              />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.78rem', letterSpacing: '0.15em', color: 'var(--cream)', textTransform: 'uppercase', fontWeight: 600 }}>
                Heritage Cognac Pull-Up Tote • 360° Studio Capture
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold)', fontSize: '0.82rem', fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                <Compass size={16} />
                <span>ANGLE: {rotationDegrees}°</span>
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--cream-muted)', fontFamily: 'var(--font-display)' }}>
                FRAME: <strong style={{ color: 'var(--cream)' }}>{currentFrame}</strong> / {TOTAL_FRAMES}
              </div>
            </div>
          </div>

          {/* Canvas Viewport */}
          <div
            data-cursor={isDragging ? 'DRAGGING' : 'DRAG TO ROTATE'}
            style={{
              position: 'relative',
              width: '100%',
              height: 'min(640px, 75vw)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: isDragging ? 'grabbing' : 'grab',
              userSelect: 'none',
              touchAction: 'none'
            }}
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
            {/* Loading Indicator */}
            {!isLoaded && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '14px',
                  backgroundColor: '#120c08',
                  zIndex: 20
                }}
              >
                <RotateCw size={32} color="var(--gold)" className="animate-spin" />
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.82rem', color: 'var(--gold)', letterSpacing: '0.15em' }}>
                  BUFFERING 360° HIGH-RES FRAMES ({loadedCount} / {TOTAL_FRAMES})
                </span>
              </div>
            )}

            <canvas
              ref={canvasRef}
              width={1024}
              height={1024}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                pointerEvents: 'none',
                filter: isDragging ? 'brightness(1.04)' : 'brightness(1)',
                transition: 'filter 0.2s ease'
              }}
            />

            {/* Floating Hotspots that appear during specific angles */}
            {hotspots.map((hs) => {
              const isVisible = rotationDegrees >= hs.visibleRange[0] && rotationDegrees <= hs.visibleRange[1];
              if (!isVisible) return null;

              return (
                <div
                  key={hs.id}
                  style={{
                    position: 'absolute',
                    top: hs.top,
                    left: hs.left,
                    zIndex: 15,
                    pointerEvents: 'auto'
                  }}
                  onMouseEnter={() => setActiveHotspot(hs.id)}
                  onMouseLeave={() => setActiveHotspot(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveHotspot(activeHotspot === hs.id ? null : hs.id);
                  }}
                >
                  {/* Pulsing Pin */}
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'rgba(197, 164, 109, 0.25)',
                      border: '2px solid var(--gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 0 15px var(--gold)',
                      animation: 'pulseGold 2s infinite'
                    }}
                  >
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#fff' }} />
                  </div>

                  {/* Tooltip Card */}
                  {activeHotspot === hs.id && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '36px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '240px',
                        padding: '14px 18px',
                        borderRadius: '12px',
                        background: 'rgba(18, 12, 8, 0.95)',
                        border: '1px solid var(--gold)',
                        backdropFilter: 'blur(16px)',
                        boxShadow: '0 15px 35px rgba(0,0,0,0.85)',
                        zIndex: 30,
                        textAlign: 'left'
                      }}
                    >
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.68rem', letterSpacing: '0.15em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 700 }}>
                        {hs.title}
                      </div>
                      <p style={{ fontSize: '0.78rem', color: 'var(--cream)', lineHeight: 1.45, margin: 0 }}>
                        {hs.desc}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Subtle Overlay Hint */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                padding: '8px 14px',
                borderRadius: '99px',
                background: 'rgba(18, 12, 8, 0.75)',
                border: '1px solid rgba(197, 164, 109, 0.2)',
                backdropFilter: 'blur(10px)',
                fontFamily: 'var(--font-display)',
                fontSize: '0.72rem',
                color: 'var(--gold)',
                letterSpacing: '0.1em',
                pointerEvents: 'none'
              }}
            >
              DRAG TO ROTATE 360°
            </div>
          </div>

          {/* Bottom Luxury Playback & Timeline Controls */}
          <div
            style={{
              padding: '24px 32px',
              borderTop: '1px solid rgba(197, 164, 109, 0.15)',
              background: 'rgba(18, 12, 8, 0.85)',
              backdropFilter: 'blur(16px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            {/* Scrubber Progress Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <input
                type="range"
                min={1}
                max={TOTAL_FRAMES}
                value={currentFrame}
                onChange={(e) => {
                  setIsPlaying(false);
                  setCurrentFrame(Number(e.target.value));
                }}
                style={{
                  width: '100%',
                  height: '6px',
                  borderRadius: '99px',
                  background: 'rgba(197, 164, 109, 0.2)',
                  outline: 'none',
                  accentColor: 'var(--gold)',
                  cursor: 'pointer'
                }}
              />
            </div>

            {/* Bottom Controls Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px'
              }}
            >
              {/* Play / Pause & Speed Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  data-cursor={isPlaying ? 'PAUSE' : 'PLAY'}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))',
                    border: 'none',
                    color: '#120c08',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(197, 164, 109, 0.4)',
                    transition: 'transform 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: '2px' }} />}
                </button>

                {/* Speed Toggles */}
                <div style={{ display: 'flex', gap: '6px', padding: '4px', borderRadius: '8px', background: 'rgba(36, 24, 16, 0.6)', border: '1px solid var(--gold-border)' }}>
                  {[0.5, 1, 1.5].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => setPlaybackSpeed(speed)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: playbackSpeed === speed ? 'var(--gold)' : 'transparent',
                        color: playbackSpeed === speed ? '#120c08' : 'var(--cream-muted)',
                        border: 'none',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        fontFamily: 'var(--font-display)',
                        cursor: 'pointer'
                      }}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Center Specs Pills */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }} className="specs-pills-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--cream)' }}>
                  <ShieldCheck size={16} color="var(--gold)" />
                  <span>100% Full-Grain Hide</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--cream)' }}>
                  <Sparkles size={16} color="var(--gold)" />
                  <span>Solid Antique Brass</span>
                </div>
              </div>

              {/* Right Action: Zoom Lens Toggle & Inquiry Trigger */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  data-cursor={isZoomed ? 'ZOOM OUT' : 'ZOOM IN'}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 18px',
                    borderRadius: '99px',
                    background: isZoomed ? 'rgba(197, 164, 109, 0.25)' : 'rgba(36, 24, 16, 0.7)',
                    border: '1px solid var(--gold-border)',
                    color: isZoomed ? 'var(--gold-light)' : 'var(--cream)',
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {isZoomed ? <ZoomOut size={16} /> : <ZoomIn size={16} />}
                  <span>{isZoomed ? 'RESET ZOOM' : 'INSPECT DETAIL'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Feature Callouts Underneath Video */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
            marginTop: '40px'
          }}
        >
          {[
            {
              title: "360° GEOMETRIC EQUILIBRIUM",
              desc: "Engineered with reinforced leather gussets and bottom brass feet to stand autonomously without tilting."
            },
            {
              title: "DISTRESSED PULL-UP PATINA",
              desc: "Infused with hot natural waxes and oils that yield nuanced amber shades when flexed or handled."
            },
            {
              title: "PRECISION SADDLE RIVETS",
              desc: "Handle anchors reinforced with twin antique brass rivets tested for over 50kg tensile resistance."
            },
            {
              title: "EUROPEAN EXPORT READY",
              desc: "Fully compliant with REACH chemical benchmarks, accompanied by Government of India NOC clearance."
            }
          ].map((item, idx) => (
            <div key={idx} className="luxury-card" style={{ padding: '24px' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.72rem', letterSpacing: '0.18em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 700 }}>
                {item.title}
              </div>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .specs-pills-row {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
