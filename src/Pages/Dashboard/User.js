import { useState } from "react";
import { Form } from "react-bootstrap";

export default function User(){
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    // handle form submit
    function handleSubmit(e){
       e.preventDefault();
    }
    return (
        <Form className="bg-white w-100  p-3" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleformInput1">
                <Form.Label>User Name</Form.Label>
                <Form.Control value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="Name..." />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleformInput2">
                <Form.Label>Email</Form.Label>
                <Form.Control value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="name@example.com" />
            </Form.Group>
            <button className="btn btn-primary">Save</button>
        </Form>
    );
}