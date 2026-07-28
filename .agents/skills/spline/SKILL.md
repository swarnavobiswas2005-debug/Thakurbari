---
name: spline-integration
description: Guidelines and instructions for embedding interactive 3D scenes from Spline (spline.design) into Next.js 15, React 19, and Tailwind CSS projects. Use when the user requests 3D Spline scenes, embeds, interactive hero modules, or dApp 3D layouts.
---

# Spline 3D Integration Skill

This skill outlines best practices for embedding and orchestrating interactive 3D scenes created in Spline within Next.js 15, React 19, and Tailwind CSS applications.

---

## 1. Installation

To use Spline in a Next.js/React project, install the official React Spline runtime package:

```bash
npm install @splinetool/react-spline --legacy-peer-deps
```

> [!IMPORTANT]
> If building for React 19 / Next.js 15, ensure you run the installation with `--legacy-peer-deps` to bypass strict React version matching flags, as the library functions correctly in React 19 at runtime.

---

## 2. Core Best Practices

### A. Next.js Lazy Loading (Critical for Performance)
Spline is heavy and contains the entire WebGL rendering pipeline (Three.js/webgl runner). Never import it statically at the top of your page. **Always lazy load** the component dynamically using Next's `dynamic` utility with `ssr: false` to ensure it only compiles client-side and doesn't block page-load metrics:

```tsx
import dynamic from "next/dynamic";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#050505] text-neutral-500 font-mono text-xs">
      Loading 3D Canvas...
    </div>
  ),
});
```

### B. Responsive Containers
Spline automatically fits its immediate parent container's dimensions. Always wrap the `<Spline />` component in a styled relative container with set width and height bounds:

```tsx
export default function Interactive3DHero() {
  return (
    <div className="relative w-full h-[600px] md:h-[800px] overflow-hidden">
      {/* 3D Scene Wrapper */}
      <div className="absolute inset-0 w-full h-full">
        <Spline scene="https://prod.spline.design/your-scene-id/scene.splinecode" />
      </div>
      
      {/* Interactive Overlay content */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <h1 className="pointer-events-auto text-white text-5xl font-black">
          Cinematic Web3
        </h1>
      </div>
    </div>
  );
}
```

### C. Pointer Interception & Scrolling
By default, Spline canvases capture mouse drag and scroll events. This can hijack page scrolling.
- If the 3D scene is **background-only** and doesn't require zoom/drag interactions, add the Tailwind utility `pointer-events-none` to the container to let scroll events pass through.
- Overlay HTML text components must use `pointer-events-auto` to allow text selection and button clicks.

---

## 3. Advanced API Integrations (Controlling Scenes)

You can grab the Spline application instance inside React to read and write variables, trigger animations, or move 3D elements programmatically:

```tsx
"use client";

import React, { useRef } from "react";
import dynamic from "next/dynamic";

const Spline = dynamic(() => import("@splinetool/react-spline"), { ssr: false });

export default function ControlledSpline() {
  const splineRef = useRef<any>(null);

  function onLoad(splineApp: any) {
    // Save reference to Spline Application instance
    splineRef.current = splineApp;
    
    // Find object by name in the 3D scene
    const cube = splineApp.findObjectByName("Cube");
    console.log("3D Cube Object:", cube);
  }

  const triggerRotation = () => {
    if (splineRef.current) {
      // Rotate object programmatically
      const cube = splineRef.current.findObjectByName("Cube");
      if (cube) {
        cube.rotation.y += Math.PI / 4;
      }
    }
  };

  return (
    <div>
      <button onClick={triggerRotation} className="px-4 py-2 bg-blue-600 text-white rounded">
        Rotate Cube
      </button>
      <div className="w-[500px] h-[500px]">
        <Spline 
          scene="https://prod.spline.design/your-scene-id/scene.splinecode" 
          onLoad={onLoad}
        />
      </div>
    </div>
  );
}
```

---

## 4. Performance Optimization Checklist

- [ ] **Optimize Mesh Geometry**: In Spline design editor, keep polygon counts low. Reduce subdivisions.
- [ ] **Bake Lighting**: Use baked lighting instead of multiple real-time shadows to prevent GPU throttle.
- [ ] **Enable Low DPI**: In the scene exports, cap device pixel ratio to `1.5` or `2` for high refresh rate monitors.
- [ ] **Asset Compression**: Compress textures and exports. Use the `.splinecode` format.
