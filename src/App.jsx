import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import FavoritesList from './components/FavoritesList';
import PropertyCard from './components/PropertyCard';
import PropertyDetails from './components/PropertyDetails';
import SearchForm from './components/SearchForm';
import propertiesData from './properties.json';

function App() {
  const [properties, setProperties] = useState(propertiesData);
  const [favorites, setFavorites] = useState([]); 

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

  const handleDrop = (e) => {
    e.preventDefault();
    const propertyId = e.dataTransfer.getData("propertyId");
    const propertyToAdd = propertiesData.find(p => p.id === propertyId);
    
    if (propertyToAdd && !favorites.find(fav => fav.id === propertyToAdd.id)) {
      setFavorites([...favorites, propertyToAdd]);
    }
  };

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
  };
//browserrouter
  return (
    <BrowserRouter>
      <div className="app-container">
        
        <nav className="navbar">
          <div className="nav-content">
            <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Estate Agent App</h1>
            <button onClick={() => setProperties(propertiesData)} style={{ cursor: 'pointer', background: 'transparent', color: 'white', border: '1px solid white', padding: '5px 10px', borderRadius: '4px' }}>
                Show All
            </button>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={
            /* FIX: Replaced inline style with 'page-content' class */
            <div className="page-content">
              
              <SearchForm onSearch={handleSearch} />

              <div className="main-layout">
                
                {/* Left Side: Property Grid */}
                <div>
                   <h2 style={{ marginTop: 0, color: '#333' }}>Found {properties.length} Properties</h2>
                   <div className="properties-grid">
                    {properties.length > 0 ? (
                        properties.map(property => (
                            <PropertyCard key={property.id} property={property} />
                        ))
                    ) : (
                        <p>No properties match your search.</p>
                    )}
                  </div>
                </div>

                {/* Right Side: Favorites */}
                <div 
                    className="sticky-sidebar"
                    onDrop={handleDrop} 
                    onDragOver={(e) => e.preventDefault()} 
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