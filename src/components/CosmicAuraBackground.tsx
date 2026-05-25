'use client'
import React, { useEffect, useState, useRef } from 'react';

// Check if WebGPU or canvas rendering is available
const checkBrowser = () => {
  return typeof window !== 'undefined';
};

// Dynamic library imports
let RedrawCanvas: any = null;
let fitPath: any = null;
let GradientAlongPath: any = null;
let SingleStrokeBrush: any = null;
let Feather: any = null;

export default function CosmicAuraBackground() {
  const [mounted, setMounted] = useState(false);
  const canvasLoaded = useRef(false);

  // Eased mouse position
  const mouseRef = useRef({ x: -100, y: -100 });
  const targetMouseRef = useRef({ x: -100, y: -100 });
  
  // Historical trail of mouse positions
  const trailRef = useRef<{ x: number; y: number }[]>([]);
  const isMovingRef = useRef(false);
  const lastMoveTimeRef = useRef(0);

  useEffect(() => {
    if (!checkBrowser()) return;

    // Load react-redraw dynamically
    Promise.all([
      import('react-redraw'),
      import('redraw')
    ]).then(([reactRedraw, redraw]) => {
      RedrawCanvas = reactRedraw.RedrawCanvas;
      fitPath = redraw.fitPath;
      GradientAlongPath = redraw.GradientAlongPath;
      SingleStrokeBrush = redraw.SingleStrokeBrush;
      Feather = redraw.Feather;

      canvasLoaded.current = true;
      setMounted(true);
    }).catch(err => {
      console.error("Failed to load Redraw in background:", err);
    });

    // Capture mouse moves
    const handleMouseMove = (e: MouseEvent) => {
      targetMouseRef.current = { x: e.clientX, y: e.clientY };
      isMovingRef.current = true;
      lastMoveTimeRef.current = Date.now();
    };

    // Capture touch moves
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        targetMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        isMovingRef.current = true;
        lastMoveTimeRef.current = Date.now();
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  if (!mounted || !canvasLoaded.current) {
    return <div className="fixed inset-0 z-[-2] bg-[#07070A] pointer-events-none" />;
  }

  // Sample points to draw a rotated ellipse
  const getRotatedEllipsePath = (cx: number, cy: number, rx: number, ry: number, angle: number) => {
    const points = [];
    const steps = 32;
    for (let i = 0; i <= steps; i++) {
      const theta = (i / steps) * Math.PI * 2;
      const x = cx + rx * Math.cos(theta) * Math.cos(angle) - ry * Math.sin(theta) * Math.sin(angle);
      const y = cy + rx * Math.cos(theta) * Math.sin(angle) + ry * Math.sin(theta) * Math.cos(angle);
      points.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    return points.join(' ') + ' Z';
  };

  // Convert points array to SVG path
  const getTrailPath = (points: { x: number; y: number }[]) => {
    if (points.length < 2) return 'M 0 0 L 0 0';
    return points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  };

  const palette1 = ["#EC2D9E", "#8C3DD4", "#3FCEBC"]; // Cosmic transition
  const palette2 = ["#3FCEBC", "#5C46EF", "#EC2D9E"]; // Teal to Magenta transition

  // Initial draw setup
  const render = (canvas: any, width: number, height: number) => {
    // Semi-transparent background for a gorgeous trail bleed effect
    canvas.fillColor("rgba(7, 7, 10, 0.25)");

    // Initialize 3 orbital rings and 1 cursor trail path
    const ring1Geo = fitPath("M 0 0 Z", width, height, { absolute: true });
    const ring2Geo = fitPath("M 0 0 Z", width, height, { absolute: true });
    const ring3Geo = fitPath("M 0 0 Z", width, height, { absolute: true });
    const trailGeo = fitPath("M 0 0 Z", width, height, { absolute: true });

    const brushRing1 = new SingleStrokeBrush();
    brushRing1.addStroke(new GradientAlongPath(palette1), 2.0, Feather ? Feather.glow(10) : undefined);

    const brushRing2 = new SingleStrokeBrush();
    brushRing2.addStroke(new GradientAlongPath(palette2), 1.5, Feather ? Feather.glow(8) : undefined);

    const brushRing3 = new SingleStrokeBrush();
    brushRing3.addStroke("#8C3DD4", 1.0, Feather ? Feather.glow(6) : undefined);

    const brushTrail = new SingleStrokeBrush();
    brushTrail.addStroke(new GradientAlongPath(palette1), 6.0, Feather ? Feather.glow(20) : undefined);

    const nodeRing1 = canvas.drawPath(ring1Geo, brushRing1);
    const nodeRing2 = canvas.drawPath(ring2Geo, brushRing2);
    const nodeRing3 = canvas.drawPath(ring3Geo, brushRing3);
    const nodeTrail = canvas.drawPath(trailGeo, brushTrail);

    return { nodeRing1, nodeRing2, nodeRing3, nodeTrail };
  };

  // Perform animations and updates per frame
  const animate = (handles: any, ctx: any) => {
    const { nodeRing1, nodeRing2, nodeRing3, nodeTrail } = handles;
    const time = ctx.time;

    // Check if mouse is inactive (idle glow)
    const now = Date.now();
    if (now - lastMoveTimeRef.current > 3000) {
      isMovingRef.current = false;
    }

    // Smoothly ease cursor tracking position (lerp)
    const mouse = mouseRef.current;
    const target = targetMouseRef.current;
    
    // If not moving, gently float in a cosmic wave pattern
    if (!isMovingRef.current) {
      // Idle movement: float in an infinity pattern around center screen
      const center = { x: ctx.width / 2, y: ctx.height / 3 };
      const angle = time * 0.5;
      const targetX = center.x + Math.sin(angle * 2) * (ctx.width * 0.25);
      const targetY = center.y + Math.sin(angle) * (ctx.height * 0.15);
      
      mouse.x += (targetX - mouse.x) * 0.05;
      mouse.y += (targetY - mouse.y) * 0.05;
    } else {
      mouse.x += (target.x - mouse.x) * 0.08;
      mouse.y += (target.y - mouse.y) * 0.08;
    }

    // Manage mouse trail history
    const trail = trailRef.current;
    trail.push({ x: mouse.x, y: mouse.y });
    if (trail.length > 25) {
      trail.shift();
    }

    // 1. Update trail path
    if (nodeTrail && nodeTrail.pathGeo) {
      nodeTrail.pathGeo.svgPath = getTrailPath(trail);
    }

    // 2. Update ring orbits
    // Ring 1: Medium orbital ellipse
    if (nodeRing1 && nodeRing1.pathGeo) {
      const rx = 65 + Math.sin(time * 2) * 15;
      const ry = 45 + Math.cos(time * 2) * 10;
      const angle = time * 0.8;
      nodeRing1.pathGeo.svgPath = getRotatedEllipsePath(mouse.x, mouse.y, rx, ry, angle);
    }

    // Ring 2: Large orbital ellipse (counter-rotating)
    if (nodeRing2 && nodeRing2.pathGeo) {
      const rx = 100 + Math.cos(time * 1.5) * 20;
      const ry = 70 + Math.sin(time * 1.5) * 15;
      const angle = -time * 0.6;
      nodeRing2.pathGeo.svgPath = getRotatedEllipsePath(mouse.x, mouse.y, rx, ry, angle);
    }

    // Ring 3: Tiny fast inner ring
    if (nodeRing3 && nodeRing3.pathGeo) {
      const rx = 30 + Math.sin(time * 4) * 5;
      const ry = 20 + Math.cos(time * 4) * 4;
      const angle = time * 2.0;
      nodeRing3.pathGeo.svgPath = getRotatedEllipsePath(mouse.x, mouse.y, rx, ry, angle);
    }
  };

  return (
    <div className="fixed inset-0 z-[-1] w-full h-full overflow-hidden pointer-events-none bg-[#07070A]/50">
      <RedrawCanvas
        style={{ width: "100%", height: "100%", opacity: 0.8 }}
        render={render}
        animate={animate}
      />
    </div>
  );
}
