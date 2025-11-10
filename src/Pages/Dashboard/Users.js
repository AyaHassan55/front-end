import { useEffect, useState } from "react";
import { USER, USERS } from "../../Api/Api";


import { Spinner, Table } from 'react-bootstrap';
import { Axios } from "../../Api/Axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faUsersSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import TableShow from "../../Components/Dashboard/Table";


export default function Users() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [userDelete, setUserDelete] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);


  // get current user 
  useEffect(() => {
    Axios.get(`${USER}`).then((data) => setCurrentUser(data.data)).catch((err) => console.log(err))

  }, []);
  // display Users
  useEffect(() => {
    setLoading(true);
    Axios
      .get(`/${USERS}`)

      .then((data) => {
        setUsers(data.data);
        setLoading(false)
      })

      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [userDelete]);

  const header=[
    {
      key:'id',
      name:'id'},
    {key:'name',name:'Username'},
    {key:'email',name:'Email'},
    {key:'role',name:'Role'},
    
  ];
  const usersShow = users.map((user, key) => (<tr key={key}>
    <td>{key + 1}</td>
    <td>{user.name === currentUser.name ? user.name + '(You)' : user.name}</td>
    <td>{user.email}</td>
    <td>{user.role === '1995' ? 'Admin' : user.role === '2001' ? 'User' : 'Writer'}</td>
    <td >
      <div className="d-flex align-items-center justify-content-center gap-2">
        <Link to={`${user.id}`}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </Link>
        {currentUser.name !== user.name  && (<FontAwesomeIcon onClick={() => handleDelete(user.id)} 
        cursor={'pointer'} color="#bb0f0f" icon={faTrash} />)}
      </div>
    </td>
  </tr>))

  // delete User
  async function handleDelete(id) {
    if (currentUser.id !== id) {
      try {
        const res = await Axios.delete(`${USER}/${id}`);
        setUserDelete((prev) => !prev);
        setToastMessage('User deleted successfully');
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          setToastMessage("");
        }, 5000)

      } catch (err) {
        console.log(err);
      }
    }
  }
  return (
    <div className="bg-white p-2 w-100 rounded-3">
      <div className="d-flex align-items-center justify-content-between">
        <h3>Users</h3>
        <Link to={"/dashboard/user/add"} className="btn btn-primary mb-3">Add User</Link>
      </div>
      <div
        className="toast-container position-fixed top-0 end-0 p-3"
        style={{ zIndex: 9999 }}
      >
        <div className={`toast align-items-center text-white bg-success border-0 show ${showToast ? "show" : "hide"}`} role="alert">
          <div className="d-flex">
            <div className="toast-body">
              {toastMessage}
            </div>
            <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => setShowToast(false)}></button>
          </div>
        </div>
      </div>

      {/* Empty state design */}
      {loading ? (
        (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" role="status" />
            <p className="mt-3 text-secondary fw-semibold">Loading users...</p>
          </div>
        )
      ) :
        users.length === 0 ? (
          <div className="empty-state text-center">
            <FontAwesomeIcon icon={faUsersSlash} size="3x" color="#ddd" />
            <h5>No Users Found</h5>
            <p>It looks like there are no users in the system. Please add some users.</p>
          </div>
        ) :

          (
            <TableShow header={header} data={users} />
           )} 


    </div>);
}
