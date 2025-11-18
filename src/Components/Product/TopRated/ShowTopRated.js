

import { useEffect, useState, useRef } from "react";
import TopRated from "./TopRated";
import { TopRatedApi } from "../../../Api/Api";
import { Axios } from "../../../Api/Axios";
import SkeletonFunc from "../../Website/Skelton/Skelton";

export default function ShowTopRated() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const scrollContainerRef = useRef(null);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(true);

  useEffect(() => {
    Axios.get(`${TopRatedApi}`)
      .then((res) => {
        setProducts(res.data);
        console.log(res.data)
      })
      .finally(() => setLoading(false));
  }, []);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      setCanScrollUp(scrollTop > 0);
      setCanScrollDown(scrollTop < scrollHeight - clientHeight - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      return () => container.removeEventListener("scroll", checkScroll);
    }
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 250;
      scrollContainerRef.current.scrollBy({
        top: direction === "up" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="col-md-6 col-12 position-relative" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Section Title */}
      <div className="mb-4">
        <h2 className="fw-bold mb-2" style={{ fontSize: "24px", color: "#1a1a1a" }}>
          Top Rated
        </h2>
        <p style={{ fontSize: "14px", color: "#666" }}>
          Customer favorites with excellent reviews
        </p>
      </div>

      <div className="d-flex gap-3 align-items-center position-relative flex-grow-1">

        {/* Up Arrow */}
        <button
          onClick={() => scroll("up")}
          disabled={!canScrollUp}
          className="btn btn-light rounded-circle p-2 position-absolute"
          style={{
            top: "10px",
            right: "-50px",
            zIndex: 10,
            opacity: canScrollUp ? 1 : 0.5,
            cursor: canScrollUp ? "pointer" : "not-allowed",
          }}
        >
          ↑
        </button>

        {/* Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="d-flex flex-column gap-3"
          style={{
            height: "600px",
            overflowY: "auto",
            overflowX: "hidden",
            scrollBehavior: "smooth",
            paddingRight: "10px",
            width: "100%",
          }}
        >
          {loading ? (
            <SkeletonFunc height="800px" length="1" classess="col-12" />
          ) : (
            products.map((product) => (
              <div key={product.id} className="flex-shrink-0" style={{ minHeight: "fit-content" }}>
                <TopRated
                  title={product.title}
                  description={product.description}
                  img={product.images[0].image}
                  sale
                  price={product.price}
                  discount={product.discount}
                  rating={product.rating}
                  id={product.id}
                />
              </div>
            ))
          )}
        </div>

        {/* Down Arrow */}
        <button
          onClick={() => scroll("down")}
          disabled={!canScrollDown}
          className="btn btn-light rounded-circle p-2 position-absolute"
          style={{
            bottom: "10px",
            right: "-50px",
            zIndex: 10,
            opacity: canScrollDown ? 1 : 0.5,
            cursor: canScrollDown ? "pointer" : "not-allowed",
          }}
        >
          ↓
        </button>
      </div>
    </div>
  );
}
