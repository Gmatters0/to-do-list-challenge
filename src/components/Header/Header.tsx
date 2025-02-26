import { Link, useLocation } from 'react-router-dom'
import '../../../global.scss'
import './header.scss'

function Header() {
  const location = useLocation()

  return (
    <header>
      <nav className='d-flex fd-row al-end'>
        <Link className={location.pathname === "/" ? 'current-page' : ''} to="/">Organização</Link>
        <Link className={location.pathname === "/tarefas" ? 'current-page' : ''} to="/tarefas">Tarefas</Link>   
      </nav>
    </header>
  )
}

export default Header