"use client";

import { useEffect, useRef } from "react";

interface Dot {
  originX: number;
  originY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  z: number;
  phase: number;
  baseRadius: number;
}

const DOT_SPACING = 30;
const MOUSE_RADIUS = 140;
const REPULSION_STRENGTH = 0.9;
const RETURN_SPEED = 0.035;
const FRICTION = 0.86;
const JITTER = 12;
const FLOAT_SPEED = 0.008;
const FLOAT_AMPLITUDE = 0.4;

export default function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dots: Dot[] = [];
    let mouse = { x: -9999, y: -9999 };
    let animationId: number;
    let time = 0;

    function createDots() {
      dots = [];
      const w = canvas!.clientWidth;
      const h = canvas!.clientHeight;
      const cols = Math.ceil(w / DOT_SPACING) + 1;
      const rows = Math.ceil(h / DOT_SPACING) + 1;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const offsetX = (Math.random() - 0.5) * JITTER;
          const offsetY = (Math.random() - 0.5) * JITTER;
          const x = col * DOT_SPACING + offsetX;
          const y = row * DOT_SPACING + offsetY;
          const z = Math.random();
          dots.push({
            originX: x,
            originY: y,
            x,
            y,
            vx: 0,
            vy: 0,
            z,
            phase: Math.random() * Math.PI * 2,
            baseRadius: 0.8 + Math.random() * 0.8,
          });
        }
      }
    }

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const docW = Math.max(
        document.documentElement.scrollWidth,
        window.innerWidth
      );
      const docH = Math.max(
        document.documentElement.scrollHeight,
        window.innerHeight
      );
      canvas!.width = docW * dpr;
      canvas!.height = docH * dpr;
      canvas!.style.width = `${docW}px`;
      canvas!.style.height = `${docH}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      createDots();
    }

    function animate() {
      time += 1;
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      for (const dot of dots) {
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          const angle = Math.atan2(dy, dx);
          dot.vx -= Math.cos(angle) * force * REPULSION_STRENGTH;
          dot.vy -= Math.sin(angle) * force * REPULSION_STRENGTH;
        }

        dot.vx += (dot.originX - dot.x) * RETURN_SPEED;
        dot.vy += (dot.originY - dot.y) * RETURN_SPEED;

        dot.vx *= FRICTION;
        dot.vy *= FRICTION;

        dot.x += dot.vx;
        dot.y += dot.vy;

        // Gentle floating bob
        const floatOffset = Math.sin(time * FLOAT_SPEED + dot.phase) * FLOAT_AMPLITUDE;

        // Z affects size and opacity (parallax depth)
        const zScale = 0.5 + dot.z * 0.5;
        const radius = (dot.baseRadius + floatOffset) * zScale;
        const opacity = 0.08 + dot.z * 0.14;

        const displacement = Math.sqrt(
          (dot.x - dot.originX) ** 2 + (dot.y - dot.originY) ** 2
        );

        // Gold-yellow palette
        const activeBoost = Math.min(displacement / 15, 1);
        const r = Math.round(218 + activeBoost * 37);
        const g = Math.round(165 + activeBoost * 50);
        const b = Math.round(32 + activeBoost * 18);
        const a = Math.min(opacity + activeBoost * 0.3, 1);

        ctx!.beginPath();
        ctx!.arc(dot.x, dot.y, Math.max(radius, 0.3), 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
        ctx!.fill();
      }

      animationId = requestAnimationFrame(animate);
    }

    function handleMouseMove(e: MouseEvent) {
      mouse.x = e.clientX + window.scrollX;
      mouse.y = e.clientY + window.scrollY;
    }

    function handleMouseLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    createDots();
    resize();
    animate();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute left-0 top-0 z-0"
    />
  );
}
