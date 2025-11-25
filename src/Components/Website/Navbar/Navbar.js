import { Container, Form } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import { CATEGORIES } from "../../../Api/Api";
import { Cart } from "../../../Context/CartChangerContext";
import './navbar.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faXmark, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import SkeletonFunc from "../Skelton/Skelton";
export default function NavBar() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([]);
    const { isChange } = useContext(Cart)

    useEffect(() => {
        Axios.get(`${CATEGORIES}`).then((res) => setCategories(res.data.slice(-8)))
            .finally(() => setLoading(false))
    }, [])
    const categoriesShow = categories.map((cat, key) =>
        <p key={key} className="navv mt-3 mx-1"
            style={{
                backgroundColor: '#f6e8e8',
                borderRadius: '16px', fontSize: '12px', fontWeight: '500', padding: '8px'
            }}>{cat.title.length > 15 ? cat.title.slice(0, 15) + '...' : cat.title}</p>)

    // modal
    const [show, setShow] = useState(false);
    const [cartItems, setCartItems] = useState([]);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        const getProducts = JSON.parse(localStorage.getItem("product")) || [];
        setProducts(getProducts);
    }, [isChange]);

    const priceAfterDiscount = 0;
    const handleDelete = (id) => {
        const filterProduct = products.filter((product) => product.id !== id);
        setProducts(filterProduct);
        localStorage.setItem("product", JSON.stringify(filterProduct));
    }
    return (
        <>
            <Modal className="modal" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Shopping Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {products.length === 0 ? (
                        <p>Your cart is empty</p>
                    ) : (
                        products.map((item, index) => {
                            const priceAfterDiscount = Math.ceil(
                                item.price - (item.price * item.discount / 100)
                            );

                            return (
                                <div key={index} className="position-relative cart-modal d-flex justify-content-between align-items-center border rounded">
                                    <div
                                        onClick={() => handleDelete(item.id)}
                                        className="position-absolute top-0 end-0 rounded d-flex align-items-center
                                    justify-content-center  bg-danger text-white" style={{ cursor: 'pointer', width: '20px', height: '20px' }}>
                                        <FontAwesomeIcon icon={faXmark} />

                                    </div>
                                    <div>
                                        <img
                                            style={{ borderRadius: '12px', margin: '12px' }}
                                            src={item.images && item.images.length > 0 ? item.images[0].image : ""}
                                            alt={item.title}
                                            width="50"
                                            height="50"
                                        />
                                    </div>

                                    <div>
                                        <h6>{item.title}</h6>
                                        <p className="mb-0">
                                            <span className="ms-2 fw-bold">
                                                ${priceAfterDiscount}
                                            </span>
                                            <span style={{ textDecoration: 'line-through', color: '#888' }}>
                                                ${item.price}
                                            </span>

                                        </p>
                                    </div>

                                </div>
                            );
                        })


                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Checkout
                    </Button>
                </Modal.Footer>
            </Modal>


            <nav className="py-3">
                <Container>
                    <div className="d-flex align-items-center justify-content-between flex-wrap">
                        <Link className="col-3" to="/">
                            <img
                                width="140px"
                                height='37px'
                                src={require("../../../Assets/images/logoo.png")}
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
                            <div onClick={handleShow}
                                style={{ cursor: 'pointer' }}
                            >
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
        </>
    );
}