'use client'
import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineClear, AiOutlineReload, AiOutlineExport } from 'react-icons/ai';

// Check browser environment
const checkBrowser = () => {
  return typeof window !== 'undefined';
};

// Dynamic library imports
let RedrawCanvas: any = null;
let fitPath: any = null;
let GradientAlongPath: any = null;
let SingleStrokeBrush: any = null;
let Feather: any = null;

// Palette definitions
const FORMULATIONS = [
  {
    id: 'stellar-aurora',
    name: 'Stellar Aurora',
    type: 'Liquid Lipstick (Metallic Gloss)',
    palette: ["#EC2D9E", "#BC34B9", "#8C3DD4"],
    width: 22,
    glow: 18,
    description: 'Hyper-pigmented holographic magenta glaze with violet undertones.'
  },
  {
    id: 'astro-gold',
    name: 'Astro Gold',
    type: 'Luminous Highlighter (Solar Shimmer)',
    palette: ["#FFE066", "#FAD02C", "#FF9F43"],
    width: 32,
    glow: 24,
    description: 'Reflective molten gold dust offering a warm cosmic starlight sheen.'
  },
  {
    id: 'comet-teal',
    name: 'Comet Teal',
    type: 'Cream Eyeshadow (Duo-Chrome)',
    palette: ["#3FCEBC", "#3EC4D2", "#5C46EF"],
    width: 14,
    glow: 12,
    description: 'Iridescent teal changing to interstellar indigo at varying light angles.'
  },
  {
    id: 'nebula-rose',
    name: 'Nebula Rose',
    type: 'Vortex Blush (Satin Matte)',
    palette: ["#FF6B81", "#EC2D9E", "#FF4757"],
    width: 38,
    glow: 20,
    description: 'Nebular rose bloom giving a healthy celestial flush to the cheeks.'
  },
  {
    id: 'supernova-black',
    name: 'Supernova Black',
    type: 'Cosmic Eyeliner (Midnight Matte)',
    palette: ["#1F1F2A", "#0F0F16", "#5C46EF"],
    width: 6,
    glow: 4,
    description: 'Dense dark-matter carbon black infused with subtle purple sparkles.'
  }
];

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  points: Point[];
  palette: string[];
  width: number;
  glow: number;
  startTime?: number;
  duration?: number;
  isReplaying?: boolean;
}

export default function CosmicSwatchLab() {
  const [mounted, setMounted] = useState(false);
  const [selectedFormulation, setSelectedFormulation] = useState(FORMULATIONS[0]);
  const [canvasKey, setCanvasKey] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // References for drawing operations
  const canvasRef = useRef<HTMLDivElement>(null);
  const isDrawingRef = useRef(false);
  const currentPointsRef = useRef<Point[]>([]);
  const strokesRef = useRef<Stroke[]>([]);
  
  // Replay animation state
  const isReplayingRef = useRef(false);
  const replayStartTimeRef = useRef(0);

  useEffect(() => {
    if (!checkBrowser()) return;

    Promise.all([
      import('react-redraw'),
      import('redraw')
    ]).then(([reactRedraw, redraw]) => {
      RedrawCanvas = reactRedraw.RedrawCanvas;
      fitPath = redraw.fitPath;
      GradientAlongPath = redraw.GradientAlongPath;
      SingleStrokeBrush = redraw.SingleStrokeBrush;
      Feather = redraw.Feather;

      setMounted(true);
    }).catch(err => {
      console.error("Failed to load Redraw in SwatchLab:", err);
    });
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  if (!mounted) {
    return (
      <section className="py-16 bg-[#09090F] border-t border-white/5">
        <div className="container text-center text-gray-500">Loading Swatch Lab...</div>
      </section>
    );
  }

  // Handle Mouse/Touch Drawing Triggers
  const getCanvasCoords = (clientX: number, clientY: number): Point | null => {
    const el = canvasRef.current?.querySelector('canvas');
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    
    // Account for display scale matching window pixel ratio
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const handleStartDraw = (e: React.MouseEvent | React.TouchEvent) => {
    if (isReplayingRef.current) return;
    
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const coords = getCanvasCoords(clientX, clientY);
    if (!coords) return;

    isDrawingRef.current = true;
    currentPointsRef.current = [coords];

    // Push a new stroke container to ref list (max 30 total strokes to stay in pool limits)
    if (strokesRef.current.length >= 30) {
      strokesRef.current.shift(); // Remove oldest stroke to make room
    }

    strokesRef.current.push({
      points: currentPointsRef.current,
      palette: selectedFormulation.palette,
      width: selectedFormulation.width,
      glow: selectedFormulation.glow
    });
  };

  const handleMoveDraw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawingRef.current || isReplayingRef.current) return;
    
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const coords = getCanvasCoords(clientX, clientY);
    if (!coords) return;

    currentPointsRef.current.push(coords);
    
    // Update the last active stroke in our reference list
    if (strokesRef.current.length > 0) {
      strokesRef.current[strokesRef.current.length - 1].points = [...currentPointsRef.current];
    }
  };

  const handleEndDraw = () => {
    isDrawingRef.current = false;
    currentPointsRef.current = [];
  };

  const handleClear = () => {
    strokesRef.current = [];
    isReplayingRef.current = false;
    // Force a minor key change to reset canvas layout and clear buffers
    setCanvasKey(prev => prev + 1);
    showToast("Cosmetic test plate cleared.");
  };

  const handleReplay = () => {
    if (strokesRef.current.length === 0) {
      showToast("Draw some swatches first to replay!");
      return;
    }

    isReplayingRef.current = true;
    replayStartTimeRef.current = 0; // Will be set in the animation loop
    showToast("Replaying cosmic shades drawing...");
  };

  const handleExport = () => {
    if (strokesRef.current.length === 0) {
      showToast("No swatches to export!");
      return;
    }
    const colorCode = selectedFormulation.palette.join(', ');
    navigator.clipboard.writeText(colorCode);
    showToast(`Formulation locked: Palette [${colorCode}] copied!`);
  };

  // Convert coordinate list to SVG path
  const getPointsPath = (points: Point[]) => {
    if (points.length === 0) return 'M 0 0';
    if (points.length === 1) return `M ${points[0].x} ${points[0].y} L ${points[0].x + 0.1} ${points[0].y + 0.1}`;
    return points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  };

  // Canvas renderer (Runs once on mount or canvasKey change)
  const render = (canvas: any, width: number, height: number) => {
    // Rich deep backdrop
    canvas.fillColor("#0A0A0F");

    // Pre-allocate 30 stroke nodes in the redraw queue
    const strokeNodes = Array.from({ length: 30 }, () => {
      const geo = fitPath("M 0 0 L 0 0", width, height, { absolute: true });
      const brush = new SingleStrokeBrush();
      // Invisible start state
      brush.addStroke("rgba(0,0,0,0)", 1);
      return canvas.drawPath(geo, brush);
    });

    return { strokeNodes };
  };

  // Dynamic animation frame callback (runs at 60 FPS)
  const animate = (handles: any, ctx: any) => {
    const { strokeNodes } = handles;
    const time = ctx.time;
    const strokes = strokesRef.current;

    // Handle replay initialization
    if (isReplayingRef.current && replayStartTimeRef.current === 0) {
      replayStartTimeRef.current = time;
      
      // Assign replay staggered start times to each stroke
      strokes.forEach((stroke, index) => {
        stroke.isReplaying = true;
        stroke.startTime = time + index * 0.4; // 0.4s stagger between lines
        stroke.duration = 0.6; // Draw-in speed
      });
    }

    strokeNodes.forEach((node: any, idx: number) => {
      const stroke = strokes[idx];

      if (stroke && stroke.points.length > 0) {
        // Build path
        node.pathGeo.svgPath = getPointsPath(stroke.points);
        
        // Mutate brush parameters dynamically
        const strokeObj = node.brush.strokes[0];
        strokeObj.width = stroke.width;
        
        // Set gradient
        if (GradientAlongPath) {
          strokeObj.color = new GradientAlongPath(stroke.palette);
        } else {
          strokeObj.color = stroke.palette[0];
        }

        // Set glow
        if (Feather) {
          strokeObj.effects = Feather.glow(stroke.glow);
        }

        // Handle Segment Draw animation logic
        if (isReplayingRef.current && stroke.isReplaying) {
          const startTime = stroke.startTime || 0;
          const duration = stroke.duration || 1;
          
          if (time < startTime) {
            node.segment(0, 0); // Not started yet
          } else {
            const progress = Math.min(1, (time - startTime) / duration);
            node.segment(0, progress);
            
            // Check if this was the last stroke and it finished drawing
            if (idx === strokes.length - 1 && progress === 1) {
              isReplayingRef.current = false;
              strokes.forEach(s => s.isReplaying = false);
            }
          }
        } else {
          // Standard real-time rendering: show 100% of line
          node.segment(0, 1);
        }
      } else {
        // Clear unused nodes in the pool
        node.pathGeo.svgPath = 'M 0 0 L 0 0';
        node.brush.strokes[0].color = 'rgba(0,0,0,0)';
      }
    });
  };

  return (
    <section className="py-20 bg-[#07070A] relative overflow-hidden border-y border-white/5">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] ambient-glow-teal rounded-full pointer-events-none opacity-20 -translate-y-1/2" />
      <div className="absolute bottom-10 right-1/4 w-[350px] h-[350px] ambient-glow-magenta rounded-full pointer-events-none opacity-25" />

      <div className="container relative z-10">
        
        {/* Title and Intro */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-teal/10 border border-accent-teal/20 text-accent-teal text-xs font-semibold uppercase tracking-wider">
            <span>🔬 Cosmic Lab Integration</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif text-white tracking-wide leading-tight">
            Cosmic Swatch Laboratory
          </h2>
          <p className="text-gray-400 text-sm sm:text-base font-light max-w-2xl mx-auto">
            Interact with our GPU-accelerated swatch simulator. Select a formulation, pick a cosmic color, then draw directly on the test plate to experience liquid textures and neon light scatter.
          </p>
        </div>

        {/* Lab Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left panel: Formulation Selector */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-serif font-semibold text-gray-200 uppercase tracking-widest border-b border-white/5 pb-2">
                Select Formulation
              </h3>
              
              <div className="space-y-3">
                {FORMULATIONS.map((form) => {
                  const isSelected = selectedFormulation.id === form.id;
                  return (
                    <button
                      key={form.id}
                      onClick={() => setSelectedFormulation(form)}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-300 border flex flex-col space-y-2 cursor-pointer hover:bg-white/5 ${
                        isSelected 
                          ? 'glass-card border-accent/40 bg-accent/5 shadow-md shadow-accent/5' 
                          : 'border-white/5 bg-obsidian-light/30'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-sm text-white tracking-wide">{form.name}</span>
                        <div className="flex gap-1">
                          {form.palette.map((col, idx) => (
                            <span 
                              key={idx} 
                              className="w-3.5 h-3.5 rounded-full border border-white/20" 
                              style={{ backgroundColor: col }}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <span className="text-[11px] text-accent-teal uppercase tracking-widest font-semibold">
                        {form.type}
                      </span>
                      
                      <p className="text-xs text-gray-400 font-light leading-relaxed">
                        {form.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Legend / Tips */}
            <div className="p-4 rounded-xl bg-obsidian-light/20 border border-white/5 space-y-2">
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Controls & Interactions</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed font-light">
                👉 Click & drag on the dark plate on the right to swatch. <br />
                ✨ Draw multiple shapes side-by-side (holds up to 30 strokes). <br />
                🎨 Change shades mid-draw to create a custom cosmetics canvas.
              </p>
            </div>
          </div>

          {/* Right panel: Active Testing Plate */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            
            {/* Header controls bar */}
            <div className="flex justify-between items-center glass-card p-3 rounded-2xl border border-white/5">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest pl-2">
                Active Shade: <span className="text-white">{selectedFormulation.name}</span>
              </span>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleReplay}
                  title="Replay Strokes"
                  className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium uppercase tracking-wider flex items-center gap-1.5 transition-colors duration-200 cursor-pointer"
                >
                  <AiOutlineReload className="text-sm" /> Replay
                </button>
                <button 
                  onClick={handleClear}
                  title="Clear Plate"
                  className="px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400 text-xs font-medium uppercase tracking-wider flex items-center gap-1.5 transition-all duration-200 cursor-pointer"
                >
                  <AiOutlineClear className="text-sm" /> Clear
                </button>
                <button 
                  onClick={handleExport}
                  title="Export Blend"
                  className="px-3 py-2 rounded-lg bg-accent-teal/10 hover:bg-accent-teal hover:text-obsidian text-accent-teal text-xs font-medium uppercase tracking-wider flex items-center gap-1.5 transition-all duration-200 cursor-pointer"
                >
                  <AiOutlineExport className="text-sm" /> Export
                </button>
              </div>
            </div>

            {/* Drawing Canvas Area */}
            <div 
              ref={canvasRef}
              className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden glass-card border border-white/10 shadow-2xl cursor-crosshair select-none bg-[#0A0A0F]"
              onMouseDown={handleStartDraw}
              onMouseMove={handleMoveDraw}
              onMouseUp={handleEndDraw}
              onMouseLeave={handleEndDraw}
              onTouchStart={handleStartDraw}
              onTouchMove={handleMoveDraw}
              onTouchEnd={handleEndDraw}
            >
              {/* React Redraw Canvas */}
              <RedrawCanvas
                key={canvasKey}
                style={{ width: "100%", height: "100%" }}
                render={render}
                animate={animate}
              />

              {/* Decorative Guide Overlay (Face / Lips Silhouette) */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none p-10">
                <svg className="w-full h-full max-w-[400px]" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="0.5">
                  {/* Face Outline Silhouette */}
                  <path d="M50 15 C30 15 25 35 25 50 C25 68 35 85 50 85 C65 85 75 68 75 50 C75 35 70 15 50 15 Z" strokeDasharray="1 1" />
                  {/* Eyes Outline */}
                  <path d="M36 45 Q40 40 44 45 Q40 48 36 45" />
                  <path d="M56 45 Q60 40 64 45 Q60 48 56 45" />
                  {/* Lips Outline */}
                  <path d="M40 65 Q45 61 50 64 Q55 61 60 65 Q50 71 40 65 Z" />
                  <path d="M40 65 Q50 63 60 65" />
                  {/* Cheek Blush Guides */}
                  <circle cx="33" cy="56" r="6" strokeDasharray="2 2" />
                  <circle cx="67" cy="56" r="6" strokeDasharray="2 2" />
                </svg>
              </div>

              {/* Floating Helper Tag */}
              <div className="absolute bottom-4 left-4 glass-card px-3 py-1.5 rounded-xl border border-white/5 pointer-events-none">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">
                  Cosmetic Test Plate
                </span>
              </div>
            </div>

            {/* Notification Toast */}
            {toastMessage && (
              <div className="fixed bottom-6 right-6 z-50 glass-card bg-[#0F0F16]/90 border border-accent-teal/30 px-5 py-3 rounded-xl shadow-xl shadow-black/60 text-xs font-semibold text-accent-teal animate-fade-in flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-teal animate-ping" />
                {toastMessage}
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
