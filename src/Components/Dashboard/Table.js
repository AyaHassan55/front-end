import { faPenToSquare, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spinner, Table } from "react-bootstrap"
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';

import EmptyState from "./EmptyState";
import PaginatedItems from "./Pagination/Pagination";
import { useEffect, useState } from "react";
import { Axios } from "../../Api/Axios";
import TransformDate from "../../helpers/TransformDate";
import '../../Css/components/table.css'

export default function TableShow(props) {
    const currentUser = props.currentUser || { name: '' };  // Because it's only for the user schedule
    // searcg from api
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);

    // date
    const [date, setDate] = useState('')

    const filteredDataByDate = date.length > 0 ?
        props.data.filter((item) => TransformDate(item.created_at) === date) : props.data;
    const filterSearchByDate = date.length > 0 ? filteredData.filter((item) => TransformDate(item.created_at) === date) : filteredData;



    const showWhichData =
        search.length > 0
            ? filterSearchByDate
            : filteredDataByDate


    // search from api dirextly------------
    async function getSearchData() {

        try {
            const res = await Axios.post(`${props.searchLink}/search?title=${search}`);
            setFilteredData(res.data)
        } catch (err) {
            console.log(err)

        } finally {
            setSearchLoading(false);
        }
    }

    // ------------
    useEffect(() => {
        const debounce = setTimeout(() => {
            search.length > 0 ? getSearchData() : setSearchLoading(false);
        }, 500);
        return () => clearTimeout(debounce);
    }, [search])
    // -----------------------------------------
    // ------------------------------------------------
    // لو loading true
    if (props.loading)
        return (
            <div className="text-center py-5">
                <Spinner animation="border" variant="primary" role="status" />
                <p className="mt-3 text-secondary fw-semibold">{props.loadingMessage}</p>
            </div>
        );

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

    const dataShow = showWhichData.map((item, key) =>
    (
        <tr key={key}>
            {/* id */}
            <td className="fw-semibold">{item.id}</td>
            {props.header.map((item2, key2) => (
                <td key={key2}>{
                    item2.key === 'email' ? (
                        <span
                            style={{
                                color: '#6c757d',
                                backgroundColor: '#f8f9fa',
                                padding: '6px 10px',
                                borderRadius: '8px',
                                display: 'inline-block',
                                fontSize: '0.9rem'
                            }}
                        >
                            {item[item2.key]}
                        </span>
                    ) :
                        item2.key === 'image' ? <img style={{
                            width: "50px",
                            maxWidth: "100%",
                            height: "50px",
                            objectFit: "cover"
                        }} className="rounded" src={item[item2.key]} alt="" /> :
                            item2.key === 'images' ? <div className="d-flex align-items-center justify-content-center gap-3 flex-wrap">
                                {
                                    item[item2.key].map((img) => <img width={"50px"} src={img.image} />)
                                }
                            </div>

                                : item2.key === 'created_at' || item2.key === 'updated_at' ? (
                                    <span style={{ color: '#6c757d' }}>
                                        {TransformDate(item[item2.key])}
                                    </span>
                                ) :
                                    item[item2.key] === '1995' ? <span className="badge text-primary px-3 py-2 rounded-pill" style={{
                                        backgroundColor: '#d4e5faff',
                                        border: '1px solid rgba(38, 65, 139, 1)'
                                    }}>
                                        Admin
                                    </span> :
                                        item[item2.key] === '2001' ? <span className="badge   px-3 py-2 rounded-pill" style={{
                                            backgroundColor: '#ebd4e6ff',
                                            border: '1px solid #570432ff'
                                        }}>
                                            User
                                        </span> :
                                            item[item2.key] === '1996' ? <span className="badge px-3 py-2 rounded-pill" style={{
                                                backgroundColor: '#fff3cd',
                                                border: '1px solid #ffc107',
                                                color: '#493b11ff'
                                            }}>
                                                Writer
                                            </span> :
                                                item[item2.key] === '1999' ? <span className="badge px-3 py-2 rounded-pill" style={{
                                                    backgroundColor: '#a7d8e27c',
                                                    border: '1px solid #044657ff',
                                                    color: '#044657ff'
                                                }}>
                                                    Product Manager
                                                </span> :
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
        <>
            <div className="d-flex align-items-center gap-3 search-date-wrapper">
                <Form.Control className="my-2" value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setSearchLoading(true);
                    }}
                    type="search"
                    aria-label="input-example"
                    placeholder="filter by name .."
                />
                <Form.Control className="my-2"
                    onChange={(e) => {
                        setDate(e.target.value);
                        // setSearchLoading(true);
                    }}
                    type="date"
                    aria-label="input-example"
                    placeholder="date"
                />
            </div>
            <div className="table-wrapper border rounded mt-4 mb-4" >
                {props.tableName === 'users' ?
                    <h4 className="p-3">Users List</h4> :
                    props.tableName === 'categories' ?
                        <h4 className="p-3">Categories List</h4> :
                        props.tableName === 'products' ?
                            <h4 className="p-3">Products List</h4> :
                            ''}
                <div style={{ width: '100%'}}>
                    <Table responsive
                        className="custom-table table-border mt-4">
                        <thead className="table-secondary " >
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
                    </div>
            </div>
            <div className="d-flex align-items-center justify-content-end flex-wrap">
                <div className="col-1">
                    <Form.Select onChange={(e) => { props.setLimit(e.target.value); console.log("vall==" + e.target.value) }} aria-label="Default select example">
                        <option value={'3'}>{props.limit}</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>

                    </Form.Select>
                </div>
                < PaginatedItems itemsPerPage={props.limit} total={props.total} data={props.data} page={props.page} setPage={props.setPage} />
            </div>
        </>
    );
}