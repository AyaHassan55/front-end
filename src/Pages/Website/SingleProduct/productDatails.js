import { useState } from 'react';

import SkeletonFunc from '../../../Components/Website/Skelton/Skelton';

export default function ProductDetails({ product, loading }) {
    const [quantity, setQuantity] = useState(1);

    const [isWishlisted, setIsWishlisted] = useState(false);
    console.log(product)
    return (

        <div className="d-flex align-items-center justify-content-center mt-5">

            <div>
                {/*  */}
                <div className="mb-4">
                    <p className="text-muted text-uppercase small mb-1">Collection: Premuim</p>
                    <h1 className="display-5 fw-semibold">
                        {loading ? (
                            <SkeletonFunc baseColor='grey' width='100px' height='40px' />
                        ):(
                            product.title
                        ) }
                        </h1>
                        
                </div>
                {/* Rating */}
                <div className="d-flex align-items-center gap-2 mt-2">
                    <div className="d-flex gap-1">
                        {[...Array(5)].map((_, i) => (
                            <span key={i} style={{ fontSize: "20px" }}>★</span>
                        ))}
                    </div>
                    <span className="text-muted small">(42 reviews)</span>
                </div>
                {/* price */}
                <div className="mb-1">
                    <div className="d-flex align-items-baseline">
                        <span className="fs-3 fw-bold">$
                            {loading ? (
                            <SkeletonFunc baseColor='grey' width='50px' height='20px' />
                        ):(
                            product.price
                        ) }
                            
                            </span>
                        <span className="text-muted fs-5 text-decoration-line-through">
                            ${loading ? (
                            <SkeletonFunc baseColor='grey' width='50px' height='20px' />
                        ):(
                            product.discount
                        ) }
                        </span>

                    </div>
                    <p className="text-danger small fw-semibold">
                        Save $165 (25% off)
                    </p>

                </div>
                {/* Description */}
                <div className="border-top border-bottom py-4 mb-4">
                    <p className="text-dark">
                        {loading ? (
                            <SkeletonFunc baseColor='grey' width='50px' height='20px' />
                        ):(
                            product.description

                        ) }
                    </p>
                    <ul className="text-muted small decoration-none">
                        {loading ?<SkeletonFunc baseColor='grey' width='150px' height='150px' />  :  product.About.split("✓").filter(item => item.trim() !== "").map((item, i) => (
                            <li key={i}>✓ {item.trim()}</li>
                        ))}
                    </ul>
                </div>
                {/* Color Options */}
                <div className="mb-4">
                    <label className="fw-semibold mb-2">COLOR</label>
                    <div className="d-flex gap-3">
                        {["Black", "Tan", "Cognac", "Navy"].map((color) => {
                            const bg =
                                color === "Black"
                                    ? "#000"
                                    : color === "Tan"
                                        ? "#D4A574"
                                        : color === "Cognac"
                                            ? "#8B4513"
                                            : "#001F3F";

                            const isSelected = color === "Tan";

                            return (
                                <button
                                    key={color}
                                    className={`rounded-circle border ${isSelected ? "border-dark" : ""}`}
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        backgroundColor: bg,
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>
                {/* size */}
                <div className="mb-4">
                    <label className="fw-semibold mb-2">SIZE</label>
                    <div className="row g-2">
                        {["Small", "Medium", "Large"].map((size) => {
                            const isSelected = size === "Medium";
                            return (
                                <div className="col-4" key={size}>
                                    <button
                                        className={`btn w-100 py-2 ${isSelected
                                            ? "btn-dark text-light"
                                            : "btn-light border text-dark"
                                            }`}
                                    >
                                        {size}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Quantity & CTA */}
                <div className="d-flex gap-3 mb-4">
                    <div className="d-flex align-items-center border rounded">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="btn px-3"
                        >
                            −
                        </button>
                        <span className="px-3 fw-medium">{quantity}</span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="btn px-3"
                        >
                            +
                        </button>
                    </div>

                    <button className="btn btn-dark flex-grow-1">
                        Add to Cart
                    </button>

                    <button
                        onClick={() => setIsWishlisted(!isWishlisted)}
                        className="btn border"
                    >
                        {/* <Heart
                                size={20}
                                className={isWishlisted ? "text-danger fill-current" : ""}
                            /> */}
                    </button>
                </div>
                {/* Shipping & Returns */}
                <div className="text-muted small">
                    <p>✓ Free shipping on orders over $100</p>
                    <p>✓ Secure checkout with SSL encryption</p>
                    <p>✓ 30-day money-back guarantee</p>
                </div>





            </div>
        </div>

    );
}