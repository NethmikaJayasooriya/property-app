import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FavoritesList from './components/FavoritesList'; // Import the new component
import PropertyCard from './components/PropertyCard';
import PropertyDetails from './components/PropertyDetails';
import SearchForm from './components/SearchForm';
import propertiesData from './properties.json';

function App() {
  const [properties, setProperties] = useState(propertiesData);
  const [favorites, setFavorites] = useState([]); // State for Favorites

  // SEARCH LOGIC
  const handleSearch = (criteria) => {
    const filtered = propertiesData.filter(property => {
      if (criteria.type !== 'any' && property.type !== criteria.type) return false;
      if (criteria.minPrice && property.price < Number(criteria.minPrice)) return false;
      if (criteria.maxPrice && property.price > Number(criteria.maxPrice)) return false;
      if (criteria.minBedrooms && property.bedrooms < Number(criteria.minBedrooms)) return false;
      if (criteria.maxBedrooms && property.bedrooms > Number(criteria.maxBedrooms)) return false;
      if (criteria.postcode && !property.postcode.toLowerCase().includes(criteria.postcode.toLowerCase())) return false;
      if (criteria.dateAdded && new Date(property.dateAdded) < new Date(criteria.dateAdded)) return false;
      return true;
    });
    setProperties(filtered);
  };

  // FAVORITES LOGIC: Handle the Drop
  const handleDrop = (e) => {
    e.preventDefault();
    const propertyId = e.dataTransfer.getData("propertyId");
    const propertyToAdd = propertiesData.find(p => p.id === propertyId);
    
    // Prevent duplicates
    if (propertyToAdd && !favorites.find(fav => fav.id === propertyToAdd.id)) {
      setFavorites([...favorites, propertyToAdd]);
    }
  };

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
  };

  return (
    <BrowserRouter>
      <div className="app-container" style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
        
        <nav style={{ padding: '20px', backgroundColor: '#333', color: 'white', marginBottom: '30px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Estate Agent App</h1>
            <button onClick={() => setProperties(propertiesData)} style={{ cursor: 'pointer', background: 'transparent', color: 'white', border: '1px solid white', padding: '5px 10px', borderRadius: '4px' }}>
                Show All
            </button>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={
            <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
              
              <SearchForm onSearch={handleSearch} />

              {/* LAYOUT: Grid for Main Content vs Favorites Sidebar */}
              <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '20px' }}>
                
                {/* Left Side: Property Grid */}
                <div>
                   <h2 style={{ marginTop: 0, color: '#333' }}>Found {properties.length} Properties</h2>
                   <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                    {properties.length > 0 ? (
                        properties.map(property => (
                            <PropertyCard key={property.id} property={property} />
                        ))
                    ) : (
                        <p>No properties match your search.</p>
                    )}
                  </div>
                </div>

                {/* Right Side: Favorites Drop Zone */}
                <div 
                    onDrop={handleDrop} 
                    onDragOver={(e) => e.preventDefault()} // Crucial for dropping
                >
                    <FavoritesList 
                        favorites={favorites} 
                        onRemove={removeFavorite} 
                        onClear={() => setFavorites([])} 
                    />
                </div>

              </div>
            </div>
          } />

          <Route path="/property/:id" element={<PropertyDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;