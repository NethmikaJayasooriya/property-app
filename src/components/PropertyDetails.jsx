import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import propertiesData from '../properties.json';
import './PropertyDetails.css';

// Accept 'favorites' as a prop
function PropertyDetails({ onFavorite, favorites = [] }) {
  const { id } = useParams();
  const property = propertiesData.find(p => p.id === id);
  
  const [mainImage, setMainImage] = useState(property?.images?.[0] || null);
  const [activeTab, setActiveTab] = useState('description');

  // Check if already saved
  const isSaved = favorites.some(fav => fav.id === property?.id);

  if (!property) {
    return (
      <div className="details-container">
        <h2>Property not found!</h2>
        <Link to="/" className="details-back-link">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="details-container">
      
      <Link to="/" className="details-back-link">
        &larr; Back to Search
      </Link>

      <div className="details-grid">
        
        {/* Gallery */}
        <div className="gallery">
          {mainImage ? (
             <img src={mainImage} alt={property.type} className="gallery__main-img" />
          ) : (
             <div className="gallery__main-img" style={{background: '#eee', display: 'flex', alignItems:'center', justifyContent:'center'}}>No Image</div>
          )}

          <div className="gallery__thumbnails">
            {property.images && property.images.map((img, index) => (
              <img 
                key={index}
                src={img} 
                alt="thumbnail"
                onClick={() => setMainImage(img)}
                className={`gallery__thumb ${mainImage === img ? 'gallery__thumb--active' : ''}`}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="details-info">
          <h1 className="details-info__title">{property.type}</h1>
          <h3 className="details-info__location">{property.location}</h3>
          <h2 className="details-info__price">£{property.price.toLocaleString()}</h2>
          
          <div className="tabs-header">
            <button 
              onClick={() => setActiveTab('description')}
              className={`tab-btn ${activeTab === 'description' ? 'tab-btn--active' : ''}`}
            >
              Description
            </button>
            <button 
              onClick={() => setActiveTab('floorplan')}
              className={`tab-btn ${activeTab === 'floorplan' ? 'tab-btn--active' : ''}`}
            >
              Floor Plan
            </button>
            <button 
              onClick={() => setActiveTab('map')}
              className={`tab-btn ${activeTab === 'map' ? 'tab-btn--active' : ''}`}
            >
              Google Map
            </button>
          </div>

          <div className="tab-content">
             {activeTab === 'description' && (
              <div>
                <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
                <p><strong>Tenure:</strong> {property.tenure || 'Freehold'}</p> 
                <p style={{ lineHeight: '1.6', color: '#555' }}>{property.description}</p>
              </div>
            )}
            
            {activeTab === 'floorplan' && (
              <div className="tab-content__image-box">
                {property.floorPlan ? (
                  <img src={property.floorPlan} alt="Floor Plan" style={{ maxWidth: '100%' }} />
                ) : (
                  <p>No Floor Plan Available</p>
                )}
              </div>
            )}

            {activeTab === 'map' && (
              <div className="tab-content__image-box">
                 {property.mapImage ? (
                  <img src={property.mapImage} alt="Location Map" style={{ maxWidth: '100%' }} />
                 ) : (
                  <p>Map not available</p>
                 )}
              </div>
            )}
          </div>

          {/*Button Feedback*/}
          <div className="details-actions">
            <button 
                onClick={() => onFavorite(property)} 
                disabled={isSaved} // Disable if saved
                className={`btn-secondary ${isSaved ? 'btn-saved' : ''}`} // Add class
            >
                {isSaved ? 'Saved ❤️' : 'Save to Favorites'} 
            </button>
            
            <button className="btn-primary">
                Book a Viewing
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;