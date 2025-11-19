import { Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import { CATEGORIES } from "../../../Api/Api";
import './navbar.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import SkeletonFunc from "../Skelton/Skelton";
export default function NavBar() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        Axios.get(`${CATEGORIES}`).then((res) => setCategories(res.data.slice(-8)))
            .finally(() => setLoading(false))
    }, [])
    const categoriesShow = categories.map((cat, key) =>
        <p key={key} className="m-0">{cat.title.length > 15 ? cat.title.slice(0, 15) + '...' : cat.title}</p>)
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
                    <div className="d-none d-md-flex flex-grow-1 mx-3" style={{ maxWidth: "400px" }}>
                        <div className="position-relative w-100">
                            <input
                                type="text"
                                placeholder="Search for products"
                                className="form-control ps-3 pe-5 py-2 rounded"
                            />
                             <FontAwesomeIcon
                                icon={faSearch}
                                className="position-absolute"
                                style={{
                                    right: "12px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    color: "#6c757d",
                                }}
                            />
                        </div>
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