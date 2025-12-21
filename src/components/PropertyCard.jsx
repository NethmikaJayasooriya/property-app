import { Link } from 'react-router-dom';

function PropertyCard({ property }) {
  
  // This runs when you start dragging a card
  const handleDragStart = (e) => {
    // We attach the Property ID to the "dragged data"
    e.dataTransfer.setData("propertyId", property.id);
  };

  return (
    <div 
      draggable="true" 
      onDragStart={handleDragStart}
      style={{ 
        border: '1px solid #e0e0e0', 
        borderRadius: '8px', 
        overflow: 'hidden', 
        width: '300px', 
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
        backgroundColor: 'white',
        cursor: 'grab' // Changes cursor to a hand
      }}
    >
      <img 
        src={property.images[0]} 
        alt={property.type} 
        style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
      />
      
      <div style={{ padding: '15px' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem' }}>
            {property.type} - {property.bedrooms} Bed
        </h3>
        
        <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#2c3e50', margin: '5px 0' }}>
           £{property.price.toLocaleString()}
        </p>
        
        <p style={{ color: '#7f8c8d', fontSize: '0.9rem', marginBottom: '15px' }}>
            {property.location}
        </p>
        
        <Link to={`/property/${property.id}`}>
          <button style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}

export default PropertyCard;