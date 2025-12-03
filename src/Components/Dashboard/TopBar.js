import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Bars.css';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import { Menu } from '../../Context/MenuContext';
import { Axios } from '../../Api/Axios';
import { LOGOUT, USER } from '../../Api/Api';
import { Navigate } from 'react-router-dom';
import { DropdownButton, Dropdown } from 'react-bootstrap';
// import { Dropdown } from 'bootstrap/dist/js/bootstrap.bundle.min';
import Cookie from 'cookie-universal'
export default function TopBar() {
  const menu = useContext(Menu);
  const setIsOpen = menu.setIsOpen;
  const [name, setName] = useState('');
  const cookies = Cookie();
  const token = cookies.get('token');
  // fetch user data
  useEffect(() => {
    Axios.get(`${USER}`)
      .then((data) => setName(data.data.name))
      .catch((err) => Navigate('/login', { replace: true }))
  }, [])
  // logout function
  async function handleLogOut() {
    try {
      const res = await Axios.get(`/${LOGOUT}`);
      cookies.remove('e-commerce');
      window.location.pathname = '/login';
    } catch (err) {
      console.log(err);
    }

  }
  return (
    <div className="top-bar ">
      <div className='d-flex align-items-center justify-content-between h-100'>
        <div className='menu d-flex align-items-center gap-3'>


          <FontAwesomeIcon
            className="menu-icon"
            onClick={() => setIsOpen((prev) => !prev)}
            cursor={'pointer'}
            icon={faBars}
          />

          <h3 className='logo m-0'>Dashboard</h3>

        </div>
        <div className="d-flex justify-content-between align-items-center py-2">

          <div className="d-flex align-items-center gap-3">

            {/* Avatar */}
            <div
              className="d-flex align-items-center justify-content-center fw-bold"
              style={{
                width: '45px',
                height: '45px',
                borderRadius: '50%',
                backgroundColor: '#e7efff',
                color: '#0d6efd',
                fontSize: '16px',
                letterSpacing: '1px'
              }}
            >
              {name?.split(" ").map((word) => word[0]?.toUpperCase()).join("")}
            </div>

            {/* Name */}
            <p className="m-0 fw-semibold text-dark" style={{ fontSize: '15px', marginRight: '8px' }}>
              {name}
            </p>

          </div>

          {/* Dropdown */}
          <DropdownButton
            id="dropdown-basic-button"
            variant="light"
            size="sm"
          >
            <Dropdown.Item
              onClick={handleLogOut}
              className="text-danger fw-semibold"
            >
              Logout
            </Dropdown.Item>
          </DropdownButton>

        </div>


      </div>

    </div>
  );
}