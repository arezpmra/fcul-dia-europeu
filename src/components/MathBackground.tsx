import React, { useEffect, useRef } from 'react';

const symbols = ['μ', 'σ', '∑', 'π', '∫', '∞', '%', 'x̄', 'p', 'R²', 'α', 'β', 'f(x)', 'E(X)', 'Var(X)'];

export default function MathBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      text: string;
      size: number;
      opacity: number;
    }> = [];

    const dataPoints: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    // Create symbol particles
    const numParticles = Math.min(Math.floor((width * height) / 15000), 60);
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        text: symbols[Math.floor(Math.random() * symbols.length)],
        size: Math.random() * 15 + 12,
        opacity: Math.random() * 0.08 + 0.03,
      });
    }

    // Create data points
    const numDataPoints = Math.min(Math.floor((width * height) / 8000), 100);
    for (let i = 0; i < numDataPoints; i++) {
      dataPoints.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      });
    }

    let time = 0;
    let animationFrameId: number;

    const render = () => {
      time += 0.005;
      
      // Fill the background with editorial-cream (#F9F9F7) instead of clearing it
      ctx.fillStyle = '#F9F9F7';
      ctx.fillRect(0, 0, width, height);
      
      // Draw animated normal distribution curve (Bell Curve) at the bottom
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 10) {
        const center = width / 2 + Math.sin(time) * (width / 4);
        const stdDev = width / 6 + Math.cos(time * 1.5) * (width / 12);
        
        const exponent = -Math.pow(x - center, 2) / (2 * Math.pow(stdDev, 2));
        const yOffset = (height * 0.3) * Math.exp(exponent);
        
        const y = height - yOffset - 50;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.fillStyle = 'rgba(0, 83, 159, 0.08)';
      ctx.fill();

      // Draw animated bar chart
      const numBars = Math.floor(width / 60);
      const barWidth = 30;
      const barSpacing = 30;
      for (let i = 0; i < numBars; i++) {
        const barHeight = 20 + Math.abs(Math.sin(time * 3 + i) * 100) + Math.abs(Math.cos(time * 2 + i * 0.5) * 80);
        ctx.fillStyle = 'rgba(0, 83, 159, 0.1)';
        ctx.fillRect(30 + i * (barWidth + barSpacing), height - barHeight, barWidth, barHeight);
      }

      // Draw animated time series line chart
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(219, 61, 50, 0.25)'; // Accent red color
      ctx.lineWidth = 2;
      for (let x = 0; x <= width; x += 40) {
        const noise = Math.sin(x * 0.02 + time * 4) * 40 + Math.cos(x * 0.01 - time * 2) * 30;
        const trend = (x / width) * -100;
        const y = height * 0.4 + noise + trend;
        
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        
        // Draw points on the line chart
        if (x % 120 === 0) {
          ctx.fillStyle = 'rgba(219, 61, 50, 0.35)';
          const currX = x;
          const currY = y;
          // Temporarily close path to draw circle
          ctx.save();
          ctx.beginPath();
          ctx.arc(currX, currY, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
          ctx.moveTo(currX, currY); // Move back to continue line
        }
      }
      ctx.stroke();

      // Draw floating pie chart
      const pieX = width * 0.85;
      const pieY = height * 0.25;
      const pieRadius = Math.min(width, height) * 0.1;
      
      ctx.beginPath();
      ctx.moveTo(pieX, pieY);
      ctx.arc(pieX, pieY, pieRadius, time, time + Math.PI * 1.2);
      ctx.lineTo(pieX, pieY);
      ctx.fillStyle = 'rgba(0, 83, 159, 0.15)';
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(pieX, pieY);
      ctx.arc(pieX, pieY, pieRadius + 10, time + Math.PI * 1.25, time + Math.PI * 1.95);
      ctx.lineTo(pieX, pieY);
      ctx.fillStyle = 'rgba(219, 61, 50, 0.15)';
      ctx.fill();
      
      // Draw grid lines
      ctx.strokeStyle = 'rgba(18, 18, 18, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 100;
      const offsetX = (time * 20) % gridSize;
      const offsetY = (time * 10) % gridSize;
      
      ctx.beginPath();
      for (let x = -offsetX; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = -offsetY; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Draw data point connections (Network / Scatter plot)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < dataPoints.length; i++) {
        const p1 = dataPoints[i];
        
        p1.x += p1.vx;
        p1.y += p1.vy;
        
        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 83, 159, 0.15)';
        ctx.fill();

        for (let j = i + 1; j < dataPoints.length; j++) {
          const p2 = dataPoints[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 83, 159, ${(120 - dist) / 120 * 0.1})`;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw math symbols
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.font = `italic ${p.size}px "Playfair Display", serif`;
        ctx.fillStyle = `rgba(18, 18, 18, ${p.opacity})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.text, p.x, p.y);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]"
    />
  );
}
