import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../Api/Axios";
import { USER } from "../../Api/Api";

export default function User(){
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    // id user
    const id =window.location.pathname.replace("/dashboard/users/","");
    // get user data by id
    useEffect(()=>{
        Axios.get(`${USER}/${id}`).then((data)=>{
            setName(data.data.name);
            setEmail(data.data.email);
        });
    },[])
    // handle form submit
    async function handleSubmit(e){
       e.preventDefault();
       try{
        const res= await Axios.post(`${USER}/edit/${id}`,{
            name:name, 
            email:email
        });
        window.location.pathname='/dashboard/users/'
       }catch(err){
        console.log(err);
       }
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