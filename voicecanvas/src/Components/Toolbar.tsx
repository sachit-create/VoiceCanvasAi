import ToolButton from "./ToolButton";

type selectToolProp = {
  onSelect: (tool: string) => void;
}

const ToolBar = ({onSelect}: selectToolProp) => {

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
      {tools.map((tool) => (
        <ToolButton name={tool} key={tool} setSelect={onSelect}/>
      ))}
    </div>
  );
};

export default ToolBar;
