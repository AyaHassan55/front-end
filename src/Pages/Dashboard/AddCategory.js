import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../Api/Axios";
import { CATEGORY, USER } from "../../Api/Api";
import LoadingSubmit from "../../Components/Loading/Loading";


export default function AddCategory() {
    const [title,setTitle] = useState("");
    const [image,setImage] = useState('');
    const [loading, setLoading] = useState(false);

     // useRef-----------------------
        const focus =useRef("");
        useEffect(()=>{
            focus.current.focus();
        },[])
        // -----------------------------


    // handle form submit
    async function handleSubmit(e) {
        setLoading(true);
        e.preventDefault();

        const form =new FormData();
        form.append('title',title);
        form.append('image',image);

      
        try {
            const res = await Axios.post(`${CATEGORY}/add`, form);
            window.location.pathname = '/dashboard/categories/'
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    }
    return (
        <>
            {loading && <LoadingSubmit />}

            <Form className="bg-white w-100  p-3" onSubmit={handleSubmit}>
                
                <Form.Group className="mb-3" controlId="exampleformInput1">
                    <Form.Label style={{fontWeight:'bold'}}>Title</Form.Label>
                    <Form.Control  value={title} required onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Title..."  ref={focus}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="image">
                    <Form.Label style={{fontWeight:'bold'}}>Product image</Form.Label>
                    <Form.Control  required onChange={(e) => setImage(e.target.files[0])} type="file"  />
                </Form.Group>

               
                <button 
                    disabled={title.length > 1 ? false:true}
                    className="btn btn-primary mt-3">Save
                </button>
            </Form>
        </>
    );
}