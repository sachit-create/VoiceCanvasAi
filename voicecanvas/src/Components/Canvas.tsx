type CanvasProps = {
  startPoint: number[],
  endPoint: number[],
  isDrawing: boolean,
  setStartPoint: (point: number[]) => void,
  setEndPoint: (point: number[]) => void,
  setIsDrawing: (flag: boolean) => void;
}


const Canvas = ({startPoint,endPoint,isDrawing,setStartPoint,setEndPoint,setIsDrawing}: CanvasProps) => {

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
      >
          <rect
            x={Math.min(startPoint[0], endPoint[0])}
            y={Math.min(startPoint[1], endPoint[1])}
            width={Math.abs(endPoint[0] - startPoint[0])}
            height={Math.abs(endPoint[1] - startPoint[1])}
            stroke="black"
            strokeWidth="2"
            fill="none"
          />
        
      </svg>
    </>
  );
};

export default Canvas;
