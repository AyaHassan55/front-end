
import { useEffect, useState } from "react";
import ProductDetails from "./productDatails";
import ProductImage from "./productImage";
import { Axios } from "../../../Api/Axios";
import { PRODUCT } from "../../../Api/Api";
import { useParams } from "react-router-dom";

export default function SingleProduct() {
    const [product, setProduct] = useState({});
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const { id } = useParams()
    console.log(product)
    useEffect(() => {
        Axios.get(`${PRODUCT}/${id}`)
            .then((res) => {
                // console.log(res.data)
                setImages(res.data[0].images);
                setProduct(res.data[0])

            }).finally(()=>setLoading(false));

    }, [])

    return (
        <section className="container py-5">
            <div className="row align-items-start">
                {/* Product Gallery */}
                <div className="col-12 col-lg-6">
                    {/* <ProductImage  /> */}

                  <ProductImage images={images} loading={loading} />
                </div>

                

                {/* Product Details */}
                <div className="col-12 col-lg-6">
                    <ProductDetails product={product} loading={loading} />
                </div>
            </div>

        </section>
    );
}