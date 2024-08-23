import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './rootLayout.css';

const RootLayout = () => {
  return (
    <div className="rootLayout">
      <header>
        <Link to='/'>
          <img src="/logo.png" />
          <span>Machar AI</span>
        </Link>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout