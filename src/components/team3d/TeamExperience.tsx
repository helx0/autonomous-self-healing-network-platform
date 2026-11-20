import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, useTexture, Line } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { teamMembers, projectIdentity } from '../../data/team';
import { Maximize, Minimize, Play, Pause, SkipForward, SkipBack, RotateCcw, FastForward, Square } from 'lucide-react';

type Phase = 'idle' | 'opening' | 'member' | 'final' | 'ended';

interface Director {
  start: () => void;
  next: () => void;
  prev: () => void;
  pause: () => void;
  resume: () => void;
  replay: () => void;
  skip: () => void;
}

const platformX = [-4.8, -1.6, 1.6, 4.8];
const CAM = { x: 0, y: 2.2, z: 14 };
const LOOK = { x: 0, y: 1.2, z: 0 };

function Particles({ count = 220, getOpacity }: { count?: number; getOpacity: () => number }) {
  const ref = useRef<THREE.Points>(null!);
  const mat = useRef<THREE.PointsMaterial>(null!);
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      a[i * 3] = (Math.random() - 0.5) * 30;
      a[i * 3 + 1] = Math.random() * 12;
      a[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return a;
  }, [count]);
  useFrame((_, dt) => {
    if (!ref.current) return;
    if (mat.current) mat.current.opacity = getOpacity();
    ref.current.rotation.y += dt * 0.02;
    const pos = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      let y = pos.getY(i) + dt * 0.15;
      if (y > 12) y = 0;
      pos.setY(i, y);
    }
    pos.needsUpdate = true;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial ref={mat} color="#22d3ee" size={0.06} transparent opacity={0} sizeAttenuation />
    </points>
  );
}

function Connections({ getNetOpacity }: { getNetOpacity: () => number }) {
  const lines = useMemo(() => {
    const arr: [number, number, number][][] = [];
    const nodes: [number, number, number][] = platformX.map(x => [x, 0.3, 0]);
    for (let i = 0; i < 10; i++) nodes.push([(Math.random() - 0.5) * 16, 1 + Math.random() * 6, -2 + (Math.random() - 0.5) * 6]);
    for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
      if (Math.random() < 0.18 || (i < 4 && j < 4 && Math.abs(i-j)===1)) arr.push([nodes[i], nodes[j]]);
    }
    return arr;
  }, []);
  const refs = useRef<any[]>([]);
  useFrame(() => {
    const o = getNetOpacity();
    refs.current.forEach(m => { if (m) m.opacity = o; });
  });
  return <group>{lines.map((p, i) => <Line key={i} points={p as any} color="#22d3ee" lineWidth={1} transparent opacity={0} ref={(el: any) => { if (el?.material) refs.current[i] = el.material; }} />)}</group>;
}

function Portrait({ url }: { url: string }) {
  const tex = useTexture(url);
  tex.colorSpace = THREE.SRGBColorSpace;
  return (
    <mesh position={[0, 0, 0.06]}>
      <planeGeometry args={[1.25, 1.65]} />
      <meshBasicMaterial map={tex} transparent toneMapped={false} />
    </mesh>
  );
}

function MemberPlatform({ index, name, portrait, stateRef }: { index: number; name: string; portrait: string; stateRef: React.MutableRefObject<any> }) {
  const group = useRef<THREE.Group>(null!);
  const ring = useRef<THREE.Mesh>(null!);
  const beam = useRef<THREE.Mesh>(null!);
  const beamMat = useRef<THREE.MeshBasicMaterial>(null!);
  const portraitGroup = useRef<THREE.Group>(null!);
  const nameRef = useRef<any>(null);
  const frame = useRef<THREE.Group>(null!);
  const platMat = useRef<THREE.MeshStandardMaterial>(null!);
  const spot = useRef<THREE.SpotLight>(null!);

  useFrame((_, dt) => {
    const s = stateRef.current.members[index];
    if (ring.current) ring.current.rotation.y += dt * 0.4;
    if (frame.current) frame.current.rotation.y += dt * 0.25;
    if (platMat.current) platMat.current.emissiveIntensity = s.glow;
    if (beamMat.current) { beamMat.current.opacity = s.beam; }
    if (beam.current) beam.current.visible = s.beam > 0.01;
    if (portraitGroup.current) {
      portraitGroup.current.visible = s.portrait > 0.01;
      portraitGroup.current.position.y = 1.55 + (1 - s.portrait) * 0.4;
      portraitGroup.current.scale.setScalar(0.7 + 0.3 * s.portrait);
      (portraitGroup.current.children.forEach?.(() => {}));
    }
    if (nameRef.current) {
      nameRef.current.fillOpacity = s.name;
      nameRef.current.outlineOpacity = s.name;
      nameRef.current.visible = s.name > 0.01;
    }
    if (frame.current) {
      frame.current.visible = s.frame > 0.01;
      frame.current.scale.setScalar(0.8 + 0.2 * s.frame);
      frame.current.traverse((o: any) => { if (o.material && 'opacity' in o.material) { o.material.transparent = true; o.material.opacity = s.frame; } });
    }
    if (spot.current) spot.current.intensity = s.spot;
  });

  return (
    <group ref={group} position={[platformX[index], 0, 0]}>
      {/* platform base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[1.05, 64]} />
        <meshStandardMaterial ref={platMat} color="#081226" emissive="#22d3ee" emissiveIntensity={0.2} metalness={0.6} roughness={0.25} />
      </mesh>
      <mesh ref={ring} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <torusGeometry args={[1.08, 0.04, 16, 100]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={1.2} toneMapped={false} />
      </mesh>
      {/* beam */}
      <mesh ref={beam} position={[0, 3.2, 0]} visible={false}>
        <cylinderGeometry args={[0.25, 0.9, 6.2, 32, 1, true]} />
        <meshBasicMaterial ref={beamMat} color="#22d3ee" transparent opacity={0} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      <spotLight ref={spot} position={[0, 5, 1]} angle={0.35} penumbra={0.6} intensity={0} color="#67e8f9" castShadow />
      {/* portrait */}
      <group ref={portraitGroup} position={[0, 1.55, 0]} visible={false}>
        <Suspense fallback={null}><Portrait url={portrait} /></Suspense>
        <mesh position={[0, 0, 0.02]}>
          <planeGeometry args={[1.32, 1.72]} />
          <meshBasicMaterial color="#0ea5e9" transparent opacity={0.12} blending={THREE.AdditiveBlending} />
        </mesh>
      </group>
      {/* holographic frame */}
      <group ref={frame} position={[0, 1.55, 0.12]} visible={false}>
        <mesh>
          <torusGeometry args={[1.05, 0.015, 12, 80]} />
          <meshStandardMaterial color="#67e8f9" emissive="#67e8f9" emissiveIntensity={2} toneMapped={false} transparent opacity={0} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <torusGeometry args={[1.12, 0.01, 12, 4]} />
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={1.5} toneMapped={false} transparent opacity={0} />
        </mesh>
      </group>
      {/* name */}
      <Text ref={nameRef} position={[0, 0.55, 0.9]} fontSize={0.22} color="#e0f2fe" anchorX="center" anchorY="middle" outlineWidth={0.012} outlineColor="#0891b2" fillOpacity={0} outlineOpacity={0} visible={false}>
        {name}
      </Text>
    </group>
  );
}

function Scene({ directorRef, stateRef, getNetOpacity }: { directorRef: React.MutableRefObject<Director | null>; stateRef: React.MutableRefObject<any>; getNetOpacity: () => number }) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(...(Object.values(LOOK) as [number,number,number])));
  const envRef = useRef<THREE.Group>(null!);
  const titleRef = useRef<any>(null);
  const stmtRef = useRef<any>(null);
  const fadeRef = useRef<THREE.Mesh>(null!);
  const fadeMat = useRef<THREE.MeshBasicMaterial>(null!);
  const currentTl = useRef<gsap.core.Timeline | null>(null);

  useFrame(() => {
    camera.lookAt(target.current);
    if (envRef.current) envRef.current.visible = stateRef.current.envVisible;
    if (titleRef.current) { titleRef.current.fillOpacity = stateRef.current.title; titleRef.current.visible = stateRef.current.title > 0.01; }
    if (stmtRef.current) { stmtRef.current.fillOpacity = stateRef.current.statement; stmtRef.current.visible = stateRef.current.statement > 0.01; }
    if (fadeMat.current) { fadeMat.current.opacity = stateRef.current.fade; if (fadeRef.current) fadeRef.current.visible = stateRef.current.fade > 0.001; }
  });

  const killCurrent = () => { if (currentTl.current) { currentTl.current.kill(); currentTl.current = null; } };

  const resetState = () => {
    const s = stateRef.current;
    s.net = 0; s.envVisible = false; s.structures = 0; s.title = 0; s.statement = 0; s.fade = 0;
    s.members.forEach((m: any) => { m.glow = 0.15; m.beam = 0; m.portrait = 0; m.name = 0; m.frame = 0; m.spot = 0; });
    camera.position.set(CAM.x, CAM.y, CAM.z);
    target.current.set(LOOK.x, LOOK.y, LOOK.z);
  };

  const buildMemberTl = (i: number, onComplete?: () => void) => {
    const m = stateRef.current.members[i];
    const px = platformX[i];
    const tl = gsap.timeline({ onComplete });
    tl.to(camera.position, { x: px * 0.55, y: 2.1, z: 5.2, duration: 1.6, ease: 'power2.inOut' }, 0);
    tl.to(target.current, { x: px, y: 1.4, z: 0, duration: 1.6, ease: 'power2.inOut' }, 0);
    tl.to(m, { beam: 0.55, glow: 2.2, spot: 18, duration: 0.8, ease: 'power2.out' }, 0.8);
    tl.to(m, { portrait: 1, duration: 1.0, ease: 'power2.out' }, 1.2);
    tl.to(m, { frame: 1, duration: 0.8, ease: 'power2.out' }, 1.6);
    tl.to(m, { name: 1, duration: 0.8, ease: 'power2.out' }, 1.9);
    tl.to(camera.position, { x: px * 0.55 + 1.2, z: 5.6, duration: 2.2, ease: 'sine.inOut' }, 2.4);
    tl.to(camera.position, { x: px * 0.55 - 0.6, z: 5.0, duration: 2.0, ease: 'sine.inOut' }, 4.6);
    tl.to({}, { duration: 1.4 }, 6.6);
    return tl;
  };

  const buildFinalTl = (onComplete?: () => void) => {
    const s = stateRef.current;
    const tl = gsap.timeline({ onComplete });
    s.members.forEach((m: any) => { m.beam = 0.35; m.glow = 1.4; m.spot = 10; m.portrait = 1; m.name = 1; m.frame = 0.8; });
    tl.to(camera.position, { x: 0, y: 3.2, z: 11.5, duration: 2.0, ease: 'power2.inOut' }, 0);
    tl.to(target.current, { x: 0, y: 1.3, z: 0, duration: 2.0, ease: 'power2.inOut' }, 0);
    tl.to(s.members.map((m: any) => m), { glow: 2.8, beam: 0.7, duration: 0.6, yoyo: true, repeat: 3, stagger: 0 }, 1.2);
    tl.to(s, { title: 1, duration: 1.0 }, 2.0);
    tl.to(camera.position, { x: 0, y: 4.0, z: 14.5, duration: 2.2, ease: 'power2.inOut' }, 3.2);
    tl.to(target.current, { y: 1.6, duration: 2.2, ease: 'power2.inOut' }, 3.2);
    tl.to(s, { statement: 1, duration: 1.2 }, 4.2);
    tl.to({}, { duration: 2.5 }, 5.4);
    tl.to(s, { fade: 1, duration: 1.6, ease: 'power1.inOut' }, 7.5);
    return tl;
  };

  const buildOpeningThen = (after: () => void) => {
    const s = stateRef.current;
    const tl = gsap.timeline({ onComplete: after });
    s.envVisible = true;
    // 1. particles, 2. network connections, 3. environment/structures, 4. camera
    tl.to(s, { net: 0.5, duration: 1.4, ease: 'power1.inOut' }, 0.2); // particles + connections fade
    tl.to(s, { structures: 1, net: 0.85, duration: 1.2, ease: 'power1.inOut' }, 1.2);
    tl.to(camera.position, { x: 0, y: 2.6, z: 12, duration: 2.2, ease: 'power2.inOut' }, 1.6);
    tl.to(target.current, { x: 0, y: 1.1, z: 0, duration: 2.2, ease: 'power2.inOut' }, 1.6);
    tl.to(s.members.map((m: any) => m), { glow: 0.9, duration: 1.2, stagger: 0.1 }, 2.2);
    return tl;
  };

  const playMember = (i: number) => {
    killCurrent();
    stateRef.current.phase = 'member';
    stateRef.current.memberIndex = i;
    // dim others a bit
    stateRef.current.members.forEach((m: any, idx: number) => { if (idx !== i) { gsap.to(m, { glow: 0.3, beam: 0, portrait: 0.0, name: 0.0, frame: 0, spot: 0, duration: 0.5 }); } });
    currentTl.current = buildMemberTl(i, () => {
      if (i < 3) playMember(i + 1);
      else playFinal();
    });
    stateRef.current.playing = true;
  };

  const playFinal = () => {
    killCurrent();
    stateRef.current.phase = 'final';
    // ensure all visible
    stateRef.current.members.forEach((m: any) => { gsap.to(m, { glow: 1.2, beam: 0.3, portrait: 1, name: 1, frame: 0.7, spot: 8, duration: 0.8 }); });
    currentTl.current = buildFinalTl(() => { stateRef.current.phase = 'ended'; stateRef.current.playing = false; });
    stateRef.current.playing = true;
  };

  useEffect(() => {
    directorRef.current = {
      start: () => {
        killCurrent(); resetState();
        stateRef.current.phase = 'opening'; stateRef.current.playing = true;
        currentTl.current = buildOpeningThen(() => playMember(0));
      },
      next: () => {
        if (stateRef.current.phase === 'member') {
          const n = Math.min(3, stateRef.current.memberIndex + 1);
          if (stateRef.current.memberIndex < 3) playMember(n); else playFinal();
        } else if (stateRef.current.phase === 'opening') { playMember(0); }
      },
      prev: () => {
        if (stateRef.current.phase === 'member') playMember(Math.max(0, stateRef.current.memberIndex - 1));
        else if (stateRef.current.phase === 'final' || stateRef.current.phase === 'ended') playMember(3);
      },
      pause: () => { if (currentTl.current) currentTl.current.pause(); stateRef.current.playing = false; },
      resume: () => { if (currentTl.current) { currentTl.current.resume(); stateRef.current.playing = true; } else if (stateRef.current.phase === 'ended') { /* no-op */ } },
      replay: () => { directorRef.current?.start(); },
      skip: () => { killCurrent(); resetState(); stateRef.current.envVisible = true; stateRef.current.net = 0.8; stateRef.current.phase = 'final'; playFinal(); },
    };
    return () => { directorRef.current = null; killCurrent(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <color attach="background" args={['#020617']} />
      <fog attach="fog" args={['#020617', 8, 28]} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} color="#93c5fd" castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <pointLight position={[0, 6, 4]} intensity={20} color="#22d3ee" distance={25} />
      <pointLight position={[-8, 4, 2]} intensity={12} color="#38bdf8" distance={20} />
      <pointLight position={[8, 4, 2]} intensity={12} color="#a78bfa" distance={20} />

      <group ref={envRef} visible={false}>
        {/* floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
          <planeGeometry args={[60, 40]} />
          <meshStandardMaterial color="#030712" metalness={0.85} roughness={0.25} />
        </mesh>
        {/* grid glow */}
        <gridHelper args={[40, 40, '#0ea5e9', '#082f49']} position={[0, 0.01, 0]} />
        {/* geometric structures */}
        <mesh position={[-9, 2.5, -6]} rotation={[0.4, 0.6, 0]}>
          <icosahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.4} wireframe transparent opacity={0.35} />
        </mesh>
        <mesh position={[9, 3, -5]} rotation={[0.2, 0.4, 0.3]}>
          <octahedronGeometry args={[1.4, 0]} />
          <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={0.35} wireframe transparent opacity={0.3} />
        </mesh>
        <mesh position={[0, 5.5, -8]}>
          <torusGeometry args={[3.5, 0.03, 16, 100]} />
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={1} toneMapped={false} />
        </mesh>
        <Connections getNetOpacity={getNetOpacity} />
        <Particles getOpacity={getNetOpacity} />
        {teamMembers.map((m, i) => (
          <MemberPlatform key={m.name} index={i} name={m.name} portrait={m.portrait} stateRef={stateRef} />
        ))}
        {/* title & statement */}
        <Text ref={titleRef} position={[0, 3.5, -1]} fontSize={0.38} color="#67e8f9" anchorX="center" anchorY="middle" maxWidth={12} textAlign="center" fillOpacity={0} visible={false} outlineWidth={0.01} outlineColor="#0e7490">
          {projectIdentity.projectName}
        </Text>
        <Text ref={stmtRef} position={[0, 0.15, 2.5]} fontSize={0.3} color="#e0f2fe" anchorX="center" anchorY="middle" maxWidth={11} textAlign="center" fillOpacity={0} visible={false}>
          {projectIdentity.finalStatement}
        </Text>
      </group>

      {/* fade plane */}
      <mesh ref={fadeRef} position={[0, 2, 8]} visible={false}>
        <planeGeometry args={[30, 20]} />
        <meshBasicMaterial ref={fadeMat} color="#000000" transparent opacity={0} depthTest={false} />
      </mesh>
    </>
  );
}

export default function TeamExperience() {
  const containerRef = useRef<HTMLDivElement>(null!);
  const directorRef = useRef<Director | null>(null);
  const [isFs, setIsFs] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [phase, setPhase] = useState<Phase>('idle');
  const [memberIndex, setMemberIndex] = useState(0);
  const stateRef = useRef<any>({
    phase: 'idle', playing: false, memberIndex: 0,
    net: 0, envVisible: false, structures: 0, title: 0, statement: 0, fade: 0,
    members: teamMembers.map(() => ({ glow: 0.15, beam: 0, portrait: 0, name: 0, frame: 0, spot: 0 })),
  });
  const getNetOpacity = useCallback(() => stateRef.current.net, []);

  // sync a bit of state for UI (polling lightweight)
  useEffect(() => {
    const id = setInterval(() => {
      setPhase(stateRef.current.phase);
      setMemberIndex(stateRef.current.memberIndex);
      setPlaying(stateRef.current.playing);
    }, 200);
    return () => clearInterval(id);
  }, []);

  const toggleFs = async () => {
    if (!document.fullscreenElement) { await containerRef.current?.requestFullscreen?.(); setIsFs(true); }
    else { await document.exitFullscreen?.(); setIsFs(false); }
  };
  useEffect(() => {
    const onFs = () => setIsFs(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFs);
    return () => document.removeEventListener('fullscreenchange', onFs);
  }, []);

  const start = () => directorRef.current?.start();
  const next = () => directorRef.current?.next();
  const prev = () => directorRef.current?.prev();
  const pauseResume = () => { if (playing) directorRef.current?.pause(); else directorRef.current?.resume(); };
  const replay = () => directorRef.current?.replay();
  const skip = () => directorRef.current?.skip();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') directorRef.current?.next();
      else if (e.key === 'ArrowLeft') directorRef.current?.prev();
      else if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        if (stateRef.current.playing) directorRef.current?.pause();
        else directorRef.current?.resume();
      }
      else if (e.key.toLowerCase() === 'f') toggleFs();
      else if (e.key.toLowerCase() === 'r') directorRef.current?.replay();
      else if (e.key.toLowerCase() === 's') directorRef.current?.skip();
      else if (e.key === 'Enter' && stateRef.current.phase === 'idle') directorRef.current?.start();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const btn = "flex items-center gap-1.5 rounded-lg border border-cyan-500/30 bg-slate-900/70 px-3 py-2 text-xs font-medium text-slate-100 backdrop-blur hover:border-cyan-400/60 hover:bg-slate-800/80 disabled:opacity-40";
  const label = phase === 'member' ? teamMembers[memberIndex]?.name : phase === 'final' ? 'Final Composition' : phase === 'ended' ? 'Complete' : phase === 'opening' ? 'Opening' : 'Ready';

  return (
    <div ref={containerRef} className={`relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-black shadow-2xl shadow-cyan-900/20 ${isFs ? 'h-screen w-screen rounded-none border-0' : 'h-[70vh] min-h-[520px] md:h-[78vh]'}`}>
      <Canvas shadows camera={{ position: [CAM.x, CAM.y, CAM.z], fov: 45 }} gl={{ antialias: true }} dpr={[1, 1.75]}>
        <Suspense fallback={null}>
          <Scene directorRef={directorRef} stateRef={stateRef} getNetOpacity={getNetOpacity} />
        </Suspense>
      </Canvas>

      {/* overlay top info */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 p-4 md:p-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-block rounded-full border border-cyan-500/30 bg-slate-950/50 px-4 py-1 text-[11px] uppercase tracking-widest text-cyan-300 backdrop-blur">{projectIdentity.department} — {projectIdentity.university}</div>
          <div className="mt-2 text-sm text-slate-300 md:text-base">{projectIdentity.projectName}</div>
          <div className="mt-1 text-xs text-cyan-400/90">{label} {phase==='member' ? `(${memberIndex+1}/4)` : ''}</div>
        </div>
      </div>

      {/* dark idle overlay */}
      {phase === 'idle' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/95">
          <div className="mb-2 text-xs uppercase tracking-[0.3em] text-cyan-400/80">Cinematic 3D Introduction</div>
          <h3 className="mb-8 text-center text-2xl font-bold text-white md:text-4xl">{projectIdentity.projectName}</h3>
          <button onClick={start} className="pointer-events-auto flex items-center gap-2 rounded-xl bg-cyan-500 px-8 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 hover:bg-cyan-400"><Play size={18}/> START INTRODUCTION</button>
          <div className="mt-6 grid grid-cols-4 gap-3">
            {teamMembers.map((member) => (
              <div key={member.name} className="w-[72px] text-center md:w-[84px]">
                <img src={member.portrait} alt={member.name} className="h-[96px] w-full rounded-lg border border-cyan-500/30 object-cover object-top shadow-lg shadow-cyan-950/40 md:h-[112px]" />
                <div className="mt-1 truncate text-[10px] text-slate-300">{member.name}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-500">Portraits are placeholders and easily replaceable in <code className="text-cyan-400/80">public/team/</code></p>
        </div>
      )}

      {/* controls */}
      <div className="pointer-events-auto absolute bottom-0 left-0 right-0 p-3 md:p-4">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-2 rounded-2xl border border-slate-700/50 bg-slate-950/60 p-2 backdrop-blur-md">
          <button className={btn} onClick={start} disabled={phase !== 'idle' && phase !== 'ended'}><Play size={14}/> START INTRODUCTION</button>
          <button className={btn} onClick={prev} disabled={phase==='idle' || phase==='opening'}><SkipBack size={14}/> PREVIOUS MEMBER</button>
          <button className={btn} onClick={pauseResume} disabled={phase==='idle'}>{playing ? <><Pause size={14}/> PAUSE</> : <><Play size={14}/> RESUME</>}</button>
          <button className={btn} onClick={next} disabled={phase==='idle' || phase==='ended'}><SkipForward size={14}/> NEXT MEMBER</button>
          <button className={btn} onClick={replay}><RotateCcw size={14}/> REPLAY</button>
          <button className={btn} onClick={skip}><FastForward size={14}/> SKIP INTRO</button>
          <button className={btn} onClick={toggleFs}>{isFs ? <><Minimize size={14}/> EXIT</> : <><Maximize size={14}/> FULLSCREEN</>}</button>
        </div>
        <div className="mt-2 text-center text-[10px] text-slate-500">Keyboard: ←/→ members · Space pause/resume · R replay · S skip · F fullscreen · Enter start</div>
      </div>
    </div>
  );
}
