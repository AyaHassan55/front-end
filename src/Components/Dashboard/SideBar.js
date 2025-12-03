import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Bars.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Menu } from '../../Context/MenuContext';
import { WindowSize } from '../../Context/WindowContext';
import { USER } from '../../Api/Api';
import { Axios } from '../../Api/Axios';
import { links } from './NavLink';
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
        display: windowSize < 768 && isOpen ? 'block' : 'none'
        ,zIndex:'9999'
      }}>
      </div >
      <div className={`side-bar pt-3 ${isOpen ? 'open' : 'closed'}`}
     style={{
       position: windowSize < 768 ? "fixed" : "sticky",
     }}>

        {links.map((link, key) => {
          if (link.items) {
            return (
              <div key={key}>
                {link.label && <p className=" fw-semibold text-primary text-uppercase px-4 mb-3 mt-3"
                 style={{ fontSize: '14px' }}>{isOpen ? link.label : ''}</p>}
                {
                  link.items.map((item, i) => {
                    const roles = Array.isArray(item.role) ? item.role : [item.role];
                    if (!roles.includes(user.role)) return null;
                    return (
                      <NavLink key={i} to={item.path} className="d-flex align-items-center gap-2 side-bar-link">
                        <FontAwesomeIcon style={{ padding: isOpen ? "10px 8px 10px 15px" : "10px 4px", }} size='14px' icon={item.icon} />
                        <p className='m-0' style={{ display: isOpen ? "block" : "none", fontSize: '14px' }}>{item.name}</p>
                      </NavLink>
                    );

                  })
                }
              </div>
            );
          } else {
            const roles = Array.isArray(link.role) ? link.role : [link.role];
            if (!roles.includes(user.role)) return null;

            return (
              <NavLink
                key={key}
                to={link.path || "/dashboard"}
                end
                className="d-flex align-items-center gap-2 side-bar-link"
              >
                <FontAwesomeIcon
                  style={{ padding: isOpen ? "10px 8px 10px 15px" : "10px 4px" }}
                  icon={link.icon}
                />
                <p className='m-0' style={{ display: isOpen ? "block" : "none", fontSize: '14px' }}>{link.name}</p>
              </NavLink>);
          }
        }




        )}




        {/* footer */}
        <div className="p-3 border-top border-muted mt-5">
         {isOpen? <p className="small text-center mb-0 text-primary">
            © 2025 Admin Dashboard. All rights reserved.
          </p> :<p></p>}
        </div>


      </div>


    </>
  );
}