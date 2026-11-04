import { useState } from 'react'
import Header from './Components/Header'
import ToolBar from './Components/Toolbar'
import Canvas from './Components/Canvas'

const App = () => {
  const [selectedTool, setSelectedTool] = useState("Select");

  return (
    <>
      <Header />
      <ToolBar
       onSelect={setSelectedTool}
       selectedTool={selectedTool} />
      <h1>Currently selected: {selectedTool}</h1>
      <div className='flex-1 min-h-0 min-w-0 p-2'>
          <Canvas/>
      </div>
    </>
  )
}

export default App