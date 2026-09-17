import React, { useEffect, useRef } from 'react';
import { Globe, Plane, Ship, ShieldCheck, MapPin } from 'lucide-react';
import { companyData } from '../data/companyData';

export default function GlobalExportMap() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // India origin coordinates (normalized 0 to 1)
    const origin = { x: 0.68, y: 0.48 };

    // Global partner destinations (normalized coordinates on world projection)
    const destinations = [
      { name: "Germany (Frankfurt / Munich)", x: 0.49, y: 0.28, region: "Europe Hub" },
      { name: "United Kingdom (London)", x: 0.44, y: 0.26, region: "UK & Ireland" },
      { name: "Italy (Milan / Florence)", x: 0.50, y: 0.33, region: "Southern Europe" },
      { name: "France (Paris)", x: 0.46, y: 0.30, region: "Western Europe" },
      { name: "United States (New York)", x: 0.26, y: 0.33, region: "North America" },
      { name: "United Arab Emirates (Dubai)", x: 0.61, y: 0.42, region: "Middle East" },
      { name: "Singapore", x: 0.77, y: 0.58, region: "Southeast Asia" },
      { name: "Australia (Sydney)", x: 0.88, y: 0.78, region: "Oceania" }
    ];

    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const ox = origin.x * canvas.width;
      const oy = origin.y * canvas.height;

      // Draw subtle background connection arcs
      destinations.forEach((dest, i) => {
        const dx = dest.x * canvas.width;
        const dy = dest.y * canvas.height;

        // Quadratic curve control point
        const cx = (ox + dx) / 2;
        const cy = Math.min(oy, dy) - 40;

        // Base route line
        ctx.beginPath();
        ctx.moveTo(ox, oy);
        ctx.quadraticCurveTo(cx, cy, dx, dy);
        ctx.strokeStyle = 'rgba(91, 184, 246, 0.38)';
        ctx.lineWidth = 1.4;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Animated traveling light packet
        const progress = (t * 0.008 + i * 0.25) % 1;
        const px = (1 - progress) * (1 - progress) * ox + 2 * (1 - progress) * progress * cx + progress * progress * dx;
        const py = (1 - progress) * (1 - progress) * oy + 2 * (1 - progress) * progress * cy + progress * progress * dy;

        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#4aa3d8';
        ctx.shadowColor = '#5bb8f6';
        ctx.shadowBlur = 10;
        ctx.fill();

        // Destination node
        ctx.beginPath();
        ctx.arc(dx, dy, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = '#2e7ec0';
        ctx.shadowColor = '#5bb8f6';
        ctx.shadowBlur = 8;
        ctx.fill();

        // Subtle label on desktop
        if (canvas.width > 768) {
          ctx.font = '600 11px Manrope, sans-serif';
          ctx.fillStyle = '#2c1b12';
          ctx.shadowBlur = 0;
          ctx.fillText(dest.region, dx + 8, dy + 4);
        }
      });

      // Draw pulsating India origin point (Haldwani, Uttarakhand)
      const pulseSize = 6 + Math.sin(t * 0.05) * 3;
      ctx.beginPath();
      ctx.arc(ox, oy, pulseSize + 8, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(91, 184, 246, 0.22)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(ox, oy, pulseSize, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(91, 184, 246, 0.5)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(ox, oy, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#0f2740';
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#5bb8f6';
      ctx.fill();

      t += 1;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section
      id="global-export"
      style={{
        position: 'relative',
        backgroundColor: '#edf9ff',
        padding: '130px 24px',
        borderTop: '1px solid rgba(91, 184, 246, 0.18)',
        borderBottom: '1px solid rgba(91, 184, 246, 0.18)',
        overflow: 'hidden'
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
            INTERNATIONAL REACH & COMPLIANCE
          </div>
          <h2 className="section-title">
            CRAFTED IN INDIA. <br />
            <span className="gold-gradient-text" style={{ fontStyle: 'italic', fontFamily: 'var(--font-editorial)' }}>
              Delivered
            </span> TO THE WORLD.
          </h2>
          <p className="section-lead" style={{ margin: '0 auto' }}>
            From our state-of-the-art facility in Haldwani, Nainital, we engineer compliant leather collections dispatched via priority air and maritime logistics directly to European and worldwide hubs.
          </p>
        </div>

        {/* Interactive Light Map Canvas Card */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '540px',
            borderRadius: '24px',
            background: 'radial-gradient(ellipse at 60% 50%, #ffffff 0%, #eaf7ff 70%, #dff3ff 100%)',
            border: '1px solid var(--gold-border)',
            boxShadow: '0 20px 50px rgba(31, 96, 149, 0.08)',
            overflow: 'hidden',
            marginBottom: '40px'
          }}
        >
          {/* Subtle World Map SVG Silhouette in background */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.14,
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 500' fill='%235bb8f6'%3E%3Cpath d='M150,120 Q180,80 220,100 T300,160 Q280,240 220,260 T160,200 Z M220,280 Q250,300 240,360 T200,420 Q170,390 190,320 Z M460,80 Q520,70 560,110 T600,180 Q540,220 480,180 T440,120 Z M640,130 Q720,110 800,150 T880,240 Q820,300 740,280 T660,210 Z M760,340 Q820,320 860,360 T880,440 Q800,460 760,400 Z' /%3E%3C/svg%3E")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              pointerEvents: 'none'
            }}
          />

          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%'
            }}
          />

          {/* Haldwani Origin Indicator Callout */}
          <div
            style={{
              position: 'absolute',
              top: '24px',
              left: '24px',
              padding: '16px 20px',
              borderRadius: '14px',
              background: 'rgba(255, 255, 255, 0.94)',
              border: '1px solid var(--gold-border)',
              backdropFilter: 'blur(16px)',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              boxShadow: '0 8px 24px rgba(58, 33, 21, 0.08)'
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(153, 115, 58, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--gold-dark)'
              }}
            >
              <MapPin size={20} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.68rem', letterSpacing: '0.2em', color: 'var(--gold-dark)', textTransform: 'uppercase', fontWeight: 700 }}>
                EXPORT DISPATCH ORIGIN
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--leather-espresso)', fontWeight: 700 }}>
                Haldwani, Nainital, India
              </div>
            </div>
          </div>

          {/* Mode of Transit Callout */}
          <div
            style={{
              position: 'absolute',
              bottom: '24px',
              right: '24px',
              display: 'flex',
              gap: '12px'
            }}
          >
            <div
              style={{
                padding: '10px 16px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.94)',
                border: '1px solid var(--gold-border)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.78rem',
                color: 'var(--leather-espresso)',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                boxShadow: '0 4px 15px rgba(58, 33, 21, 0.06)'
              }}
            >
              <Plane size={15} color="var(--gold-dark)" />
              <span>Priority Air Express</span>
            </div>

            <div
              style={{
                padding: '10px 16px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.94)',
                border: '1px solid var(--gold-border)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.78rem',
                color: 'var(--leather-espresso)',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                boxShadow: '0 4px 15px rgba(58, 33, 21, 0.06)'
              }}
            >
              <Ship size={15} color="var(--gold-dark)" />
              <span>Container Cargo (FCL / LCL)</span>
            </div>
          </div>
        </div>

        {/* Qualitative Export Pillars */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px'
          }}
        >
          {[
            { label: "GLOBAL REACH", value: "Cross-Border Ready", desc: "Serving European importers, German wholesalers, and international retail brands." },
            { label: "QUALITY FIRST", value: "100% Pre-Shipment Audit", desc: "Every unit is hand-checked for stitch perfection and structural durability." },
            { label: "RELIABLE DELIVERY", value: "Audited Lead Times", desc: "Rigorous milestone scheduling and multimodal global logistics tracking." },
            { label: "CUSTOM MANUFACTURING", value: "Bespoke OEM / ODM", desc: "Tailored leathers, hardware molds, and private label branded packaging." }
          ].map((item, idx) => (
            <div
              key={idx}
              className="luxury-card"
              style={{ padding: '28px 24px' }}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--gold-dark)', textTransform: 'uppercase', marginBottom: '6px', fontWeight: 700 }}>
                {item.label}
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--leather-espresso)', fontWeight: 700, marginBottom: '8px' }}>
                {item.value}
              </div>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
