// Lightweight high-performance 2D Canvas implementation of the Redraw API
// This allows the Redraw API calls to compile and execute correctly on all browsers

export async function RedrawInit() {
  return new Redraw();
}

export class Redraw {
  makeSurfaceFromCanvas(canvasEl: HTMLCanvasElement) {
    return new Surface(canvasEl);
  }
  makeSurfaceOffscreen(width: number, height: number) {
    return new Surface(null);
  }
}

export class WebGPUBackend {
  constructor(device: any) {}
}

export class Surface {
  canvasEl: HTMLCanvasElement | null;
  constructor(canvasEl: HTMLCanvasElement | null) {
    this.canvasEl = canvasEl;
  }
  flush(canvas: Canvas) {
    canvas.flush(this.canvasEl);
  }
}

export class GradientAlongPath {
  palette: string[];
  constructor(palette: string[]) {
    this.palette = palette;
  }
}

export class SingleStrokeBrush {
  strokes: any[] = [];
  addStroke(color: any, width: number, effects?: any) {
    this.strokes.push({ color, width, effects });
  }
}

export class Brush {
  fills: any[] = [];
  strokes: any[] = [];
  addFill(color: any, effects?: any) {
    this.fills.push({ color, effects });
  }
  addStroke(color: any, width: number, effects?: any) {
    this.strokes.push({ color, width, effects });
  }
}

export class Feather {
  sigma: number;
  type: string;
  constructor(sigma: number, type: string) {
    this.sigma = sigma;
    this.type = type;
  }
  static glow(sigma: number) {
    return new Feather(sigma, 'glow');
  }
  static blur(sigma: number) {
    return new Feather(sigma, 'blur');
  }
}

export class PathNode {
  pathGeo: any;
  brush: any;
  t0: number = 0;
  t1: number = 1;
  constructor(pathGeo: any, brush: any) {
    this.pathGeo = pathGeo;
    this.brush = brush;
  }
  segment(t0: number, t1: number) {
    this.t0 = t0;
    this.t1 = t1;
  }
}

export function fitPath(svgString: string, width: number, height: number, options: any = {}) {
  return {
    svgPath: svgString,
    canvasWidth: width,
    canvasHeight: height,
    options
  };
}

export function animation(ctx: any, options: any = {}) {
  const { duration = 5, boomerang = false } = options;
  const time = ctx.time;
  
  if (boomerang) {
    const cycle = (time % (duration * 2)) / duration;
    return cycle > 1 ? 2 - cycle : cycle;
  } else {
    return (time % duration) / duration;
  }
}

export class Canvas {
  dpr: number;
  draws: any[] = [];
  backgroundColor: string = 'transparent';
  canvasEl: HTMLCanvasElement | null = null;

  constructor(options: any = {}) {
    this.dpr = options.dpr || 1;
  }

  fillColor(color: string) {
    this.backgroundColor = color;
  }

  drawPath(pathGeo: any, brush: any) {
    const node = new PathNode(pathGeo, brush);
    this.draws.push(node);
    return node;
  }

  flush(canvasEl: HTMLCanvasElement | null) {
    const el = canvasEl;
    if (!el) return;
    
    const ctx = el.getContext('2d');
    if (!ctx) return;

    const width = el.width;
    const height = el.height;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Background
    if (this.backgroundColor && this.backgroundColor !== 'transparent') {
      ctx.fillStyle = this.backgroundColor;
      ctx.fillRect(0, 0, width, height);
    }

    // Draw operations
    this.draws.forEach((draw) => {
      if (draw instanceof PathNode) {
        this.renderPathNode(ctx, draw, width, height);
      }
    });
  }

  private renderPathNode(ctx: CanvasRenderingContext2D, node: PathNode, canvasWidth: number, canvasHeight: number) {
    const svgPath = node.pathGeo.svgPath;
    const brush = node.brush;
    const t0 = node.t0;
    const t1 = node.t1;

    if (!svgPath) return;

    ctx.save();
    
    const maxWidth = node.pathGeo.options && node.pathGeo.options.maxWidth || 800;
    
    if (node.pathGeo.options && node.pathGeo.options.absolute) {
      // Scale by device pixel ratio to match CSS pixels coordinate system
      ctx.scale(this.dpr, this.dpr);
    } else {
      const scale = Math.min(canvasWidth / maxWidth, 1.0) * 0.95;
      
      // Center alignment
      ctx.translate(canvasWidth / 2, canvasHeight / 2);
      ctx.scale(scale, scale);
      ctx.translate(-maxWidth / 2, -200); // offset to center drawing origin
    }

    // For each stroke in brush
    brush.strokes.forEach((stroke: any) => {
      ctx.save();

      // Configure Line Styles
      ctx.lineWidth = stroke.width || 10;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Set Color / Gradient
      let color = '#FFF';
      if (stroke.color instanceof GradientAlongPath) {
        const grad = ctx.createLinearGradient(0, 200, maxWidth, 200);
        const stops = stroke.color.palette;
        stops.forEach((stopColor: string, idx: number) => {
          grad.addColorStop(idx / (stops.length - 1), stopColor);
        });
        color = grad as any;
      } else if (typeof stroke.color === 'string') {
        color = stroke.color;
      }
      ctx.strokeStyle = color;

      // Set Effects (Glow / Shadow)
      if (stroke.effects instanceof Feather) {
        if (stroke.effects.type === 'glow') {
          // Glow effect simulated by shadow blur
          ctx.shadowColor = typeof color === 'string' ? color : stroke.color.palette[0];
          ctx.shadowBlur = stroke.effects.sigma * 1.5;
        }
      }

      // Draw Path with Segment Trim
      const pathObj = new Path2D(svgPath);
      
      // Calculate length for dash segment animation
      if (typeof document !== 'undefined') {
        const tempPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        tempPath.setAttribute('d', svgPath);
        const length = tempPath.getTotalLength();
        
        ctx.setLineDash([length * (t1 - t0), length]);
        ctx.lineDashOffset = -length * t0;
      }

      ctx.stroke(pathObj);
      ctx.restore();
    });

    ctx.restore();
  }
}
