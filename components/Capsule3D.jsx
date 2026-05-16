"use client";

import { useEffect, useRef } from "react";

export default function Capsule3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const mountEl = mountRef.current;

    let animFrameId;
    let renderer, controls;

    async function init() {
      const THREE = await import("three");
      const { OrbitControls } = await import(
        "three/examples/jsm/controls/OrbitControls.js"
      );

      if (!mountEl) return;

      const width = mountEl.clientWidth || 500;
      const height = mountEl.clientHeight || 600;

      // Renderer
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
      mountEl.appendChild(renderer.domElement);

      const isMobile = window.matchMedia("(max-width: 768px)").matches;

      // On mobile let touch scroll the page — disable canvas pointer capture
      if (isMobile) {
        renderer.domElement.style.touchAction = "pan-y";
      }

      // Scene
      const scene = new THREE.Scene();

      // Camera
      const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
      camera.position.set(0, 0, 4.5);

      // OrbitControls — disabled on mobile so touch scrolls the page
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.04;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 1.2;
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.minPolarAngle = Math.PI * 0.3;
      controls.maxPolarAngle = Math.PI * 0.72;
      if (isMobile) {
        controls.enabled = false;
      }

      // Materials
      const darkTeal = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#004346"),
        clearcoat: 1.0,
        clearcoatRoughness: 0.08,
        roughness: 0.22,
        metalness: 0.12,
        envMapIntensity: 1.2,
      });

      const lightTeal = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#5DA8C4"),
        clearcoat: 0.9,
        clearcoatRoughness: 0.1,
        roughness: 0.28,
        metalness: 0.08,
        envMapIntensity: 1.1,
      });

      // "HEAL STATION" engraving — large canvas for sharp bump map
      const bumpCanvas = document.createElement("canvas");
      bumpCanvas.width = 2048;
      bumpCanvas.height = 512;
      const bCtx = bumpCanvas.getContext("2d");
      bCtx.fillStyle = "#000000";
      bCtx.fillRect(0, 0, 2048, 512);
      bCtx.fillStyle = "#ffffff";
      bCtx.font = "900 110px 'Arial Black', 'Courier New', monospace";
      bCtx.textAlign = "center";
      bCtx.textBaseline = "middle";
      bCtx.letterSpacing = "12px";
      bCtx.fillText("HEAL  STATION", 1024, 256);
      const bumpTex = new THREE.CanvasTexture(bumpCanvas);
      bumpTex.wrapS = THREE.RepeatWrapping;
      bumpTex.wrapT = THREE.RepeatWrapping;

      darkTeal.bumpMap = bumpTex;
      darkTeal.bumpScale = 0.5;

      lightTeal.bumpMap = bumpTex;
      lightTeal.bumpScale = -0.5;

      // Capsule group
      const capsule = new THREE.Group();

      // Top dome
      const topDome = new THREE.SphereGeometry(
        0.78, 40, 40,
        0, Math.PI * 2, 0, Math.PI / 2
      );
      capsule.add(new THREE.Mesh(topDome, darkTeal));
      // Position mesh
      capsule.children[0].position.y = 0.72;

      // Top cylinder half
      const topCyl = new THREE.CylinderGeometry(0.78, 0.78, 0.72, 40, 1, true);
      const topCylMesh = new THREE.Mesh(topCyl, darkTeal);
      topCylMesh.position.y = 0.36;
      capsule.add(topCylMesh);

      // Bottom cylinder half
      const botCyl = new THREE.CylinderGeometry(0.78, 0.78, 0.72, 40, 1, true);
      const botCylMesh = new THREE.Mesh(botCyl, lightTeal);
      botCylMesh.position.y = -0.36;
      capsule.add(botCylMesh);

      // Bottom dome
      const botDome = new THREE.SphereGeometry(
        0.78, 40, 40,
        0, Math.PI * 2, Math.PI / 2, Math.PI / 2
      );
      const botDomeMesh = new THREE.Mesh(botDome, lightTeal);
      botDomeMesh.position.y = -0.72;
      capsule.add(botDomeMesh);

      // Seam ring (subtle highlight between the two halves)
      const seamGeo = new THREE.TorusGeometry(0.782, 0.006, 8, 60);
      const seamMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#ffffff"),
        roughness: 0.05,
        metalness: 0.6,
        opacity: 0.55,
        transparent: true,
      });
      const seamMesh = new THREE.Mesh(seamGeo, seamMat);
      seamMesh.rotation.x = Math.PI / 2;
      capsule.add(seamMesh);

      // Initial tilt
      capsule.rotation.z = 0.18;

      scene.add(capsule);

      // Lighting
      const ambient = new THREE.AmbientLight(0xd4eef2, 0.7);
      scene.add(ambient);

      const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
      keyLight.position.set(3, 5, 4);
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0x74b3ce, 0.5);
      fillLight.position.set(-4, -1, 2);
      scene.add(fillLight);

      const rimLight = new THREE.DirectionalLight(0xc4f0f5, 0.9);
      rimLight.position.set(0, -3, -4);
      scene.add(rimLight);

      // Reflection sphere (environment map approximation)
      const envGeo = new THREE.SphereGeometry(0.62, 32, 32);
      const envMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#E8F6F7"),
        roughness: 0.4,
        metalness: 0,
        opacity: 0,
        transparent: true,
      });
      scene.add(new THREE.Mesh(envGeo, envMat));

      // Floating particles
      const particleCount = 28;
      const particleGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        const r = 1.4 + Math.random() * 1.2;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.cos(phi) * 0.8;
        positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      }
      particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const particleMat = new THREE.PointsMaterial({
        size: 0.022,
        color: new THREE.Color("#74B3CE"),
        transparent: true,
        opacity: 0.55,
        sizeAttenuation: true,
      });
      const particles = new THREE.Points(particleGeo, particleMat);
      scene.add(particles);

      let time = 0;

      const animate = () => {
        animFrameId = requestAnimationFrame(animate);
        time += 0.014;
        capsule.position.y = Math.sin(time * 0.65) * 0.13;
        capsule.rotation.z = 0.18 + Math.sin(time * 0.4) * 0.04;
        particles.rotation.y = time * 0.06;
        particles.rotation.x = time * 0.03;
        controls.update();
        renderer.render(scene, camera);
      };

      animate();

      const handleResize = () => {
        if (!mountEl) return;
        const w = mountEl.clientWidth || 500;
        const h = mountEl.clientHeight || 600;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }

    let cleanupFn;
    init().then((fn) => { cleanupFn = fn; });

    return () => {
      cancelAnimationFrame(animFrameId);
      if (cleanupFn) cleanupFn();
      if (controls) controls.dispose();
      if (renderer) {
        renderer.dispose();
        if (mountEl && renderer.domElement.parentNode === mountEl) {
          mountEl.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: "100%", minHeight: 480 }}
    />
  );
}
