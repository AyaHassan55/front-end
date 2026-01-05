import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Axios } from "../../../Api/Axios";
import { CATEGORIES, CATEGORY, PRODUCT, PRODUCTS, USER } from "../../../Api/Api";
import LoadingSubmit from "../../../Components/Loading/Loading";
import { useNavigate } from "react-router-dom";



export default function AddProduct() {
    const [form, setForm] = useState({
        category: 'Select Category',  // value same in option disabled
        title: '',
        description: '',
        price: '',
        discount: '',
        About: '',
        
    });
    const dummyForm = {
        category: null,
        title: 'dummy',
        description: 'dummy',
        price: 222,
        discount: 0,
        About: 'About',
        Stock:0,
    }
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [send, setSend] = useState(false);
    const [id, setId] = useState();
    const [uploading, setUploading] = useState(0);
    const nav = useNavigate();

    // useRef-----------------------
    const openImg = useRef(null);



    const progress = useRef([]);
    const ids = useRef([]); // use in delete img
    console.log(`======== ${ids}`);
    // -----
    const focus = useRef("");
    useEffect(() => {
        focus.current.focus();
    }, [])

     function handleOpenImage() {
      openImg.current.click();
  }
    //  handel change -----------------------------
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
        setSend(1);
        if (send !== 1) {
            handleSubmitForm()
        }
    }
    // get all categories
    useEffect(() => {
        Axios.get(`/${CATEGORIES}`)
            .then((data) => setCategories(data.data)).catch((err) => console.log(err))
    }, [])
    // console.log(images)

    // handle form edit
    async function handleEdit(e) {
        setLoading(true);
        e.preventDefault();


        try {
            const res = await Axios.post(`${PRODUCT}/edit/${id}`, form);

            nav('/dashboard/products/');
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    }
    // handle submit formdummy
    async function handleSubmitForm(e) {


        try {

            const res = await Axios.post(`${PRODUCT}/add`, dummyForm);

            setId(res.data.id);
            console.log(`new product id : ${res.data.id}`);
            // nav('/dashboard/products/');
             
        } catch (err) {

            console.log(err);
        }
        
    }
    // categories show
    const categoriesShow = categories.map((item, key) => (
        <option key={key} value={item.id}>{item.title}</option>
    ))
    // delete img
    async function handleDeleteImage(id,img) {
        const findId = ids.current[id];
        try{
            const res = await Axios.delete(`product-img/${findId}`);
            setImages((prev) => prev.filter((image)=> image != img));
            ids.current=ids.current.filter((i)=> i != id); 
            --j.current; // it solves issue adding img after delete after delete another
        }catch(err){
            console.log(err)
        }
    }
    // handle imgs 
    const j = useRef(-1);
    async function handelImagesChange(e) {

        setImages((prev) => [...prev, ...e.target.files]);
        const imagesAsFiles = e.target.files;
        const data = new FormData();
        for (let i = 0; i < imagesAsFiles.length; i++) {
            j.current++;
            data.append('image', imagesAsFiles[i]);
            data.append('product_id', id);

            try {
                const res = await Axios.post("/product-img/add", data, {
                    onUploadProgress: (ProgressEvent) => {
                        const { loaded, total } = ProgressEvent;
                        const percent = Math.floor((loaded * 100) / total);

                        if (percent % 10 === 0) {
                            progress.current[j.current].style.width = `${percent}%`
                            progress.current[j.current].setAttribute('percent', `${percent}%`);
                        }

                    }
                });
                console.log(`result : ${res}`);
                ids.current[j.current] = res.data.id;
            } catch (err) {
                console.log(err);
            }


        }

    }
    
    // mapping imgs
    const imgShow = images.map((img, key) =>
        <div key={key} className="uploaded-image border p-2 w-100">
            <div className="d-flex align-items-center justify-content-between">
                <div className="image-info d-flex align-items-center justify-content-start gap-2 ">
                    <img key={key} src={URL.createObjectURL(img)} width={'100px'} />
                    <div className="image-details">
                        <p className="mb-1">{img.name}</p>
                        <p>{(img.size / 1024 < 900 ? (img.size / 1024).toFixed(2) + 'KB'
                            : (img.size / (1024 * 1024)).toFixed(2) + 'MB')}</p>
                    </div>
                    
                </div>
                <Button onClick={()=> handleDeleteImage(key,img)}  variant='danger'>Delete</Button>
                
            </div>
            <div className="custom-progress mt-3">
                <span
                    ref={(e) => progress.current[key] = e}
                    style={{ position: 'relative' }} className="inner-progress"></span>
            </div>
        </div>
    )
    return (
        <>
            {loading && <LoadingSubmit />}

            <Form className="bg-white w-100  p-3"
                onSubmit={handleEdit}
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
                    <Form.Control name="title" value={form.title}
                        disabled={!send} required onChange={handleChange} type="text" placeholder="Title..." />
                </Form.Group>
                {/* ---------------------------------------- */}
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label style={{ fontWeight: 'bold' }}>Description</Form.Label>
                    <Form.Control name="description" value={form.description} disabled={!send} required onChange={handleChange} type="text" placeholder="Description..." />
                </Form.Group>
                {/* ---------------------------------------- */}
                <Form.Group className="mb-3" controlId="price">
                    <Form.Label style={{ fontWeight: 'bold' }}>Price</Form.Label>
                    <Form.Control name="price" value={form.price} disabled={!send} required onChange={handleChange} type="text" placeholder="Price..." />
                </Form.Group>
                {/* ---------------------------------------- */}
                <Form.Group className="mb-3" controlId="discount">
                    <Form.Label style={{ fontWeight: 'bold' }}>Discount</Form.Label>
                    <Form.Control name="discount" value={form.discount} disabled={!send} required onChange={handleChange} type="text" placeholder="Discount..." />
                </Form.Group>
                {/* ---------------------------------------- */}
                <Form.Group className="mb-3" controlId="About">
                    <Form.Label style={{ fontWeight: 'bold' }}>About</Form.Label>
                    <Form.Control name="About" value={form.About} disabled={!send} required onChange={handleChange} type="text" placeholder="About..." />
                </Form.Group>
                {/* ---------------------------------------- */}
                <Form.Group className="mb-3" controlId="Stock">
                    <Form.Label style={{ fontWeight: 'bold' }}>Stock</Form.Label>
                    <Form.Control name="Stock" value={form.Stock} disabled={!send} required onChange={handleChange} type="number" placeholder="Stock..." />
                </Form.Group>
                {/* ---------------------------------------- */}
                <Form.Group className="mb-3" controlId="images">
                    <Form.Label style={{ fontWeight: 'bold' }}>Images</Form.Label>
                    <Form.Control
                        ref={openImg}
                        hidden
                        multiple  //to can add more than image
                        onChange={handelImagesChange} type="file" />
                </Form.Group>
                {/* ---------------------------------------- */}

                {/* ----------------------------------------- */}
                <div className="d-flex align-items-center justify-content-center gap-2 py-2 w-100 flex-column rounded mb-2 "
                    style={{ border: !send ? "2px dashed gray" : '2px dashed #0036fe', cursor: send && 'pointer' }} onClick={() => openImg.current.click()}>
                    <img width={'100px'} src={require("../../../Assets/images/upload.png")} alt="upload.png" style={{ filter: !send && 'grayscale(1)' }}></img>
                    <p className="fw-bold mb-0" style={{ color: !send ? 'grey' : '#0036fe' }}>upload image</p>
                </div>
                {/* ---------------------------------------------------------------------- */}
                <div className="d-flex flex-column align-items-start gap-2">{imgShow}</div>

                <button
                    // disabled={title.length > 1  ? false:true}
                    className="btn btn-primary mt-3">Save
                </button>
            </Form>
        </>
    );
}