'use client'
import React, { useEffect, useState, useRef } from 'react';

// Dynamic library imports
let RedrawCanvas: any = null;
let fitPath: any = null;
let GradientAlongPath: any = null;
let SingleStrokeBrush: any = null;
let Feather: any = null;

interface RedrawCircleBorderProps {
  hovered: boolean;
}

export default function RedrawCircleBorder({ hovered }: RedrawCircleBorderProps) {
  const [mounted, setMounted] = useState(false);
  const hoveredRef = useRef(hovered);
  const progressRef = useRef(0);

  // Sync hovered prop to ref
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
      console.error("Failed to load Redraw in RedrawCircleBorder:", err);
    });
  }, []);

  if (!mounted) return null;

  // Render method sets up canvas bounds and shape
  const render = (canvas: any, width: number, height: number) => {
    canvas.fillColor("transparent");

    // Construct circle SVG path
    const cx = width / 2;
    const cy = height / 2;
    const padding = 2;
    const r = Math.min(width, height) / 2 - padding;

    const circlePath = `M ${cx} ${cy - r} 
                        A ${r} ${r} 0 1 1 ${cx} ${cy + r} 
                        A ${r} ${r} 0 1 1 ${cx} ${cy - r} Z`;

    const circleGeo = fitPath(circlePath, width, height, { absolute: true });
    const brush = new SingleStrokeBrush();
    
    // Rotating gradient ring matching category accent hues (Teal, Blue, Magenta)
    const palette = ["#3FCEBC", "#5C46EF", "#EC2D9E"];
    brush.addStroke(new GradientAlongPath(palette), 3.0, Feather ? Feather.glow(12) : undefined);

    const ringNode = canvas.drawPath(circleGeo, brush);
    return { ringNode };
  };

  // Frame anim loop
  const animate = (handles: any, ctx: any) => {
    const { ringNode } = handles;
    
    // Easing progress towards hover target
    const target = hoveredRef.current ? 1.0 : 0.0;
    progressRef.current += (target - progressRef.current) * 0.12;

    const progress = progressRef.current;

    if (ringNode && ringNode.brush) {
      const stroke = ringNode.brush.strokes[0];
      
      if (progress < 0.01) {
        stroke.width = 0;
      } else {
        stroke.width = 3.0;
        if (Feather) {
          stroke.effects = Feather.glow(progress * 12);
        }
      }

      // Draw in + spin offset effect (offset start over time)
      const start = (ctx.time * 0.25) % 1.0;
      const end = start + progress * 0.99; // draw full circle relative to start
      ringNode.segment(start, Math.min(start + 1.0, end));
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
