import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import propertiesData from '../properties.json';
import './PropertyDetails.css';

function PropertyDetails({ onFavorite, favorites = [] }) {
  const { id } = useParams();
  const property = propertiesData.find(p => p.id === id);
  
  const [mainImage, setMainImage] = useState(property?.images?.[0] || null);
  const [activeTab, setActiveTab] = useState('description');

  const isSaved = favorites.some(fav => fav.id === property?.id);

  if (!property) {
    return (
      <div className="details-container" style={{padding: '50px', textAlign: 'center'}}>
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
        
        {/* LEFT COLUMN: GALLERY */}
        <div className="gallery">
          {mainImage ? (
             <img src={mainImage} alt={property.type} className="gallery__main-img" />
          ) : (
             <div className="gallery__main-img" style={{background: '#f1f5f9', display: 'flex', alignItems:'center', justifyContent:'center', color: '#64748b'}}>No Image Available</div>
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

        {/* RIGHT COLUMN: INFO & TABS */}
        <div className="details-info">
          <h1 className="details-title">{property.type}</h1>
          <p className="details-location">📍 {property.location}</p>
          <h2 className="details-price">£{property.price.toLocaleString()}</h2>
          
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
               <div className="tab-text-scroll">
                  <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
                  <p><strong>Tenure:</strong> {property.tenure || 'Freehold'}</p> 
                  <p>{property.description}</p>
               </div>
            )}
            
            {activeTab === 'floorplan' && (
              <div className="tab-image-box">
                {property.floorPlan ? (
                  <img 
                    src={property.floorPlan} 
                    alt="Floor Plan" 
                    className="tab-img" 
                  />
                ) : (
                  <p style={{color: '#64748b'}}>No Floor Plan Available</p>
                )}
              </div>
            )}

            {activeTab === 'map' && (
              <div className="tab-image-box">
                 {property.mapImage ? (
                  <img 
                    src={property.mapImage} 
                    alt="Location Map" 
                    className="tab-img" 
                  />
                 ) : (
                  <p style={{color: '#64748b'}}>Map not available</p>
                 )}
              </div>
            )}
          </div>

          <div className="details-actions">
            <button className="btn-primary">
                Book a Viewing
            </button>
            <button 
                onClick={() => onFavorite(property)} 
                disabled={isSaved} 
                className={`btn-secondary ${isSaved ? 'btn-saved' : ''}`} 
            >
                {isSaved ? 'Saved ❤️' : 'Save to Favorites'} 
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;