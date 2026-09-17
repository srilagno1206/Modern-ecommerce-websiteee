import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, RotateCw, Sparkles, Layers, Check } from 'lucide-react';

export default function LeatherShowcase3D() {
  const mountRef = useRef(null);
  const [activeColor, setActiveColor] = useState('#8a5736'); // Default Cognac
  const [activeFinish, setActiveFinish] = useState('Full-Grain Pull-Up');
  const [isInteracting, setIsInteracting] = useState(false);
  const [webglError, setWebglError] = useState(false);

  const colors = [
    { name: 'Warm Cognac', hex: '#8a5736', finish: 'Full-Grain Pull-Up' },
    { name: 'Deep Espresso', hex: '#23140c', finish: 'Aniline Calfskin' },
    { name: 'Sovereign Emerald', hex: '#1b3b2b', finish: 'Crocodile Embossed' },
    { name: 'Saddle Tan', hex: '#a87349', finish: 'Vegetable Tanned' }
  ];

  const floatingLabels = [
    {
      title: "PREMIUM MATERIAL",
      subtitle: "Top 5% Grade Hides",
      description: "Ethically certified bovine hides with uniform tensile strength and zero loose grain.",
      pos: { top: '15%', left: '8%' }
    },
    {
      title: "PRECISION CRAFT",
      subtitle: "0.4mm Skived Seams",
      description: "Feathered edges and lockstitch tension engineered to prevent seam degradation.",
      pos: { top: '15%', right: '8%' }
    },
    {
      title: "GLOBAL QUALITY",
      subtitle: "European REACH Tested",
      description: "100% compliant with international dye chemistry and azo-free safety benchmarks.",
      pos: { bottom: '18%', left: '8%' }
    },
    {
      title: "CUSTOM DESIGN",
      subtitle: "Bespoke OEM / ODM",
      description: "Custom Pantone color matching, private label debossing, and tailored hardware alloys.",
      pos: { bottom: '18%', right: '8%' }
    }
  ];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let scene, camera, renderer, mesh, light1, light2;
    let animationFrameId;
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0.2;
    let targetRotationY = 0.4;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
      camera.position.z = 5.2;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      container.appendChild(renderer.domElement);

      // Procedural procedural leather bump map via canvas
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#808080';
      ctx.fillRect(0, 0, 512, 512);

      // Micro pebble grain
      for (let i = 0; i < 18000; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const radius = Math.random() * 2.2 + 0.6;
        const shade = Math.floor(Math.random() * 60 + 80);
        ctx.fillStyle = `rgb(${shade}, ${shade}, ${shade})`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      const bumpTexture = new THREE.CanvasTexture(canvas);
      bumpTexture.wrapS = THREE.RepeatWrapping;
      bumpTexture.wrapT = THREE.RepeatWrapping;
      bumpTexture.repeat.set(4, 4);

      // Create a luxury curved leather swatch geometry
      const geometry = new THREE.CylinderGeometry(1.6, 1.6, 2.2, 48, 24, true, -Math.PI * 0.4, Math.PI * 0.8);

      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(activeColor),
        roughness: 0.45,
        metalness: 0.15,
        bumpMap: bumpTexture,
        bumpScale: 0.04,
        side: THREE.DoubleSide
      });

      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // Dynamic studio lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
      scene.add(ambientLight);

      light1 = new THREE.DirectionalLight(0xffecd0, 2.5);
      light1.position.set(4, 5, 4);
      scene.add(light1);

      light2 = new THREE.DirectionalLight(0xc5a46d, 1.8);
      light2.position.set(-4, -2, -3);
      scene.add(light2);

      // Floating gold dust around the material
      const particleGeo = new THREE.BufferGeometry();
      const particleCount = 120;
      const posArray = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 8;
        posArray[i + 1] = (Math.random() - 0.5) * 6;
        posArray[i + 2] = (Math.random() - 0.5) * 6;
      }
      particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      const particleMat = new THREE.PointsMaterial({
        size: 0.04,
        color: 0xc5a46d,
        transparent: true,
        opacity: 0.7
      });
      const particles = new THREE.Points(particleGeo, particleMat);
      scene.add(particles);

      // Interaction listeners
      const onMouseDown = (e) => {
        isDragging = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
        setIsInteracting(true);
      };

      const onMouseMove = (e) => {
        if (!isDragging) {
          const rect = container.getBoundingClientRect();
          mouseX = (e.clientX - rect.left) / rect.width - 0.5;
          mouseY = (e.clientY - rect.top) / rect.height - 0.5;
          light1.position.x = mouseX * 8 + 4;
          light1.position.y = -mouseY * 8 + 5;
          return;
        }

        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        targetRotationY += deltaX * 0.008;
        targetRotationX += deltaY * 0.008;

        previousMousePosition = { x: e.clientX, y: e.clientY };
      };

      const onMouseUp = () => {
        isDragging = false;
        setIsInteracting(false);
      };

      const onTouchStart = (e) => {
        if (e.touches.length === 1) {
          isDragging = true;
          previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
      };

      const onTouchMove = (e) => {
        if (!isDragging || e.touches.length !== 1) return;
        const deltaX = e.touches[0].clientX - previousMousePosition.x;
        const deltaY = e.touches[0].clientY - previousMousePosition.y;

        targetRotationY += deltaX * 0.01;
        targetRotationX += deltaY * 0.01;

        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      };

      container.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      container.addEventListener('touchstart', onTouchStart, { passive: true });
      window.addEventListener('touchmove', onTouchMove, { passive: true });
      window.addEventListener('touchend', onMouseUp);

      const handleResize = () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      window.addEventListener('resize', handleResize);

      // Render Loop
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        // Natural idle rotation
        if (!isDragging) {
          targetRotationY += 0.003;
        }

        mesh.rotation.y += (targetRotationY - mesh.rotation.y) * 0.08;
        mesh.rotation.x += (targetRotationX - mesh.rotation.x) * 0.08;

        // Subtle particle drift
        particles.rotation.y += 0.001;

        renderer.render(scene, camera);
      };
      animate();

      // Store references for color updates
      container._threeMesh = mesh;

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', handleResize);
        container.removeEventListener('mousedown', onMouseDown);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
        container.removeEventListener('touchstart', onTouchStart);
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('touchend', onMouseUp);
        if (renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };
    } catch (err) {
      console.warn("WebGL initialization note:", err);
      setWebglError(true);
    }
  }, []);

  // Update color dynamically
  useEffect(() => {
    if (mountRef.current && mountRef.current._threeMesh) {
      mountRef.current._threeMesh.material.color.set(activeColor);
    }
  }, [activeColor]);

  return (
    <section
      id="leather-material"
      style={{
        position: 'relative',
        backgroundColor: '#120c08',
        padding: '130px 24px',
        overflow: 'hidden'
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto', textAlign: 'center', marginBottom: '50px' }}>
        <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
          SURFACE & SUBSTANCE
        </div>
        <h2 className="section-title">
          INSPECT THE CRAFT IN 3D
        </h2>
        <p className="section-lead" style={{ margin: '0 auto' }}>
          Interact with our certified genuine hide surfaces. Rotate to inspect fiber density, natural pull-up undertones, and tactile beeswax finishing.
        </p>
      </div>

      {/* 3D Canvas Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1280px',
          height: '620px',
          margin: '0 auto',
          borderRadius: '24px',
          background: 'radial-gradient(circle at center, rgba(58, 33, 21, 0.45) 0%, rgba(18, 12, 8, 0.95) 70%)',
          border: '1px solid var(--gold-border)',
          overflow: 'hidden',
          boxShadow: '0 30px 80px -20px rgba(0,0,0,0.8), inset 0 0 50px rgba(0,0,0,0.5)'
        }}
      >
        {/* Interactive 3D WebGL Canvas */}
        {!webglError ? (
          <div
            ref={mountRef}
            data-cursor="ROTATE"
            style={{
              width: '100%',
              height: '100%',
              cursor: isInteracting ? 'grabbing' : 'grab'
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            <img
              src="./assets/1753454487218.jpg"
              alt="Handcrafted leather texture"
              style={{ maxHeight: '80%', maxWidth: '80%', borderRadius: '16px', objectFit: 'cover' }}
            />
          </div>
        )}

        {/* Floating Spec Annotations (Desktop View) */}
        {floatingLabels.map((lbl, idx) => (
          <div
            key={idx}
            className="floating-spec-tag"
            style={{
              position: 'absolute',
              ...lbl.pos,
              maxWidth: '240px',
              padding: '16px 20px',
              borderRadius: '12px',
              background: 'rgba(18, 12, 8, 0.82)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid var(--gold-border)',
              pointerEvents: 'none',
              boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
              zIndex: 10
            }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '2px' }}>
              {lbl.title}
            </div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '0.96rem', color: 'var(--cream)', fontWeight: 600, marginBottom: '4px' }}>
              {lbl.subtitle}
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
              {lbl.description}
            </p>
          </div>
        ))}

        {/* Bottom Swatch Controls */}
        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 20,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 20px',
            borderRadius: '99px',
            background: 'rgba(18, 12, 8, 0.9)',
            border: '1px solid var(--gold-border)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.7)'
          }}
        >
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.74rem', letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase', marginRight: '6px' }}>
            SWATCH:
          </span>

          {colors.map((c) => (
            <button
              key={c.name}
              onClick={() => {
                setActiveColor(c.hex);
                setActiveFinish(c.finish);
              }}
              data-cursor={c.name}
              title={`${c.name} (${c.finish})`}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: c.hex,
                border: activeColor === c.hex ? '2px solid var(--gold-light)' : '1px solid rgba(255,255,255,0.2)',
                boxShadow: activeColor === c.hex ? '0 0 12px var(--gold)' : 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform var(--transition-fast)'
              }}
            >
              {activeColor === c.hex && <Check size={14} color="#fff" />}
            </button>
          ))}

          <div style={{ marginLeft: '10px', paddingLeft: '12px', borderLeft: '1px solid rgba(197, 164, 109, 0.2)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <RotateCw size={14} color="var(--gold)" />
            <span style={{ fontSize: '0.74rem', color: 'var(--cream)', fontFamily: 'var(--font-display)', fontWeight: 600 }}>
              {activeFinish}
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .floating-spec-tag {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
