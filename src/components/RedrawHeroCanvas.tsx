'use client'
import React, { useEffect, useState } from 'react';

// Simple check for WebGPU support
const checkWebGPU = () => {
  return typeof window !== 'undefined' && typeof navigator !== 'undefined' && 'gpu' in navigator;
};

// Dynamic imports to prevent SSR issues
let RedrawCanvas: any = null;
let fitPath: any = null;
let GradientAlongPath: any = null;
let SingleStrokeBrush: any = null;
let animation: any = null;
let Feather: any = null;

export default function RedrawHeroCanvas() {
  const [mounted, setMounted] = useState(false);
  const [webGpuSupported, setWebGpuSupported] = useState(false);

  useEffect(() => {
    // Check support
    const supported = checkWebGPU();
    setWebGpuSupported(supported);

    if (supported) {
      // Import the library dynamically inside useEffect (browser-only)
      Promise.all([
        import('react-redraw'),
        import('redraw')
      ]).then(([reactRedraw, redraw]) => {
        RedrawCanvas = reactRedraw.RedrawCanvas;
        fitPath = redraw.fitPath;
        GradientAlongPath = redraw.GradientAlongPath;
        SingleStrokeBrush = redraw.SingleStrokeBrush;
        animation = redraw.animation;
        Feather = redraw.Feather;
        
        setMounted(true);
      }).catch(err => {
        console.error("Failed to load Redraw library:", err);
        setWebGpuSupported(false);
      });
    } else {
      setMounted(true);
    }
  }, []);

  if (!mounted) {
    return <div className="absolute inset-0 bg-[#07070A]" />;
  }

  if (!webGpuSupported) {
    // Beautiful HTML/CSS Fallback for browsers that don't support WebGPU
    return (
      <div className="absolute inset-0 bg-[#07070A] overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[30vw] h-[30vw] rounded-full bg-accent opacity-[0.08] blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] rounded-full bg-accent-teal opacity-[0.05] blur-[120px] animate-pulse" style={{ animationDuration: '12s' }} />
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <svg className="w-full h-full max-w-[800px]" viewBox="0 0 1000 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 300 C 300 100, 400 500, 600 300 C 800 100, 700 500, 900 300" stroke="url(#paint0_linear)" strokeWidth="6" strokeLinecap="round" opacity="0.6">
              <animate attributeName="stroke-dasharray" values="0,1000;1000,0" dur="5s" repeatCount="indefinite" />
            </path>
            <path d="M150 350 C 320 180, 420 420, 580 280 C 740 140, 720 480, 850 350" stroke="url(#paint1_linear)" strokeWidth="4" strokeLinecap="round" opacity="0.4">
              <animate attributeName="stroke-dasharray" values="0,1000;1000,0" dur="7s" repeatCount="indefinite" />
            </path>
            <defs>
              <linearGradient id="paint0_linear" x1="0" y1="0" x2="1" y2="0">
                <stop stopColor="#EC2D9E" />
                <stop offset="0.5" stopColor="#816FE3" />
                <stop offset="1" stopColor="#3FCEBC" />
              </linearGradient>
              <linearGradient id="paint1_linear" x1="0" y1="0" x2="1" y2="0">
                <stop stopColor="#3FCEBC" />
                <stop offset="0.5" stopColor="#5F96E7" />
                <stop offset="1" stopColor="#EC2D9E" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    );
  }

  // Elegant cosmetic curves (doubled count to 6 for double density rendering)
  const curves = [
    // Primary flow curve
    "M13.6 247.8C13.6 247.8 120.5 150.2 250.2 180.5C400.4 210.8 450.6 80.2 600.2 140.5C720.6 190.2 800.5 240.2 920.3 160.8",
    // Secondary secondary swirl
    "M50.2 350.5C180.6 250.2 320.2 420.5 480.3 300.2C640.4 180.2 700.5 380.2 880.6 250.5",
    // Delicate accent wave
    "M100.8 150.2C220.4 280.5 380.2 180.2 520.6 290.5C680.5 420.2 780.4 220.2 900.2 320.8",
    // Counter wave 1
    "M10.2 180.5C140.6 290.2 280.2 90.5 420.3 220.2C560.4 350.2 680.5 150.2 900.6 280.5",
    // Counter wave 2
    "M90.8 380.2C250.4 180.5 390.2 320.2 550.6 190.5C710.5 60.2 810.4 280.2 930.2 120.8",
    // Base flow wave
    "M30.6 120.8C200.2 80.5 320.6 240.2 480.2 160.5C620.6 90.2 760.5 310.2 910.3 220.8"
  ];

  const palette = [
    "#EC2D9E", // Magenta
    "#BC34B9",
    "#8C3DD4",
    "#5C46EF",
    "#3CBCEB", // Sky Blue
    "#3EC4D2",
    "#3FCEBC", // Teal
  ];

  // We set render function
  const render = (canvas: any, width: number, height: number) => {
    // Clear canvas
    canvas.fillColor("rgba(7, 7, 10, 0.95)");

    const nodes = curves.map((curvePath, index) => {
      // Fit each path to screen
      const pathGeo = fitPath(curvePath, width, height, { maxWidth: width * 0.9 });
      
      const brush = new SingleStrokeBrush();
      // Set gradient and glow effects
      const strokeWidth = index % 3 === 0 ? 14 : index % 3 === 1 ? 8 : 4;
      const glowRadius = index % 3 === 0 ? 25 : index % 3 === 1 ? 15 : 8;
      
      const gradient = new GradientAlongPath(
        index % 2 === 1 ? [...palette].reverse() : palette
      );
      
      brush.addStroke(gradient, strokeWidth, Feather ? Feather.glow(glowRadius) : undefined);
      
      const pathNode = canvas.drawPath(pathGeo, brush);
      return pathNode;
    });

    return { nodes };
  };

  // We set animate function
  const animate = (handles: { nodes: any[] }, ctx: any) => {
    const t = animation(ctx, { duration: 6, boomerang: true });
    
    handles.nodes.forEach((pathNode, index) => {
      // Offset starting times for asynchronous draw-in effects
      const offset = (index % 4) * 0.12;
      const progress = Math.max(0, Math.min(1, (t - offset) / 0.65));
      pathNode.segment(0, progress);
    });
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0 redraw-container">
      <RedrawCanvas
        style={{ width: "100%", height: "100%" }}
        render={render}
        animate={animate}
      />
      {/* Visual Ambient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#07070A] via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[35vw] h-[35vw] rounded-full ambient-glow-magenta pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full ambient-glow-teal pointer-events-none" />
    </div>
  );
}
