import ToolButton from "./ToolButton";

const ToolBar = () => {

    
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
    <div className="bg-black rounded-full p-1 m-2 flex justify-around items-center">
      {tools.map((tool,index) => (
        <ToolButton name={tool} key={index}/>
      ))}
    </div>
  );
};

export default ToolBar;
