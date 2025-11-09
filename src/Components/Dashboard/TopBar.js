import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Bars.css';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import { Menu } from '../../Context/MenuContext';
import { Axios } from '../../Api/Axios';
import { LOGOUT, USER } from '../../Api/Api';
import { Navigate } from 'react-router-dom';
import { DropdownButton,Dropdown } from 'react-bootstrap';
// import { Dropdown } from 'bootstrap/dist/js/bootstrap.bundle.min';
import Cookie from 'cookie-universal'
export default function TopBar() {
  const menu = useContext(Menu);
  const setIsOpen = menu.setIsOpen;
  const [name, setName] = useState('');
  const cookies = Cookie();
  const token = cookies.get('token');
// fetch user data
  useEffect(()=>{
    Axios.get(`${USER}`)
    .then((data)=> setName(data.data.name))
    .catch((err)=>Navigate('/login',{ replace: true}))
  },[])
// logout function
  async function handleLogOut() {
    try{
      const res = await Axios.get(`/${LOGOUT}`);
      cookies.remove('e-commerce');
      window.location.pathname = '/login';
    }catch(err){
      console.log(err);
    }
    
  }
   return (
    <div className="top-bar ">
      <div className='d-flex align-items-center justify-content-between h-100'>
        <div className='menu d-flex align-items-center gap-5'>
        
          <h3>E-commerce</h3>
          <FontAwesomeIcon onClick={() => setIsOpen((prev) => !prev)} cursor={'pointer'} icon={faBars} />
        </div>
        <div >
          <DropdownButton id="dropdown-basic-button" title={name}>
            <Dropdown.Item onClick={handleLogOut}>Logout</Dropdown.Item>
            
          </DropdownButton>
         
        </div>

      </div>
      
    </div>
  );
}