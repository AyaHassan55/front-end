import { useEffect, useState } from "react";
import { CATEGORIES, CATEGORY } from "../../../Api/Api";

import { Axios } from "../../../Api/Axios";

import { faFolderOpen, faPenToSquare, faTrash, faUsersSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import TableShow from "../../../Components/Dashboard/Table";
import ToastMessage from "../../../Components/Dashboard/Toast";


export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);

  // limit of pagination

  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(4);
  const [total, setTotal] = useState(0);

  // search filter
  const pageName = 'categories';
  

  const header = [
    { key: 'title', name: 'title' },
    { key: 'image', name: 'image' },
    { key: 'created_at', name: 'Created' },
    { key: 'updated_at', name: 'Updated' },
  ];


  // display categories
  useEffect(() => {
    setLoading(true);
    Axios
      .get(`/${CATEGORIES}?limit=${limit}&page=${page}`)

      .then((data) => {
        setCategories(data.data.data);
        setTotal(data.data.total);
        setLoading(false);


      })

      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [limit, page]);          // useEffect will open if limit , page change


  // delete Category
  async function handleDelete(id) {

    try {
      const res = await Axios.delete(`${CATEGORY}/${id}`);
      setCategories((prev) => prev.filter((item) => item.id !== id));
      setToastMessage('Category deleted successfully');
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
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-4">
        <div>
          <h1 className="h3 fw-bold">Categories Management</h1>
          <p className="text-muted mb-0">Create and manage product categories.</p>
        </div>
        <Link to={"/dashboard/category/add"} className="d-inline-block">
          <button className="btn btn-primary d-flex align-items-center gap-2">
             
            Add Category
          </button>
        </Link>
        {/* <Link to={"/dashboard/category/add"} className="btn btn-primary mb-3">Add Category</Link> */}
      </div>
      <ToastMessage show={showToast} message={toastMessage} onClose={() => setShowToast(false)} />
    
      <TableShow

        tableName='categories'
        header={header}
        data={categories}
        delete={handleDelete}
        loading={loading}
        loadingMessage="Loading Categories..."
        emptyIcon={faFolderOpen}
        emptyTitle="No Categories Found"

        emptySubTitle="It looks like there are no categories in the system. Please add some categories."
        // pagination
        limit={limit}
        total={total}
        setLimit={setLimit}
        page={page}
        setPage={setPage}
        // search
        pageName={pageName}
        searchLink={CATEGORY}
      />




    </div>

  );
}
