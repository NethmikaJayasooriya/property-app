import { FaTimes, FaTrashAlt } from 'react-icons/fa'; // IMPORT ICONS

function FavoritesList({ favorites, onRemove, onClear }) {
  
  const handleDragOver = (e) => {
    e.preventDefault(); 
  };

  const handleTrashDrop = (e) => {
    e.preventDefault();
    const propertyId = e.dataTransfer.getData("propertyId");
    if (propertyId) {
        onRemove(propertyId);
    }
  };

  return (
    <div 
      onDragOver={handleDragOver}
      style={{ 
        border: '2px dashed #007bff', 
        borderRadius: '8px', 
        padding: '20px', 
        backgroundColor: '#e9f5ff',
        minHeight: '300px',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3 style={{ margin: 0, color: '#007bff' }}>Favorites</h3> {/* Removed Heart Emoji from text */}
        {favorites.length > 0 && (
            <button onClick={onClear} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>
                Clear All
            </button>
        )}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {favorites.length === 0 ? (
            <p style={{ color: '#666', fontStyle: 'italic', textAlign: 'center', marginTop: '20px' }}>
            Drag properties here to save them
            </p>
        ) : (
            favorites.map(property => (
                <div 
                    key={property.id} 
                    draggable="true" 
                    onDragStart={(e) => e.dataTransfer.setData("propertyId", property.id)}
                    style={{ display: 'flex', gap: '10px', backgroundColor: 'white', padding: '10px', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', cursor: 'grab', alignItems: 'center', position: 'relative' }}
                >
                <img src={property.images[0]} alt="thumb" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                <div style={{ flex: 1 }}>
                    <p style={{ margin: '0 0 2px 0', fontWeight: 'bold', fontSize: '0.85rem' }}>{property.type}</p>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#666' }}>£{property.price.toLocaleString()}</p>
                </div>
                {/* Replaced Text Remove with X Icon */}
                <button 
                    onClick={() => onRemove(property.id)} 
                    title="Remove"
                    style={{ 
                        color: '#999', 
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer', 
                        padding: '5px' 
                    }}
                >
                    <FaTimes size={16} /> 
                </button>
                </div>
            ))
        )}
      </div>

      {favorites.length > 0 && (
        <div 
            onDrop={handleTrashDrop}
            onDragOver={(e) => e.preventDefault()}
            style={{
                marginTop: '20px',
                padding: '20px',
                border: '2px dashed #dc3545',
                borderRadius: '8px',
                backgroundColor: '#fff5f5',
                color: '#dc3545',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px'
            }}
        >
            <FaTrashAlt size={24} /> {/* TRASH ICON */}
            <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Drag here to Remove</span>
        </div>
      )}
    </div>
  );
}

export default FavoritesList;