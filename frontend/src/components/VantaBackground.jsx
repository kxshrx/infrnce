"use client";

import { useEffect, useRef } from "react";

export default function VantaBackground() {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    if (!vantaEffect.current && typeof window !== "undefined") {
      // Wait for both p5 and VANTA to be available
      const initVanta = () => {
        if (window.p5 && window.VANTA && window.VANTA.TOPOLOGY) {
          vantaEffect.current = window.VANTA.TOPOLOGY({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0x0d9488, // Teal-600
            backgroundColor: 0xfefefe, // Almost white
            p5: window.p5,
          });
        } else {
          // Retry after a short delay
          setTimeout(initVanta, 100);
        }
      };

      // Load the Vanta.js script dynamically
      if (!window.VANTA) {
        const script = document.createElement("script");
        script.src = "/vanta.topology.min.js";
        script.onload = initVanta;
        document.head.appendChild(script);
      } else {
        initVanta();
      }
    }

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}
