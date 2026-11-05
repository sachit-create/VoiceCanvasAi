
const Header = () => {
  return (
    <header className="bg-transparent border-gray-300 border-2 rounded-full m-4 text-2xl shadow-black shadow-md font-bold flex justify-between items-center p-4">
     <h1 
     className="text-3xl">Voice Canvas</h1>
     <button className='bg-blue-500 rounded-full text-xl shadow-black shadow-md hover:bg-blue-300 p-2'>Save Changes</button>
    </header>
  );
};

export default Header;
