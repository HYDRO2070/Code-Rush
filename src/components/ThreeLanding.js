import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";

const ThreeLanding = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const lightRef = useRef();
  const shadowRef = useRef();

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouse({
        x: (event.clientX / window.innerWidth) * 2 - 1, // Normalize to -1 to 1
        y: -(event.clientY / window.innerHeight) * 2 + 1, // Normalize to -1 to 1
      });
    };

    // Add mouse move event listener
    window.addEventListener("mousemove", handleMouseMove);

    // Clean up event listener
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Update light position based on mouse
  useEffect(() => {
    if (lightRef.current) {
      lightRef.current.position.x = mouse.x * 5; // Light moves along X axis
      lightRef.current.position.y = mouse.y * 5; // Light moves along Y axis
    }
  }, [mouse]);

  return (
    <Canvas
      style={{
        // width: "100vw",
        // height: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -2,
      }}
      gl={{ antialias: true }}
      shadows
    >
      {/* Ambient Light to light up the scene */}
      <ambientLight intensity={0.1} />

      {/* Directional Light that will move based on mouse position */}
      <directionalLight
        ref={lightRef}
        intensity={1}
        position={[0, 0, 5]}
        castShadow
      />

      {/* Background Color for the Scene */}
      <color attach="background" args={["black"]} /> {/* Soft light background */}

      {/* 3D Object: Torus Knot */}
      <Sphere args={[1, 64, 64]} position={[0, 0, 0]} castShadow>
        <meshStandardMaterial

          metalness={0.1}
          roughness={0.8}
        />
      </Sphere>

      {/* Plane to receive shadows */}
      <mesh position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <shadowMaterial opacity={0.5} color={"white"} />
      </mesh>

      {/* OrbitControls to enable rotation of the scene */}
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default ThreeLanding;
