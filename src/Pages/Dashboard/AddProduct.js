import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../Api/Axios";
import { CATEGORIES, CATEGORY, PRODUCT, PRODUCTS, USER } from "../../Api/Api";
import LoadingSubmit from "../../Components/Loading/Loading";



export default function AddProduct() {
    const [form,setForm] =useState({
        category:'',
        title:'',
        description:'',
        price:'',
        discount:'',
        About:'',
    })
    const [image,setImage] = useState('');
    const [categories,setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

     // useRef-----------------------
        const focus =useRef("");
        useEffect(()=>{
            focus.current.focus();
        },[])
    //  handel change -----------------------------
    function handleChange(e){
        setForm({...form,[e.target.name]:e.target.value})
    }
    // get all categories
    useEffect(()=>{
        Axios.get(`/${CATEGORIES}`)
        .then((data)=>setCategories(data.data)).catch((err)=>console.log(err))
    },[])


    // handle form submit
    async function handleSubmit(e) {
        // setLoading(true);
        // e.preventDefault();

        // const form =new FormData();
        // form.append('category',category);
        // form.append('title',title);
        // form.append('description',description);
        // form.append('price',price);
        // form.append('discount',discount);
        // form.append('a',discount);

      
        // try {
        //     const res = await Axios.post(`${PRODUCT}/add`, form);
        //     window.location.pathname = '/dashboard/product/'
        // } catch (err) {
        //     setLoading(false);
        //     console.log(err);
        // }
    }

    // categories show
    const categoriesShow =categories.map((item,key) =>(
        <option key={key} value={item.id}>{item.title}</option>
    ))
    return (
        <>
            {loading && <LoadingSubmit />}

            <Form className="bg-white w-100  p-3" 
            onSubmit={handleSubmit}
            >
                <Form.Group className="mb-3" controlId="category">
                    <Form.Label style={{fontWeight:'bold'}}>Category</Form.Label>
                    <Form.Select name="category" value={form.category}  
                    onChange={handleChange}  placeholder="Category..."  ref={focus}>
                        {categoriesShow}
                    </Form.Select>
                </Form.Group>
                {/* ---------------------------------------- */}
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label style={{fontWeight:'bold'}}>Title</Form.Label>
                    <Form.Control name="title" value={form.title} required onChange={handleChange} type="text" placeholder="Title..."  />
                </Form.Group>
                {/* ---------------------------------------- */}
                 <Form.Group className="mb-3" controlId="description">
                    <Form.Label style={{fontWeight:'bold'}}>Description</Form.Label>
                    <Form.Control name="description" value={form.description} required onChange={handleChange} type="text" placeholder="Description..."  />
                </Form.Group>
                {/* ---------------------------------------- */}
                 <Form.Group className="mb-3" controlId="price">
                    <Form.Label style={{fontWeight:'bold'}}>Price</Form.Label>
                    <Form.Control name="price"  value={form.price} required onChange={handleChange} type="text" placeholder="Price..."  />
                </Form.Group>
                {/* ---------------------------------------- */}
                 <Form.Group className="mb-3" controlId="discount">
                    <Form.Label style={{fontWeight:'bold'}}>Discount</Form.Label>
                    <Form.Control name="discount"  value={form.discount} required onChange={handleChange} type="text" placeholder="Discount..."  />
                </Form.Group>
                {/* ---------------------------------------- */}
                 <Form.Group className="mb-3" controlId="About">
                    <Form.Label style={{fontWeight:'bold'}}>About</Form.Label>
                    <Form.Control name="About" value={form.About} required onChange={handleChange} type="text" placeholder="About..."  />
                </Form.Group>
                {/* ---------------------------------------- */}
                

               
                <button 
                    // disabled={title.length > 1  ? false:true}
                    className="btn btn-primary mt-3">Save
                </button>
            </Form>
        </>
    );
}