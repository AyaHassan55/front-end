import { Table } from "react-bootstrap"


export default function TableShow({ header, data }) {
    const headerShow = header.map((item) => <th>{item.name}</th>);

    const dataShow = data.map((item) =>{
        return(
            <tr>
                {header.map((item2) =>(
                    <td>{item[item2.key]}</td>
                ))}
            </tr>
        );
    })

    return (

        <Table striped bordered hover responsive>
            <thead>
                <tr>
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