import React from 'react';
import './QuickFilters.css';

const MOCK_QUICK_FILTERS = [
    { id: 'qf1', label: 'Under ₹500', value: 'under_500' },
    { id: 'qf2', label: 'Top Brands', value: 'top_brands' },
    { id: 'qf3', label: 'Generic Alternatives', value: 'has_generic' },
    { id: 'qf4', label: 'Discounted', value: 'discounted' },
    { id: 'qf5', label: 'Best Sellers', value: 'best_sellers' },
];

const QuickFilters = ({ activeFilters, onToggleFilter }) => {
    return (
        <div className="quick-filters-container">
            <div className="quick-filters-scroll">
                {MOCK_QUICK_FILTERS.map(filter => {
                    const isActive = activeFilters.includes(filter.value);
                    return (
                        <button
                            key={filter.id}
                            className={`quick-filter-pill ${isActive ? 'active' : ''}`}
                            onClick={() => onToggleFilter(filter.value)}
                            aria-pressed={isActive}
                        >
                            {filter.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default QuickFilters;
