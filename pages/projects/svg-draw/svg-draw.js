import * as React from "react";
import interact from "interactjs";
import { getStroke } from "perfect-freehand";
import { getSvgPathFromStroke } from "./utils";

const options = {
  size: 40,
  thinning: 0.5,
  smoothing: 0.5,
  streamline: 0.5,
  easing: (t) => t,
  start: { taper: 0, easing: (t) => t, cap: true },
  end: { taper: 100, easing: (t) => t, cap: true }
};

export default function Example() {
  const [points, setPoints] = React.useState([]);
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [mode, setMode] = React.useState("draw");
  const [shapes, setShapes] = React.useState([]);

  function handlePointerDown(e) {
    if (mode !== "draw") return;
    e.target.setPointerCapture(e.pointerId);
    setIsDrawing(true);
    setPoints((prev) => [...prev, [[e.pageX, e.pageY, e.pressure]]]);
  }

  function handlePointerMove(e) {
    if (mode !== "draw" || !isDrawing) return;
    setPoints((prev) => {
      const lastStroke = prev[prev.length - 1] || [];
      return [...prev.slice(0, -1), [...lastStroke, [e.pageX, e.pageY, e.pressure]]];
    });
  }

  function handlePointerUp() {
    if (mode !== "draw") return;
    setIsDrawing(false);
  }

  function addShape(type) {
    setShapes([...shapes, { type, x: 100, y: 100, id: Date.now() }]);
  }

  React.useEffect(() => {
    if (mode === "select") {
      interact(".draggable").draggable({
        onmove: (event) => {
          const target = event.target;
          const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
          const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;
          target.setAttribute("data-x", x);
          target.setAttribute("data-y", y);
          target.style.transform = `translate(${x}px, ${y}px)`;
        }
      }).resizable({
        edges: { top: true, left: true, bottom: true, right: true },
        listeners: {
          move(event) {
            let { x, y } = event.target.dataset;
            x = (parseFloat(x) || 0) + event.deltaRect.left;
            y = (parseFloat(y) || 0) + event.deltaRect.top;
            Object.assign(event.target.style, {
              width: `${event.rect.width}px`,
              height: `${event.rect.height}px`,
              transform: `translate(${x}px, ${y}px)`
            });
            Object.assign(event.target.dataset, { x, y });
          }
        }
      });
    }
    return () => interact(".draggable").unset();
  }, [mode, shapes]);

  const strokes = points.map((stroke) => getSvgPathFromStroke(getStroke(stroke, options)));

  return (
    <div>
      <div style={{ position: "fixed", top: 10, left: 10, zIndex: 1000 }}>
        <button onClick={() => setMode("draw")} disabled={mode === "draw"}>Draw Mode</button>
        <button onClick={() => setMode("select")} disabled={mode === "select"}>Select Mode</button>
        {["Rectangle", "Circle", "Triangle", "Ellipse", "Line", "Pentagon", "Hexagon", "Star", "Arrow", "Parallelogram"].map((shape) => (
          <button key={shape} onClick={() => addShape(shape)}>{shape}</button>
        ))}
      </div>
      <svg
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        style={{ touchAction: "none", width: "100vw", height: "100vh", background: "#fff" }}
      >
        {strokes.map((d, i) => (
          <path key={i} className={mode === "select" ? "draggable" : ""} d={d} fill="black" stroke="black" strokeWidth="2" data-x="0" data-y="0" />
        ))}
        {shapes.map((shape) => {
          switch (shape.type) {
            case "Rectangle":
              return <rect key={shape.id} className="draggable" x={shape.x} y={shape.y} width="100" height="100" fill="blue" data-x="0" data-y="0" />;
            case "Circle":
              return <circle key={shape.id} className="draggable" cx={shape.x} cy={shape.y} r="50" fill="red" data-x="0" data-y="0" />;
            case "Ellipse":
              return <ellipse key={shape.id} className="draggable" cx={shape.x} cy={shape.y} rx="60" ry="40" fill="green" data-x="0" data-y="0" />;
            case "Line":
              return <line key={shape.id} className="draggable" x1={shape.x} y1={shape.y} x2={shape.x + 100} y2={shape.y} stroke="black" strokeWidth="5" data-x="0" data-y="0" />;
            default:
              return null;
          }
        })}
      </svg>
    </div>
  );
}



