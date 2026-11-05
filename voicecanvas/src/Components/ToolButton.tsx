type ToolButtonProps = {
  name: string,
  setSelect: (tool: string) => void,
  isActive: boolean;
};

const ToolButton = ({ name, setSelect, isActive}: ToolButtonProps) => {
  return (
    <button className={`${isActive ? 'text-blue-400' : 'text-black hover:underline'} text-xl font-bold rounded-full transition-all duration-120`} onClick={() => setSelect(name)}>
      {name}
    </button>
  );
};

export default ToolButton;
