import React, { useEffect, useRef } from 'react';

interface FloatingParticlesProps {
  isDark?: boolean;
}

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({ isDark = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle structure with 3D coordinates (x, y, z) - increased by ~50%
    const particleCount = Math.min(Math.floor((width * height) / 9500), 115);
    const particles: {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      radius: number;
      baseAlpha: number;
    }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z: Math.random() * 800 + 100, // depth range
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        baseAlpha: Math.random() * 0.5 + 0.2,
      });
    }

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX - width / 2) * 0.08;
      targetMouseY = (e.clientY - height / 2) * 0.08;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      // Smooth mouse follow
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const fov = 400; // focal length for 3D projection
      const centerX = width / 2;
      const centerY = height / 2;

      // Update and project particles
      const projectedParticles: {
        px: number;
        py: number;
        size: number;
        alpha: number;
      }[] = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move particle in 3D
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Wrap around boundaries
        if (p.z < 50) p.z = 850;
        if (p.z > 850) p.z = 50;
        if (p.x < -width) p.x = width;
        if (p.x > width) p.x = -width;
        if (p.y < -height) p.y = height;
        if (p.y > height) p.y = -height;

        // 3D perspective projection
        const depth = p.z;
        const scale = fov / (fov + depth);
        const px = (p.x + mouseX) * scale + centerX;
        const py = (p.y + mouseY) * scale + centerY;

        const size = Math.max(p.radius * scale * 1.5, 0.5);
        const alpha = Math.min(Math.max((1 - depth / 900) * p.baseAlpha, 0.05), 0.85);

        projectedParticles.push({ px, py, size, alpha });

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(147, 197, 253, ${alpha * 0.75})`
          : `rgba(71, 85, 105, ${alpha * 0.6})`;
        ctx.fill();
      }

      // Draw subtle connecting lines between close particles
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projectedParticles.length; i++) {
        for (let j = i + 1; j < projectedParticles.length; j++) {
          const p1 = projectedParticles[i];
          const p2 = projectedParticles[j];
          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            const lineAlpha = (1 - dist / 100) * 0.15 * Math.min(p1.alpha, p2.alpha);
            ctx.strokeStyle = isDark
              ? `rgba(96, 165, 250, ${lineAlpha})`
              : `rgba(100, 116, 139, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-70 transition-opacity duration-700"
    />
  );
};
