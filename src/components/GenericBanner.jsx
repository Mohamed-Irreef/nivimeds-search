import React from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import './GenericBanner.css';

const GenericBanner = ({ originalProduct, genericProduct }) => {
    if (!originalProduct || !genericProduct) return null;

    const savings = originalProduct.price - genericProduct.price;
    const savingsPercent = Math.round((savings / originalProduct.price) * 100);

    return (
        <div className="generic-banner">
            <div className="banner-icon">
                <ShieldCheck size={32} className="text-success" />
            </div>

            <div className="banner-content">
                <h3 className="banner-title">Nivimeds Recommended Generic</h3>
                <p className="banner-subtitle">
                    You searched for <span className="fw-bold">{originalProduct.name}</span> (₹{originalProduct.price}).
                </p>

                <div className="recommendation-card">
                    <div className="rec-details">
                        <h4 className="rec-name">{genericProduct.name}</h4>
                        <p className="rec-brand">by {genericProduct.brand}</p>
                    </div>

                    <div className="rec-pricing">
                        <div className="rec-price-block">
                            <span className="rec-price">₹{genericProduct.price.toFixed(2)}</span>
                            <span className="savings-pill">Save {savingsPercent}% (₹{savings.toFixed(2)})</span>
                        </div>
                        <button className="view-generic-btn">
                            View <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenericBanner;
