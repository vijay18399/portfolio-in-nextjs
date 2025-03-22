import React, { useEffect, useState } from "react";
import rd3 from 'react-d3-library'
import * as d3 from "d3";

export default function D3Drawing() {
  const [mode, setMode] = useState("draw");
  const [root, setRoot] = useState(null);

  useEffect(() => {
    const svg = d3.create("svg")
      .attr("width", window.innerWidth)
      .attr("height", window.innerHeight)
      .style("background", "#ffffff");

    let isDrawing = false;
    let currentLine;

    function handleMouseDown(event) {
      if (mode !== "draw") return;
      isDrawing = true;
      const [x, y] = d3.pointer(event);
      currentLine = svg.append("path")
        .attr("d", `M${x},${y}`)
        .attr("stroke", "black")
        .attr("fill", "none")
        .attr("stroke-width", 2)
        .classed("draggable", true);
    }

    function handleMouseMove(event) {
      if (!isDrawing) return;
      const [x, y] = d3.pointer(event);
      let d = currentLine.attr("d");
      currentLine.attr("d", d + ` L${x},${y}`);
    }

    function handleMouseUp() {
      isDrawing = false;
    }

    svg.on("mousedown", handleMouseDown)
       .on("mousemove", handleMouseMove)
       .on("mouseup", handleMouseUp);

    function makeDraggable() {
      d3.selectAll(".draggable")
        .call(d3.drag()
          .on("drag", function(event) {
            if (mode !== "select") return;
            d3.select(this)
              .attr("transform", `translate(${event.x},${event.y})`);
          })
        );
    }

    setRoot(svg.node());
    return () => {
      svg.on("mousedown", null)
         .on("mousemove", null)
         .on("mouseup", null);
    };
  }, [mode]);

  return (
    <div>
      <button onClick={() => setMode("draw")} disabled={mode === "draw"}>Draw Mode</button>
      <button onClick={() => setMode("select")} disabled={mode === "select"}>Select Mode</button>
      <button onClick={() => setMode("select") && root && makeDraggable()}>Enable Dragging</button>
      <div>{root}</div>
    </div>
  );
}