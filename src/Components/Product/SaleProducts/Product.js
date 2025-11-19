import { faCartShopping, faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { Badge, Button, Card } from "react-bootstrap";

import './SaleProducts.css'
export default function ProductSale(props) {
    const roundStars = Math.round(props.rating);
    const stars = Math.min(roundStars, 5);

    const showGoldStars = Array.from({ length: stars }).map((_, index) => (
        <FontAwesomeIcon key={index} icon={solid} />
    ));
    const showEmptyStars = Array.from({ length: 5 - stars }).map((_, index) => (
        <FontAwesomeIcon key={index} icon={regularStar} />
    ));
    const priceAfterDiscount = Math.ceil(props.price - (props.price * props.discount / 100));

    return (
        <div className="col-lg-4 col-md-6 col-12 mb-4">
            <NavLink to={`/product/${props.id}`} className="text-decoration-none">
                <Card className="product-card position-relative">

                    <div className="product-img-container">
                        <div className="badge-sale position-absolute top-0 start-0 m-2">
                            <Badge bg="danger" className="px-3 py-2 fw-bold">SALE</Badge>
                        </div>

                        <div className="wishlist-icon position-absolute top-0 end-0 m-2 bg-white p-2 rounded-circle shadow-sm">
                            <FontAwesomeIcon icon={faHeart} className="text-danger" />
                        </div>

                        <Card.Img className="product-img" variant="top" src={props.img} />
                    </div>

                    <Card.Body>
                        <Card.Title style={{ color: '#b4b4b4e7', fontSize: '16px' }}>Electronics</Card.Title>

                        <Card.Text className="fw-bold">
                            {props.title.slice(0, 35) + '...'}

                            <div className="d-flex align-items-center justify-content-between mt-4">
                                <div className="d-flex align-items-baseline gap-2">
                                    <h4 className="text-primary m-0 fw-bold">${priceAfterDiscount}</h4>
                                    <h5 className="text-muted mb-0 fw-bold" style={{ fontSize: '16px', textDecoration: 'line-through' }}>${props.price}</h5>
                                </div>

                                <h6 className="text-danger fw-bold m-0" style={{ fontSize: '14px' }}>{props.discount}% OFF</h6>
                            </div>
                        </Card.Text>

                        <Button className="w-100" variant="primary">
                            <FontAwesomeIcon icon={faCartShopping} className="me-2" />
                            Add to cart
                        </Button>
                    </Card.Body>

                </Card>
            </NavLink>
        </div>




    );
}