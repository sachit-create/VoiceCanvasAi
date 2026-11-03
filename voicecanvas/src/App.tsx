import { useState } from 'react'
import Header from './Components/Header'
import ToolBar from './Components/Toolbar'

const App = () => {
  const [selectedTool, setSelectedTool] = useState("Select");

  return (
    <>
      <Header />
      <ToolBar
       onSelect={setSelectedTool}
       selectedTool={selectedTool} />
      <h1>Currently selected: {selectedTool}</h1>
    </>
  )
}

export default App