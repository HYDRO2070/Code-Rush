import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const updateCursorPosition = (e) => {
      if (cursorRef.current) {
        const { clientX: x, clientY: y } = e;
        cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    const addHoverEffect = () => {
      if (cursorRef.current) {
        cursorRef.current.style.backgroundColor = "rgba(255, 0, 0, 0.3)";
        cursorRef.current.style.boxShadow = "0 0 30px rgba(255, 0, 0, 0.6)";
      }
    };

    const removeHoverEffect = () => {
      if (cursorRef.current) {
        cursorRef.current.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
        cursorRef.current.style.boxShadow = "0 0 15px rgba(0, 0, 0, 0.2)";
      }
    };

    document.addEventListener("mousemove", updateCursorPosition);
    document.querySelectorAll("a, button").forEach((element) => {
      element.addEventListener("mouseenter", addHoverEffect);
      element.addEventListener("mouseleave", removeHoverEffect);
    });

    return () => {
      document.removeEventListener("mousemove", updateCursorPosition);
      document.querySelectorAll("a, button").forEach((element) => {
        element.removeEventListener("mouseenter", addHoverEffect);
        element.removeEventListener("mouseleave", removeHoverEffect);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
        zIndex: 1000,
        transition: "all 0.15s ease",
      }}
    />
  );
};

export default CustomCursor;
