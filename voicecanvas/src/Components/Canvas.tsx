import {useState} from "react";

type CanvasProps = {
  startPoint: number[],
  endPoint: number[],
  isDrawing: boolean,
  setStartPoint: (point: number[]) => void,
  setEndPoint: (point: number[]) => void,
  setIsDrawing: (flag: boolean) => void;
}

type RectangleShape = {
  id: string;
  x:number;
  y: number;
  width: number;
  height: number;
}

const Canvas = ({startPoint,endPoint,isDrawing,setStartPoint,setEndPoint,setIsDrawing}: CanvasProps) => {
  const [shapes,setShapes] = useState<RectangleShape[]>([]);
  const [draft, setDraft] = useState<RectangleShape | null>(null);

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
          setStartPoint([x, y]);
          setEndPoint([x,y]);
          setIsDrawing(true);
        }}
        onPointerUp={(event) => {
          if (!isDrawing) return;

          const rect = event.currentTarget.getBoundingClientRect();

          const x = (event.clientX - rect.left) * (1000 / rect.width);
          const y = (event.clientY - rect.top) * (600 / rect.height);

          setEndPoint([x, y]);
          setIsDrawing(false);
        }}
        onPointerMove={(event) =>{
          if (!isDrawing) return;

          const rect = event.currentTarget.getBoundingClientRect();

          const x = (event.clientX - rect.left) * (1000/ rect.width);
          const y = (event.clientY - rect.top) * (600/ rect.height);

          setEndPoint([x,y]);
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
        
      </svg>
    </>
  );
};

export default Canvas;
