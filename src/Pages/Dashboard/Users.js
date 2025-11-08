import { useEffect, useState } from "react";
import { baseUrl, USERS } from "../../Api/Api";

import Cookie from "cookie-universal";
import { Table } from 'react-bootstrap';
import { Axios } from "../../Api/Axios";


export default function Users() {
  const [users, setUsers] = useState([]);
  const cookie = new Cookie();
  useEffect(() => {
    Axios
      .get(`/${USERS}`)

      .then((data) => setUsers(data.data))
      .catch((err) => console.log(err));
  }, []);

  const usersShow = users.map((user,key) => (<tr key={key}>
    <td>{key+1}</td>
    <td>{user.name}</td>
    <td>{user.email}</td>
  </tr>))
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
        {usersShow }

      </tbody>
    </Table>

  </div>);
}
