import React, { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import type { OrbitControls as OrbitControlsType } from 'three-stdlib';
import { CategoryPlanet, CategoryOrbitConfig } from './CategoryPlanet';
import { ArchiveArtifact } from './ArchiveArtifact';
import { SceneParticles } from './SceneParticles';
import { SceneEnvironment } from './SceneEnvironment';
import { ARCHIVE_ARTIFACTS } from '../data/artifacts';
import { ArtifactData, CategoryType, MomentData } from '../types';

export const CATEGORY_ORBITS: CategoryOrbitConfig[] = [
  {
    id: 'purchases',
    name: 'Purchases',
    slug: 'purchases',
    radius: 2.3,
    angle: 0,
    color: '#f59e0b',
    secondaryColor: '#d97706',
    tagline: 'WHAT PASSED THROUGH YOUR HANDS.',
    atmosphere: 'Receipt fragments, transaction particles and subtle orbiting cards',
    size: 0.28,
    planetType: 'purchases',
  },
  {
    id: 'photos',
    name: 'Photos',
    slug: 'photos',
    radius: 2.8,
    angle: 0.72,
    color: '#06b6d4',
    secondaryColor: '#0284c7',
    tagline: 'MOMENTS WORTH KEEPING.',
    atmosphere: 'Floating photo frames and soft camera-flash particles',
    size: 0.26,
    planetType: 'photos',
  },
  {
    id: 'music',
    name: 'Music',
    slug: 'music',
    radius: 3.3,
    angle: 1.45,
    color: '#d946ef',
    secondaryColor: '#a855f7',
    tagline: 'THE SOUNDS THAT STAYED.',
    atmosphere: 'Subtle audio-wave rings and floating music particles',
    size: 0.32,
    planetType: 'music',
  },
  {
    id: 'notes',
    name: 'Personal Notes',
    slug: 'personal-notes',
    radius: 3.8,
    angle: 2.15,
    color: '#a78bfa',
    secondaryColor: '#8b5cf6',
    tagline: 'THOUGHTS LEFT BEHIND.',
    atmosphere: 'Handwritten-note fragments and drifting paper-like particles',
    size: 0.25,
    planetType: 'notes',
  },
  {
    id: 'places',
    name: 'Places',
    slug: 'places',
    radius: 4.3,
    angle: 2.85,
    color: '#14b8a6',
    secondaryColor: '#0d9488',
    tagline: 'WHERE THE TRACES HAPPENED.',
    atmosphere: 'Coordinate particles, map-like paths and location pulses',
    size: 0.3,
    planetType: 'places',
  },
  {
    id: 'movies',
    name: 'Movies & Entertainment',
    slug: 'movies-entertainment',
    radius: 4.8,
    angle: 3.55,
    color: '#f43f5e',
    secondaryColor: '#e11d48',
    tagline: 'STORIES YOU CHOSE TO ENTER.',
    atmosphere: 'Cinematic light streaks and tiny floating frames',
    size: 0.28,
    planetType: 'movies',
  },
  {
    id: 'messages',
    name: 'Messages',
    slug: 'messages',
    radius: 5.3,
    angle: 4.25,
    color: '#fb7185',
    secondaryColor: '#ec4899',
    tagline: 'WORDS THAT BECAME TRACES.',
    atmosphere: 'Small message bubbles and connected dots',
    size: 0.26,
    planetType: 'messages',
  },
  {
    id: 'searches',
    name: 'Searches',
    slug: 'searches',
    radius: 5.8,
    angle: 4.95,
    color: '#3b82f6',
    secondaryColor: '#2563eb',
    tagline: 'QUESTIONS LEAVE FOOTPRINTS.',
    atmosphere: 'Scanning pulses, search paths and moving particles',
    size: 0.27,
    planetType: 'searches',
  },
  {
    id: 'events',
    name: 'Events',
    slug: 'events',
    radius: 6.3,
    angle: 5.68,
    color: '#f97316',
    secondaryColor: '#ea580c',
    tagline: 'DAYS MARKED BY SOMETHING.',
    atmosphere: 'Date markers, timeline particles and warm pulses',
    size: 0.3,
    planetType: 'events',
  },
];

export type ZoomLevel = 'system' | 'category' | 'trace';

interface SolarSystemSceneProps {
  zoomLevel: ZoomLevel;
  selectedCategory: CategoryType | null;
  selectedArtifact: ArtifactData | null;
  activeMoment: MomentData | null;
  connectedTraceIds: string[];
  onSelectCategory: (category: CategoryType) => void;
  onSelectArtifact: (artifact: ArtifactData) => void;
  onResetToSystem: () => void;
  controlsRef: React.RefObject<OrbitControlsType | null>;
}

// Camera controller handling smooth zoom levels
const SolarCameraController: React.FC<{
  zoomLevel: ZoomLevel;
  selectedCategory: CategoryType | null;
  selectedArtifact: ArtifactData | null;
  activeMoment: MomentData | null;
  controlsRef: React.RefObject<OrbitControlsType | null>;
  isUserInteracting: boolean;
}> = ({
  zoomLevel,
  selectedCategory,
  selectedArtifact,
  controlsRef,
  isUserInteracting,
}) => {
  const { camera } = useThree();
  const targetCamPos = useRef(new THREE.Vector3(0, 6.2, 9.2));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    if (zoomLevel === 'system') {
      targetCamPos.current.set(0, 6.2, 9.2);
      targetLookAt.current.set(0, 0, 0);
    } else if (zoomLevel === 'category' && selectedCategory) {
      const orbit = CATEGORY_ORBITS.find((o) => o.name === selectedCategory);
      if (orbit) {
        const px = Math.cos(orbit.angle) * orbit.radius;
        const pz = Math.sin(orbit.angle) * orbit.radius;
        const py = Math.sin(orbit.angle * 2) * 0.15;
        targetCamPos.current.set(px * 0.72, py + 1.4, pz * 0.72 + 2.4);
        targetLookAt.current.set(px, py, pz);
      }
    } else if (zoomLevel === 'trace' && selectedArtifact) {
      const orbit = CATEGORY_ORBITS.find(
        (o) => o.name === selectedArtifact.category
      );
      if (orbit) {
        const px = Math.cos(orbit.angle) * orbit.radius + 0.45;
        const pz = Math.sin(orbit.angle) * orbit.radius + 0.35;
        const py = Math.sin(orbit.angle * 2) * 0.15 + 0.2;
        targetCamPos.current.set(px * 0.85, py + 0.6, pz + 1.8);
        targetLookAt.current.set(px, py, pz);
      } else {
        targetCamPos.current.set(0, 2.5, 4.5);
        targetLookAt.current.set(0, 0, 0);
      }
    }

    if (!isUserInteracting && controlsRef.current) {
      camera.position.lerp(targetCamPos.current, delta * 3.2);
      controlsRef.current.target.lerp(targetLookAt.current, delta * 3.2);
      controlsRef.current.update();
    }
  });

  return null;
};

// Smooth atmosphere illumination spreading the active category's color into space
const DynamicAtmosphereLight: React.FC<{
  activeColor: string;
  isCategoryActive: boolean;
}> = ({ activeColor, isCategoryActive }) => {
  const lightRef = useRef<THREE.PointLight>(null);
  const targetColor = useMemo(() => new THREE.Color(activeColor), [activeColor]);

  useFrame((_, delta) => {
    if (lightRef.current) {
      lightRef.current.color.lerp(targetColor, delta * 3);
      const targetIntensity = isCategoryActive ? 2.2 : 0.8;
      lightRef.current.intensity = THREE.MathUtils.lerp(
        lightRef.current.intensity,
        targetIntensity,
        delta * 3
      );
    }
  });

  return (
    <pointLight
      ref={lightRef}
      position={[0, 4.0, 0]}
      distance={18}
      decay={2}
      intensity={0.8}
    />
  );
};

// Animated Central Archive Core (The Sun / Living Core)
const ArchiveCentralSun: React.FC<{
  onReset: () => void;
  accentColor: string;
}> = ({ onReset, accentColor }) => {
  const ringsRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const flareColor = useMemo(() => new THREE.Color(accentColor), [accentColor]);

  useFrame((state, delta) => {
    if (ringsRef.current) {
      ringsRef.current.rotation.y += delta * 0.05;
      ringsRef.current.rotation.z -= delta * 0.02;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y -= delta * 0.08;
    }
  });

  return (
    <group position={[0, 0, 0]} onClick={onReset}>
      {/* Radiant Glowing Center Sphere */}
      <mesh ref={coreRef} castShadow>
        <sphereGeometry args={[0.9, 36, 36]} />
        <meshStandardMaterial
          color="#d4af37"
          roughness={0.2}
          metalness={0.8}
          emissive="#d4af37"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Atmospheric Golden Sun Flare */}
      <mesh>
        <sphereGeometry args={[1.15, 24, 24]} />
        <meshBasicMaterial
          color="#d4af37"
          transparent
          opacity={0.25}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Dynamic Aura Ring that subtly picks up the active category's color */}
      <mesh>
        <sphereGeometry args={[1.35, 24, 24]} />
        <meshBasicMaterial
          color={flareColor}
          transparent
          opacity={0.12}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Equatorial Monolith Pedestal */}
      <mesh position={[0, -0.35, 0]}>
        <cylinderGeometry args={[1.2, 1.35, 0.18, 48]} />
        <meshStandardMaterial
          color="#16181f"
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>

      {/* Rotating Sun Meridian Rings */}
      <group ref={ringsRef}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.35, 1.38, 64]} />
          <meshBasicMaterial
            color="#d4af37"
            transparent
            opacity={0.45}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh rotation={[0.4, 0, 0]}>
          <ringGeometry args={[1.5, 1.52, 64]} />
          <meshBasicMaterial
            color={accentColor}
            transparent
            opacity={0.35}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
};

// Spline Arc Line with pulse
const SolarArcLine: React.FC<{
  start: THREE.Vector3;
  end: THREE.Vector3;
  color?: string;
}> = ({ start, end, color = '#d4af37' }) => {
  const pulseRef = useRef<THREE.Mesh>(null);

  const curve = useMemo(() => {
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    mid.y += 0.8;
    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, [start, end]);

  const points = useMemo(() => curve.getPoints(32), [curve]);
  const geometry = useMemo(
    () => new THREE.BufferGeometry().setFromPoints(points),
    [points]
  );

  const lineObject = useMemo(() => {
    const mat = new THREE.LineBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.85,
    });
    return new THREE.Line(geometry, mat);
  }, [geometry, color]);

  useFrame((state) => {
    if (pulseRef.current) {
      const t = (state.clock.getElapsedTime() * 0.5) % 1;
      const pos = curve.getPoint(t);
      pulseRef.current.position.copy(pos);
    }
  });

  return (
    <group>
      <primitive object={lineObject} />
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
};

// Animated 3D Splines connecting related traces in the solar system
const SolarConnectionLines: React.FC<{
  connectedTraceIds: string[];
  activeColor: string;
}> = ({ connectedTraceIds, activeColor }) => {
  const points = useMemo(() => {
    const list: THREE.Vector3[] = [];
    connectedTraceIds.forEach((id) => {
      const art = ARCHIVE_ARTIFACTS.find((a) => a.id === id);
      if (art) {
        const orbit = CATEGORY_ORBITS.find((o) => o.name === art.category);
        if (orbit) {
          const px = Math.cos(orbit.angle) * orbit.radius + 0.45;
          const pz = Math.sin(orbit.angle) * orbit.radius + 0.35;
          const py = Math.sin(orbit.angle * 2) * 0.15 + 0.2;
          list.push(new THREE.Vector3(px, py, pz));
        }
      }
    });
    return list;
  }, [connectedTraceIds]);

  if (points.length < 2) return null;

  return (
    <group>
      {points.map((pt, i) => {
        if (i === points.length - 1) return null;
        const next = points[i + 1];
        return <SolarArcLine key={i} start={pt} end={next} color={activeColor} />;
      })}
    </group>
  );
};

export const SolarSystemScene: React.FC<SolarSystemSceneProps> = ({
  zoomLevel,
  selectedCategory,
  selectedArtifact,
  activeMoment,
  connectedTraceIds,
  onSelectCategory,
  onSelectArtifact,
  onResetToSystem,
  controlsRef,
}) => {
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  // Active Category accent color
  const activeOrbit = useMemo(() => {
    if (selectedCategory) {
      return CATEGORY_ORBITS.find((o) => o.name === selectedCategory);
    }
    if (selectedArtifact) {
      return CATEGORY_ORBITS.find((o) => o.name === selectedArtifact.category);
    }
    return null;
  }, [selectedCategory, selectedArtifact]);

  const activeColor = activeOrbit?.color || '#d4af37';

  // Map each artifact to its planet's orbit coordinate
  const artifactPositions = useMemo(() => {
    return ARCHIVE_ARTIFACTS.map((artifact) => {
      const orbit = CATEGORY_ORBITS.find((o) => o.name === artifact.category);
      if (!orbit) return artifact;
      const px = Math.cos(orbit.angle) * orbit.radius + 0.45;
      const pz = Math.sin(orbit.angle) * orbit.radius + 0.35;
      const py = Math.sin(orbit.angle * 2) * 0.15 + 0.2;
      return {
        ...artifact,
        position: [px, py, pz] as [number, number, number],
      };
    });
  }, []);

  return (
    <div id="solar-system-canvas-container" className="w-full h-full relative">
      <Canvas
        shadows
        camera={{ position: [0, 6.2, 9.2], fov: 42, near: 0.1, far: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <SolarCameraController
          zoomLevel={zoomLevel}
          selectedCategory={selectedCategory}
          selectedArtifact={selectedArtifact}
          activeMoment={activeMoment}
          controlsRef={controlsRef}
          isUserInteracting={isUserInteracting}
        />

        <SceneEnvironment />
        <SceneParticles />

        {/* Dynamic smooth lighting spreading category accent into atmosphere */}
        <DynamicAtmosphereLight
          activeColor={activeColor}
          isCategoryActive={zoomLevel !== 'system'}
        />

        <group position={[0, 0, 0]}>
          {/* 1. Central Archive Sun / Core */}
          <ArchiveCentralSun
            onReset={onResetToSystem}
            accentColor={activeColor}
          />

          {/* 2. Concentric Orbital Rings */}
          {CATEGORY_ORBITS.map((orbit) => {
            const isCategoryActive =
              zoomLevel === 'category' && selectedCategory === orbit.name;
            const isDimmed =
              zoomLevel === 'category' && selectedCategory !== orbit.name;

            return (
              <group key={`ring-${orbit.id}`} position={[0, 0, 0]}>
                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                  <ringGeometry
                    args={[orbit.radius - 0.012, orbit.radius + 0.012, 96]}
                  />
                  <meshBasicMaterial
                    color={orbit.color}
                    transparent
                    opacity={isDimmed ? 0.05 : isCategoryActive ? 0.65 : 0.22}
                    side={THREE.DoubleSide}
                  />
                </mesh>
              </group>
            );
          })}

          {/* 3. The 9 Category Planets */}
          {CATEGORY_ORBITS.map((orbit) => {
            const isSelected = selectedCategory === orbit.name;
            const isDimmed =
              (zoomLevel === 'category' && selectedCategory !== orbit.name) ||
              (zoomLevel === 'trace' &&
                selectedArtifact?.category !== orbit.name);

            return (
              <CategoryPlanet
                key={orbit.id}
                config={orbit}
                isSelected={isSelected}
                isDimmed={isDimmed}
                onSelect={(cat) => onSelectCategory(cat)}
              />
            );
          })}

          {/* 4. Physical 3D Artifacts Floating in Proximity */}
          {artifactPositions.map((artifact) => {
            const isSelected = selectedArtifact?.id === artifact.id;
            const isCategorySelected =
              selectedCategory === artifact.category ||
              selectedArtifact?.category === artifact.category;
            const isConnected = connectedTraceIds.includes(artifact.id);
            const isHighlighted = isSelected || isConnected;
            const isDimmed =
              zoomLevel === 'category'
                ? !isCategorySelected
                : zoomLevel === 'trace'
                ? !isHighlighted
                : false;

            return (
              <Float
                key={artifact.id}
                speed={1.5}
                rotationIntensity={0.2}
                floatIntensity={0.2}
              >
                <ArchiveArtifact
                  data={artifact}
                  isSelected={isSelected}
                  onSelect={onSelectArtifact}
                  isHighlighted={isHighlighted}
                  isDimmed={isDimmed}
                />
              </Float>
            );
          })}

          {/* 5. Animated Connection Lines with Dynamic Category Color */}
          <SolarConnectionLines
            connectedTraceIds={connectedTraceIds}
            activeColor={activeColor}
          />
        </group>

        {/* Orbit Controls with Responsive Touch & Zoom Constraints */}
        <OrbitControls
          ref={controlsRef}
          makeDefault
          enableDamping
          dampingFactor={0.06}
          minDistance={2.2}
          maxDistance={14.0}
          minPolarAngle={Math.PI / 8}
          maxPolarAngle={Math.PI / 2 + 0.05}
          onStart={() => setIsUserInteracting(true)}
          onEnd={() => setIsUserInteracting(false)}
        />
      </Canvas>
    </div>
  );
};
