import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Organizacao from "./pages/Organizacao"
import Tarefas from "./pages/Tarefas"

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Organizacao/>}></Route>
        <Route path='/tarefas' element={<Tarefas/>}></Route>
      </Routes>
    </Router>
    
  )
}

export default App
