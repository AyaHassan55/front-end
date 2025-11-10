import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../Api/Axios";
import { USER } from "../../Api/Api";
import LoadingSubmit from "../../Components/Loading/Loading";
import { replace, useNavigate } from "react-router-dom";

export default function User() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [disable, setDisable] = useState(true);
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();
    // id user
    const id = Number(window.location.pathname.replace("/dashboard/users/", ""));
    // get user data by id
    useEffect(() => {
        setLoading(true);
        Axios.get(`${USER}/${id}`).then((data) => {
            setName(data.data.name);
            setEmail(data.data.email);
            setRole(data.data.role);
            setLoading(false);
        }).then(() => setDisable(false)).catch(() => nav('/dashboard/users/404', { replace: true }));
    }, [])
    // handle form submit
    async function handleSubmit(e) {
        setLoading(true);
        e.preventDefault();

      
        try {
            const res = await Axios.post(`${USER}/edit/${id}`, {
                name: name,
                email: email,
                role: role
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
                <Form.Label>Role</Form.Label>
                <Form.Select value={role}  onChange={(e) => setRole(e.target.value)}>
                    
                    <option disabled value=''>Select Role</option>
                    <option value='2001'>User</option>
                    <option value='1995'>Admin</option>        
                    <option value='1996'>Writer</option>
                </Form.Select>
                <button disabled={disable} className="btn btn-primary mt-3">Save</button>
            </Form>
        </>
    );
}