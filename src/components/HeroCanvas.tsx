"use client";

import { useEffect, useRef } from "react";

const PALETTE = ["#b64bff", "#22d3ee", "#ff5ea3", "#e3350d", "#39ff88", "#d4af37"];

type Blob = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  color: string;
  pulse: number;
  pulseSpeed: number;
};

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let blobs: Blob[] = [];
    let raf = 0;

    function resize() {
      if (!canvas) return;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function makeBlobs() {
      const count = Math.max(14, Math.floor((width * height) / 60000));
      blobs = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 40 + Math.random() * 120,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.004 + Math.random() * 0.006,
      }));
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      for (const b of blobs) {
        b.x += b.vx;
        b.y += b.vy;
        b.pulse += b.pulseSpeed;

        // gentle parallax toward cursor
        const dx = mouse.current.x - b.x;
        const dy = mouse.current.y - b.y;
        b.x += dx * 0.0006;
        b.y += dy * 0.0006;

        if (b.x < -b.r) b.x = width + b.r;
        if (b.x > width + b.r) b.x = -b.r;
        if (b.y < -b.r) b.y = height + b.r;
        if (b.y > height + b.r) b.y = -b.r;

        const radius = b.r * (0.85 + Math.sin(b.pulse) * 0.15);
        const gradient = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, radius);
        gradient.addColorStop(0, `${b.color}33`);
        gradient.addColorStop(1, `${b.color}00`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(b.x, b.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    resize();
    makeBlobs();
    window.addEventListener("resize", () => {
      resize();
      makeBlobs();
    });
    window.addEventListener("mousemove", onMouseMove);

    if (prefersReducedMotion) {
      draw();
      cancelAnimationFrame(raf);
    } else {
      draw();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />;
}
