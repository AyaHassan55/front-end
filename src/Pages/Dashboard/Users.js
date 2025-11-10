import { useEffect, useState } from "react";
import { USER, USERS } from "../../Api/Api";
import { Spinner } from 'react-bootstrap';
import { Axios } from "../../Api/Axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import TableShow from "../../Components/Dashboard/Table";
import ToastMessage from "../../Components/Dashboard/Toast";
import { faUsersSlash } from "@fortawesome/free-solid-svg-icons";
import EmptyState from "../../Components/Dashboard/EmptyState";


export default function Users() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);


  const header = [

    { key: 'name', name: 'Username' },
    { key: 'email', name: 'Email' },
    { key: 'role', name: 'Role' },

  ];

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
  }, []);

  // delete User
  async function handleDelete(id) {

    try {
      const res = await Axios.delete(`${USER}/${id}`);
      setUsers((prev) => prev.filter((item) => item.id !== id));
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

  return (
    <div className="bg-white p-2 w-100 rounded-3">
      <div className="d-flex align-items-center justify-content-between">
        <h3>Users</h3>
        <Link to={"/dashboard/user/add"} className="btn btn-primary mb-3">Add User</Link>
      </div>
      <ToastMessage show={showToast} message={toastMessage} onClose={() => setShowToast(false)} />

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
          <EmptyState>
            icon={faUsersSlash}
            title="No Users Found"
            subTitle="It looks like there are no users in the system. Please add some users."
          </EmptyState>
        ) :

          (
            <TableShow header={header} data={users} delete={handleDelete}
              currentUser={currentUser}
            />
          )}


    </div>);
}
