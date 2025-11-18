import { Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import { CATEGORIES } from "../../../Api/Api";
import './navbar.css'
import Skeleton from "react-loading-skeleton";
import SkeletonFunc from "../Skelton/Skelton";
export default function NavBar() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        Axios.get(`${CATEGORIES}`).then((res) => setCategories(res.data.slice(-8)))
            .finally(() => setLoading(false))
    }, [])
    const categoriesShow = categories.map((cat, key) =>
        <p key={key} className="m-0">{cat.title.length > 15 ? cat.title.slice(1, 15) + '...' : cat.title}</p>)
    return (
        <nav className="py-3">
            <Container>
                <div className="d-flex align-items-center justify-content-between flex-wrap">
                    <Link className="col-3" to="/">
                        <img
                            width="116px"
                            height='67px'
                            src={require("../../../Assets/images/Logo.png")}
                            alt="logo"
                        />
                    </Link>
                    <div className="col-12 col-md-6 order-md-2 order-3 mt-md-0 mt-3 position-relative ">
                        <Form.Control
                            type="Search"
                            className="form-control custom-search py-3 rounded-0"
                            placeholder="Search Product"
                        />
                        <h3 className="btn btn-primary position-absolute top-0 end-0 h-100 line-height m-0 px-4 rounded-0 d-flex align-items-center justify-content-center">
                            Search
                        </h3>
                    </div>
                    <div className="col-3 d-flex align-items-center justify-content-end gap-4 order-md-3 order-1">
                        <div>
                            <img
                                width="30px"
                                src={require("../../../Assets/Icons/Cart.png")}
                                alt="Cart"
                            />
                        </div>
                        <Link to="/profile">
                            <img
                                width="35px"
                                src={require("../../../Assets/Icons/Profile.png")}
                                alt="Cart"
                            />
                        </Link>
                    </div>
                </div>
                <div className="mt-3">
                    <div className="d-flex align-items-center justify-content-start gap-3 flex-wrap ">
                        {loading ? (
                            <SkeletonFunc width={'80px'} height={'30px'} length={8} baseColor='#c0bdbdff' classes='px-1' />

                        ) :

                            (categoriesShow

                            )}
                        <Link className="text-block category-title  d-inline-block" to="/categories">Show All</Link>
                    </div>
                </div>

            </Container>
        </nav>
    );
}