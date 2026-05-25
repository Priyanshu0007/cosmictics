'use client'
import React, { useEffect, useState, useRef } from 'react';

// Dynamic library imports
let RedrawCanvas: any = null;
let fitPath: any = null;
let GradientAlongPath: any = null;
let SingleStrokeBrush: any = null;
let Feather: any = null;

interface RedrawBorderProps {
  hovered: boolean;
}

export default function RedrawBorder({ hovered }: RedrawBorderProps) {
  const [mounted, setMounted] = useState(false);
  const hoveredRef = useRef(hovered);
  const progressRef = useRef(0); // Progress of draw-in (0 to 1)

  // Sync hovered prop to ref to prevent recreation of animate closure
  useEffect(() => {
    hoveredRef.current = hovered;
  }, [hovered]);

  useEffect(() => {
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
      console.error("Failed to load Redraw in RedrawBorder:", err);
    });
  }, []);

  if (!mounted) return null;

  // Render method sets up canvas bounds and shape
  const render = (canvas: any, width: number, height: number) => {
    canvas.fillColor("transparent");

    // Construct rounded rect SVG path
    const padding = 2; // minor inset so border fits inside card borders
    const w = width - padding * 2;
    const h = height - padding * 2;
    const r = 16; // border radius matching rounded-2xl (16px)

    const roundedRectPath = `M ${r + padding} ${padding} 
                             L ${w - r + padding} ${padding} 
                             A ${r} ${r} 0 0 1 ${w + padding} ${r + padding} 
                             L ${w + padding} ${h - r + padding} 
                             A ${r} ${r} 0 0 1 ${w - r + padding} ${h + padding} 
                             L ${r + padding} ${h + padding} 
                             A ${r} ${r} 0 0 1 ${padding} ${h - r + padding} 
                             L ${padding} ${r + padding} 
                             A ${r} ${r} 0 0 1 ${r + padding} ${padding} Z`;

    const borderGeo = fitPath(roundedRectPath, width, height, { absolute: true });
    const brush = new SingleStrokeBrush();
    
    // Glowing cosmetics gradient for border
    const palette = ["#EC2D9E", "#BC34B9", "#3FCEBC"];
    brush.addStroke(new GradientAlongPath(palette), 2.5, Feather ? Feather.glow(10) : undefined);

    const borderNode = canvas.drawPath(borderGeo, brush);
    return { borderNode };
  };

  // Frame anim loop
  const animate = (handles: any, ctx: any) => {
    const { borderNode } = handles;
    
    // Easing progress towards hover target
    const target = hoveredRef.current ? 1.0 : 0.0;
    progressRef.current += (target - progressRef.current) * 0.14;

    const progress = progressRef.current;

    if (borderNode && borderNode.brush) {
      const stroke = borderNode.brush.strokes[0];
      
      // Control opacity using canvas stroke style
      if (progress < 0.01) {
        stroke.width = 0; // Hide completely if not active
      } else {
        stroke.width = 2.5;
        // Adjust glow size dynamically
        if (Feather) {
          stroke.effects = Feather.glow(progress * 10);
        }
      }

      // Trim segment based on hover progress
      borderNode.segment(0, progress);
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-20">
      <RedrawCanvas
        style={{ width: "100%", height: "100%" }}
        render={render}
        animate={animate}
      />
    </div>
  );
}
