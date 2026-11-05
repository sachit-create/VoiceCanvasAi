import { useState } from "react";


const Canvas = () => {
  const [startPoint, setStartPoint] = useState([0, 0]);
  const [endPoint, setEndPoint] = useState([0, 0]);
  const [isDrawing, setIsDrawing] = useState(false);

  return (
    <>
      <button 
      className="bg-red-400 px-6 py-2 mt-2 m-4 text-xl font-bold shadow-md shadow-black rounded-full hover:bg-red-300"
      onClick={() => {setStartPoint([0,0]); setEndPoint([0,0]); setIsDrawing(false)}}>Clear</button>
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
        onPointerLeave={() => {
          // I'll handle this properly with pointer capture soon.
        }}
      >
        {!isDrawing && (
          <rect
            x={Math.min(startPoint[0], endPoint[0])}
            y={Math.min(startPoint[1], endPoint[1])}
            width={Math.abs(endPoint[0] - startPoint[0])}
            height={Math.abs(endPoint[1] - startPoint[1])}
            stroke="black"
            strokeWidth="2"
            fill="none"
          />
        )}
      </svg>
    </>
  );
};

export default Canvas;
