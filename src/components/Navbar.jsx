import { useLocation, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Navbar({ isAdmin = false }) {
  const route = useLocation();
  return (
    <nav className='navbar'>
      {/* Render the admin navigation if isAdmin is true */}
      {isAdmin && (
        <ul className='navbar-nav'>
          {/* Highlight the 'edit' link if the current route is '/edit' */}
          <li className={`nav-item ${route.pathname === '/edit' && 'active'}`}>
            <Link to='/edit' className='nav-link'>EDITAR DATOS</Link>
          </li>
          {/* Highlight the 'attendees' link if the current route is '/attendees' */}
          <li className={`nav-item ${route.pathname === '/attendees' && 'active'}`}>
            <Link to='/attendees' className='nav-link'>VER ASISTENTES</Link>
          </li>
        </ul>
      )}
      {/* Render the non-admin navigation if isAdmin is false */}
      {!isAdmin && (
        <ul className='navbar-nav'>
          {/* Highlight the 'home' link if the current route is '/' */}
          <li className={`nav-item ${route.pathname === '/' && 'active'}`}>
            <Link to='/' className='nav-link'>INICIO</Link>
          </li>
          {/* Highlight the 'attendance' link if the current route is '/attendance' */}
          <li className={`nav-item ${route.pathname === '/attendance' && 'active'}`}>
            <Link to='/attendance' className='nav-link'>CONFIRMAR ASISTENCIA</Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

Navbar.propTypes = {
  isAdmin: PropTypes.bool
};

export default Navbar;
