import { useEffect, useState } from "react";
import { PRODUCT, PRODUCTS } from "../../../Api/Api";
import { Axios } from "../../../Api/Axios";
import { faBoxOpen, faFolderOpen, faPenToSquare, faTrash, faUsersSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import TableShow from "../../../Components/Dashboard/Table";
import ToastMessage from "../../../Components/Dashboard/Toast";


export default function Products() {
  const [products, setProducts] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);


  
  // display products
  useEffect(() => {
    setLoading(true);
    Axios
      .get(`/${PRODUCTS}`)

      .then((data) => {
        setProducts(data.data);
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
      const res = await Axios.delete(`${PRODUCT}/${id}`);
      setProducts((prev) => prev.filter((item) => item.id !== id));
      setToastMessage('Product deleted successfully');
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
        setToastMessage("");
      }, 5000)

    } catch (err) {
      console.log(err);
    }

  }
console.log(products)
 
const header = [
    {key:'title',name:'Title'},
    {key:'description',name:'Description'},
    {key:'price',name:'Price'},
    {key:'rating',name:'Rating'},
];
  return (
    <div className="bg-white p-2 w-100 rounded-3">
          <div className="d-flex align-items-center justify-content-between">
            <h3>Products</h3>
            <Link to={"/dashboard/product/add"} className="btn btn-primary mb-3">Add Product</Link>
          </div>
          <ToastMessage show={showToast} message={toastMessage} onClose={() => setShowToast(false)} />
    
          <TableShow
            header={header}
            data={products}
            delete={handleDelete}
            loading={loading}
            loadingMessage="Loading Products..."
            emptyIcon={faBoxOpen}
            emptyTitle="No Products Found"
            emptySubTitle="It looks like there are no products in the system. Please add some products."
          />
            
    
    
        </div>
    
);
}
