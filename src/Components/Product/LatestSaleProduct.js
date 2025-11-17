
import { useEffect, useState } from "react";
import { LatestSale } from "../../Api/Api";
import ProductSale from "./Product";
import { Axios } from "../../Api/Axios";
import { Container } from "react-bootstrap";


export default function LatestSaleProducts() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        Axios.get(`${LatestSale}`).then((res) => setProducts(res.data))
    }, [])
    console.log(products)
    const productsShow = products.map((product) => <ProductSale
        title={product.title}
        description={product.description}
        img={product.images[0].image} 
        sale
        discount={product.discount}
        price={product.price}
        />)
    return (
        <Container>
            <div className="d-flex align-items-stretch justify-content-center flex-wrap mt-5 row-gap-2">{productsShow}</div>
        </Container>
    );
}