import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../Api/Axios";
import { USER } from "../../Api/Api";
import LoadingSubmit from "../../Components/Loading/Loading";


export default function AddUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
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

      
        try {
            const res = await Axios.post(`${USER}/add`, {
                name: name,
                email: email,
                password: password,
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
                    <Form.Control value={name} required onChange={(e) => setName(e.target.value)} type="text" placeholder="Name..." ref={focus} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleformInput2">
                    <Form.Label>Email</Form.Label>
                    <Form.Control value={email} required onChange={(e) => setEmail(e.target.value)} type="email" placeholder="name@example.com" />
                </Form.Group>

                 <Form.Group className="mb-3" controlId="exampleformInput2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={password} required onChange={(e) => setPassword(e.target.value)} type="password" placeholder="" />
                </Form.Group>


                <Form.Label>Role</Form.Label>
                <Form.Select value={role}  onChange={(e) => setRole(e.target.value)}>
                    
                    <option disabled value=''>Select Role</option>
                    <option value='2001'>User</option>
                    <option value='1995'>Admin</option>        
                    <option value='1996'>Writer</option>
                    <option value='1999'>Product Manager</option>
                </Form.Select>
                <button disabled={
                    name.length > 1 && email.length > 1 && password.length > 5 && role.length > 1 ? false : true
                } className="btn btn-primary mt-3">Save</button>
            </Form>
        </>
    );
}