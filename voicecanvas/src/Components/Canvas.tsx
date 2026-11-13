import { useState, type Dispatch, type SetStateAction, useEffect } from "react";

type RectangleShape = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

type CanvasProps = {
  shapes: RectangleShape[];
  isDrawing: boolean;
  setIsDrawing: (flag: boolean) => void;
  setShapes: Dispatch<SetStateAction<RectangleShape[]>>;
};

const Canvas = ({
  isDrawing,
  shapes,
  setIsDrawing,
  setShapes,
}: CanvasProps) => {
  const [draft, setDraft] = useState<RectangleShape | null>(null);
  const [startPointLocal, setStartPointLocal] = useState([0, 0]);

  useEffect(() => {
    if (!isDrawing) {
      setDraft(null);
    }
  }, [isDrawing]);

  return (
    <>
      <svg
        viewBox="0 0 1000 600"
        className="bg-white h-full w-full border-2 border-black rounded-lg"
        preserveAspectRatio="none"
        onPointerDown={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          event.currentTarget.setPointerCapture(event.pointerId);
          //Calculating svg coordinates
          const x = (event.clientX - rect.left) * (1000 / rect.width);
          const y = (event.clientY - rect.top) * (600 / rect.height);

          // console.log("SVG coordinates:",x,y);
          setStartPointLocal([x, y]);
          setIsDrawing(true);

          setDraft({
            id: crypto.randomUUID(),
            x: x,
            y: y,
            width: 0,
            height: 0,
          });
        }}
        onPointerUp={() => {
          if (!isDrawing) return;

          if (draft !== null && draft.width > 2 && draft.height > 2) {
            setShapes((previousShapes) => [...previousShapes, draft]);
          }

          setDraft(null);
          setIsDrawing(false);
        }}
        onPointerMove={(event) => {
          if (!isDrawing) return;

          const rect = event.currentTarget.getBoundingClientRect();

          const x = (event.clientX - rect.left) * (1000 / rect.width);
          const y = (event.clientY - rect.top) * (600 / rect.height);

          if (draft !== null) {
            const [startX, startY] = startPointLocal;

            const newWidth = Math.abs(x - startX);
            const newHeight = Math.abs(y - startY);

            setDraft((current) => {
              if (!current) return null;

              return {
                ...current,
                x: Math.min(startX, x),
                y: Math.min(startY, y),
                height: newHeight,
                width: newWidth,
              };
            });
          }
        }}
        onPointerCancel={() => {
          setIsDrawing(false);
        }}
      >
        {shapes.map((shape) => (
          <rect
            key={shape.id}
            x={shape.x}
            y={shape.y}
            width={shape.width}
            height={shape.height}
            stroke="black"
            strokeWidth="2"
            fill="none"
          />
        ))}

        {draft && (
          <rect
            key={draft.id}
            x={draft.x}
            y={draft.y}
            width={draft.width}
            height={draft.height}
            stroke="blue"
            strokeWidth="2"
            fill="none"
          />
        )}
      </svg>
    </>
  );
};

export default Canvas;
