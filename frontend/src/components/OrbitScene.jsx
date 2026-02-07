import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Trail, Text } from '@react-three/drei';
import * as THREE from 'three';

// Mock Data
const ASTEROID_DATA = [
    { id: 1, name: '99942 Apophis', distance: 3.5, size: 0.3, speed: 0.4, color: '#ff9e00', hazard: true },
    { id: 2, name: '101955 Bennu', distance: 4.8, size: 0.4, speed: 0.3, color: '#00f3ff', hazard: true },
    { id: 3, name: 'Didymos', distance: 6.2, size: 0.5, speed: 0.2, color: '#bc13fe', hazard: false },
    { id: 4, name: '433 Eros', distance: 7.5, size: 0.6, speed: 0.15, color: '#aaaaaa', hazard: false },
    { id: 5, name: '2024 MK', distance: 2.2, size: 0.15, speed: 0.8, color: '#ff2a2a', hazard: true },
];

const Earth = () => {
    return (
        <group>
            {/* Core */}
            <mesh>
                <sphereGeometry args={[1, 64, 64]} />
                <meshStandardMaterial
                    color="#1e40af"
                    emissive="#1e3a8a"
                    emissiveIntensity={0.5}
                    roughness={0.4}
                    metalness={0.6}
                />
            </mesh>
            {/* Atmosphere Glow */}
            <mesh scale={[1.2, 1.2, 1.2]}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshBasicMaterial color="#3b82f6" transparent opacity={0.15} side={THREE.BackSide} />
            </mesh>
        </group>
    );
};

const Asteroid = ({ data, onSelect }) => {
    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);

    // Random start angle
    const angleOffset = useMemo(() => Math.random() * Math.PI * 2, []);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime() * data.speed + angleOffset;
        meshRef.current.position.x = Math.cos(t) * data.distance;
        meshRef.current.position.z = Math.sin(t) * data.distance;

        // Self rotation
        meshRef.current.rotation.x += 0.01;
        meshRef.current.rotation.y += 0.02;
    });

    return (
        <group>
            {/* Orbital Path */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[data.distance - 0.03, data.distance + 0.03, 128]} />
                <meshBasicMaterial color={data.color} opacity={0.15} transparent side={THREE.DoubleSide} />
            </mesh>

            {/* The Asteroid */}
            <Trail
                width={1.5}
                length={6}
                color={data.color}
                attenuation={(t) => t * t}
            >
                <mesh
                    ref={meshRef}
                    onClick={(e) => { e.stopPropagation(); onSelect(data); }}
                    onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
                    onPointerOut={(e) => { setHovered(false); document.body.style.cursor = 'auto'; }}
                >
                    <dodecahedronGeometry args={[data.size, 0]} />
                    <meshStandardMaterial
                        color={hovered ? '#ffffff' : data.color}
                        emissive={data.hazard ? '#ff0000' : data.color}
                        emissiveIntensity={data.hazard ? 0.8 : 0.4}
                        roughness={0.7}
                    />
                    {hovered && (
                        <Html distanceFactor={15}>
                            <div className="bg-black/80 text-white text-xs px-2 py-1 rounded border border-white/20 whitespace-nowrap backdrop-blur-md">
                                {data.name}
                            </div>
                        </Html>
                    )}
                </mesh>
            </Trail>
        </group>
    );
};

const OrbitScene = () => {
    const [selectedAsteroid, setSelectedAsteroid] = useState(null);

    return (
        <div className="w-full h-screen relative bg-space-950 overflow-hidden">
            {/* Header Overlay */}
            <div className="absolute top-8 left-8 z-10 pointer-events-none select-none">
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white drop-shadow-2xl">
                    ORBITAL <span className="text-cosmic-cyan">VIEWER</span>
                </h2>
                <div className="flex items-center gap-2 mt-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <p className="text-cosmic-cyan font-mono text-sm tracking-widest bg-cosmic-cyan/10 px-2 py-1 rounded">
                        LIVE SIMULATION
                    </p>
                </div>
            </div>

            <Canvas camera={{ position: [0, 8, 12], fov: 50 }}>
                <fog attach="fog" args={['#070a13', 10, 50]} />
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={2} color="#ffd700" /> {/* Sun-like light */}
                <Stars radius={150} depth={60} count={3000} factor={4} saturation={1} fade speed={1} />

                <Earth />

                {ASTEROID_DATA.map((asteroid) => (
                    <Asteroid
                        key={asteroid.id}
                        data={asteroid}
                        onSelect={setSelectedAsteroid}
                    />
                ))}

                <OrbitControls
                    enablePan={false}
                    minDistance={5}
                    maxDistance={25}
                    dampingFactor={0.05}
                    enableDamping
                    autoRotate
                    autoRotateSpeed={0.5}
                />
            </Canvas>

            {/* Detail Panel */}
            {selectedAsteroid && (
                <div className="absolute bottom-10 right-10 z-20 w-80 md:w-96">
                    <div className="glass-panel p-6 rounded-2xl border border-white/20 animate-in slide-in-from-bottom-10 fade-in duration-300">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-2xl font-display font-bold text-white">{selectedAsteroid.name}</h3>
                                <p className="text-xs text-gray-400 font-mono">ID: NEO-{selectedAsteroid.id}84X</p>
                            </div>
                            <button
                                onClick={() => setSelectedAsteroid(null)}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                            >
                                &times;
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-black/40 p-3 rounded-lg flex items-center gap-3 border border-white/5">
                                <div className={`w-1 h-10 rounded-full ${selectedAsteroid.hazard ? 'bg-red-500 shadow-[0_0_10px_red]' : 'bg-green-500 shadow-[0_0_10px_green]'}`} />
                                <div>
                                    <div className="text-xs text-gray-400 font-mono mb-1">THREAT LEVEL</div>
                                    <div className={`font-bold ${selectedAsteroid.hazard ? 'text-red-400' : 'text-green-400'}`}>
                                        {selectedAsteroid.hazard ? 'POTENTIALLY HAZARDOUS' : 'NO HAZARD DETECTED'}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 font-mono text-sm">
                                <div className="bg-white/5 p-3 rounded flex flex-col items-center border border-white/5">
                                    <span className="text-gray-500 text-[10px] mb-1">DIAMETER</span>
                                    <span className="text-white font-bold">{(selectedAsteroid.size * 2.5).toFixed(2)} km</span>
                                </div>
                                <div className="bg-white/5 p-3 rounded flex flex-col items-center border border-white/5">
                                    <span className="text-gray-500 text-[10px] mb-1">VELOCITY</span>
                                    <span className="text-white font-bold">{(selectedAsteroid.speed * 80).toFixed(1)} km/s</span>
                                </div>
                            </div>

                            <button className="w-full py-2 bg-cosmic-cyan/20 hover:bg-cosmic-cyan/30 text-cosmic-cyan border border-cosmic-cyan/50 rounded font-bold transition-all text-xs uppercase tracking-widest mt-2">
                                Start Trajectory Analysis
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Instructions */}
            {!selectedAsteroid && (
                <div className="absolute bottom-10 inset-x-0 flex justify-center pointer-events-none">
                    <div className="bg-black/50 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 flex items-center gap-3">
                        <div className="flex gap-1">
                            <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                            <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                            <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                        </div>
                        <span className="text-white/60 text-xs font-mono uppercase tracking-widest">
                            Drag to Rotate • Click Asteroids to Scan
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrbitScene;
