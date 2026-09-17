import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Volume2, VolumeX, ArrowDown, ArrowRight, ShieldCheck, Sparkles, RotateCcw, ChevronRight, Eye, CheckCircle2, Sliders, Layers, ZoomIn } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CinematicStorytelling({ onOpenInquiry }) {
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [activeCraftTab, setActiveCraftTab] = useState(0); // 0: CUT, 1: STITCH, 2: SHAPE, 3: FINISH
  const [timelineProgress, setTimelineProgress] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState(null);

  const wrapperRef = useRef(null);
  const sectionRef = useRef(null);
  const audioCtxRef = useRef(null);
  const droneOscRef = useRef(null);
  const droneGainRef = useRef(null);
  const lastChimeActRef = useRef(-1);

  // GSAP Master Timeline with ScrollTrigger Pinning
  useEffect(() => {
    if (!wrapperRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          pin: sectionRef.current,
          start: 'top top',
          end: '+=2800', // Proportional scroll distance for 6 rich scenes
          scrub: 0.5,     // 1:1 responsive synchronization
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            setTimelineProgress(p);

            // Audio chime trigger on act transitions
            const actIndex = Math.floor(p * 6);
            if (actIndex !== lastChimeActRef.current && actIndex >= 0 && actIndex <= 5) {
              lastChimeActRef.current = actIndex;
              playHarmonicChime(actIndex);
            }
          }
        }
      });

      // Initial Scene Visibility & Layering
      gsap.set('.scene-01', { autoAlpha: 1, scale: 1, zIndex: 10 });
      gsap.set('.scene-02', { autoAlpha: 0, scale: 0.88, zIndex: 11 });
      gsap.set('.scene-03', { autoAlpha: 0, scale: 0.88, zIndex: 12 });
      gsap.set('.scene-04', { autoAlpha: 0, scale: 0.88, zIndex: 13 });
      gsap.set('.scene-05', { autoAlpha: 0, scale: 0.88, zIndex: 14 });
      gsap.set('.scene-06', { autoAlpha: 0, scale: 0.95, zIndex: 15 });

      // Elements within scenes - Scene 01 starts fully visible
      gsap.set('.s1-title-1', { autoAlpha: 1, y: 0, filter: 'blur(0px)' });
      gsap.set('.s1-title-2', { autoAlpha: 1, y: 0, filter: 'blur(0px)' });
      gsap.set('.s1-visual-card', { autoAlpha: 1, scale: 1, y: 0 });
      gsap.set('.s2-card', { autoAlpha: 0, y: 30, scale: 0.95 });
      gsap.set('.s3-card', { autoAlpha: 0, y: 30 });
      gsap.set('.s5-hero-card', { autoAlpha: 0, y: 35, scale: 0.94 });

      // =========================================================================
      // SCENE 01 — MATERIAL GENESIS (0.00 to 0.18)
      // =========================================================================
      masterTimeline
        .to('.macro-leather-img', { scale: 1.12, duration: 1.4, ease: 'none' })
        // Crossfade into Scene 02 (Zero gap continuous camera transition)
        .to('.scene-01', { autoAlpha: 0, scale: 1.15, filter: 'blur(6px)', duration: 1.0, ease: 'power2.inOut' }, '+=0.4');

      // =========================================================================
      // SCENE 02 — UNCOMPROMISING SELECTION (0.18 to 0.36)
      // =========================================================================
      masterTimeline
        .to('.scene-02', { autoAlpha: 1, scale: 1, duration: 1.0, ease: 'power2.out' }, '<')
        .to('.s2-card', { autoAlpha: 1, y: 0, scale: 1, duration: 0.8, ease: 'power2.out' }, '<+=0.2')
        .to('.pattern-workbench-img', { scale: 1.1, duration: 1.5, ease: 'none' }, '<')
        // Crossfade into Scene 03
        .to('.scene-02', { autoAlpha: 0, scale: 1.15, filter: 'blur(6px)', duration: 1.0, ease: 'power2.inOut' }, '+=0.5');

      // =========================================================================
      // SCENE 03 — FOUR PILLARS OF CRAFTSMANSHIP (0.36 to 0.54)
      // =========================================================================
      masterTimeline
        .to('.scene-03', { autoAlpha: 1, scale: 1, duration: 1.0, ease: 'power2.out' }, '<')
        .to('.s3-card', { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '<+=0.2')
        // Cycle craft steps on scroll
        .call(() => setActiveCraftTab(0), null, '+=0.1')
        .to('.craft-focus-word', { textContent: 'CUT.', duration: 0.6, ease: 'none' })
        .call(() => setActiveCraftTab(1), null, '+=0.2')
        .to('.craft-focus-word', { textContent: 'STITCH.', duration: 0.6, ease: 'none' })
        .call(() => setActiveCraftTab(2), null, '+=0.2')
        .to('.craft-focus-word', { textContent: 'SHAPE.', duration: 0.6, ease: 'none' })
        .call(() => setActiveCraftTab(3), null, '+=0.2')
        .to('.craft-focus-word', { textContent: 'FINISH.', duration: 0.6, ease: 'none' })
        // Crossfade into Scene 04
        .to('.scene-03', { autoAlpha: 0, scale: 1.12, duration: 1.0, ease: 'power2.inOut' }, '+=0.3');

      // =========================================================================
      // SCENE 04 — THE TRANSFORMATION (0.54 to 0.70)
      // =========================================================================
      masterTimeline
        .to('.scene-04', { autoAlpha: 1, scale: 1, duration: 1.0, ease: 'power2.out' }, '<')
        .to('.morph-fill-line', { width: '100%', duration: 1.4, ease: 'none' }, '<')
        .to('.scene-04', { autoAlpha: 0, scale: 1.1, duration: 1.0, ease: 'power2.inOut' }, '+=0.4');

      // =========================================================================
      // SCENE 05 — THE FINISHED SILHOUETTE (0.70 to 0.86)
      // =========================================================================
      masterTimeline
        .to('.scene-05', { autoAlpha: 1, scale: 1, duration: 1.0, ease: 'power2.out' }, '<')
        .to('.s5-hero-card', { autoAlpha: 1, y: 0, scale: 1, duration: 0.9, ease: 'power2.out' }, '<+=0.2')
        .to('.s5-hero-img', { scale: 1.08, duration: 1.6, ease: 'none' }, '<')
        // Crossfade into Scene 06
        .to('.scene-05', { autoAlpha: 0, scale: 1.08, duration: 1.0, ease: 'power2.inOut' }, '+=0.5');

      // =========================================================================
      // SCENE 06 — BRAND REVEAL & SEAMLESS HOMEPAGE TRANSITION (0.86 to 1.00)
      // =========================================================================
      masterTimeline
        .to('.scene-06', { autoAlpha: 1, scale: 1, duration: 1.2, ease: 'power2.out' }, '<')
        .fromTo('.s6-crest-sheen', { x: '-100%', opacity: 0 }, { x: '200%', opacity: 1, duration: 1.8, ease: 'power2.inOut' }, '<+=0.2');

    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  // Audio system
  const toggleSound = () => {
    if (isAudioMuted) {
      initAudio();
      setIsAudioMuted(false);
    } else {
      muteAudio();
      setIsAudioMuted(true);
    }
  };

  const initAudio = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(55, ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(160, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      droneOscRef.current = osc;
      droneGainRef.current = gain;
    } catch (e) {
      console.warn('Audio init prevented:', e);
    }
  };

  const muteAudio = () => {
    if (droneGainRef.current && audioCtxRef.current) {
      try {
        droneGainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.3);
        setTimeout(() => {
          if (droneOscRef.current) droneOscRef.current.stop();
        }, 300);
      } catch (e) {
        // ignore
      }
    }
  };

  const playHarmonicChime = (index) => {
    if (isAudioMuted || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const notes = [440, 528, 660, 784, 880, 1056];
      const freq = notes[index % notes.length];

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.035, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.4);
    } catch (e) {
      // ignore
    }
  };

  const handleQuickSkip = () => {
    const el = document.querySelector('#homepage-content');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const craftStages = [
    {
      title: '01. CUT',
      subtitle: 'Precision Clicker Die & Laser Vector Alignment',
      desc: 'Hides are cut along natural fiber tensile vectors with German hardened steel dies to eliminate structural warpage.',
      img: './assets/pattern-cutting-craft.jpg',
      stat: '0.1mm Tolerance'
    },
    {
      title: '02. STITCH',
      subtitle: 'German Adler Walking-Foot 3-Ply High-Tensile Thread',
      desc: 'Every stress point is bound with heavy-gauge bonded nylon thread at 7 stitches per inch, resisting up to 280N tension.',
      img: './assets/artisan-stitching-craft.jpg',
      stat: '7 Stitches/Inch'
    },
    {
      title: '03. SHAPE',
      subtitle: 'Hand-Skived 0.4mm Edge Beveling & Wooden Lasting',
      desc: 'Edge margins are skived down to 0.4mm to create razor-sharp silhouettes that retain their sculptural form for decades.',
      img: './assets/1745589766204.jpg',
      stat: '0.4mm Margin'
    },
    {
      title: '04. FINISH',
      subtitle: 'Triple-Buffed Italian Edge Inks & Organic Beeswax Seal',
      desc: 'Hand-burnished with natural carnauba beeswax and heat-sealed edges that never peel, chip, or discolor with time.',
      img: './assets/1759906468257.jpg',
      stat: 'Triple Heat Seal'
    }
  ];

  return (
    <div
      ref={wrapperRef}
      className="storytelling-wrapper"
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: 'var(--bg-primary)',
        overflow: 'hidden'
      }}
    >
      {/* Pinned 100vh Viewport (Controlled via ScrollTrigger pin) */}
      <section
        ref={sectionRef}
        className="storytelling-section"
        style={{
          width: '100%',
          height: '100vh',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: 'var(--bg-primary)'
        }}
      >
        {/* Dynamic Atmospheric Canvas Background */}
        <div
          className="leather-macro-bg"
          style={{
            position: 'absolute',
            inset: '-10%',
            width: '120%',
            height: '120%',
            background: 'radial-gradient(ellipse at center, #ffffff 0%, #fbf8f3 45%, #efe7dc 100%)',
            pointerEvents: 'none',
            zIndex: 1,
            transformOrigin: 'center center'
          }}
        />

        {/* Diagonal Light Sweep Beam */}
        <div className="light-sweep-beam" style={{ zIndex: 3 }} />

        {/* Floating Top HUD: Audio + Quick Skip */}
        <div
          style={{
            position: 'absolute',
            top: '88px',
            right: '28px',
            zIndex: 99,
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <button
            onClick={toggleSound}
            data-cursor="AUDIO"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '99px',
              background: 'rgba(255, 255, 255, 0.92)',
              border: '1px solid var(--gold-border)',
              color: 'var(--leather-espresso)',
              fontFamily: 'var(--font-display)',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(58, 33, 21, 0.08)',
              backdropFilter: 'blur(10px)'
            }}
          >
            {isAudioMuted ? <VolumeX size={14} color="var(--gold)" /> : <Volume2 size={14} color="var(--gold)" />}
            <span>{isAudioMuted ? 'SOUND OFF' : 'SOUND ON'}</span>
          </button>

          <button
            onClick={handleQuickSkip}
            data-cursor="ENTER"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 18px',
              borderRadius: '99px',
              background: 'var(--leather-espresso)',
              border: '1px solid var(--gold)',
              color: '#ffffff',
              fontFamily: 'var(--font-display)',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(58, 33, 21, 0.15)'
            }}
          >
            <span>EXPLORE SITE</span>
            <ChevronRight size={13} color="var(--gold)" />
          </button>
        </div>

        {/* Floating Bottom Scroll Meter */}
        <div
          style={{
            position: 'absolute',
            bottom: '28px',
            left: '32px',
            zIndex: 99,
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            color: 'var(--leather-espresso)',
            fontFamily: 'var(--font-display)',
            fontSize: '0.72rem',
            letterSpacing: '0.15em',
            fontWeight: 700
          }}
        >
          <span>ACT 0{Math.min(Math.floor(timelineProgress * 5) + 1, 6)} / 06</span>
          <div style={{ width: '80px', height: '2px', background: 'rgba(153, 115, 58, 0.25)', position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: `${timelineProgress * 100}%`,
                background: 'var(--gold)',
                transition: 'width 0.05s linear'
              }}
            />
          </div>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', opacity: 0.85 }}>
            SCROLL TO EXPLORE <ArrowDown size={12} />
          </span>
        </div>

        {/* Master Scene Container */}
        <div className="scene-container" style={{ position: 'relative', width: '100%', height: '100%', zIndex: 10 }}>

          {/* ===================================================================
              SCENE 01 — MATERIAL (Photorealistic Macro Hide & Inspect Mode)
              =================================================================== */}
          <div
            className="scene-01"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '100px 32px 40px'
            }}
          >
            <div
              style={{
                maxWidth: '1280px',
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1.1fr)',
                gap: '50px',
                alignItems: 'center'
              }}
            >
              {/* Left Column: Editorial Typography */}
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.35em',
                    fontWeight: 700,
                    color: 'var(--gold)',
                    textTransform: 'uppercase',
                    marginBottom: '16px'
                  }}
                >
                  ACT I • THE MATERIAL GENESIS
                </div>

                <h1
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(2.5rem, 5.2vw, 4.6rem)',
                    fontWeight: 700,
                    color: 'var(--leather-espresso)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    marginBottom: '20px'
                  }}
                >
                  <span className="s1-title-1" style={{ display: 'block' }}>EVERY CREATION</span>
                  <span className="s1-title-2 gold-gradient-text" style={{ fontStyle: 'italic', fontFamily: 'var(--font-editorial)', display: 'block' }}>
                    Begins With Material.
                  </span>
                </h1>

                <p
                  style={{
                    fontSize: '1.05rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.7,
                    marginBottom: '28px',
                    maxWidth: '520px'
                  }}
                >
                  Sourced exclusively from certified ethical Indian tanneries. Before a single cut is made, the living hide is evaluated for fiber density, natural pull-up flexibility, and generational longevity.
                </p>

                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 18px',
                      borderRadius: '99px',
                      background: '#ffffff',
                      border: '1px solid var(--gold-border)',
                      boxShadow: '0 4px 15px rgba(58, 33, 21, 0.05)',
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      color: 'var(--leather-espresso)'
                    }}
                  >
                    <Sparkles size={14} color="var(--gold)" />
                    <span>FULL-GRAIN VEGETABLE TANNED</span>
                  </div>

                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 18px',
                      borderRadius: '99px',
                      background: '#ffffff',
                      border: '1px solid var(--gold-border)',
                      boxShadow: '0 4px 15px rgba(58, 33, 21, 0.05)',
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      color: 'var(--leather-espresso)'
                    }}
                  >
                    <CheckCircle2 size={14} color="var(--gold)" />
                    <span>REACH & LWG COMPLIANT</span>
                  </div>
                </div>
              </div>

              {/* Right Column: High-Res Macro Photography Card with Interactive Loupe Tag */}
              <div
                className="s1-visual-card"
                style={{
                  position: 'relative',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 25px 50px rgba(58, 33, 21, 0.12)',
                  border: '1px solid var(--gold-border)',
                  aspectRatio: '16/10',
                  background: '#f2ece2'
                }}
              >
                <img
                  src="./assets/leather-grain-macro.jpg"
                  alt="Full Grain Leather Hide Macro"
                  className="macro-leather-img"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />

                {/* Floating Inspection Loupe Badge */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '20px',
                    padding: '8px 16px',
                    borderRadius: '99px',
                    background: 'rgba(255, 255, 255, 0.92)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid var(--gold)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: 'var(--leather-espresso)',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                  }}
                >
                  <ZoomIn size={14} color="var(--gold)" />
                  <span>NATURAL PEBBLE PULL-UP GRAIN</span>
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================================
              SCENE 02 — UNCOMPROMISING SELECTION (Artisan Workbench & Hotspots)
              =================================================================== */}
          <div
            className="scene-02"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '100px 32px 40px'
            }}
          >
            <div
              style={{
                maxWidth: '1280px',
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr)',
                gap: '50px',
                alignItems: 'center'
              }}
            >
              {/* Left Column: Interactive Workbench Photo with Clickable Hotspots */}
              <div
                className="s2-card"
                style={{
                  position: 'relative',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 25px 50px rgba(58, 33, 21, 0.12)',
                  border: '1px solid var(--gold-border)',
                  aspectRatio: '16/10',
                  background: '#f2ece2'
                }}
              >
                <img
                  src="./assets/pattern-cutting-craft.jpg"
                  alt="Precision Leather Pattern Cutting"
                  className="pattern-workbench-img"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />

                {/* Hotspot 1: Brass Clicker Knife */}
                <button
                  onClick={() => setActiveHotspot(activeHotspot === 1 ? null : 1)}
                  data-cursor="INSPECT"
                  style={{
                    position: 'absolute',
                    top: '42%',
                    left: '52%',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: '#ffffff',
                    border: '2px solid var(--gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 0 15px rgba(153, 115, 58, 0.5)',
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--gold-dark)' }}>1</span>
                </button>

                {/* Hotspot 2: Steel Vector Ruler */}
                <button
                  onClick={() => setActiveHotspot(activeHotspot === 2 ? null : 2)}
                  data-cursor="INSPECT"
                  style={{
                    position: 'absolute',
                    bottom: '25%',
                    left: '26%',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: '#ffffff',
                    border: '2px solid var(--gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 0 15px rgba(153, 115, 58, 0.5)',
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--gold-dark)' }}>2</span>
                </button>

                {/* Hotspot Overlay Card */}
                {activeHotspot && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '20px',
                      right: '20px',
                      maxWidth: '300px',
                      padding: '14px 18px',
                      borderRadius: '14px',
                      background: 'rgba(255, 255, 255, 0.96)',
                      backdropFilter: 'blur(15px)',
                      border: '1px solid var(--gold)',
                      boxShadow: '0 10px 25px rgba(58, 33, 21, 0.15)',
                      animation: 'fadeIn 0.3s ease'
                    }}
                  >
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.7rem', fontWeight: 700, color: 'var(--gold-dark)', textTransform: 'uppercase' }}>
                      {activeHotspot === 1 ? 'HARDENED BRASS CLICKER BLADE' : 'STAINLESS VECTOR RULER'}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
                      {activeHotspot === 1
                        ? 'Hand-sharpened Japanese steel core designed to follow natural leather stretch vectors without fraying fiber edges.'
                        : 'Calibrated to 0.1mm increments for bespoke OEM luxury fashion specifications.'}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Narrative & Metrics */}
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.35em',
                    fontWeight: 700,
                    color: 'var(--gold)',
                    textTransform: 'uppercase',
                    marginBottom: '16px'
                  }}
                >
                  ACT II • UNCOMPROMISING SELECTION
                </div>

                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(2.4rem, 4.8vw, 4.2rem)',
                    fontWeight: 700,
                    color: 'var(--leather-espresso)',
                    lineHeight: 1.15,
                    marginBottom: '20px',
                    letterSpacing: '-0.02em'
                  }}
                >
                  SELECTED WITH PRECISION. <br />
                  <span className="gold-gradient-text" style={{ fontStyle: 'italic', fontFamily: 'var(--font-editorial)' }}>
                    Crafted
                  </span> WITH PURPOSE.
                </h2>

                <p
                  style={{
                    fontSize: '1.05rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.7,
                    marginBottom: '28px'
                  }}
                >
                  We reject more than 95% of prospective hides. Only flawless hides with balanced tensile strength, zero surface scarring, and full pull-up resonance earn entry into the Droworang workshop.
                </p>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '12px 24px',
                    borderRadius: '16px',
                    background: '#ffffff',
                    border: '1px solid var(--gold-border)',
                    boxShadow: '0 4px 20px rgba(58, 33, 21, 0.06)'
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, color: 'var(--gold-dark)', lineHeight: 1 }}>
                    95%
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--leather-espresso)', lineHeight: 1.3 }}>
                    HIDES REJECTED <br />
                    <span style={{ color: 'var(--gold)', fontWeight: 600 }}>ONLY TOP 5% QUALIFY</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================================
              SCENE 03 — FOUR PILLARS OF CRAFTSMANSHIP (Artisan Machine & Cards)
              =================================================================== */}
          <div
            className="scene-03"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '100px 32px 40px'
            }}
          >
            <div style={{ maxWidth: '1280px', width: '100%', textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.35em',
                  fontWeight: 700,
                  color: 'var(--gold)',
                  textTransform: 'uppercase',
                  marginBottom: '10px'
                }}
              >
                ACT III • FOUR PILLARS OF ATELIER MASTERY
              </div>

              {/* Synchronized Focus Word */}
              <div
                className="craft-focus-word"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(3.2rem, 7vw, 5.8rem)',
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  color: 'var(--leather-espresso)',
                  marginBottom: '24px'
                }}
              >
                CUT.
              </div>

              {/* 4 Interactive Craft Cards with Photography */}
              <div
                className="s3-card"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '20px',
                  textAlign: 'left'
                }}
              >
                {craftStages.map((stage, idx) => {
                  const isActive = activeCraftTab === idx;
                  return (
                    <div
                      key={stage.title}
                      onClick={() => setActiveCraftTab(idx)}
                      data-cursor="SELECT"
                      style={{
                        padding: '18px',
                        borderRadius: '20px',
                        background: '#ffffff',
                        border: `1.5px solid ${isActive ? 'var(--gold)' : 'var(--gold-border)'}`,
                        boxShadow: isActive ? '0 12px 30px rgba(153, 115, 58, 0.16)' : '0 4px 15px rgba(58, 33, 21, 0.04)',
                        transform: isActive ? 'translateY(-4px)' : 'none',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        cursor: 'pointer'
                      }}
                    >
                      <div
                        style={{
                          height: '130px',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          marginBottom: '14px',
                          position: 'relative'
                        }}
                      >
                        <img
                          src={stage.img}
                          alt={stage.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            filter: isActive ? 'none' : 'grayscale(30%)',
                            transition: 'filter 0.3s ease'
                          }}
                        />
                        <div
                          style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            padding: '4px 10px',
                            borderRadius: '99px',
                            background: 'rgba(26, 17, 11, 0.85)',
                            color: '#ffffff',
                            fontFamily: 'var(--font-display)',
                            fontSize: '0.65rem',
                            fontWeight: 700
                          }}
                        >
                          {stage.stat}
                        </div>
                      </div>

                      <div
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          color: isActive ? 'var(--gold-dark)' : 'var(--leather-espresso)',
                          marginBottom: '4px'
                        }}
                      >
                        {stage.title}
                      </div>

                      <p
                        style={{
                          fontSize: '0.84rem',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.5,
                          marginBottom: 0
                        }}
                      >
                        {stage.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ===================================================================
              SCENE 04 — THE METAMORPHOSIS (Raw Hide to 3D Architecture)
              =================================================================== */}
          <div
            className="scene-04"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '100px 32px 40px'
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.75rem',
                letterSpacing: '0.35em',
                fontWeight: 700,
                color: 'var(--gold)',
                textTransform: 'uppercase',
                marginBottom: '16px'
              }}
            >
              ACT IV • THE METAMORPHOSIS
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.4rem, 5vw, 4.4rem)',
                fontWeight: 700,
                color: 'var(--leather-espresso)',
                lineHeight: 1.15,
                maxWidth: '920px',
                letterSpacing: '-0.02em',
                marginBottom: '32px'
              }}
            >
              RAW HIDE <span className="gold-gradient-text">→</span> STRUCTURE <span className="gold-gradient-text">→</span> LUXURY SILHOUETTE
            </h2>

            {/* Metamorphosis Interactive Timeline Progress */}
            <div
              style={{
                width: 'min(85vw, 680px)',
                height: '6px',
                background: 'rgba(153, 115, 58, 0.18)',
                borderRadius: '99px',
                overflow: 'hidden',
                position: 'relative',
                marginBottom: '32px'
              }}
            >
              <div
                className="morph-fill-line"
                style={{
                  height: '100%',
                  width: '0%',
                  background: 'linear-gradient(90deg, var(--gold-dark), var(--gold))'
                }}
              />
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '24px',
                maxWidth: '820px',
                width: '100%'
              }}
            >
              <div
                style={{
                  padding: '20px',
                  borderRadius: '16px',
                  background: '#ffffff',
                  border: '1px solid var(--gold-border)',
                  boxShadow: '0 4px 15px rgba(58, 33, 21, 0.05)'
                }}
              >
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.74rem', fontWeight: 800, color: 'var(--gold-dark)', textTransform: 'uppercase' }}>PHASE I</div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--leather-espresso)', marginTop: '4px', fontWeight: 600 }}>Flat Hide Vectoring</div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: 1.4 }}>Fiber-aligned clicking</p>
              </div>

              <div
                style={{
                  padding: '20px',
                  borderRadius: '16px',
                  background: '#ffffff',
                  border: '1px solid var(--gold)',
                  boxShadow: '0 6px 20px rgba(153, 115, 58, 0.12)'
                }}
              >
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.74rem', fontWeight: 800, color: 'var(--gold)', textTransform: 'uppercase' }}>PHASE II</div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--leather-espresso)', marginTop: '4px', fontWeight: 600 }}>Saddle Assembly</div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: 1.4 }}>0.4mm skiving & stitch</p>
              </div>

              <div
                style={{
                  padding: '20px',
                  borderRadius: '16px',
                  background: '#ffffff',
                  border: '1px solid var(--gold-border)',
                  boxShadow: '0 4px 15px rgba(58, 33, 21, 0.05)'
                }}
              >
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.74rem', fontWeight: 800, color: 'var(--gold-dark)', textTransform: 'uppercase' }}>PHASE III</div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--leather-espresso)', marginTop: '4px', fontWeight: 600 }}>Luxury Silhouette</div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: 1.4 }}>Triple edge-burnished</p>
              </div>
            </div>
          </div>

          {/* ===================================================================
              SCENE 05 — THE FINISHED SILHOUETTE (Masterpiece Editorial Showcase)
              =================================================================== */}
          <div
            className="scene-05"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '80px 24px 30px'
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '18px' }}>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.35em',
                  fontWeight: 700,
                  color: 'var(--gold)',
                  textTransform: 'uppercase',
                  marginBottom: '8px'
                }}
              >
                ACT V • THE FINISHED SILHOUETTE
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
                  color: 'var(--leather-espresso)',
                  lineHeight: 1.1,
                  fontWeight: 700
                }}
              >
                Crafted By Hand. <span className="gold-gradient-text" style={{ fontStyle: 'italic', fontFamily: 'var(--font-editorial)' }}>Refined For The World.</span>
              </h2>
            </div>

            {/* Editorial Showcase Hero Card */}
            <div
              className="s5-hero-card"
              style={{
                width: 'min(92vw, 840px)',
                background: '#ffffff',
                borderRadius: '24px',
                border: '1px solid var(--gold-border)',
                boxShadow: '0 20px 50px rgba(58, 33, 21, 0.08)',
                overflow: 'hidden',
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1fr)',
                alignItems: 'center'
              }}
            >
              {/* Product Visual */}
              <div
                style={{
                  height: '100%',
                  minHeight: '320px',
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'radial-gradient(circle at center, #ffffff 0%, var(--bg-secondary) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '24px'
                }}
              >
                <img
                  src="./assets/leather-bags-hero.webp"
                  alt="Droworang Finished Masterpiece"
                  className="s5-hero-img"
                  style={{
                    width: '100%',
                    maxHeight: '290px',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 15px 25px rgba(58, 33, 21, 0.18))'
                  }}
                />

                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 12px',
                    borderRadius: '99px',
                    background: 'rgba(26, 17, 11, 0.85)',
                    color: '#ffffff',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em'
                  }}
                >
                  <Sparkles size={11} color="var(--gold)" />
                  EXPORT GRADE AAA+
                </div>
              </div>

              {/* Dossier & Features */}
              <div style={{ padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.72rem', letterSpacing: '0.2em', color: 'var(--gold-dark)', fontWeight: 700 }}>
                  MODEL DRW-804 • SADDLE BRIEF
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { title: 'Top 5% Full-Grain Hide', detail: 'Vegetable-tanned with mimosa & chestnut extracts' },
                    { title: 'German Adler Saddle Stitch', detail: '3-ply bonded nylon thread at 7 SPI' },
                    { title: 'Solid Antiqued Brass', detail: 'Custom die-cast and hand-finished in our foundry' }
                  ].map((item) => (
                    <div key={item.title} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <CheckCircle2 size={16} color="var(--gold)" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '0.95rem', fontWeight: 600, color: 'var(--leather-espresso)' }}>
                          {item.title}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                          {item.detail}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Direct Link to the 3D Section */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => {
                      const el = document.querySelector('#view-3d');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    data-cursor="3D VIEW"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 20px',
                      borderRadius: '99px',
                      background: 'var(--leather-espresso)',
                      color: '#ffffff',
                      border: 'none',
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      cursor: 'pointer',
                      boxShadow: '0 6px 18px rgba(26, 17, 11, 0.15)'
                    }}
                  >
                    <Eye size={14} color="var(--gold)" />
                    VIEW IN 3D [360° SPIN] ↓
                  </button>

                  <button
                    onClick={() => onOpenInquiry && onOpenInquiry()}
                    data-cursor="INQUIRE"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '10px 18px',
                      borderRadius: '99px',
                      background: '#ffffff',
                      color: 'var(--leather-espresso)',
                      border: '1px solid var(--gold-border)',
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    INQUIRE B2B
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================================
              SCENE 06 — BRAND REVEAL & SEAMLESS HOMEPAGE TRANSITION
              =================================================================== */}
          <div
            className="scene-06"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '40px 24px',
              backgroundColor: 'var(--bg-primary)'
            }}
          >
            {/* Government of India NOC Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 20px',
                borderRadius: '99px',
                background: '#ffffff',
                border: '1px solid var(--gold-border)',
                boxShadow: '0 4px 15px rgba(58, 33, 21, 0.06)',
                marginBottom: '20px'
              }}
            >
              <ShieldCheck size={16} color="var(--gold)" />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--gold-dark)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                GOVERNMENT OF INDIA NOC CERTIFIED EXPORTER
              </span>
            </div>

            <h1
              className="font-brand"
              style={{
                fontSize: 'clamp(2.8rem, 6vw, 5.6rem)',
                lineHeight: 1.05,
                color: 'var(--leather-espresso)',
                letterSpacing: '0.04em',
                marginBottom: '16px',
                fontWeight: 700,
                position: 'relative'
              }}
            >
              DROWORANG <br />
              <span className="gold-gradient-text" style={{ letterSpacing: '0.08em', fontFamily: 'var(--font-serif)' }}>
                INTERNATIONAL
              </span>
              <div
                className="s6-crest-sheen"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '60px',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)',
                  pointerEvents: 'none',
                  transform: 'skewX(-25deg)'
                }}
              />
            </h1>

            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.82rem',
                letterSpacing: '0.22em',
                color: 'var(--gold-dark)',
                fontWeight: 700,
                textTransform: 'uppercase',
                marginBottom: '18px'
              }}
            >
              PVT. LTD. • HALDWANI, NAINITAL, INDIA
            </div>

            <p
              style={{
                maxWidth: '680px',
                fontSize: 'clamp(1rem, 1.3vw, 1.2rem)',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                margin: '0 auto 32px'
              }}
            >
              Master leather manufacturers and direct exporters. Uniting the generational soul of Indian artisanship with European precision engineering.
            </p>

            {/* Action CTAs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button
                onClick={handleQuickSkip}
                data-cursor="CATALOG"
                className="btn-primary"
                style={{ padding: '18px 40px', fontSize: '0.88rem' }}
              >
                <span>EXPLORE EXPORT COLLECTIONS</span>
                <ArrowDown size={16} className="btn-icon" />
              </button>

              <button
                onClick={onOpenInquiry}
                data-cursor="INQUIRE"
                className="btn-secondary"
                style={{ padding: '18px 36px', fontSize: '0.88rem' }}
              >
                <span>REQUEST FACTORY PROPOSAL</span>
                <ArrowRight size={16} className="btn-icon" />
              </button>
            </div>

            {/* Replay Intro Trigger */}
            <div style={{ marginTop: '24px' }}>
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                data-cursor="REPLAY"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--gold-dark)',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  textTransform: 'uppercase'
                }}
              >
                <RotateCcw size={12} />
                <span>REPLAY CINEMATIC STORY</span>
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
