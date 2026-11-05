import { useState } from 'react'
import Header from './Components/Header'
import ToolBar from './Components/Toolbar'
import Canvas from './Components/Canvas'

const App = () => {
  const [selectedTool, setSelectedTool] = useState("Select");

  return (
    <div className='font-sans'>
      <Header />
      <ToolBar
       onSelect={setSelectedTool}
       selectedTool={selectedTool} />
      <h1 className='m-4 font-bold text-2xl'>Currently selected: <span className='text-green-600'>{selectedTool}</span></h1>
      <div className='flex-1 min-h-0 min-w-0 p-2'>
          <Canvas/>
      </div>
    </div>
  )
}

export default App