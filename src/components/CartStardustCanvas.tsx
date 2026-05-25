'use client'
import React, { useEffect, useState, useRef } from 'react';

// Dynamic library imports
let RedrawCanvas: any = null;
let fitPath: any = null;
let GradientAlongPath: any = null;
let SingleStrokeBrush: any = null;
let Feather: any = null;

export default function CartStardustCanvas() {
  const [mounted, setMounted] = useState(false);

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
      console.error("Failed to load Redraw in CartStardustCanvas:", err);
    });
  }, []);

  if (!mounted) return null;

  // Render method sets up canvas bounds and shape
  const render = (canvas: any, width: number, height: number) => {
    canvas.fillColor("transparent");

    // Initialize three abstract flow curves
    const flow1Geo = fitPath("M 0 0 Z", width, height, { absolute: true });
    const flow2Geo = fitPath("M 0 0 Z", width, height, { absolute: true });
    const flow3Geo = fitPath("M 0 0 Z", width, height, { absolute: true });

    // Cosmetics color palettes
    const palette1 = ["#EC2D9E", "#8C3DD4"];
    const palette2 = ["#3FCEBC", "#5C46EF"];
    const palette3 = ["#8C3DD4", "#3FCEBC"];

    const brush1 = new SingleStrokeBrush();
    brush1.addStroke(new GradientAlongPath(palette1), 4.0, Feather ? Feather.glow(15) : undefined);

    const brush2 = new SingleStrokeBrush();
    brush2.addStroke(new GradientAlongPath(palette2), 3.0, Feather ? Feather.glow(10) : undefined);

    const brush3 = new SingleStrokeBrush();
    brush3.addStroke(new GradientAlongPath(palette3), 2.0, Feather ? Feather.glow(8) : undefined);

    const node1 = canvas.drawPath(flow1Geo, brush1);
    const node2 = canvas.drawPath(flow2Geo, brush2);
    const node3 = canvas.drawPath(flow3Geo, brush3);

    return { node1, node2, node3 };
  };

  // Frame anim loop (simulates slow drift)
  const animate = (handles: any, ctx: any) => {
    const { node1, node2, node3 } = handles;
    const time = ctx.time;
    const w = ctx.width;
    const h = ctx.height;

    // Shift coordinates over time using sine waves to create slow fluid drift
    if (node1 && node1.pathGeo) {
      const y1 = h * 0.2 + Math.sin(time * 0.5) * 40;
      const y2 = h * 0.3 + Math.cos(time * 0.7) * 50;
      const y3 = h * 0.15 + Math.sin(time * 0.4) * 30;
      node1.pathGeo.svgPath = `M -20 ${y1} Q ${w * 0.5} ${y2} ${w + 20} ${y3}`;
      node1.segment(0, 1);
    }

    if (node2 && node2.pathGeo) {
      const y1 = h * 0.5 + Math.cos(time * 0.4) * 50;
      const y2 = h * 0.65 + Math.sin(time * 0.6) * 60;
      const y3 = h * 0.45 + Math.cos(time * 0.5) * 40;
      node2.pathGeo.svgPath = `M -20 ${y1} Q ${w * 0.5} ${y2} ${w + 20} ${y3}`;
      node2.segment(0, 1);
    }

    if (node3 && node3.pathGeo) {
      const y1 = h * 0.8 + Math.sin(time * 0.6) * 30;
      const y2 = h * 0.85 + Math.cos(time * 0.5) * 40;
      const y3 = h * 0.75 + Math.sin(time * 0.7) * 30;
      node3.pathGeo.svgPath = `M -20 ${y1} Q ${w * 0.5} ${y2} ${w + 20} ${y3}`;
      node3.segment(0, 1);
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40">
      <RedrawCanvas
        style={{ width: "100%", height: "100%" }}
        render={render}
        animate={animate}
      />
    </div>
  );
}
