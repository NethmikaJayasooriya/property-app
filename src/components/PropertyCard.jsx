import { FaCheck, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './PropertyCard.css';

function PropertyCard({ property, onFavorite, favorites }) {

  // Check if this property already exists in the favourites list
  const isFavorited = favorites.some(fav => fav.id === property.id);

  // Store property id when dragging the card
  const handleDragStart = (e) => {
    e.dataTransfer.setData("propertyId", property.id);
  };

  return (
    <div
      className="property-card"
      draggable="true"
      onDragStart={handleDragStart}
    >

      {/* Favourite button with visual feedback */}
      <button
        onClick={() => onFavorite(property)}
        disabled={isFavorited}
        title={isFavorited ? "Already in favorites" : "Add to Favorites"}
        className={`property-card__fav-btn ${isFavorited ? 'fav-added' : ''}`}
      >
        {isFavorited ? (
          <>
            <FaCheck size={14} />
            <span>Added</span>
          </>
        ) : (
          <>
            <FaHeart size={16} color="#ef4444" />
            <span>Add to Favorites</span>
          </>
        )}
      </button>

      {/* Property main image */}
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

        {/* Navigate to property details page */}
        <Link
          to={`/property/${property.id}`}
          style={{ width: '100%', textDecoration: 'none' }}
        >
          <button className="property-card__view-btn">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}

export default PropertyCard;
