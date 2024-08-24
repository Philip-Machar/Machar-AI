import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './rootLayout.css';

const RootLayout = () => {
  return (
    <div className="rootLayout">
      <header>
        <Link to='/' className="logo">
          <img src="/logo.png" />
          <span>Machar AI</span>
        </Link>
        <div>user</div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout