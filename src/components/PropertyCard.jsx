import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function PropertyCard({ property, onFavorite }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("propertyId", property.id);
  };
  
  return (
     <div 
      draggable="true" 
      onDragStart={handleDragStart}
      style={{ 
        backgroundColor: 'white',
        borderTop: '4px solid #2563eb', 
        borderRadius: '8px', 
        overflow: 'hidden', 
        width: '100%',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', 
        cursor: 'grab',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'transform 0.2s, box-shadow 0.2s'
      }}
      onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
      }}
      onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
      }}
      >

      {/* NEW: Heart Button with Text */}
      <button 
        onClick={() => onFavorite(property)}
        title="Add to Favorites"
        style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'white',
            border: 'none',
            borderRadius: '30px', /* Pill shape instead of circle */
            padding: '8px 12px',   /* Padding for text */
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',            /* Space between icon and text */
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            zIndex: 10,
            fontSize: '0.85rem',
            fontWeight: 'bold',
            color: '#333'
        }}
      >
        <FaHeart size={16} color="#ef4444" />
        {/* The Text */}
        <span>Add to Favorites</span>
      </button>

      <img 
        src={property.images[0]} 
        alt={property.type} 
        style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
      />
      
      <div style={{ padding: '15px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
            <h3 style={{ margin: '0 0 5px 0', fontSize: '1.2rem', color: '#1e293b' }}>
                {property.type} - {property.bedrooms} Bed
            </h3>
            
            <p style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#2563eb', margin: '5px 0' }}>
                £{property.price.toLocaleString()}
            </p>
            
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '10px' }}>
                📍 {property.location}
            </p>

            <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '15px', lineHeight: '1.4', height: '40px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {property.description}
            </p>
        </div>
        
        <Link to={`/property/${property.id}`} style={{ width: '100%' }}>
          <button style={{ 
              width: '100%', 
              padding: '10px', 
              backgroundColor: '#2563eb', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'background 0.2s'
          }}>
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}

export default PropertyCard;