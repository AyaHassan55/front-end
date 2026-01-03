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
        const fixedProducts = getProducts.map(p => ({
            ...p,
            count: p.count ? Number(p.count) : 1,
            discount: p.discount ? Number(p.discount) : 0,
            price: Number(p.price) || 0,
        }));
        setProducts(fixedProducts);
    }, [isChange]);


    const handleDelete = (id) => {
        const filterProduct = products.filter((product) => product.id !== id);
        setProducts(filterProduct);
        localStorage.setItem("product", JSON.stringify(filterProduct));
    }
    const updateQty = (id, newQty) => {
        const updated = products.map((p) =>
            p.id === id ? { ...p, count: newQty > 1 ? newQty : 1 } : p
        );
        setProducts(updated);
        localStorage.setItem("product", JSON.stringify(updated));
    };

    return (
        <>

            <Modal
                dialogClassName="cart-modern-modal"
                show={show}
                onHide={handleClose}
                centered
            >
                <Modal.Header closeButton className="border-0">
                    <Modal.Title className="fw-bold fs-3 text-dark">
                        🛍️ Your Shopping Cart
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {products.length === 0 ? (
                        <div className="empty-state text-center">
                            {/* <img
                                src="https://cdn-icons-png.flaticon.com/512/2037/2037453.png"
                                width="120"
                                alt="empty"
                            /> */}
                            <h4 className="mt-3 fw-bold">Your cart is empty</h4>
                            <p className="text-muted">Add items to start shopping.</p>
                        </div>
                    ) : (
                        <div className="cart-list">
                            {products.map((item, index) => {
                                const priceAfterDiscount = Math.ceil(
                                    item.price - item.price * (item.discount / 100)
                                );

                                return (
                                    <div className="cart-card" key={index}>
                                        {/* Remove button */}
                                        <button
                                            className="remove-btn"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            ×
                                        </button>

                                        {/* Image */}
                                        <div className="cart-img-box">
                                            <img src={item.images?.[0]?.image} alt={item.title} />
                                        </div>

                                        {/* Info */}
                                        <div className="cart-info">
                                            <h6 className="title">{item.title}</h6>

                                            <p className="price">
                                                <span className="new">${priceAfterDiscount}</span>
                                                <span className="old">${item.price}</span>
                                            </p>

                                            {/* Quantity Counter */}
                                            <div className="qty-box">
                                                <button
                                                    onClick={() => updateQty(item.id, item.count - 1)}
                                                >
                                                    -
                                                </button>

                                                <span>{item.count}</span>

                                                <button
                                                    onClick={() => updateQty(item.id, item.count + 1)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </Modal.Body>

                {/* Footer */}
                {products.length > 0 && (
                    <Modal.Footer className="border-0 flex-column">
                        <div className="total-box w-100 d-flex justify-content-between mb-3">
                            <span className="fw-bold fs-5">Total:</span>
                            <span className="fw-bold fs-5  text-primary">
                                $
                                {products
                                    .reduce((sum, item) => {
                                        const priceAfterDiscount = Math.ceil(
                                            item.price - item.price * (item.discount / 100)
                                        );
                                        return sum + priceAfterDiscount * item.count;
                                    }, 0)
                                    .toFixed(2)}
                            </span>
                        </div>

                        <button className="checkout-btn w-100">Proceed to Checkout</button>
                        <button className="continue-btn w-100 mt-2" onClick={handleClose}>
                            Continue Shopping
                        </button>
                    </Modal.Footer>
                )}
            </Modal>
            <nav className="py-3 bg-red">
                <Container>
                    <div className="d-flex align-items-center justify-content-between flex-wrap" style={{marginBottom:'-31px'}}>
                        <Link className="col-3" to="/">
                            <img
                                width="190px"
                                height='87px'
                                src={require("../../../Assets/images/logo.png")}
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
                        {/* <div className="d-flex align-items-center justify-content-start gap-3 flex-wrap ">
                            {loading ? (
                                <SkeletonFunc width={'80px'} height={'30px'} length={8} baseColor='#c0bdbdff' classes='px-1' />

                            ) :

                                (categoriesShow

                                )}
                            <Link className="text-block category-title  d-inline-block" to="/categories">Show All</Link>
                        </div> */}
                    </div>

                </Container>
            </nav>
        </>
    );
}