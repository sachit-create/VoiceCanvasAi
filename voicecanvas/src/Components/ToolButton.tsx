type ToolButtonProps = {
  name: string;
};

const ToolButton = ({ name }: ToolButtonProps) => {
  return (
    <button className="bg-black text-white rounded-full p-2 hover:bg-gray-700">
      {name}
    </button>
  );
};

export default ToolButton;
