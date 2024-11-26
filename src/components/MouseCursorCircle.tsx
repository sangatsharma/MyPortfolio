import { useEffect, useState } from "react";

const MouseCursorCircle = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handlePointerEnter = () => setIsPointer(true);
    const handlePointerLeave = () => setIsPointer(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.querySelectorAll("button, a, [role='button']").forEach((el) => {
      el.addEventListener("mouseover", handlePointerEnter);
      el.addEventListener("mouseout", handlePointerLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.querySelectorAll("button, a, [role='button']").forEach((el) => {
        el.removeEventListener("mouseover", handlePointerEnter);
        el.removeEventListener("mouseout", handlePointerLeave);
      });
    };
  }, []);

  return (
    <div
      className="cursor-indicator hidden md:block"
      style={{
        transform:isPointer? `translate3d(${position.x-20}px, ${position.y-20}px, 0)`: `translate3d(${position.x}px, ${position.y}px, 0)`,
        width: isPointer ? "50px" : "20px",
        height: isPointer ? "50px" : "20px",
      }}
    ></div>
  );
};

export default MouseCursorCircle;
