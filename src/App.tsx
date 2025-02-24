import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from "react-router-dom"
import Organizacao from "./pages/Organizacao"
import Tarefas from "./pages/Tarefas"
import { useEffect } from "react"

function App() {
  const RedirectToOrganizacao = () => {
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
      if(location.pathname === "/") {
        navigate("/organizacao")
      }
    }, [location.pathname, navigate])

    return null
  }

  return (
    <Router>
      <RedirectToOrganizacao />
      <Routes>
        <Route path='/organizacao' element={<Organizacao/>}></Route>
        <Route path='/tarefas' element={<Tarefas/>}></Route>
      </Routes>
    </Router>
    
  )
}

export default App
