import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, ArrowDown, ArrowRight, ShieldCheck, Sparkles, RotateCcw, ChevronRight, Eye } from 'lucide-react';

const TOTAL_FRAMES = 60;

// Smooth cubic smoothstep cross-fade helper to guarantee ZERO BLANK GAPS between scenes
function getSceneOpacity(p, start, peakStart, peakEnd, end) {
  if (p < start || p > end) return 0;
  if (p >= peakStart && p <= peakEnd) return 1;
  if (p < peakStart) {
    const t = (p - start) / (peakStart - start);
    return t * t * (3 - 2 * t);
  } else {
    const t = (end - p) / (end - peakEnd);
    return t * t * (3 - 2 * t);
  }
}

export default function CinematicStoryIntro({ onEnterSite, onOpenInquiry, onProgress }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [framesLoaded, setFramesLoaded] = useState(false);
  const [isManualDragging, setIsManualDragging] = useState(false);

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const bagCanvasRef = useRef(null);
  const worldCanvasRef = useRef(null);
  const frameImagesRef = useRef([]);
  const audioCtxRef = useRef(null);
  const droneOscRef = useRef(null);
  const droneGainRef = useRef(null);
  const lastChimeScene = useRef(-1);

  // Ref-based mouse tracking (zero React DOM re-renders)
  const mousePosRef = useRef({ x: 0, y: 0 });
  const manualFrameOffsetRef = useRef(0);
  const dragStartXRef = useRef(0);

  // 1. Preload 60 rotational frames
  useEffect(() => {
    let loadedCount = 0;
    const preloaded = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const numStr = String(i).padStart(3, '0');
      img.src = `./frames/frame_${numStr}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) setFramesLoaded(true);
      };
      preloaded.push(img);
    }
    frameImagesRef.current = preloaded;
  }, []);

  // 2. Mouse Tracking for 3D Camera / Lighting Sheen
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePosRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 3. High-Efficiency Direct Scroll Listener (100% Responsive, Zero Lag)
  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const rawProgress = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);
      
      setScrollProgress(rawProgress);
      if (onProgress) onProgress(rawProgress);

      // Audio chimes
      const sceneNum = Math.floor(rawProgress * 7);
      if (sceneNum !== lastChimeScene.current && sceneNum >= 0 && sceneNum <= 6) {
        lastChimeScene.current = sceneNum;
        playHarmonicChime(sceneNum);
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [onProgress]);

  // 4. Continuous Ambient & Canvas Render Loop
  useEffect(() => {
    let animId;

    const loop = () => {
      renderBackgroundCanvas(scrollProgress);
      renderBagCanvas(scrollProgress);
      renderWorldCanvas(scrollProgress);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [scrollProgress, framesLoaded]);

  // A. Atmospheric Leather & Warm Sunbeam Canvas
  const renderBackgroundCanvas = (p) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = (canvas.width = canvas.parentElement.clientWidth);
    const h = (canvas.height = canvas.parentElement.clientHeight);

    ctx.clearRect(0, 0, w, h);

    const mx = mousePosRef.current.x;
    const my = mousePosRef.current.y;

    // Warm Alabaster to Soft Linen Radial Gradient
    const baseGrad = ctx.createRadialGradient(
      w * 0.5 + mx * 35,
      h * 0.4 + my * 35,
      50,
      w * 0.5,
      h * 0.5,
      Math.max(w, h) * 0.8
    );
    baseGrad.addColorStop(0, '#ffffff');
    baseGrad.addColorStop(0.5, '#fbf8f3');
    baseGrad.addColorStop(1, '#f2ece2');
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, w, h);

    // Warm golden ambient sunbeam passing diagonally
    const beamX = p * (w * 1.5) - w * 0.25;
    const beamGrad = ctx.createLinearGradient(beamX - 220, 0, beamX + 220, h);
    beamGrad.addColorStop(0, 'rgba(153, 115, 58, 0)');
    beamGrad.addColorStop(0.5, 'rgba(212, 175, 105, 0.12)');
    beamGrad.addColorStop(1, 'rgba(153, 115, 58, 0)');
    ctx.fillStyle = beamGrad;
    ctx.fillRect(0, 0, w, h);

    // Floating gold dust particles
    const time = Date.now() * 0.001;
    ctx.fillStyle = 'rgba(153, 115, 58, 0.30)';
    for (let i = 0; i < 28; i++) {
      const seedX = (Math.sin(i * 99 + time * 0.2) * 0.5 + 0.5) * w;
      const seedY = (Math.cos(i * 33 + time * 0.15) * 0.5 + 0.5) * h;
      const size = (Math.sin(i + time) * 0.5 + 0.5) * 2 + 1;
      ctx.beginPath();
      ctx.arc(seedX, seedY, size, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  // B. 360° Rotational Bag Canvas (Active during Act 4 & Act 5)
  const renderBagCanvas = (p) => {
    const canvas = bagCanvasRef.current;
    if (!canvas || !framesLoaded) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Active in Scenes 04 to 05 (p: 0.38 to 0.85)
    if (p < 0.38 || p > 0.85) return;

    // Map scroll progress to 360 degree frame index
    let frameIdx = 1;
    if (p >= 0.40 && p <= 0.85) {
      const rotationProgress = (p - 0.40) / 0.45;
      frameIdx = Math.floor(rotationProgress * TOTAL_FRAMES * 2) % TOTAL_FRAMES + 1;
    }

    // Add manual drag rotation
    frameIdx = ((frameIdx + manualFrameOffsetRef.current - 1) % TOTAL_FRAMES) + 1;
    if (frameIdx <= 0) frameIdx += TOTAL_FRAMES;

    const img = frameImagesRef.current[frameIdx - 1];
    if (img && img.complete) {
      ctx.save();

      const mx = mousePosRef.current.x;

      // Soft natural leather shadow on light luxury floor
      const shadowY = h * 0.88;
      const shadowGrad = ctx.createRadialGradient(
        w * 0.5 + mx * 15,
        shadowY,
        15,
        w * 0.5 + mx * 15,
        shadowY,
        w * 0.42
      );
      shadowGrad.addColorStop(0, 'rgba(58, 33, 21, 0.20)');
      shadowGrad.addColorStop(0.6, 'rgba(58, 33, 21, 0.05)');
      shadowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = shadowGrad;
      ctx.beginPath();
      ctx.ellipse(w * 0.5 + mx * 15, shadowY, w * 0.42, 24, 0, 0, Math.PI * 2);
      ctx.fill();

      // Draw bag frame
      ctx.drawImage(img, 0, 0, w, h);

      // Specular light sheen
      const sheenX = w * (0.5 + mx * 0.25);
      const sheenGrad = ctx.createRadialGradient(sheenX, h * 0.45, 10, sheenX, h * 0.45, w * 0.5);
      sheenGrad.addColorStop(0, 'rgba(255, 255, 255, 0.32)');
      sheenGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.06)');
      sheenGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = sheenGrad;
      ctx.fillRect(0, 0, w, h);

      ctx.restore();
    }
  };

  // C. Global Export World Map Canvas (Scene 06)
  const renderWorldCanvas = (p) => {
    const canvas = worldCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = (canvas.width = canvas.parentElement.clientWidth);
    const h = (canvas.height = canvas.parentElement.clientHeight);

    ctx.clearRect(0, 0, w, h);

    if (p < 0.74 || p > 0.96) return;

    const sceneP = (p - 0.74) / 0.20;

    // India origin (Haldwani, Nainital)
    const originX = w * 0.65;
    const originY = h * 0.50;

    const targets = [
      { x: w * 0.42, y: h * 0.32, label: "Germany / Europe" },
      { x: w * 0.38, y: h * 0.30, label: "United Kingdom" },
      { x: w * 0.44, y: h * 0.36, label: "Italy / Milan" },
      { x: w * 0.24, y: h * 0.38, label: "North America" },
      { x: w * 0.56, y: h * 0.45, label: "Middle East" },
      { x: w * 0.78, y: h * 0.62, label: "Asia-Pacific" }
    ];

    // Pulsing India Origin Node
    const pulse = 6 + Math.sin(Date.now() * 0.006) * 4;
    ctx.beginPath();
    ctx.arc(originX, originY, pulse + 8, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(153, 115, 58, 0.22)';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(originX, originY, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#99733a';
    ctx.fill();

    // Outbound Golden Light Arcs
    targets.forEach((tgt, i) => {
      const cx = (originX + tgt.x) / 2;
      const cy = Math.min(originY, tgt.y) - 60;

      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.quadraticCurveTo(cx, cy, tgt.x, tgt.y);
      ctx.strokeStyle = 'rgba(153, 115, 58, 0.28)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      const progress = (sceneP * 2.2 + i * 0.2) % 1;
      const px = (1 - progress) * (1 - progress) * originX + 2 * (1 - progress) * progress * cx + progress * progress * tgt.x;
      const py = (1 - progress) * (1 - progress) * originY + 2 * (1 - progress) * progress * cy + progress * progress * tgt.y;

      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#b89355';
      ctx.shadowColor = '#99733a';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.beginPath();
      ctx.arc(tgt.x, tgt.y, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#99733a';
      ctx.fill();
    });
  };

  // Interactive 360 Bag Drag
  const handleBagMouseDown = (e) => {
    setIsManualDragging(true);
    dragStartXRef.current = e.clientX;
  };

  const handleBagMouseMove = (e) => {
    if (!isManualDragging) return;
    const delta = e.clientX - dragStartXRef.current;
    dragStartXRef.current = e.clientX;
    manualFrameOffsetRef.current += Math.round(delta / 10);
  };

  const handleBagMouseUp = () => {
    setIsManualDragging(false);
  };

  // Web Audio API Ambient Sound
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
      console.warn("Audio init prevented:", e);
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

  const playHarmonicChime = (sceneIndex) => {
    if (isAudioMuted || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const notes = [440, 528, 660, 784, 880, 990, 1056];
      const freq = notes[sceneIndex % notes.length];

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.035, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.5);
    } catch (e) {
      // ignore
    }
  };

  const handleQuickSkip = () => {
    if (containerRef.current) {
      const bottom = containerRef.current.offsetTop + containerRef.current.offsetHeight;
      window.scrollTo({ top: bottom - 20, behavior: 'smooth' });
    }
    if (onEnterSite) onEnterSite();
  };

  // Continuous Seamless Scene Opacities (Zero Gaps Math)
  // Act 1: Material Genesis (0.00 to 0.16)
  const s1 = getSceneOpacity(scrollProgress, 0.00, 0.00, 0.10, 0.16);
  // Act 2: Selection (0.10 to 0.32)
  const s2 = getSceneOpacity(scrollProgress, 0.10, 0.16, 0.26, 0.32);
  // Act 3: Workshop Metier (CUT • STITCH • SHAPE • FINISH) (0.26 to 0.48)
  const s3 = getSceneOpacity(scrollProgress, 0.26, 0.32, 0.42, 0.48);
  // Act 4: 360° Product Reveal & Interactive Rotation (0.42 to 0.68)
  const s4 = getSceneOpacity(scrollProgress, 0.42, 0.48, 0.62, 0.68);
  // Act 5: Brand Emergence (DROWORANG INTERNATIONAL) (0.62 to 0.82)
  const s5 = getSceneOpacity(scrollProgress, 0.62, 0.68, 0.76, 0.82);
  // Act 6: Sovereign Origin & World Reach (0.76 to 0.94)
  const s6 = getSceneOpacity(scrollProgress, 0.76, 0.82, 0.88, 0.94);
  // Act 7: Homepage Hero Docking (0.88 to 1.00)
  const s7 = getSceneOpacity(scrollProgress, 0.88, 0.94, 1.00, 1.00);

  // Active word in Act 3
  const craftSub = Math.min(Math.max((scrollProgress - 0.26) / 0.22, 0), 1);
  let craftWord = "CUT.";
  if (craftSub >= 0.25) craftWord = "STITCH.";
  if (craftSub >= 0.50) craftWord = "SHAPE.";
  if (craftSub >= 0.75) craftWord = "FINISH.";

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        height: '350vh', // Responsive 3.5 screens of smooth, uninterrupted storytelling
        backgroundColor: 'var(--bg-primary)'
      }}
      id="cinematic-intro-track"
    >
      {/* Pinned 100vh Viewport */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          backgroundColor: 'var(--bg-primary)',
          zIndex: 20
        }}
      >
        {/* Canvas Background Layer (Leather Grain + Warm Sunbeam) */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 1
          }}
        />

        {/* Diagonal Light Sweep Beam */}
        <div className="light-sweep-beam" style={{ zIndex: 3 }} />

        {/* Global Floating HUD: Sound Control & Skip Button */}
        <div
          style={{
            position: 'absolute',
            top: '88px',
            right: '28px',
            zIndex: 90,
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          {/* Sound Toggle */}
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

          {/* Quick Skip to Website */}
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
            <span>ENTER ATELIER</span>
            <ChevronRight size={13} color="var(--gold)" />
          </button>
        </div>

        {/* Scroll Progress Meter Bar at Bottom Left */}
        <div
          style={{
            position: 'absolute',
            bottom: '28px',
            left: '32px',
            zIndex: 90,
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
          <span>ACT 0{Math.min(Math.floor(scrollProgress * 6) + 1, 7)} / 07</span>
          <div style={{ width: '80px', height: '2px', background: 'rgba(153, 115, 58, 0.25)', position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: `${scrollProgress * 100}%`,
                background: 'var(--gold)',
                transition: 'width 0.08s linear'
              }}
            />
          </div>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', opacity: 0.85 }}>
            SCROLL TO EXPLORE <ArrowDown size={12} />
          </span>
        </div>

        {/* ====================================================================
            ACT 01 — THE MATERIAL GENESIS (0.00 to 0.16)
            ==================================================================== */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '24px',
            opacity: s1,
            pointerEvents: s1 > 0.1 ? 'auto' : 'none',
            transform: `translateY(${(scrollProgress - 0.05) * -60}px)`,
            transition: 'transform 0.1s linear'
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
              marginBottom: '20px'
            }}
          >
            ACT I • THE MATERIAL GENESIS
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.6rem, 5.5vw, 5.2rem)',
              fontWeight: 700,
              color: 'var(--leather-espresso)',
              lineHeight: 1.1,
              maxWidth: '900px',
              letterSpacing: '-0.02em',
              marginBottom: '24px'
            }}
          >
            EVERY CREATION BEGINS <br />
            <span className="gold-gradient-text" style={{ fontStyle: 'italic', fontFamily: 'var(--font-editorial)' }}>
              With Material.
            </span>
          </h1>

          <p
            style={{
              maxWidth: '560px',
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              fontWeight: 400
            }}
          >
            Before a single cut is made, the living hide is evaluated for fiber density, natural pull-up flexibility, and generational longevity.
          </p>
        </div>

        {/* ====================================================================
            ACT 02 — UNCOMPROMISING SELECTION (0.10 to 0.32)
            ==================================================================== */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '24px',
            opacity: s2,
            pointerEvents: s2 > 0.1 ? 'auto' : 'none',
            transform: `scale(${1 + (scrollProgress - 0.20) * 0.06})`,
            transition: 'transform 0.1s linear'
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
              marginBottom: '20px'
            }}
          >
            ACT II • UNCOMPROMISING SELECTION
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.4rem, 5vw, 4.8rem)',
              fontWeight: 700,
              color: 'var(--leather-espresso)',
              lineHeight: 1.15,
              maxWidth: '960px',
              letterSpacing: '-0.02em',
              marginBottom: '24px'
            }}
          >
            SELECTED WITH PRECISION. <br />
            <span className="gold-gradient-text" style={{ fontStyle: 'italic', fontFamily: 'var(--font-editorial)' }}>
              Crafted
            </span> WITH PURPOSE.
          </h2>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 24px',
              borderRadius: '99px',
              background: '#ffffff',
              border: '1px solid var(--gold-border)',
              boxShadow: '0 4px 20px rgba(58, 33, 21, 0.06)'
            }}
          >
            <Sparkles size={14} color="var(--gold)" />
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--leather-espresso)', letterSpacing: '0.08em' }}>
              REJECTING 95% OF HIDES • 100% ETHICALLY CERTIFIED INDIAN TANNERIES
            </span>
          </div>
        </div>

        {/* ====================================================================
            ACT 03 — ATELIER CRAFTSMANSHIP (0.26 to 0.48)
            ==================================================================== */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '24px',
            opacity: s3,
            pointerEvents: s3 > 0.1 ? 'auto' : 'none'
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
            ACT III • FOUR PILLARS OF ATELIER MASTERY
          </div>

          <div
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(4.2rem, 11vw, 9.5rem)',
              fontWeight: 700,
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
              color: 'var(--leather-espresso)',
              marginBottom: '28px',
              minHeight: '1.1em'
            }}
          >
            {craftWord}
          </div>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '700px' }}>
            {['CUT', 'STITCH', 'SHAPE', 'FINISH'].map((word) => {
              const isActive = craftWord.includes(word);
              return (
                <div
                  key={word}
                  style={{
                    padding: '8px 22px',
                    borderRadius: '99px',
                    background: isActive ? 'var(--leather-espresso)' : '#ffffff',
                    border: `1px solid ${isActive ? 'var(--gold)' : 'var(--gold-border)'}`,
                    color: isActive ? '#ffffff' : 'var(--text-secondary)',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    boxShadow: '0 4px 15px rgba(58, 33, 21, 0.05)',
                    transition: 'all 0.25s ease'
                  }}
                >
                  {word}
                </div>
              );
            })}
          </div>
        </div>

        {/* ====================================================================
            ACT 04 — 360° PRODUCT REVEAL & INSPECTION (0.42 to 0.68)
            ==================================================================== */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: s4,
            pointerEvents: s4 > 0.1 ? 'auto' : 'none'
          }}
          onMouseDown={handleBagMouseDown}
          onMouseMove={handleBagMouseMove}
          onMouseUp={handleBagMouseUp}
        >
          {/* Centered 360 Product Canvas on Luxury Pedestal */}
          <div
            style={{
              position: 'relative',
              width: 'min(80vw, 540px)',
              height: 'min(80vw, 540px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: isManualDragging ? 'grabbing' : 'grab'
            }}
          >
            {/* White Luxury Circular Pedestal */}
            <div
              style={{
                position: 'absolute',
                bottom: '8%',
                width: '84%',
                height: '32px',
                borderRadius: '50%',
                background: 'radial-gradient(ellipse at center, #ffffff 0%, rgba(245, 239, 230, 0.8) 70%, transparent 100%)',
                boxShadow: '0 20px 40px rgba(58, 33, 21, 0.08)',
                border: '1px solid rgba(153, 115, 58, 0.15)'
              }}
            />

            <canvas
              ref={bagCanvasRef}
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
          </div>

          {/* Interactive Inspection Tag */}
          <div
            style={{
              marginTop: '8px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 22px',
              borderRadius: '99px',
              background: '#ffffff',
              border: '1px solid var(--gold-border)',
              boxShadow: '0 4px 15px rgba(58, 33, 21, 0.06)'
            }}
          >
            <Eye size={14} color="var(--gold)" />
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--leather-espresso)', letterSpacing: '0.12em' }}>
              SCROLL OR DRAG TO ROTATE 360°
            </span>
          </div>
        </div>

        {/* ====================================================================
            ACT 05 — THE MAISON BRAND REVEAL (0.62 to 0.82)
            ==================================================================== */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '24px',
            opacity: s5,
            pointerEvents: s5 > 0.1 ? 'auto' : 'none'
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
            ACT V • THE MAISON
          </div>

          <h2
            className="font-brand"
            style={{
              fontSize: 'clamp(2.8rem, 6.2vw, 5.8rem)',
              lineHeight: 1.05,
              color: 'var(--leather-espresso)',
              letterSpacing: '0.04em',
              marginBottom: '14px',
              fontWeight: 700
            }}
          >
            DROWORANG <br />
            <span className="gold-gradient-text" style={{ letterSpacing: '0.08em', fontFamily: 'var(--font-serif)' }}>
              INTERNATIONAL
            </span>
          </h2>

          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.82rem',
              letterSpacing: '0.22em',
              color: 'var(--gold-dark)',
              fontWeight: 700,
              textTransform: 'uppercase',
              marginBottom: '20px'
            }}
          >
            PVT. LTD. • HALDWANI, INDIA
          </div>

          <p
            style={{
              maxWidth: '540px',
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7
            }}
          >
            Master Leather Manufacturers & Exporters uniting the generational soul of Indian leather artisanship with European industrial precision.
          </p>
        </div>

        {/* ====================================================================
            ACT 06 — SOVEREIGN ORIGIN & WORLD REACH (0.76 to 0.94)
            ==================================================================== */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '24px',
            opacity: s6,
            pointerEvents: s6 > 0.1 ? 'auto' : 'none'
          }}
        >
          <canvas
            ref={worldCanvasRef}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              zIndex: 2,
              pointerEvents: 'none'
            }}
          />

          <div style={{ position: 'relative', zIndex: 5, maxWidth: '820px', margin: '0 auto 16px' }}>
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
              ACT VI • SOVEREIGN ROOTS & GLOBAL REACH
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.6rem, 5.2vw, 4.8rem)',
                color: 'var(--leather-espresso)',
                lineHeight: 1.1,
                fontWeight: 700
              }}
            >
              BORN IN INDIA. <br />
              <span className="gold-gradient-text" style={{ fontStyle: 'italic', fontFamily: 'var(--font-editorial)' }}>
                Crafted
              </span> FOR THE WORLD.
            </h2>
          </div>

          <div style={{ textAlign: 'center', position: 'relative', zIndex: 10, maxWidth: '640px', margin: '0 auto' }}>
            <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Direct factory export from our Government of India NOC-certified atelier in Haldwani, Nainital to European wholesalers and international luxury brands.
            </p>
          </div>
        </div>

        {/* ====================================================================
            ACT 07 — HOMEPAGE HERO DOCKING (0.88 to 1.00)
            Seamlessly merges with homepage content below with zero gap!
            ==================================================================== */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 40,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '40px 24px',
            backgroundColor: 'var(--bg-primary)',
            opacity: s7,
            pointerEvents: s7 > 0.4 ? 'auto' : 'none'
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
              marginBottom: '24px'
            }}
          >
            <ShieldCheck size={16} color="var(--gold)" />
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--gold-dark)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              GOVERNMENT OF INDIA NOC CERTIFIED EXPORTER
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.8rem, 6vw, 5.6rem)',
              lineHeight: 1.05,
              color: 'var(--leather-espresso)',
              letterSpacing: '-0.02em',
              marginBottom: '20px',
              fontWeight: 700
            }}
          >
            CRAFTING LEATHER <br />
            <span className="gold-gradient-text" style={{ fontStyle: 'italic', fontFamily: 'var(--font-editorial)' }}>
              For The World.
            </span>
          </h1>

          <p
            style={{
              maxWidth: '680px',
              fontSize: 'clamp(1rem, 1.3vw, 1.25rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              margin: '0 auto 36px'
            }}
          >
            Droworang International Pvt. Ltd. unites the generational soul of Indian leather artisanship with European industrial precision. Direct manufacturer and exporter of luxury handbags, luggage, and OEM small leather goods.
          </p>

          {/* Action CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={() => {
                const el = document.querySelector('#homepage-content');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
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
          <div style={{ marginTop: '32px' }}>
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
    </div>
  );
}
