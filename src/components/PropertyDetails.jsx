import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import propertiesData from '../properties.json';

function PropertyDetails() {
  const { id } = useParams(); // 1. Get the ID from the URL
  const property = propertiesData.find(p => p.id === id); // 2. Find the house
  
  // State for the Image Gallery (default to first image)
  const [mainImage, setMainImage] = useState(property ? property.images[0] : null);
  
  // State for the Tabs (default to description)
  const [activeTab, setActiveTab] = useState('description');

  // Safety check: If ID doesn't exist
  if (!property) {
    return <div style={{ padding: '20px' }}><h2>Property not found!</h2><Link to="/">Back to Home</Link></div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Back Button */}
      <Link to="/" style={{ textDecoration: 'none', color: '#555', display: 'inline-block', marginBottom: '20px' }}>
        &larr; Back to Search
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        
        {/* LEFT COLUMN: Image Gallery */}
        <div>
          {/* Big Image */}
          <img 
            src={mainImage} 
            alt={property.type} 
            style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }} 
          />
          {/* Thumbnails */}
          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto' }}>
            {property.images.map((img, index) => (
              <img 
                key={index}
                src={img} 
                alt="thumbnail"
                onClick={() => setMainImage(img)} // Click to swap image
                style={{ 
                  width: '80px', 
                  height: '60px', 
                  objectFit: 'cover', 
                  cursor: 'pointer', 
                  borderRadius: '4px',
                  border: mainImage === img ? '2px solid #007bff' : '2px solid transparent'
                }} 
              />
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Info & Tabs */}
        <div>
          <h1 style={{ marginTop: 0 }}>{property.type}</h1>
          <h3 style={{ color: '#7f8c8d' }}>{property.location}</h3>
          <h2 style={{ color: '#2c3e50', fontSize: '2rem' }}>£{property.price.toLocaleString()}</h2>
          
          {/* Tab Buttons */}
          <div style={{ display: 'flex', borderBottom: '1px solid #ccc', margin: '20px 0' }}>
            <button 
              onClick={() => setActiveTab('description')}
              style={{ padding: '10px 20px', background: 'none', border: 'none', borderBottom: activeTab === 'description' ? '3px solid #007bff' : 'none', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Description
            </button>
            <button 
              onClick={() => setActiveTab('floorplan')}
              style={{ padding: '10px 20px', background: 'none', border: 'none', borderBottom: activeTab === 'floorplan' ? '3px solid #007bff' : 'none', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Floor Plan
            </button>
            <button 
              onClick={() => setActiveTab('map')}
              style={{ padding: '10px 20px', background: 'none', border: 'none', borderBottom: activeTab === 'map' ? '3px solid #007bff' : 'none', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Google Map
            </button>
          </div>

          {/* Tab Content */}
          <div style={{ minHeight: '200px' }}>
            {activeTab === 'description' && (
              <div>
                <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
                <p><strong>Tenure:</strong> Freehold</p>
                <p style={{ lineHeight: '1.6', color: '#555' }}>{property.longDescription}</p>
              </div>
            )}
            
            {activeTab === 'floorplan' && (
              <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#eee', borderRadius: '8px' }}>
                <p>Floor Plan Image Placeholder</p>
                {/* Eventually you can add a real floorplan image here */}
                <img src="https://placehold.co/400x300?text=Floor+Plan" alt="Floor Plan" style={{ maxWidth: '100%' }} />
              </div>
            )}

            {activeTab === 'map' && (
              <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#eee', borderRadius: '8px' }}>
                <p>Google Map Placeholder</p>
                 <img src="https://placehold.co/400x300?text=Map+View" alt="Map" style={{ maxWidth: '100%' }} />
              </div>
            )}
          </div>

          <button style={{ marginTop: '20px', padding: '15px 30px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', fontSize: '1.1rem', cursor: 'pointer' }}>
            Book a Viewing
          </button>
        </div>

      </div>
    </div>
  );
}

export default PropertyDetails;