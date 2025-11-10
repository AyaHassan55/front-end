import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../Api/Axios";
import { CATEGORIES, CATEGORY, PRODUCT, PRODUCTS, USER } from "../../Api/Api";
import LoadingSubmit from "../../Components/Loading/Loading";
import { useNavigate } from "react-router-dom";



export default function AddProduct() {
    const [form, setForm] = useState({
        category: 'Select Category',  // value same in option disabled
        title: '',
        description: '',
        price: '',
        discount: '',
        About: '',
    })
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    // useRef-----------------------
    const focus = useRef("");
    useEffect(() => {
        focus.current.focus();
    }, [])
    //  handel change -----------------------------
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    // get all categories
    useEffect(() => {
        Axios.get(`/${CATEGORIES}`)
            .then((data) => setCategories(data.data)).catch((err) => console.log(err))
    }, [])
    // console.log(images)

    // handle form submit
    async function handleSubmit(e) {
        setLoading(true);
        e.preventDefault();


        try {
            const dataForm = new FormData();
            dataForm.append('category', form.category);
            dataForm.append('description', form.description);
            dataForm.append('About', form.About);
            dataForm.append('discount', form.discount);
            dataForm.append('price', form.price);
            dataForm.append('title', form.title);
            for (let i = 0; i < images.length; i++) {
                dataForm.append('images[]', images[i])
            }

            const res = await Axios.post(`${PRODUCT}/add`, dataForm);

            nav('/dashboard/products/');
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    }

    // categories show
    const categoriesShow = categories.map((item, key) => (
        <option key={key} value={item.id}>{item.title}</option>
    ))
    // mapping imgs
    const imgShow = images.map((img, key) =>
        <div className="d-flex align-items-center justify-content-start gap-2 p-2 border w-100">
            <img key={key} src={URL.createObjectURL(img)} width={'100px'}/>
            <div>
                <p className="mb-1">{img.name}</p>
                <p>{img.size}</p>
            </div>
        </div>
    )
    return (
        <>
            {loading && <LoadingSubmit />}

            <Form className="bg-white w-100  p-3"
                onSubmit={handleSubmit}
            >
                <Form.Group className="mb-3" controlId="category">
                    <Form.Label style={{ fontWeight: 'bold' }}>Category</Form.Label>
                    <Form.Select name="category" value={form.category}
                        onChange={handleChange} placeholder="Category..." ref={focus}>
                        <option disabled>Select Category</option>
                        {categoriesShow}
                    </Form.Select>
                </Form.Group>
                {/* ---------------------------------------- */}
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label style={{ fontWeight: 'bold' }}>Title</Form.Label>
                    <Form.Control name="title" value={form.title} required onChange={handleChange} type="text" placeholder="Title..." />
                </Form.Group>
                {/* ---------------------------------------- */}
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label style={{ fontWeight: 'bold' }}>Description</Form.Label>
                    <Form.Control name="description" value={form.description} required onChange={handleChange} type="text" placeholder="Description..." />
                </Form.Group>
                {/* ---------------------------------------- */}
                <Form.Group className="mb-3" controlId="price">
                    <Form.Label style={{ fontWeight: 'bold' }}>Price</Form.Label>
                    <Form.Control name="price" value={form.price} required onChange={handleChange} type="text" placeholder="Price..." />
                </Form.Group>
                {/* ---------------------------------------- */}
                <Form.Group className="mb-3" controlId="discount">
                    <Form.Label style={{ fontWeight: 'bold' }}>Discount</Form.Label>
                    <Form.Control name="discount" value={form.discount} required onChange={handleChange} type="text" placeholder="Discount..." />
                </Form.Group>
                {/* ---------------------------------------- */}
                <Form.Group className="mb-3" controlId="About">
                    <Form.Label style={{ fontWeight: 'bold' }}>About</Form.Label>
                    <Form.Control name="About" value={form.About} required onChange={handleChange} type="text" placeholder="About..." />
                </Form.Group>
                {/* ---------------------------------------- */}
                <Form.Group className="mb-3" controlId="images">
                    <Form.Label style={{ fontWeight: 'bold' }}>Images</Form.Label>
                    <Form.Control
                        multiple  //to can add more than image
                        onChange={(e) => setImages([...e.target.files])} type="file" />
                </Form.Group>
                {/* ---------------------------------------- */}
                <div className="d-flex flex-column align-items-start gap-2">{imgShow}</div>


                <button
                    // disabled={title.length > 1  ? false:true}
                    className="btn btn-primary mt-3">Save
                </button>
            </Form>
        </>
    );
}