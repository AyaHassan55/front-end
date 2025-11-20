
import { useEffect, useState } from "react";
import ProductDetails from "./productDatails";
import ProductImage from "./productImage";
import { Axios } from "../../../Api/Axios";
import { PRODUCT } from "../../../Api/Api";
import { useParams } from "react-router-dom";
import SkeletonFunc from "../../../Components/Website/Skelton/Skelton";

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
                setLoading(false);

            })
        .catch(()=>setLoading(false));

    }, [])

    return (
        <section className="container py-5">
            <div className="row align-items-start">



                {loading ?
                    (
                   
                    <>
                        <div className="col-12 col-lg-6">
                            <SkeletonFunc width="100%" height="350px" length='1' />
                            <SkeletonFunc width="20%" height="70px" length='1' />
                        </div>

                        <div className="col-12 col-lg-6">
                            <SkeletonFunc width="10%" height="20px" length='1' />
                            <SkeletonFunc width="70%" height="70px" length='1'/>
                            <SkeletonFunc width="60%" height="20px" length='1'  />
                            <SkeletonFunc width="90%" height="20px" length='1'  />
                            <SkeletonFunc width="60%" height="20px" length='1'  />
                            <SkeletonFunc width="90%" height="120px" length='1'  />
                        </div>
                    </>

                )
                    : (
                        <>
                            <div className="col-12 col-lg-6">
                                <ProductImage images={images} />
                            </div>

                            <div className="col-12 col-lg-6">
                                <ProductDetails product={product} />
                            </div>
                        </>
                    )
                }



            </div>

        </section>
    );
}