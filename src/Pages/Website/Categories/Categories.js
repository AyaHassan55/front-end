import { useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import { CATEGORIES } from "../../../Api/Api";
import { Container } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import SkeletonFunc from "../../../Components/Website/Skelton/Skelton";


export default function WebsiteCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        Axios.get(`${CATEGORIES}`).then((data) => setCategories(data.data)).finally(() => setLoading(false));
    }, [])
    const showCategories = categories.map((item, key) => (
        <div className="col-lg-2 col-md-6 col-12 bg-transparent border-0">
            <div className="m-1 bg-white border d-flex align-items-center justify-content-start gap-3 rounded py-2h-100">
                <img className="ms-3" width={'50px'} src={item.image ? item.image : '../../../Assets/Icons/Profile.png'} alt="just an image" />
                <p className="m-0">
                    {item.title.length > 12 ? item.title.slice(0, 12) + '...' : item.title}
                </p>
            </div>
        </div>

    ));
    return (
        <>

            <div className="bg-secondary py-5">
                <Container>
                    <div className="d-flex align-items-center justify-content-center flex-wrap row-gap-2">
                        {loading ? (
                            <SkeletonFunc length='30' height='100px' baseColor='#c0bdbdff' classes='col-lg-3 col-md-6 col-12 ' />

                        ) :

                            (showCategories

                            )}
                    </div>
                </Container>
            </div>
        </>
    );
}