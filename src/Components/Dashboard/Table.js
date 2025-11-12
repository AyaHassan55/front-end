import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spinner, Table } from "react-bootstrap"
import { Link } from "react-router-dom";
import EmptyState from "./EmptyState";


export default function TableShow(props) {
    const currentUser = props.currentUser || { name: '' };  // Because it's only for the user schedule
    // لو loading true
    if (props.loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" variant="primary" role="status" />
                <p className="mt-3 text-secondary fw-semibold">{props.loadingMessage}</p>
            </div>
        );
    }
    // لو مفيش داتا رجع empty state
    if (props.data.length === 0) {
        return (
            <EmptyState
                icon={props.emptyIcon}
                title={props.emptyTitle}
                subTitle={props.emptySubTitle}
            />
        );
    }

    // header show
    const headerShow = props.header.map((item, i) => < th key={i}>{item.name}</th>);
    // body show

    const dataShow = props.data.map((item, key) =>
    (
        <tr key={key}>
            <td>{key + 1}</td>
            {props.header.map((item2, key2) => (
                <td key={key2}>{
                    item2.key === 'image' ? <img width={'50px'} src={item[item2.key]} alt="" /> :
                        item2.key === 'images' ? <div className="d-flex align-items-center justify-content-center gap-3 flex-wrap">
                            {
                                item[item2.key].map((img) => <img width={"50px"} src={img.image} />)
                            }
                        </div>

                            :
                            item[item2.key] === '1995' ? 'Admin' :
                                item[item2.key] === '2001' ? 'User' :
                                    item[item2.key] === '1996' ? 'Writer' :
                                        item[item2.key] === '1999' ? "Product Manager" :
                                            item[item2.key]
                }
                    {currentUser && item[item2.key] === currentUser.name && "(You)"}
                </td>
            ))}
            {/* Actions */}
            <td >
                <div className="d-flex align-items-center justify-content-center gap-2">
                    <Link to={`${item.id}`}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </Link>
                    {currentUser && currentUser.name !== item.name &&
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