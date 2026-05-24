'use client'
import React, { useRef, useEffect } from 'react';
import { Canvas } from './index';

interface RedrawCanvasProps {
  style?: React.CSSProperties;
  render: (canvas: Canvas, width: number, height: number) => any;
  animate: (handles: any, ctx: any) => void;
}

export function RedrawCanvas({ style, render, animate }: RedrawCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const dpr = window.devicePixelRatio || 1;
    let width = canvasEl.clientWidth;
    let height = canvasEl.clientHeight;

    // Handle initial zero measurements
    if (width === 0) width = 800;
    if (height === 0) height = 600;

    canvasEl.width = Math.round(width * dpr);
    canvasEl.height = Math.round(height * dpr);

    const canvas = new Canvas({ dpr });
    const nodes = render(canvas, width, height);

    let active = true;
    let frame = 0;
    const start = performance.now() / 1000;

    const tick = () => {
      if (!active) return;
      
      const time = performance.now() / 1000 - start;
      const ctx = canvasEl.getContext('2d');
      
      if (ctx) {
        // Clear canvas frame
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
      }

      // Update node states via animations
      animate(nodes, { time, frame: frame++, width, height });
      
      // Flush draw list to screen
      canvas.flush(canvasEl);
      
      requestAnimationFrame(tick);
    };

    tick();

    // Handle resizing
    const resizeObserver = new ResizeObserver((entries) => {
      if (!active || entries.length === 0) return;
      const entry = entries[0];
      const newWidth = entry.contentRect.width;
      const newHeight = entry.contentRect.height;
      
      if (newWidth > 0 && newHeight > 0) {
        canvasEl.width = Math.round(newWidth * dpr);
        canvasEl.height = Math.round(newHeight * dpr);
      }
    });

    resizeObserver.observe(canvasEl);

    return () => {
      active = false;
      resizeObserver.disconnect();
    };
  }, [render, animate]);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        display: 'block', 
        width: '100%', 
        height: '100%',
        ...style 
      }} 
    />
  );
}
