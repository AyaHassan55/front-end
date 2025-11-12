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

  const limit = 4;
  const [page, setPage] = useState(1);



  // display categories
  useEffect(() => {
    setLoading(true);
    Axios
      .get(`/${CATEGORIES}`)

      .then((data) => {
        setCategories(data.data);
        setLoading(false);

      })

      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
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


  const header = [
    { key: 'title', name: 'title' },
    { key: 'image', name: 'image' },
  ];
  return (
    <div className="bg-white p-2 w-100 rounded-3">
      <div className="d-flex align-items-center justify-content-between">
        <h3>Categories</h3>
        <Link to={"/dashboard/category/add"} className="btn btn-primary mb-3">Add Category</Link>
      </div>
      <ToastMessage show={showToast} message={toastMessage} onClose={() => setShowToast(false)} />

      <TableShow
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
        page={page}


        setPage={setPage}
      />




    </div>

  );
}
