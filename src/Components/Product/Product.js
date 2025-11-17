import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function ProductSale(props) {
    return (
        <>
            <div className="col-lg-3 col-md-6 col-12">
                <div className="m-1 border rounded p-3 h-100">
                    <div className="border-bottom pb-3">
                        <p style={{ color: 'grey' }}>{props.title.slice(1,35)+'...'}</p>
                        <p>{props.description.slice(1,35)}</p>
                        <div className="px-5 py-4 position-relative">
                           {props.sale && (<p className="position-absolute top-0 start-0 text-white text-uppercase bg-primary  rounded-circle d-flex justify-content-center align-items-center"
                                style={{ width: '50px', height: '50px' }}>sale</p>)}
                            <img
                                alt=""
                                className="img-fluid"
                                src={props.img} />
                        </div>
                    </div>

                    <div className="d-flex align-items-center justify-content-between mt-2">
                        <div>
                            <FontAwesomeIcon icon={solid} />
                            <FontAwesomeIcon icon={regularStar} />
                            <FontAwesomeIcon icon={regularStar} />
                            <FontAwesomeIcon icon={regularStar} />
                            <FontAwesomeIcon icon={regularStar} />
                            <div className="d-flex align-items-center gap-3">
                                <h5 className="m-0 text-primary">{props.discount}$</h5>
                                <h6 className="m-0" style={{ color: 'grey', textDecoration: 'line-through' }}>{props.price}$

                                </h6>
                            </div>
                        </div>
                        <div className="border p-2 rounded">
                            <img src={require('../../Assets/Icons/Cart.png')} alt="cart" width='20px' />
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}