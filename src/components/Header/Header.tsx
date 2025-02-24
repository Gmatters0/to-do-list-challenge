import { Link, useLocation } from 'react-router-dom'
import '../../../global.scss'
import './header.scss'

function Header() {
  const location = useLocation()

  return (
    <header>
      <nav className='d-flex fd-row al-end'>
        <Link to="/organizacao"><a className={location.pathname === "/organizacao" ? 'current-page' : ''}>Organização</a></Link>
        <Link to="/tarefas"><a className={location.pathname === "/tarefas" ? 'current-page' : ''}>Tarefas</a></Link>   
      </nav>
    </header>
  )
}

export default Header