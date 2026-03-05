import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Filter as FilterIcon } from 'lucide-react';
import Omnibar from './components/Omnibar';
import FilterPanel from './components/FilterPanel';
import QuickFilters from './components/QuickFilters';
import ProductCard from './components/ProductCard';
import GenericBanner from './components/GenericBanner';
import { mockProducts } from './data/mockProducts';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQuickFilters, setActiveQuickFilters] = useState([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const faaahAudioRef = useRef(null);

  // Advanced Filters State
  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    forms: [],
    priceRange: 2000
  });

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsLoading(true);
    if (query.trim() && faaahAudioRef.current) {
      faaahAudioRef.current.currentTime = 0;
      const playPromise = faaahAudioRef.current.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {});
      }
    }
    // Simulate API delay
    setTimeout(() => setIsLoading(false), 400);
  };

  useEffect(() => {
    faaahAudioRef.current = new Audio('/fahhhhh.mp3');
    faaahAudioRef.current.preload = 'auto';
    return () => {
      if (faaahAudioRef.current) {
        faaahAudioRef.current.pause();
        faaahAudioRef.current = null;
      }
    };
  }, []);

  const handleToggleQuickFilter = (filterValue) => {
    setActiveQuickFilters(prev =>
      prev.includes(filterValue)
        ? prev.filter(f => f !== filterValue)
        : [...prev, filterValue]
    );
  };

  const handleAdvancedFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // 1. Core Search Logic (Fuzzy, tags, brands)
  const searchResults = useMemo(() => {
    let results = mockProducts;

    // A. Text Search matching
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }

    // B. Apply Advanced Filters
    if (filters.categories.length > 0) {
      results = results.filter(p => filters.categories.includes(p.category));
    }
    if (filters.brands.length > 0) {
      results = results.filter(p => filters.brands.includes(p.brand));
    }
    if (filters.forms.length > 0) {
      results = results.filter(p => filters.forms.includes(p.form));
    }
    results = results.filter(p => p.price <= filters.priceRange);

    // C. Apply Quick Filters logic
    if (activeQuickFilters.includes('under_500')) {
      results = results.filter(p => p.price < 500);
    }
    if (activeQuickFilters.includes('discounted')) {
      results = results.filter(p => p.mrp > p.price);
    }
    if (activeQuickFilters.includes('has_generic')) {
      results = results.filter(p => p.generic_alternative_id);
    }

    return results;
  }, [searchQuery, filters, activeQuickFilters]);

  // Handle generic banner display logic
  const topResult = searchResults[0];
  const genericSuggestion = useMemo(() => {
    if (topResult && topResult.generic_alternative_id && !topResult.is_generic) {
      return mockProducts.find(p => p.id === topResult.generic_alternative_id);
    }
    return null;
  }, [topResult]);

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <div className="container header-container">
          <div className="logo h2 fw-bold text-success" style={{ cursor: 'pointer' }} onClick={() => window.location.reload()}>
            Nivimeds<span className="text-muted" style={{ fontSize: '1rem', marginLeft: '4px' }}>.com</span>
          </div>

          <div className="search-container">
            <Omnibar onSearch={handleSearch} />
          </div>

          <div className="header-actions">
            <button className="fw-medium text-muted">Sign In</button>
            <button className="cart-btn" aria-label="Cart">
              <span className="visually-hidden">View Cart</span>
              🛒
            </button>
          </div>
        </div>
      </header>

      <main className="container main-content">
        {searchQuery ? (
          <div>
            <div className="results-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 className="h2 fw-medium">
                Results for <span className="fw-bold text-primary-blue">"{searchQuery}"</span>
                <span className="text-muted" style={{ fontSize: '1rem', marginLeft: '12px', fontWeight: '400' }}>
                  {searchResults.length} items found
                </span>
              </h2>

              <button
                className="mobile-filter-toggle mobile-only fw-bold"
                onClick={() => setIsMobileFilterOpen(true)}
                style={{
                  display: 'none',
                  backgroundColor: 'white',
                  border: '1px solid var(--border-color)',
                  padding: '8px 16px',
                  borderRadius: '100px'
                }}
              >
                <FilterIcon size={18} style={{ marginRight: '8px' }} /> Filters
              </button>
            </div>

            <QuickFilters
              activeFilters={activeQuickFilters}
              onToggleFilter={handleToggleQuickFilter}
            />

            <div className="results-layout">
              {/* Desktop Filters */}
              <div className="filters-sidebar">
                <FilterPanel
                  isOpen={isMobileFilterOpen}
                  onClose={() => setIsMobileFilterOpen(false)}
                  filters={filters}
                  onFilterChange={handleAdvancedFilterChange}
                />
              </div>

              {/* Product Grid Area */}
              <div className="product-grid-section">
                {genericSuggestion && (
                  <GenericBanner originalProduct={topResult} genericProduct={genericSuggestion} />
                )}

                {isLoading ? (
                  <div className="loading-state text-center text-muted py-5" style={{ padding: '60px 0' }}>
                    <div className="loader spinning mx-auto mb-3" style={{ border: '3px solid #f3f3f3', borderTop: '3px solid var(--primary-blue)', borderRadius: '50%', width: '40px', height: '40px' }} />
                    <p>Finding the best matches...</p>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="product-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                    gap: '24px'
                  }}>
                    {searchResults.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <div className="text-center">
                      <h3 className="h3 mb-2">No matching products found.</h3>
                      <p className="text-muted">Try adjusting your filters or searching for something else.</p>
                      <button
                        className="mt-4"
                        style={{ backgroundColor: 'var(--bg-color)', padding: '10px 20px', borderRadius: '8px' }}
                        onClick={() => {
                          setSearchQuery('');
                          setFilters({ categories: [], brands: [], forms: [], priceRange: 2000 });
                          setActiveQuickFilters([]);
                        }}
                      >
                        Clear Search & Filters
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <div className="text-center" style={{ maxWidth: '500px' }}>
              <h2 className="text-muted fw-bold mb-3">Welcome to Nivimeds</h2>
              <p className="text-muted mb-5">Search for medicines, beauty products, brands, or symptoms using our smart universal search above.</p>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button className="quick-filter-pill" onClick={() => handleSearch('Pain Relief')}>💊 Pain Relief</button>
                <button className="quick-filter-pill" onClick={() => handleSearch('Skin Care')}>✨ Skin Care</button>
                <button className="quick-filter-pill" onClick={() => handleSearch('Diabetes')}>🩸 Diabetes</button>
              </div>
            </div>
          </div>
        )}
      </main>

      <style>{`
        @media (max-width: 768px) {
          .mobile-filter-toggle {
            display: flex !important;
            align-items: center;
          }
          .results-header {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 16px;
          }
          .product-grid {
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)) !important;
            gap: 16px !important;
          }
          .loader {
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 12px;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
