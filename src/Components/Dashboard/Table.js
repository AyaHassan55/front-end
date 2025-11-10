import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "react-bootstrap"
import { Link } from "react-router-dom";
import { Axios } from "../../Api/Axios";
import { USER } from "../../Api/Api";


export default function TableShow(props) {
    const currentUser = props.currentUser || false;  // Because it's only for the user schedule

    
    // header show
    const headerShow = props.header.map((item, i) => <th key={i}>{item.name}</th>);
    // body show

    const dataShow = props.data.map((item, key) =>
    (
        <tr key={key}>
            <td>{key + 1}</td>
            {props.header.map((item2, key2) => (
                <td key={key2}>{
                    item[item2.key] === '1995' ? 'Admin' :
                    item[item2.key] === '2001' ?'User' : 
                    item[item2.key] === '1996' ? 'Writer' : 
                    item[item2.key] === '1999' ? "Product Manager" : 
                    item[item2.key]
                    }
                    {currentUser&& item[item2.key]=== currentUser.name && "(You)"}
                </td>
            ))}
            {/* Actions */}
            <td >
                <div className="d-flex align-items-center justify-content-center gap-2">
                    <Link to={`${item.id}`}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </Link>
                    {currentUser && currentUser.name !== item.name&&
                    <FontAwesomeIcon
                        onClick={() => props.delete(item.id)}
                        cursor={'pointer'} color="#bb0f0f" icon={faTrash} />}
                </div>
            </td>

        </tr>
    )
    )

    return (

        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Id</th>
                    {headerShow}
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {dataShow}

            </tbody>
        </Table>
    );
}