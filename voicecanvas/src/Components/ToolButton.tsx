type ToolButtonProps = {
  name: string,
  setSelect: (tool: string) => void,
  isActive: boolean;
};

const ToolButton = ({ name, setSelect, isActive}: ToolButtonProps) => {
  return (
    <button className={`${isActive ? 'bg-blue-400' : 'bg-black'} text-white rounded-full p-2`} onClick={() => setSelect(name)}>
      {name}
    </button>
  );
};

export default ToolButton;
