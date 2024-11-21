// src/components/CanvasComponent.tsx
import React, { useEffect, useRef, useState } from "react";
import { useThemeContext } from "../context/ThemeContext";

// Ball interface to type the Ball objects
interface Ball {
  x: number;
  y: number;
  radius: number;
  imageKey: string;
  dx: number;
  dy: number;
  isDragging: boolean;
  startX: number;
  startY: number;
  draw: (
    ctx: CanvasRenderingContext2D,
    images: { [key: string]: HTMLImageElement }
  ) => void;
  update: (
    canvas: HTMLCanvasElement | null,
    ctx: CanvasRenderingContext2D,
    images: { [key: string]: HTMLImageElement }
  ) => void;
  applyDrag: (dx: number, dy: number) => void;
  calculateReleaseVelocity: (dx: number, dy: number) => void;
}

const maxVelocity = 8; // Define maxVelocity
const minVelocity = 1; // Define minVelocity
let isMobile = false; // Define isMobile

const CanvasComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [images, setImages] = useState<{ [key: string]: HTMLImageElement }>({});
  const [balls, setBalls] = useState<Ball[]>([]);
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    text: string;
    x: number;
    y: number;
  }>({ visible: false, text: "", x: 0, y: 0 });

  useEffect(() => {
    const imageSources = {
      react: "/images/reactjs.png",
      node: "/images/nodejs.png",
      express: "/images/express.png",
      mongodb: "/images/mongodb.png",
      html: "/images/html.png",
      css: "/images/css.png",
    };

    // Load the images
    const loadedImages: { [key: string]: HTMLImageElement } = {};
    Object.keys(imageSources).forEach((key) => {
      const img = new Image();
      img.src = imageSources[key as keyof typeof imageSources];
      img.onload = () => {
        loadedImages[key] = img;
        if (
          Object.keys(loadedImages).length === Object.keys(imageSources).length
        ) {
          setImages(loadedImages);
        }
      };
    });

    // Set up canvas dimensions on window resize
    const canvas = canvasRef.current;
    if (canvas) {
      const updateCanvasSize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight * 0.8;
      };
      window.addEventListener("resize", updateCanvasSize);
      updateCanvasSize();

      return () => window.removeEventListener("resize", updateCanvasSize);
    }
  }, []);

  // Ball Object
  const createBall = (
    x: number,
    y: number,
    radius: number,
    imageKey: string
  ): Ball => ({
    x,
    y,
    radius,
    imageKey,
    dx: 0, // Initially no movement
    dy: 0, // Initially no movement
    isDragging: false,
    startX: x,
    startY: y,
    draw: function (ctx, images) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = "rgba(255, 255, 255, 0.99)";
      ctx.fill();
      ctx.closePath();

      // Draw the logo inside the ball
      const img = images[this.imageKey];
      if (img) {
        const imgSize = this.radius * 1.4;
        ctx.drawImage(
          img,
          this.x - imgSize / 2,
          this.y - imgSize / 2,
          imgSize,
          imgSize
        );
      }
    },
    update: function (canvas, ctx, images) {
      if (!this.isDragging && (this.dx !== 0 || this.dy !== 0)) {
        this.x += this.dx;
        this.y += this.dy;

        // Gradually reduce velocity if it exceeds maxVelocity
        const speed = Math.sqrt(this.dx ** 2 + this.dy ** 2);
        if (speed > maxVelocity) {
          const scale = maxVelocity / speed;
          this.dx *= scale;
          this.dy *= scale;
        }

        // Collision with walls
        if (
          canvas &&
          (this.x - this.radius < 0 || this.x + this.radius > canvas.width)
        ) {
          this.dx *= -1;
          this.x =
            this.x < this.radius ? this.radius : canvas.width - this.radius;
        }
        if (
          canvas &&
          (this.y - this.radius < 0 || this.y + this.radius > canvas.height)
        ) {
          this.dy *= -1;
          this.y =
            this.y < this.radius ? this.radius : canvas.height - this.radius;
        }
      }
      this.draw(ctx, images);
    },
    applyDrag: function (dx, dy) {
      this.x = dx;
      this.y = dy;
    },
    calculateReleaseVelocity: function (dx, dy) {
      const magnitude = Math.sqrt(dx ** 2 + dy ** 2);

      const scale = Math.min(maxVelocity / magnitude, 1);
      this.dx = dx * scale;
      this.dy = dy * scale;

      // Ensure the velocity is not below the minimum
      const speed = Math.sqrt(this.dx ** 2 + this.dy ** 2);
      if (speed < minVelocity) {
        const scale = minVelocity / speed;
        this.dx *= scale;
        this.dy *= scale;
      }
    },
  });

  const detectCollisions = (balls: Ball[]) => {
    for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
        const dx = balls[j].x - balls[i].x;
        const dy = balls[j].y - balls[i].y;
        const distance = Math.sqrt(dx ** 2 + dy ** 2);

        if (distance < balls[i].radius + balls[j].radius) {
          // Prevent overlap by resolving the collision
          const overlap = balls[i].radius + balls[j].radius - distance;
          const angle = Math.atan2(dy, dx);

          balls[i].x -= (Math.cos(angle) * overlap) / 2;
          balls[i].y -= (Math.sin(angle) * overlap) / 2;
          balls[j].x += (Math.cos(angle) * overlap) / 2;
          balls[j].y += (Math.sin(angle) * overlap) / 2;

          // Swap velocities for elastic collision
          const v1 = { x: balls[i].dx, y: balls[i].dy };
          const v2 = { x: balls[j].dx, y: balls[j].dy };

          balls[i].dx = v2.x;
          balls[i].dy = v2.y;
          balls[j].dx = v1.x;
          balls[j].dy = v1.y;

          // Adjust velocities to respect minVelocity using a damping factor
          [balls[i], balls[j]].forEach((ball) => {
            const speed = Math.sqrt(ball.dx ** 2 + ball.dy ** 2);

            // If the speed is greater than minVelocity, reduce it gradually using damping
            if (speed > minVelocity) {
              const dampingFactor = 0.8; // Slightly reduce velocity
              ball.dx *= dampingFactor;
              ball.dy *= dampingFactor;

              // Ensure that the speed doesn't fall below the minVelocity
              const newSpeed = Math.sqrt(ball.dx ** 2 + ball.dy ** 2);
              if (newSpeed < minVelocity) {
                const scale = minVelocity / newSpeed;
                ball.dx *= scale;
                ball.dy *= scale;
              }
            }
          });
        }
      }
    }
  };

  useEffect(() => {
    const techKeys = Object.keys(images);
    const canvas = canvasRef.current;
    const initialBalls = techKeys.map((key) =>
      createBall(
        canvas ? canvas.width / 2 : 0,
        canvas ? canvas.height / 2 : 0,
        isMobile ? 30 : 40,
        key
      )
    );
    setBalls(initialBalls);
  }, [images]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    const render = () => {
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        balls.forEach((ball) => ball.update(canvas, ctx, images));
        detectCollisions(balls);
      }
      requestAnimationFrame(render);
    };

    render();
  }, [balls, images]);

  useEffect(() => {
    const canvas = canvasRef.current;

    const handleMouseDown = (event: MouseEvent) => {
      const { offsetX, offsetY } = event;

      balls.forEach((ball) => {
        const dist = Math.sqrt(
          (ball.x - offsetX) ** 2 + (ball.y - offsetY) ** 2
        );
        if (dist < ball.radius + 10) {
          ball.isDragging = true;
          ball.startX = ball.x;
          ball.startY = ball.y;
          if (canvas) canvas.style.cursor = "grabbing";
        }
      });
    };

    const handleMouseMove = (event: MouseEvent) => {
      const { offsetX, offsetY } = event;
      let tooltipVisible = false;
      let tooltipText = "";
      let tooltipX = 0;
      let tooltipY = 0;

      balls.forEach((ball) => {
        const dist = Math.sqrt(
          (ball.x - offsetX) ** 2 + (ball.y - offsetY) ** 2
        );
        if (dist < ball.radius + 10) {
          tooltipVisible = true;
          tooltipText = `${ball.imageKey
            .charAt(0)
            .toUpperCase()}${ball.imageKey.slice(1)}`;
          tooltipX = ball.x;
          tooltipY = ball.y - ball.radius - 20; // Adjusted to position above the ball
          if (canvas) canvas.style.cursor = "grabbing";
        }
        if (ball.isDragging) {
          ball.applyDrag(offsetX, offsetY);
        }
      });

      setTooltip({
        visible: tooltipVisible,
        text: tooltipText,
        x: tooltipX,
        y: tooltipY,
      });
    };

    const handleMouseUp = (event: MouseEvent) => {
      balls.forEach((ball) => {
        if (ball.isDragging) {
          const dx = event.offsetX - ball.startX;
          const dy = event.offsetY - ball.startY;

          ball.calculateReleaseVelocity(dx, dy);
          ball.isDragging = false;
        }
        if (canvas) canvas.style.cursor = "default";
      });
    };

    if (canvas) {
      canvas.addEventListener("mousedown", handleMouseDown);
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener("mousedown", handleMouseDown);
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseup", handleMouseUp);
      }
    };
  }, [balls]);

  return (
    <>
      <canvas ref={canvasRef} />
      {tooltip.visible && (
        <div
          style={{
            position: "absolute",
            left: tooltip.x , // Adjusted to center horizontally
            top: tooltip.y+120,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            padding: "5px",
            borderRadius: "3px",
            pointerEvents: "none",
            transform: "translateX(-50%)", // Center the tooltip
          }}
        >
          {tooltip.text}
        </div>
      )}
    </>
  );
};

export default CanvasComponent;
