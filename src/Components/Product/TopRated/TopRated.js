import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function TopRated(props) {
  const roundStars = Math.round(props.rating);
  const stars = Math.min(roundStars, 5);
  const showGoldStars = Array.from({ length: stars }).map((_, index) => (
    <FontAwesomeIcon color="gold" key={index} icon={solid} />
  ));
  const showEmptyStars = Array.from({ length: 5 - stars }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={regularStar} />
  ));
  return (

    <div
      className="card h-100 shadow-sm"
      style={{
        border: 'none',
        borderRadius: '8px',
        transition: 'transform 0.3s, box-shadow 0.3s',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)'
        e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)'
      }}
    >
      {/* Image Container */}
      <div className="position-relative overflow-hidden" style={{ height: '200px', backgroundColor: '#f0f0f0' }}>
        <img
          src={props.img || "/placeholder.svg"}
          alt={props.title}
          className="w-100 h-100"
          style={{ objectFit: 'cover' }}
        />
        {/* New Badge */}
        {(
          <span
            className="position-absolute top-0 start-0 badge m-2"
            style={{ 
              // backgroundColor: vibrantColor  || 
              backgroundColor:'#FF6B6B', fontSize: '11px', padding: '4px 8px' }}
          >
            New
          </span>
        )}
      </div>

      {/* Card Body */}
      <div className="card-body p-3">
        <h6 className="card-title mb-2" style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a' }}>
          {props.title}
        </h6>

        {/* Rating */}
        <div className="d-flex align-items-center mb-2" style={{ fontSize: '12px' }}>
          <div className="text-warning" style={{ fontSize: '14px' }}>
            {'⭐'.repeat(Math.floor(props.rating))}
          </div>
          <span className="ms-2" style={{ color: '#666' }}>
            {props.rating} 
          </span>
        </div>

       
        {/* Price */}
        <div className="d-flex justify-content-between align-items-center">
          <span className="fw-bold" style={{ fontSize: '16px', color: '#2563eb' }}>
            ${props.price}
          </span>
          <button className="btn btn-sm" style={{ backgroundColor: '#2563eb', color: '#fff', fontSize: '12px' }}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  


  );
}