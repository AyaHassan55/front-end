import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Bars.css';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { Menu } from '../../Context/MenuContext';
export default function SideBar() {
  const menu = useContext(Menu);
  const isOpen = menu.isOpen;
  return (
    <div className='side-bar pt-3' style={{ width: isOpen ? '250px' : 'fit-content' }}>
      <NavLink to={"users"} className="d-flex align-items-center gap-2 side-bar-link">
        <FontAwesomeIcon style={{ padding: isOpen ? "10px 8px 10px 15px" : "10px 4px" }} icon={faUsers} />
        <p className='m-0' style={{ display: isOpen ? "block" : "none" }}>Users</p>
      </NavLink>

    </div>
  );
}