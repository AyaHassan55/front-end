
import { useEffect, useState } from "react";
import { LatestSale } from "../../../Api/Api";


import { Container } from "react-bootstrap";


import { Axios } from "../../../Api/Axios";
import ProductSale from "./Product";
import SkeletonFunc from "../../Website/Skelton/Skelton";


export default function LatestSaleProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        Axios.get(`${LatestSale}`).then((res) => setProducts(res.data))
            .finally(() => setLoading(false))
    }, [])
    console.log(products)
    const productsShow = products.slice(0,3).map((product, key) => <ProductSale key={key}
        title={product.title}
        description={product.description}
        img={product.images[0].image}
        sale
        discount={product.discount}
        price={product.price}
        rating={product.rating}
        id={product.id}
      
    />)
    return (
        <Container>
            <div className="mb-3 mb-md-0 mt-5">
                <h2 className="fw-bold mb-2">Flash Sale</h2>
                <p className="text-muted">Limited time offers on selected items</p>
            </div>
            <div className="d-flex align-items-stretch justify-content-center flex-wrap mt-5 row-gap-2 mb-5">
                {loading ? (
                    <SkeletonFunc height='300px' length='8' baseColor='#c0bdbdff' classes="col-lg-3 col-md-6 col-12 " />

                ) :

                    (productsShow

                    )}
            </div>
        </Container>
    );
}