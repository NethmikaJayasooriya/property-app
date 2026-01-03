import { FaTimes } from 'react-icons/fa';
import './FavoritesList.css';

function FavoritesList({ favorites, onRemove, onClear }) {

  // Required by HTML5 Drag & Drop API to allow this element to accept drops
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="favorites-container"
      onDragOver={handleDragOver}
    >
      <div className="favorites-header">
        <h3 className="favorites-title">Favorites</h3>
        {favorites.length > 0 && (
          <button onClick={onClear} className="favorites-clear-btn">
            Clear All
          </button>
        )}
      </div>

      <div className="favorites-list">
        {favorites.length === 0 ? (
          <p className="favorites-empty">
            Drag properties here to save them
          </p>
        ) : (
          favorites.map(property => (
            <div
              key={property.id}
              className="favorite-item"
              draggable="true"
              // Set data to identify this property and flag it as coming FROM the favorites list
              // This allows the main app to distinguish between adding vs. removing
              onDragStart={(e) => {
                e.dataTransfer.setData("propertyId", property.id);
                e.dataTransfer.setData("fromFavorites", "true");
              }}
            >
              <img src={property.images[0]} alt="thumb" className="favorite-item__img" />
              <div className="favorite-item__info">
                <p className="favorite-item__type">{property.type}</p>
                <p className="favorite-item__price">£{property.price.toLocaleString()}</p>
              </div>

              <button
                onClick={() => onRemove(property.id)}
                title="Remove"
                className="favorite-item__remove-btn"
              >
                <FaTimes size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FavoritesList;