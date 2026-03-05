import React from 'react';
import { ShoppingCart, CheckCircle, AlertCircle } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const discount = product.mrp > product.price
        ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
        : 0;

    return (
        <div className="product-card">
            <div className="product-image-container">
                {discount > 0 && <span className="discount-badge">{discount}% OFF</span>}
                {product.is_generic && <span className="generic-badge">Generic Alternative</span>}
                <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
            </div>

            <div className="product-info">
                <h3 className="product-name" title={product.name}>{product.name}</h3>
                <p className="product-brand">{product.brand}</p>

                <div className="product-meta">
                    <span className="product-form">{product.form}</span>
                    {product.requires_prescription ? (
                        <span className="rx-badge text-danger" title="Prescription Required"><AlertCircle size={14} /> Rx Reqd</span>
                    ) : (
                        <span className="rx-badge text-success"><CheckCircle size={14} /> OTC</span>
                    )}
                </div>

                <div className="product-price-row">
                    <div className="price-block">
                        <span className="current-price">₹{product.price.toFixed(2)}</span>
                        {discount > 0 && <span className="mrp-price">₹{product.mrp.toFixed(2)}</span>}
                    </div>

                    <button className="add-to-cart-btn" aria-label={`Add ${product.name} to cart`}>
                        <ShoppingCart size={18} />
                        <span className="visually-hidden">Add to Cart</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
