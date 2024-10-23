import { useContext, useState } from 'react';
import greenLeaves from './../assets/green-leaves.png';
import Navbar from './Navbar';
import { LoginDataContext } from '../context/LoginDataContext';
import { ADMIN_ROLE } from '../constants/constants';
import axios from 'axios';
import { apiUrl } from '../constants/config';
import { HEADER_TITLE_ADMIN, HEADER_TITLE_ATTENDEE } from '../constants/constants';

/**
 * Header component displays the header section of the wedding website.
 * It shows the couple's name, wedding date, and a navigation bar.
 */
function Header() {
  const [coupleName, setCoupleName] = useState('');
  const [date, setDate] = useState('');
  const { loginData, updateLoginData } = useContext(LoginDataContext)

  let headerTitle = HEADER_TITLE_ATTENDEE
  let isAdmin = false;
  if (loginData) {
    isAdmin = loginData.role === ADMIN_ROLE

    // Fetch couple's name and wedding date if not already available
    if (!coupleName) {
      axios.get(`${apiUrl}/wedding/${loginData.weddingId}`).then((response) => {
        setCoupleName(response.data.coupleName);
        setDate(response.data.date);
      }).catch((error) => {
        console.error(error);
      });
    }

    // Set header title based on user role
    headerTitle = isAdmin ? HEADER_TITLE_ADMIN : coupleName
  } else {
    headerTitle = 'Bienvenid@'
  }

  /**
   * Logs out the user by updating the login data and clearing the date.
   */
  const logOut = () => {
    updateLoginData(null)
    setDate('')
  }

  /**
   * Returns the formatted wedding date.
   * @returns {string} The formatted wedding date.
   */
  const getFormattedDate = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('es-ES', options);
  }

  return (
    <div className="w-100 d-flex-center flex-column">
      {loginData && <button type="button" className="btn floating-button" onClick={logOut}>Salir</button>}
      <img className="leaves-image" src={greenLeaves} alt="imagen de cabecera" />
      <h1 className="text-truncate text-center p-2">
        {headerTitle}
      </h1>
      {date && !isAdmin && <div className="text-ellipsis w-100 d-flex-center flex-column mb-4">{getFormattedDate()}</div>}
      {loginData && <Navbar isAdmin={isAdmin} />}
    </div>
  );
}

export default Header;
