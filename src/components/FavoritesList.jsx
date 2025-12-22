
function FavoritesList({ favorites, onRemove, onClear }) {
  
  // 1. Allow items to be dragged over this box
  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  return (
    <div 
      onDragOver={handleDragOver}
      style={{ 
        border: '2px dashed #007bff', 
        borderRadius: '8px', 
        padding: '20px', 
        backgroundColor: '#e9f5ff',
        minHeight: '300px'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3 style={{ margin: 0, color: '#007bff' }}>❤️ Favorites</h3>
        {favorites.length > 0 && (
            <button onClick={onClear} style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>
                Clear
            </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <p style={{ color: '#666', fontStyle: 'italic', textAlign: 'center', marginTop: '50px' }}>
          Drag properties here to save them
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {favorites.map(property => (
            <div key={property.id} style={{ display: 'flex', gap: '10px', backgroundColor: 'white', padding: '10px', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <img src={property.images[0]} alt="thumb" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
              <div>
                <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', fontSize: '0.9rem' }}>{property.type}</p>
                <p style={{ margin: 0, fontSize: '0.8rem' }}>£{property.price.toLocaleString()}</p>
                <button onClick={() => onRemove(property.id)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', padding: 0, marginTop: '5px' }}>
                    Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesList;