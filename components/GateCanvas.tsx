"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function drawFlower(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string) {
  ctx.save();
  ctx.translate(x, y);
  for (let i = 0; i < 5; i++) {
    ctx.save();
    ctx.rotate((i / 5) * Math.PI * 2);
    ctx.beginPath();
    ctx.ellipse(0, -r * 0.55, r * 0.3, r * 0.55, 0, 0, Math.PI * 2);
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.22, 0, Math.PI * 2);
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#C9A454";
  ctx.fill();
  ctx.restore();
}

function drawLeaf(
  ctx: CanvasRenderingContext2D, x: number, y: number,
  len: number, angle: number, color = "rgba(72,120,55,0.65)"
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(len * 0.3, -len * 0.28, len * 0.7, -len * 0.22, len, 0);
  ctx.bezierCurveTo(len * 0.7, len * 0.22, len * 0.3, len * 0.28, 0, 0);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

function createPanelTexture(isLeft: boolean): THREE.CanvasTexture {
  const W = 512, H = 1024;
  const cv = document.createElement("canvas");
  cv.width = W; cv.height = H;
  const ctx = cv.getContext("2d")!;

  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#fdf8f0"); bg.addColorStop(0.5, "#f9f1e5"); bg.addColorStop(1, "#f3e6d4");
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

  const vig = ctx.createRadialGradient(W/2, H/2, H*0.1, W/2, H/2, H*0.75);
  vig.addColorStop(0, "rgba(255,255,255,0)"); vig.addColorStop(1, "rgba(160,120,80,0.07)");
  ctx.fillStyle = vig; ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = "#C9A454"; ctx.lineWidth = 5; ctx.strokeRect(10, 10, W-20, H-20);
  ctx.lineWidth = 1.5; ctx.strokeRect(22, 22, W-44, H-44);

  const edgeShadow = ctx.createLinearGradient(isLeft ? W-40 : 0, 0, isLeft ? W : 40, 0);
  if (isLeft) { edgeShadow.addColorStop(0, "rgba(0,0,0,0)"); edgeShadow.addColorStop(1, "rgba(0,0,0,0.16)"); }
  else { edgeShadow.addColorStop(0, "rgba(0,0,0,0.16)"); edgeShadow.addColorStop(1, "rgba(0,0,0,0)"); }
  ctx.fillStyle = edgeShadow; ctx.fillRect(isLeft ? W-40 : 0, 0, 40, H);

  ctx.strokeStyle = "rgba(201,164,84,0.9)"; ctx.lineWidth = 3;
  ctx.beginPath();
  if (isLeft) { ctx.moveTo(W-3, 12); ctx.lineTo(W-3, H-12); }
  else { ctx.moveTo(3, 12); ctx.lineTo(3, H-12); }
  ctx.stroke();

  const cx = W / 2;
  [[68,68],[W-68,68],[68,H-68],[W-68,H-68]].forEach(([x, y]) => {
    drawLeaf(ctx, x-10, y+8, 18, 0.4); drawLeaf(ctx, x+4, y+13, 16, -0.5);
    drawFlower(ctx, x, y, 22, "#e8a0a8");
  });

  const cy = H / 2;
  for (let i = 0; i < 10; i++) {
    const a = (i/10)*Math.PI*2, d = 52+(i%2)*14;
    drawLeaf(ctx, cx+Math.cos(a)*d, cy+Math.sin(a)*d, 20, a);
  }
  drawFlower(ctx, cx, cy, 40, "#f4c2ca");
  drawFlower(ctx, cx-50, cy+16, 26, "#fffaf0"); drawFlower(ctx, cx+50, cy+16, 26, "#fffaf0");
  drawFlower(ctx, cx-26, cy-50, 21, "#e8a0a8"); drawFlower(ctx, cx+26, cy-50, 21, "#e8a0a8");
  drawFlower(ctx, cx, cy+55, 19, "#fad4d8"); drawFlower(ctx, cx-56, cy-18, 17, "#fad4d8"); drawFlower(ctx, cx+56, cy-18, 17, "#fad4d8");

  ([H*0.24, H*0.76] as number[]).forEach((uy) => {
    for (let i=0;i<6;i++){const a=(i/6)*Math.PI*2; drawLeaf(ctx,cx+Math.cos(a)*36,uy+Math.sin(a)*36,16,a);}
    drawFlower(ctx, cx, uy, 30, "#fffaf0");
    drawFlower(ctx, cx-36, uy+12, 19, "#e8a0a8");
    drawFlower(ctx, cx+36, uy+12, 19, "#e8a0a8");
    drawFlower(ctx, cx, uy-38, 15, "#fad4d8");
  });

  ctx.strokeStyle = "rgba(201,164,84,0.3)"; ctx.lineWidth = 1; ctx.setLineDash([4,7]);
  ctx.beginPath(); ctx.moveTo(cx, 108); ctx.lineTo(cx, H*0.19);
  ctx.moveTo(cx, H*0.29); ctx.lineTo(cx, H*0.71);
  ctx.moveTo(cx, H*0.81); ctx.lineTo(cx, H-108); ctx.stroke(); ctx.setLineDash([]);

  return new THREE.CanvasTexture(cv);
}

function createPetalTexture(): THREE.CanvasTexture {
  const cv = document.createElement("canvas");
  cv.width = 64; cv.height = 64;
  const ctx = cv.getContext("2d")!;
  ctx.save(); ctx.translate(32, 32); ctx.rotate(0.3);
  const g = ctx.createRadialGradient(0, -6, 2, 0, -6, 20);
  g.addColorStop(0, "rgba(255,200,212,0.95)"); g.addColorStop(1, "rgba(225,130,155,0.55)");
  ctx.beginPath(); ctx.ellipse(0, -6, 10, 20, 0, 0, Math.PI*2);
  ctx.fillStyle = g; ctx.fill(); ctx.restore();
  return new THREE.CanvasTexture(cv);
}

function loadTexture(loader: THREE.TextureLoader, url: string): Promise<THREE.Texture> {
  return new Promise((resolve) => {
    loader.load(url, resolve, undefined, () => {
      const cv = document.createElement("canvas");
      cv.width = cv.height = 1;
      resolve(new THREE.CanvasTexture(cv));
    });
  });
}

interface JanurAnim {
  group: THREE.Group;
  baseRotZ: number;
  swayAmp: number;
  swaySpeed: number;
  swayPhase: number;
}

interface PetalState {
  sprite: THREE.Sprite;
  vy: number; vx: number;
  sway: number; swaySpeed: number;
  startDelay: number;
}

export default function GateCanvas({ active, onComplete }: { active: boolean; onComplete?: () => void }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);
  useEffect(() => { onCompleteRef.current = onComplete; });

  useEffect(() => {
    if (!active || !mountRef.current) return;

    const container = mountRef.current;
    const W = window.innerWidth, H = window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5e8d5);

    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100);
    camera.position.set(0, 0.35, 3);
    camera.lookAt(0, -0.1, -8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.domElement.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;";
    container.appendChild(renderer.domElement);

    const vFov = (camera.fov * Math.PI) / 180;
    const vh = 2 * Math.tan(vFov / 2) * camera.position.z;
    const vw = vh * (W / H);
    const halfVW = vw / 2;
    const panelW = halfVW * 1.02;
    const panelH = vh + 0.3;

    // Gate panels
    const leftTex = createPanelTexture(true);
    const rightTex = createPanelTexture(false);
    const mkMat = (t: THREE.Texture) => new THREE.MeshBasicMaterial({ map: t, side: THREE.DoubleSide });

    const leftGroup = new THREE.Group();
    leftGroup.position.x = -halfVW;
    scene.add(leftGroup);
    const leftMesh = new THREE.Mesh(new THREE.PlaneGeometry(panelW, panelH), mkMat(leftTex));
    leftMesh.position.x = panelW / 2;
    leftGroup.add(leftMesh);

    const rightGroup = new THREE.Group();
    rightGroup.position.x = halfVW;
    scene.add(rightGroup);
    const rightMesh = new THREE.Mesh(new THREE.PlaneGeometry(panelW, panelH), mkMat(rightTex));
    rightMesh.position.x = -panelW / 2;
    rightGroup.add(rightMesh);

    // Petals
    const petalTex = createPetalTexture();
    const PETAL_COUNT = 28;
    const petals: PetalState[] = [];
    for (let i = 0; i < PETAL_COUNT; i++) {
      const mat = new THREE.SpriteMaterial({ map: petalTex, transparent: true, opacity: 0, depthWrite: false });
      const sprite = new THREE.Sprite(mat);
      const scale = 0.04 + Math.random() * 0.055;
      sprite.scale.set(scale * (H / W) * 1.5, scale, 1);
      sprite.position.set((Math.random()-0.5)*vw*1.1, vh*0.1+Math.random()*vh*0.7, 0.2+Math.random()*0.5);
      scene.add(sprite);
      petals.push({
        sprite, vy: -(0.2+Math.random()*0.38), vx: (Math.random()-0.5)*0.1,
        sway: Math.random()*Math.PI*2, swaySpeed: 0.8+Math.random()*1.4,
        startDelay: 0.4+(i/PETAL_COUNT)*0.9,
      });
    }

    // Timing
    const GATE_DUR   = 1.3;
    const DOLLY_START = 1.5;
    const DOLLY_DUR   = 2.0;
    const FADE_START  = DOLLY_START + DOLLY_DUR; // 3.5
    const FADE_DUR    = 0.7;
    const CAM_Z_START = camera.position.z;
    const CAM_Z_END   = 1.7;

    // Decor state (filled after texture load)
    const janurAnims: JanurAnim[] = [];
    const loadedTextures: THREE.Texture[] = [];

    const loader = new THREE.TextureLoader();
    Promise.all([
      loadTexture(loader, "/decor/bg-cover.png"),
      loadTexture(loader, "/decor/Orn-30.png"),
      loadTexture(loader, "/decor/Orn-15.png"),
      loadTexture(loader, "/decor/Orn-17.png"),
      loadTexture(loader, "/decor/Orn-54.png"),
      loadTexture(loader, "/decor/Orn-56.png"),
      loadTexture(loader, "/decor/Orn-57.png"),
      loadTexture(loader, "/decor/Orn-58.png"),
      loadTexture(loader, "/decor/Orn-59.png"),
      loadTexture(loader, "/decor/Orn-60.png"),
      loadTexture(loader, "/foto/IMG_3346.jpg"),
    ]).then(([bgTex, janurTex, orn15, orn17, orn54, orn56, orn57, orn58, orn59, orn60, coupleTex]) => {
      loadedTextures.push(bgTex, janurTex, orn15, orn17, orn54, orn56, orn57, orn58, orn59, orn60, coupleTex);

      // Background plane
      const bgPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(30, 20),
        new THREE.MeshBasicMaterial({ map: bgTex })
      );
      bgPlane.position.z = -11;
      scene.add(bgPlane);

      // Flower fence — dense pagar on both sides
      const flowerTexs = [orn54, orn56, orn57, orn58, orn59, orn60];
      const zSteps = [-0.2, -0.75, -1.3, -1.85, -2.4, -2.95, -3.5, -4.05, -4.6, -5.1];
      zSteps.forEach((z, idx) => {
        [-1, 1].forEach((side) => {
          for (let col = 0; col < 3; col++) {
            const texIdx = (idx * 3 + col + (side === -1 ? 0 : 3)) % flowerTexs.length;
            const mat = new THREE.SpriteMaterial({ map: flowerTexs[texIdx], transparent: true, depthWrite: false });
            const sp = new THREE.Sprite(mat);
            sp.scale.set(0.50, 0.56, 1);
            sp.position.set(
              side * (0.30 + col * 0.22 + (Math.random()-0.5)*0.06),
              -0.38 + (Math.random()-0.5)*0.42,
              z - Math.random()*0.28
            );
            scene.add(sp);
          }
        });
      });

      // Foliage — outer sides
      [
        { tex: orn15, x: -1.55, y: 0.05, z: -1.8,  sw: 0.55, sh: 1.1 },
        { tex: orn17, x: -2.15, y: 0.15, z: -3.0,  sw: 0.78, sh: 1.35 },
        { tex: orn15, x:  1.55, y: 0.05, z: -1.8,  sw: 0.55, sh: 1.1 },
        { tex: orn17, x:  2.15, y: 0.15, z: -3.0,  sw: 0.78, sh: 1.35 },
      ].forEach(({ tex, x, y, z, sw, sh }) => {
        const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
        const sp = new THREE.Sprite(mat);
        sp.scale.set(sw, sh, 1);
        sp.position.set(x, y, z);
        scene.add(sp);
      });

      // Couple photo on wooden easel
      const photoH = 1.15;
      const photoW = photoH * 0.70;
      const photoMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(photoW, photoH),
        new THREE.MeshBasicMaterial({ map: coupleTex })
      );
      photoMesh.position.set(0, 0.02, -5.2);
      scene.add(photoMesh);

      const woodMat = new THREE.MeshBasicMaterial({ color: 0x7b5b3a, side: THREE.DoubleSide });
      const legH = 0.65;
      [
        { xOff: -photoW * 0.32, rotZ: 0.28 },
        { xOff:  photoW * 0.32, rotZ: -0.28 },
      ].forEach(({ xOff, rotZ }) => {
        const leg = new THREE.Mesh(new THREE.PlaneGeometry(0.032, legH), woodMat);
        leg.rotation.z = rotZ;
        leg.position.set(xOff, -photoH/2 - legH/2 + 0.04, -5.18);
        scene.add(leg);
      });
      const backLeg = new THREE.Mesh(new THREE.PlaneGeometry(0.022, legH * 0.85), woodMat);
      backLeg.position.set(0, -photoH/2 - legH*0.42, -5.22);
      scene.add(backLeg);

      // Janur kuning — left & right frame, with wind sway
      const janurW = 0.50, janurH = 0.68;
      const janurMat = () => new THREE.MeshBasicMaterial({
        map: janurTex, transparent: true, alphaTest: 0.04, side: THREE.FrontSide,
      });

      // Left janur
      const lJGroup = new THREE.Group();
      lJGroup.position.set(-halfVW * 0.50, vh * 0.30, 0.06);
      lJGroup.rotation.z = 0.18;
      scene.add(lJGroup);
      const lJMesh = new THREE.Mesh(new THREE.PlaneGeometry(janurW, janurH), janurMat());
      lJMesh.position.set(0, -janurH * 0.08, 0);
      lJGroup.add(lJMesh);
      janurAnims.push({ group: lJGroup, baseRotZ: 0.18, swayAmp: 0.055, swaySpeed: 0.85, swayPhase: 0 });

      // Right janur (mirrored horizontally)
      const rJGroup = new THREE.Group();
      rJGroup.position.set(halfVW * 0.50, vh * 0.30, 0.06);
      rJGroup.rotation.z = -0.18;
      scene.add(rJGroup);
      const rJMesh = new THREE.Mesh(new THREE.PlaneGeometry(janurW, janurH), janurMat());
      rJMesh.scale.x = -1;
      rJMesh.position.set(0, -janurH * 0.08, 0);
      rJGroup.add(rJMesh);
      janurAnims.push({ group: rJGroup, baseRotZ: -0.18, swayAmp: 0.055, swaySpeed: 0.85, swayPhase: 1.1 });
    });

    // Animation loop
    let elapsed = 0, lastTime = performance.now();
    let rafId: number, completed = false;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      elapsed += dt;

      // Gate open
      const gateT = easeInOutCubic(Math.min(elapsed / GATE_DUR, 1));
      leftGroup.rotation.y  =  gateT * (Math.PI / 2);
      rightGroup.rotation.y = -gateT * (Math.PI / 2);

      // Camera dolly forward
      if (elapsed > DOLLY_START) {
        const dollyT = easeOutCubic(Math.min((elapsed - DOLLY_START) / DOLLY_DUR, 1));
        camera.position.z = CAM_Z_START - (CAM_Z_START - CAM_Z_END) * dollyT;
        camera.lookAt(0, -0.1, -8);
      }

      // Petals
      const fadeOutStart = FADE_START - 0.6;
      petals.forEach((p) => {
        if (elapsed < p.startDelay) return;
        const mat = p.sprite.material as THREE.SpriteMaterial;
        const age = elapsed - p.startDelay;
        if (age < 0.3)                   mat.opacity = age / 0.3;
        else if (elapsed > fadeOutStart) mat.opacity = Math.max(0, 1 - (elapsed - fadeOutStart) / 0.6);
        else                             mat.opacity = 1;
        p.sway += p.swaySpeed * dt;
        p.sprite.position.x += (Math.sin(p.sway) * 0.25 + p.vx) * dt;
        p.sprite.position.y += p.vy * dt;
        p.sprite.material.rotation += (p.vx < 0 ? -1.1 : 1.1) * dt;
        if (p.sprite.position.y < -vh * 0.6) {
          p.sprite.position.y = vh * 0.5 + Math.random() * vh * 0.2;
          p.sprite.position.x = (Math.random()-0.5) * vw * 1.1;
        }
      });

      // Janur wind sway
      janurAnims.forEach((j) => {
        j.group.rotation.z = j.baseRotZ + Math.sin(elapsed * j.swaySpeed + j.swayPhase) * j.swayAmp;
      });

      // Canvas fade out
      if (elapsed > FADE_START) {
        const t = Math.min((elapsed - FADE_START) / FADE_DUR, 1);
        renderer.domElement.style.opacity = String(1 - t);
        if (t >= 1 && !completed) {
          completed = true;
          onCompleteRef.current?.();
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      renderer.dispose();
      [leftTex, rightTex, petalTex, ...loadedTextures].forEach(t => t.dispose());
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, [active]);

  if (!active) return null;
  return <div ref={mountRef} className="fixed inset-0 z-[60]" style={{ pointerEvents: "none" }} />;
}
