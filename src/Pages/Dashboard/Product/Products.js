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

  // pagination
  // const limit=5;
  const [limit,setLimit] = useState(4)
  const [page,setPage] = useState(4);
  const [total,setTotal]=useState(0);

  // search
  const pageName='products';


  const header = [
     {key:'images',name:'images'},
    {key:'title',name:'Title'},
    {key:'description',name:'Description'},
    {key:'price',name:'Price'},
    {key:'rating',name:'Rating'},
    { key: 'created_at', name: 'Created' },
    { key: 'updated_at', name: 'Updated' },
];
  // display products
  useEffect(() => {
    setLoading(true);
    Axios
      .get(`/${PRODUCTS}?limit=${limit}&page=${page}`)

      .then((data) => {
        setProducts(data.data.data);
        setTotal(data.data.total)
        
        setLoading(false);
        
      })

      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [limit,page]);

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
 

  return (
    <div className="bg-white p-2 w-100 rounded-3">
          <div className="d-flex align-items-center justify-content-between">
            <h3>Products</h3>
            <Link to={"/dashboard/product/add"} className="btn btn-primary mb-3">Add Product</Link>
          </div>
          <ToastMessage show={showToast} message={toastMessage} onClose={() => setShowToast(false)} />
    
      <TableShow
        tableName='products'
        header={header}
        data={products}
        delete={handleDelete}
        loading={loading}
        loadingMessage="Loading Products..."
        emptyIcon={faBoxOpen}
        emptyTitle="No Products Found"
        emptySubTitle="It looks like there are no products in the system. Please add some products."

        //pass pagination to table
        limit={limit}
        setLimit={setLimit}
        total={total}
        page={page}
        setPage={setPage}

        pageName={pageName}
         searchLink={PRODUCT}
      />
            
    
    
        </div>
    
);
}
