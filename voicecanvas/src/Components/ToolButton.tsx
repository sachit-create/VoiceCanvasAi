type ToolButtonProps = {
  name: string,
  setSelect: (tool: string) => void;
};

const ToolButton = ({ name , setSelect}: ToolButtonProps) => {
  return (
    <button className="bg-black text-white rounded-full p-2 hover:bg-gray-700 " onClick={() => setSelect(name)}>
      {name}
    </button>
  );
};

export default ToolButton;
