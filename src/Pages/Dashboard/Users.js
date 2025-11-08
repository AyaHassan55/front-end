import { useEffect, useState } from "react";
import {  USERS } from "../../Api/Api";


import { Table } from 'react-bootstrap';
import { Axios } from "../../Api/Axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";


export default function Users() {
  const [users, setUsers] = useState([]);
 
  useEffect(() => {
    Axios
      .get(`/${USERS}`)

      .then((data) => setUsers(data.data))
      .catch((err) => console.log(err));
  }, []);

 
  const usersShow = users.map((user, key) => (<tr key={key}>
    <td>{key + 1}</td>
    <td>{user.name}</td>
    <td>{user.email}</td>
    <td >
      <div className="d-flex align-items-center justify-content-center gap-2">
        <Link to ={`${user.id}`}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </Link>
        <FontAwesomeIcon onClick={handleDelete} color="#bb0f0f" icon={faTrash} />
      </div>
    </td>
  </tr>))

   // delete User
  function handleDelete(){
    
  }
  return (<div className="bg-white p-2 w-100 rounded-3">
    <h4>Users</h4>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th style={{}}>id</th>

          <th>Username</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {usersShow}

      </tbody>
    </Table>

  </div>);
}
