import { useEffect, useState } from "react";
import { Axios } from "../../Api/Axios";
import { Form } from "react-bootstrap";
import { CATEGORY, USER } from "../../Api/Api";
import LoadingSubmit from "../../Components/Loading/Loading";
import { replace, useNavigate, useParams } from "react-router-dom";

export default function Category() {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [role, setRole] = useState('');
    const [disable, setDisable] = useState(true);
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();
    // 
    // --------id user-------------------------
    // const id =Number( window.location.pathname.replace("/dashboard/categories/", "")); =
      const {id} = useParams();
    // ------------------------------------
    // get categories data by id
    useEffect(() => {
        setLoading(true);
        Axios.get(`${CATEGORY}/${id}`).then((data) => {
            setTitle(data.data.title);
            setLoading(false);
        }).then(() => setDisable(false)).catch(() => nav('/dashboard/categories/404', { replace: true }));
    }, [])
    // handle form submit
    async function handleSubmit(e) {
        setLoading(true);
        e.preventDefault();

        const form = new FormData();
        form.append('title', title);
        form.append('image', image);
        try {
            const res = await Axios.post(`${CATEGORY}/edit/${id}`, form);
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
                    <Form.Label>Title</Form.Label>
                    <Form.Control value={title} required onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Title..." />
                </Form.Group>

                <Form.Group className="mb-3" controlId="image">
                    <Form.Label style={{ fontWeight: 'bold' }}>Product image</Form.Label>
                    <Form.Control required onChange={(e) => setImage(e.target.files[0])} type="file" />
                </Form.Group>

                <button disabled={disable} className="btn btn-primary mt-3">Save</button>
            </Form>
        </>
    );
}