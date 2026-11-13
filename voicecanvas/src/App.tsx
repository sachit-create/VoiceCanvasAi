import { useState } from "react";
import Header from "./Components/Header";
import ToolBar from "./Components/Toolbar";
import Canvas from "./Components/Canvas";


type RectangleShape = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

const App = () => {
  const [selectedTool, setSelectedTool] = useState("Select");
  const [isDrawing, setIsDrawing] = useState(false);
  const [shapes, setShapes] = useState<RectangleShape[]>([]);

  return (
    <div className="h-screen flex flex-col font-sans">
      <Header />
      <ToolBar onSelect={setSelectedTool} selectedTool={selectedTool} />
      <h1 className="m-4 font-bold text-2xl">
        Currently selected:{" "}
        <span className="text-green-600">{selectedTool}</span>
      </h1>
      <div className="flex-1 min-h-0 min-w-0 p-2">
        <Canvas
          isDrawing={isDrawing}
          shapes={shapes}
          setIsDrawing={setIsDrawing}
          setShapes={setShapes}
        />
      </div>
      <button
        className="bg-red-400 w-30 px-6 py-2 mt-2 m-4 text-xl font-bold shadow-md shadow-black rounded-full hover:bg-red-300"
        onClick={() => {
          setIsDrawing(false);
          setShapes([]);
        }}
      >
        Clear
      </button>
    </div>
  );
};

export default App;
