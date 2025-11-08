import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../Api/Axios";
import { USER } from "../../Api/Api";
import LoadingSubmit from "../../Components/Loading/Loading";
import { Alert } from "bootstrap/dist/js/bootstrap.bundle.min";

export default function User() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [disable, setDisable] = useState(true);
    const [loading, setLoading] = useState(false);

    // id user
    const id = window.location.pathname.replace("/dashboard/users/", "");
    // get user data by id
    useEffect(() => {
        Axios.get(`${USER}/${id}`).then((data) => {
            setName(data.data.name);
            setEmail(data.data.email);
        }).then(() => setDisable(false));
    }, [])
    // handle form submit
    async function handleSubmit(e) {
        setLoading(true);
        e.preventDefault();

      
        try {
            const res = await Axios.post(`${USER}/edit/${id}`, {
                name: name,
                email: email
            });
            window.location.pathname = '/dashboard/users/'
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
                    <Form.Label>User Name</Form.Label>
                    <Form.Control value={name} required onChange={(e) => setName(e.target.value)} type="text" placeholder="Name..." />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleformInput2">
                    <Form.Label>Email</Form.Label>
                    <Form.Control value={email} required onChange={(e) => setEmail(e.target.value)} type="email" placeholder="name@example.com" />
                </Form.Group>
                <button disabled={disable} className="btn btn-primary">Save</button>
            </Form>
        </>
    );
}