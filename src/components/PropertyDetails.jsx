import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import propertiesData from '../properties.json';
import './PropertyDetails.css';

function PropertyDetails({ onFavorite, favorites = [] }) {
  // Retrieve the property ID from the URL parameters
  const { id } = useParams();
  
  // Find the specific property data from the imported JSON
  const property = propertiesData.find(p => p.id === id);

  // Local state to manage the interactive gallery 
  const [mainImage, setMainImage] = useState(property?.images?.[0] || null);
  
  // Local state to control which tab is currently visible
  const [activeTab, setActiveTab] = useState('description');

  // Check if this property is already saved in the favorites list
  const isSaved = favorites.some(fav => fav.id === property?.id);

  // Handle case where ID doesn't exist 
  if (!property) {
    return (
      <div className="details-container" style={{ padding: '50px', textAlign: 'center' }}>
        <h2>Property not found!</h2>
        <Link to="/" className="details-back-link">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="details-container">

      <Link to="/" className="details-back-link">
        ← Back to Search
      </Link>

      <div className="details-grid">

        {/* Image Gallery Section */}
        <div className="gallery">
          {mainImage ? (
            <img src={mainImage} alt={property.type} className="gallery__main-img" />
          ) : (
            <div className="gallery__main-img" style={{ background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>No Image Available</div>
          )}

          {/* Interactive Thumbnails */}
          <div className="gallery__thumbnails">
            {property.images && property.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="thumbnail"
                // Update the main image state on click
                onClick={() => setMainImage(img)}
                className={`gallery__thumb ${mainImage === img ? 'gallery__thumb--active' : ''}`}
              />
            ))}
          </div>
        </div>

        {/* Property Information and Tab Interface */}
        <div className="details-info">
          <h1 className="details-title">{property.type}</h1>
          <p className="details-location">📍 {property.location}</p>
          <h2 className="details-price">£{property.price.toLocaleString()}</h2>

          {/* Tab Navigation Buttons */}
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

          {/* Conditional Rendering of Tab Content */}
          <div className="tab-content">
            {activeTab === 'description' && (
              <div className="tab-text-scroll">
                <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
                <p><strong>Tenure:</strong> {property.tenure || 'Freehold'}</p>
                <p>{property.longDescription}</p>
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
                  <p style={{ color: '#64748b' }}>No Floor Plan Available</p>
                )}
              </div>
            )}

            {activeTab === 'map' && (
              <div className="tab-image-box">
                <iframe
                  title="Location Map"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                >
                </iframe>
              </div>
            )}
          </div>

          <div className="details-actions">
            <button className="btn-primary">
              Book a Viewing
            </button>
            {/* Disable button if already saved to avoid duplicates */}
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