import { useEffect, useState } from 'react';

export function useMouseTilt(maxTilt = 15) {
  const [tiltStyle, setTiltStyle] = useState({});

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;

      // Calculate rotation to keep the face of the element towards the mouse
      setTiltStyle({
        transform: `perspective(1000px) rotateX(${y * maxTilt}deg) rotateY(${-x * maxTilt}deg)`,
        transition: 'transform 0.1s',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [maxTilt]);

  return tiltStyle;
}
