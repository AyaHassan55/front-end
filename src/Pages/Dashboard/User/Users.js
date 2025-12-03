import { useEffect, useState } from "react";
import { USER, USERS } from "../../../Api/Api";
import { Axios } from "../../../Api/Axios";
import { Link } from "react-router-dom";
import TableShow from "../../../Components/Dashboard/Table";
import ToastMessage from "../../../Components/Dashboard/Toast";
import { faUsersSlash } from "@fortawesome/free-solid-svg-icons";
import PaginatedItems from "../../../Components/Dashboard/Pagination/Pagination";
export default function Users() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [loading,setLoading] = useState(false);
  // pagination
  const [limit,setLimit] = useState(3);
  const [page,setPage] = useState(1);
  const [total,setTotal] = useState(0);
  // search
  const pageName='users';


  // header of table
  const header = [

    { key: 'name', name: 'Username' },
    { key: 'email', name: 'Email' },
    { key: 'role', name: 'Role' },
    { key: 'created_at', name: 'Created' },
    { key: 'updated_at', name: 'Updated' },

  ];

  // get current user 
  useEffect(() => {
    Axios.get(`${USER}`).
    then((data) => setCurrentUser(data.data)).catch((err) => console.log(err))

  }, []);
  // display Users
  useEffect(() => {
    setLoading(true);
    Axios
      .get(`/${USERS}?page=${page}&limit=${limit}`)
 
      .then((data) => {
        setUsers(data.data.data);
        console.log(data.data)
        setTotal(data.data.total);
        setLoading(false)
      })

      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [limit, page]);

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
    <div className="bg-white p-4 w-100 rounded-3">
       {/* Header */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-4">
        <div>
          <h1 className="h3 fw-bold">Users Management</h1>
          <p className="text-muted mb-0">Manage and monitor all system users.</p>
        </div>
        <Link to={"/dashboard/users/add"} className="d-inline-block">
          <button className="btn btn-primary d-flex align-items-center gap-2">
             
            Add User
          </button>
        </Link>
      </div>
    
      <ToastMessage show={showToast} message={toastMessage} onClose={() => setShowToast(false)} />
     
      <TableShow
        tableName='users'
        header={header}
        data={users}
        delete={handleDelete}
        loading={loading}
        loadingMessage="Loading users..."
        currentUser={currentUser}
        emptyIcon={faUsersSlash}
        emptyTitle="No Users Found"
        emptySubTitle="It looks like there are no users in the system. Please add some users."
        //pass pagination to table
        limit={limit}
        total={total}
        setLimit={setLimit}
        page = {page}
        setPage={setPage}
        // search
        pageName={pageName}
         searchLink={USER}
      />
        


    </div>);
}
