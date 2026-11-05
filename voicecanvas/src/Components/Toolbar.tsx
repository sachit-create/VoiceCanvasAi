import ToolButton from "./ToolButton";

type selectToolProp = {
  onSelect: (tool: string) => void,
  selectedTool: string;
}

const ToolBar = ({onSelect,selectedTool}: selectToolProp) => {

const tools: string[] = [
  "Select",
  "Rectangle",
  "Circle",
  "Line",
  "Pencil",
  "Text",
  "Eraser",
];

return (
    <div className="border-2 border-gray-400 shadow-gray-400 shadow-md rounded-full p-2 m-4 flex justify-around items-center">
      {tools.map((tool) => (
        <ToolButton 
        name={tool} 
        key={tool} 
        setSelect={onSelect}  
        isActive={selectedTool === tool}/>
      ))}
    </div>
  );
};

export default ToolBar;
