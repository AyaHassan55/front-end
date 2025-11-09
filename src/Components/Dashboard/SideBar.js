import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Bars.css';
import { faPlus, faUsers } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Menu } from '../../Context/MenuContext';
import { WindowSize } from '../../Context/WindowContext';
import { USER } from '../../Api/Api';
import { Axios } from '../../Api/Axios';
export default function SideBar() {
  const menu = useContext(Menu);
  const WindowContext = useContext(WindowSize);
  const windowSize = WindowContext.windowSize;

  const isOpen = menu.isOpen;
  const [user, setUser] = useState("");
  const Navigate = useNavigate();

  useEffect(() => {
    Axios.get(`/${USER}`, {

    }).then((data) => setUser(data.data)).catch(() => {
      Navigate('/login', { replace: true })
    });
  }, [])
  return (
    <>
      <div style={{
        position: 'fixed', top: '70px', left: '0', width: '100%', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.2)',
        display: windowSize < '768' && isOpen ? 'block' : 'none'
      }}>
      </div >
      <div className='side-bar pt-3'
        style={{
          left: windowSize < '768' ? (isOpen ? 0 : '-100%') : 0,
          width: isOpen ? '250px' : 'fit-content',
          position: windowSize < '768' ? 'fixed' : 'sticky',
        }}>
        {user.role === '1995' ? <>
          <NavLink to={"users"} className="d-flex align-items-center gap-2 side-bar-link">
            <FontAwesomeIcon style={{ padding: isOpen ? "10px 8px 10px 15px" : "10px 4px" }} icon={faUsers} />
            <p className='m-0' style={{ display: isOpen ? "block" : "none" }}>Users</p>
          </NavLink>

          <NavLink to={"/dashboard/user/add"} className="d-flex align-items-center gap-2 side-bar-link">
            <FontAwesomeIcon style={{ padding: isOpen ? "10px 8px 10px 15px" : "10px 4px" }} icon={faPlus} />
            <p className='m-0' style={{ display: isOpen ? "block" : "none" }}>Add user</p>
          </NavLink>

           <NavLink to={"/dashboard/writer"} className="d-flex align-items-center gap-2 side-bar-link">
            <FontAwesomeIcon style={{ padding: isOpen ? "10px 8px 10px 15px" : "10px 4px" }} icon={faPlus} />
            <p className='m-0' style={{ display: isOpen ? "block" : "none" }}>Writer</p>
          </NavLink>
        </> 
        : user.role === '1996'&& (
          <NavLink to={"/dashboard/writer"} className="d-flex align-items-center gap-2 side-bar-link">
            <FontAwesomeIcon style={{ padding: isOpen ? "10px 8px 10px 15px" : "10px 4px" }} icon={faPlus} />
            <p className='m-0' style={{ display: isOpen ? "block" : "none" }}>Writer</p>
          </NavLink>
        )  }


      </div>
    </>
  );
}