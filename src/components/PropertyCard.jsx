import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './PropertyCard.css'; // Import CSS

function PropertyCard({ property, onFavorite }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("propertyId", property.id);
  };
  
  return (
     <div 
      className="property-card"
      draggable="true" 
      onDragStart={handleDragStart}
      >

      <button 
        onClick={() => onFavorite(property)}
        title="Add to Favorites"
        className="property-card__fav-btn"
      >
        <FaHeart size={16} color="#ef4444" />
        <span>Add to Favorites</span>
      </button>

      <img 
        src={property.images[0]} 
        alt={property.type} 
        className="property-card__image"
      />
      
      <div className="property-card__content">
        <div>
            <h3 className="property-card__title">
                {property.type} - {property.bedrooms} Bed
            </h3>
            
            <p className="property-card__price">
                £{property.price.toLocaleString()}
            </p>
            
            <p className="property-card__location">
                📍 {property.location}
            </p>

            <p className="property-card__desc">
                {property.description}
            </p>
        </div>
        
        <Link to={`/property/${property.id}`} style={{ width: '100%', textDecoration: 'none' }}>
          <button className="property-card__view-btn">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}

export default PropertyCard;