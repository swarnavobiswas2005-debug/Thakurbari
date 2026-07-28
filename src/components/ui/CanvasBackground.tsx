"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

// Simple noise definition inside shader for self-containment
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform vec2 u_resolution;
  varying vec2 vUv;

  // Simple 2D noise based on sine waves
  float noise(in vec2 p) {
    return sin(p.x * 2.0 + sin(p.y * 3.0 + u_time * 0.2)) * 
           cos(p.y * 2.0 + cos(p.x * 3.0 - u_time * 0.15));
  }

  // Fractal Brownian Motion
  float fbm(in vec2 p) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for (int i = 0; i < 4; ++i) {
      v += a * noise(p);
      p = rot * p * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    
    // Maintain aspect ratio
    float aspect = u_resolution.x / u_resolution.y;
    st.x *= aspect;
    vec2 mouse = u_mouse;
    mouse.x *= aspect;

    // Background base
    vec3 baseColor = vec3(0.02, 0.02, 0.02);

    // Create coordinates for aurora movement
    vec2 uv1 = st * 1.5 - vec2(u_time * 0.03, u_time * 0.01);
    vec2 uv2 = st * 2.0 + vec2(u_time * 0.02, -u_time * 0.04);
    
    // Aurora noise values
    float n1 = fbm(uv1);
    float n2 = fbm(uv2);
    
    // Aurora shape & flow
    float auroraStrength1 = smoothstep(0.1, 0.8, n1 * 0.5 + 0.5);
    float auroraStrength2 = smoothstep(0.2, 0.9, n2 * 0.5 + 0.5);

    // Colors: Cyan, Electric Blue, Violet/Purple
    vec3 colorCyan = vec3(0.0, 0.96, 1.0);     // Soft Cyan
    vec3 colorBlue = vec3(0.0, 0.32, 1.0);     // Electric Blue
    vec3 colorPurple = vec3(0.61, 0.3, 0.86);  // Accent Purple

    // Blend auroras
    vec3 auroraColor1 = mix(colorBlue, colorCyan, n1 * 0.5 + 0.5);
    vec3 auroraColor2 = mix(colorPurple, colorBlue, n2 * 0.5 + 0.5);
    
    // Aurora overlay
    vec3 finalAurora = (auroraColor1 * auroraStrength1 * 0.25) + 
                       (auroraColor2 * auroraStrength2 * 0.25);

    // Spotlight glow effect following mouse
    float dist = distance(st, mouse);
    float spotlight = smoothstep(0.6, 0.0, dist);
    vec3 spotlightColor = mix(colorBlue, colorPurple, 0.5) * spotlight * 0.15;

    // Ambient grid vignette
    float vignette = st.y * (1.0 - st.y) * st.x / aspect * (1.0 - st.x / aspect);
    vignette = clamp(pow(16.0 * vignette, 0.25), 0.0, 1.0);

    // Combine layers
    vec3 finalColor = (baseColor + finalAurora + spotlightColor) * vignette;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export default function CanvasBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Setup scene, camera, renderer
    const width = window.innerWidth;
    const height = window.innerHeight;
    const scene = new THREE.Scene();
    
    // Orthographic camera for full screen quad shader
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: false, // Turn off for optimization
      powerPreference: "high-performance",
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio to 2 for performance
    containerRef.current.appendChild(renderer.domElement);

    // 2. Uniforms for Shader
    const uniforms = {
      u_time: { value: 1.0 },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_resolution: { value: new THREE.Vector2(width, height) }
    };

    // 3. Quad Geometry & Shader Material
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      depthWrite: false,
      depthTest: false,
    });
    
    const geometry = new THREE.PlaneGeometry(2, 2);
    const quad = new THREE.Mesh(geometry, material);
    scene.add(quad);

    // 4. Create floating particle point system overlay
    const particleCount = 120;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Space particles across full coordinates
      positions[i] = (Math.random() * 2 - 1) * 2;     // X: [-2, 2]
      positions[i + 1] = (Math.random() * 2 - 1) * 2; // Y: [-2, 2]
      positions[i + 2] = 0;                           // Z: Flat on plane

      // Speed rates for floating movement
      speeds[i] = (Math.random() * 2 - 1) * 0.0005; // X drift
      speeds[i + 1] = (Math.random() * 0.5 + 0.5) * 0.001; // Y drift upwards
      speeds[i + 2] = 0;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    
    // Custom soft point texture using Canvas
    const createCircleTexture = () => {
      const size = 16;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const gradient = ctx.createRadialGradient(
          size / 2, size / 2, 0,
          size / 2, size / 2, size / 2
        );
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.6)");
        gradient.addColorStop(0.3, "rgba(0, 245, 255, 0.2)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.035,
      map: createCircleTexture(),
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 5. Interactivity: Mouse tracking
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse coordinates to [0, 1] relative to viewport
      targetMouseRef.current.x = event.clientX / window.innerWidth;
      targetMouseRef.current.y = 1.0 - (event.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handleMouseMove);

    // 6. Handle resizing
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      uniforms.u_resolution.value.set(w, h);
    };
    window.addEventListener("resize", handleResize);

    // 7. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Delta time & elapsed time
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();
      uniforms.u_time.value = elapsed;

      // Smooth mouse interpolation (Damping)
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.08;
      uniforms.u_mouse.value.set(mouseRef.current.x, mouseRef.current.y);

      // Animate particles
      const positionsAttr = particleGeometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount * 3; i += 3) {
        // Move particle coordinates
        positionsAttr.array[i] += speeds[i]; // Drift X
        positionsAttr.array[i + 1] += speeds[i + 1]; // Drift Y upwards

        // Apply mouse-spotlight subtle repulsion to particles
        const px = positionsAttr.array[i];
        const py = positionsAttr.array[i + 1];
        
        // Convert screen mouse coordinates back to NDC coordinates [-1, 1]
        const ndcMouseX = mouseRef.current.x * 2 - 1;
        const ndcMouseY = mouseRef.current.y * 2 - 1;
        
        const dx = px - ndcMouseX;
        const dy = py - ndcMouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 0.3) {
          // Subtle push away from mouse
          const force = (0.3 - dist) * 0.01;
          positionsAttr.array[i] += (dx / dist) * force;
          positionsAttr.array[i + 1] += (dy / dist) * force;
        }

        // Reset if particles go off-screen
        if (positionsAttr.array[i + 1] > 1.2) {
          positionsAttr.array[i + 1] = -1.2;
          positionsAttr.array[i] = (Math.random() * 2 - 1) * 2;
        }
        if (positionsAttr.array[i] > 2.0 || positionsAttr.array[i] < -2.0) {
          positionsAttr.array[i] = (Math.random() * 2 - 1) * 2;
        }
      }
      positionsAttr.needsUpdate = true;

      // Render the scene
      renderer.render(scene, camera);
    };

    animate();

    // 8. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      // Dispose of Three.js objects
      geometry.dispose();
      material.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      if (particleMaterial.map) particleMaterial.map.dispose();
      
      if (containerRef.current) {
        // Check if child is present before removing
        if (containerRef.current.contains(renderer.domElement)) {
          containerRef.current.removeChild(renderer.domElement);
        }
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none overflow-hidden bg-[#050505]"
    />
  );
}
