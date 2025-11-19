import { useState } from "react";

export default function ProductImage({images}) {

 const [selectedImage, setSelectedImage] = useState(0);


    return (
        <div>

            {/* Main Image */}
            <div className="mb-3">
                <div className="ratio ratio-1x1 border rounded overflow-hidden bg-light">
                    <img
                        src={images[selectedImage]?.image}
                        alt="Product"
                        className="w-100 h-100 object-fit-cover"
                    />
                </div>
            </div>
            {/* Thumbnails */}
            <div className="row g-2">
                {images.map((img, idx) => (
                    <div className="col-3" key={idx}>
                        <button
                            onClick={() => setSelectedImage(idx)}
                            className={`border rounded w-100 p-0 overflow-hidden ${selectedImage === idx
                                ? "border-dark"
                                : "opacity-75"
                                }`}
                            style={{ height: "80px" }}
                        >
                            <img
                                src={img.image}
                                alt={`Thumbnail ${idx + 1}`}
                                className="w-100 h-100 object-fit-cover"
                            />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
