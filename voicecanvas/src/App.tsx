
import { useState } from "react";
import {
  MousePointer2,
  Square,
  Circle,
  Minus,
  Pencil,
  Trash2,
} from "lucide-react";

type Tool = "select" | "rectangle" | "circle" | "line" | "pencil";

type Point = {
  x: number;
  y: number;
};

type Shape = {
  id: number;
  type: Exclude<Tool, "select">;
  start: Point;
  end: Point;
  points?: Point[];
};

function App() {
  const [tool, setTool] = useState<Tool>("rectangle");
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [draft, setDraft] = useState<Shape | null>(null);

  function getPoint(
    event: React.PointerEvent<SVGSVGElement>
  ): Point {
    const bounds = event.currentTarget.getBoundingClientRect();

    return {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    };
  }

  function handlePointerDown(
    event: React.PointerEvent<SVGSVGElement>
  ) {
    if (tool === "select") return;

    event.currentTarget.setPointerCapture(event.pointerId);

    const point = getPoint(event);

    setDraft({
      id: Date.now(),
      type: tool,
      start: point,
      end: point,
      points: tool === "pencil" ? [point] : [],
    });
  }

  function handlePointerMove(
    event: React.PointerEvent<SVGSVGElement>
  ) {
    if (!draft) return;

    const point = getPoint(event);

    setDraft((previous) => {
      if (!previous) return null;

      return {
        ...previous,
        end: point,
        points:
          previous.type === "pencil"
            ? [...(previous.points ?? []), point]
            : previous.points,
      };
    });
  }

  function handlePointerUp() {
    if (!draft) return;

    setShapes((previous) => [...previous, draft]);
    setDraft(null);
  }

  function renderShape(shape: Shape) {
    const { start, end } = shape;

    const x = Math.min(start.x, end.x);
    const y = Math.min(start.y, end.y);
    const width = Math.abs(end.x - start.x);
    const height = Math.abs(end.y - start.y);

    const common = {
      stroke: "#1e293b",
      strokeWidth: 2,
      fill: "transparent",
    };

    switch (shape.type) {
      case "rectangle":
        return (
          <rect
            {...common}
            x={x}
            y={y}
            width={width}
            height={height}
          />
        );

      case "circle":
        return (
          <ellipse
            {...common}
            cx={x + width / 2}
            cy={y + height / 2}
            rx={width / 2}
            ry={height / 2}
          />
        );

      case "line":
        return (
          <line
            {...common}
            x1={start.x}
            y1={start.y}
            x2={end.x}
            y2={end.y}
          />
        );

      case "pencil":
        return (
          <polyline
            {...common}
            points={(shape.points ?? [])
              .map((p) => `${p.x},${p.y}`)
              .join(" ")}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
    }
  }

  const tools = [
    { id: "select", label: "Select", icon: MousePointer2 },
    { id: "rectangle", label: "Rectangle", icon: Square },
    { id: "circle", label: "Circle", icon: Circle },
    { id: "line", label: "Line", icon: Minus },
    { id: "pencil", label: "Pencil", icon: Pencil },
  ] as const;

  return (
    <div className="h-screen flex flex-col bg-slate-100">

      {/* Header */}
      <header className="h-16 bg-white border-b flex items-center justify-between px-6">
        <div>
          <h1 className="text-xl font-bold text-slate-800">
            VoiceCanvas
          </h1>
          <p className="text-xs text-slate-400">
            Your creative workspace
          </p>
        </div>

        <button
          onClick={() => {
            setShapes([]);
            setDraft(null);
          }}
          className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-red-50 text-red-600"
        >
          <Trash2 size={16} />
          Clear canvas
        </button>
      </header>

      {/* Toolbar */}
      <div className="flex justify-center p-4">
        <div className="flex gap-2 bg-white shadow-sm border rounded-xl p-2">
          {tools.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              title={label}
              onClick={() => setTool(id)}
              className={`p-3 rounded-lg transition ${
                tool === id
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-slate-100 text-slate-600"
              }`}
            >
              <Icon size={20} />
            </button>
          ))}
        </div>
      </div>

      {/* Drawing area */}
      <main className="flex-1 p-4 pt-0 min-h-0">
        <div className="w-full h-full bg-white border rounded-xl shadow-sm overflow-hidden">
          <svg
            className="w-full h-full"
            style={{ touchAction: "none" }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            {shapes.map((shape) => (
              <g key={shape.id}>
                {renderShape(shape)}
              </g>
            ))}

            {draft && renderShape(draft)}
          </svg>
        </div>
      </main>

      {/* Footer */}
      <footer className="h-10 flex items-center justify-center text-xs text-slate-400">
        Tool: {tool} · {shapes.length} elements
      </footer>
    </div>
  );
}

export default App;
