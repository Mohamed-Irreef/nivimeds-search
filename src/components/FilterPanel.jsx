import React, { useState } from 'react';
import { X, Filter } from 'lucide-react';
import './FilterPanel.css';

const FilterPanel = ({ isOpen, onClose, filters, onFilterChange }) => {
    // Local state for the price slider
    const [priceRange, setPriceRange] = useState(filters.priceRange || 2000);

    const handleCheckboxChange = (category, value) => {
        const currentList = filters[category] || [];
        const updatedList = currentList.includes(value)
            ? currentList.filter(item => item !== value)
            : [...currentList, value];

        onFilterChange({ ...filters, [category]: updatedList });
    };

    const clearAllFilters = () => {
        onFilterChange({ categories: [], brands: [], forms: [], priceRange: 2000 });
        setPriceRange(2000);
    };

    return (
        <>
            {/* Mobile Overlay */}
            <div className={`filter-overlay ${isOpen ? 'show' : ''}`} onClick={onClose} />

            <div className={`filter-panel ${isOpen ? 'open' : ''}`}>
                <div className="filter-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Filter size={20} className="text-primary-blue" />
                        <h3 className="fw-bold">Filters</h3>
                    </div>

                    <div className="filter-header-actions">
                        <button className="clear-all-btn text-muted" onClick={clearAllFilters}>
                            Clear All
                        </button>
                        <button className="close-filter-btn" onClick={onClose} aria-label="Close filters">
                            <X size={24} />
                        </button>
                    </div>
                </div>

                <div className="filter-content">

                    {/* Price Range Slider */}
                    <div className="filter-section">
                        <h4 className="filter-section-title">Price Range</h4>
                        <div className="price-slider-container">
                            <input
                                type="range"
                                min="0"
                                max="5000"
                                step="50"
                                value={priceRange}
                                onChange={(e) => setPriceRange(e.target.value)}
                                onMouseUp={() => onFilterChange({ ...filters, priceRange })}
                                onTouchEnd={() => onFilterChange({ ...filters, priceRange })}
                                className="price-slider"
                                aria-label="Filter by price range"
                            />
                            <div className="price-labels">
                                <span className="text-muted">₹0</span>
                                <span className="fw-bold text-primary-blue">Under ₹{priceRange}</span>
                            </div>
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="filter-section">
                        <h4 className="filter-section-title">Category</h4>
                        <div className="checkbox-group">
                            {['Pain Relief', 'Skin Care', 'Diabetes', 'Vitamins & Supplements'].map(cat => (
                                <label key={cat} className="custom-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={(filters.categories || []).includes(cat)}
                                        onChange={() => handleCheckboxChange('categories', cat)}
                                    />
                                    <span className="checkmark"></span>
                                    {cat}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Brands */}
                    <div className="filter-section">
                        <h4 className="filter-section-title">Brand</h4>
                        <div className="checkbox-group">
                            {['Himalaya Wellness', 'Micro Labs Ltd', 'Galderma', 'Roche', 'MSD Pharmaceuticals'].map(brand => (
                                <label key={brand} className="custom-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={(filters.brands || []).includes(brand)}
                                        onChange={() => handleCheckboxChange('brands', brand)}
                                    />
                                    <span className="checkmark"></span>
                                    {brand}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Medicine Forms */}
                    <div className="filter-section">
                        <h4 className="filter-section-title">Form</h4>
                        <div className="checkbox-group">
                            {['Tablet', 'Syrup', 'Gel', 'Liquid', 'Device'].map(form => (
                                <label key={form} className="custom-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={(filters.forms || []).includes(form)}
                                        onChange={() => handleCheckboxChange('forms', form)}
                                    />
                                    <span className="checkmark"></span>
                                    {form}
                                </label>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Mobile Fixed Bottom Buttons (Visible only on mobile) */}
                <div className="filter-footer mobile-only">
                    <button className="apply-filters-btn fw-bold" onClick={onClose}>
                        Show Results
                    </button>
                </div>
            </div>
        </>
    );
};

export default FilterPanel;
