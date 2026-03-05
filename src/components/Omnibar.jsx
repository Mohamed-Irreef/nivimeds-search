import React, { useState, useEffect, useRef } from 'react';
import { Search, Mic, Camera, Loader2 } from 'lucide-react';
import { autocompleteSuggestions } from '../data/mockProducts';
import './Omnibar.css';

const Omnibar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [suggestions, setSuggestions] = useState(null);
    const wrapperRef = useRef(null);
    const typingTimeoutRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsFocused(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    // Debounced Search & Autocomplete
    useEffect(() => {
        if (query.trim().length > 1) {
            if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

            setIsTyping(true);
            typingTimeoutRef.current = setTimeout(() => {
                // Simulate API call for autocomplete
                setSuggestions(autocompleteSuggestions);
                setIsTyping(false);
            }, 300); // 300ms debounce
        } else {
            setSuggestions(null);
            setIsTyping(false);
        }
        return () => clearTimeout(typingTimeoutRef.current);
    }, [query]);

    const handleClear = () => {
        setQuery('');
        setSuggestions(null);
        onSearch('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
            setIsFocused(false);
        }
    };

    const handleVoiceSearch = () => {
        // Native Web Speech API
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.onstart = () => {
                setQuery('Listening...');
            };
            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setQuery(transcript);
                onSearch(transcript);
            };
            recognition.start();
        } else {
            alert("Voice search is not supported in this browser.");
        }
    };

    const handleVisualSearch = () => {
        alert("Visual Search: In a real app, this would open the camera or a file unploader.");
    };

    return (
        <div className="omnibar-wrapper" ref={wrapperRef}>
            <form className={`omnibar ${isFocused ? 'focused' : ''}`} onSubmit={handleSubmit}>
                <div className="search-icon-wrapper">
                    <Search size={22} className="text-muted" />
                </div>

                <input
                    type="text"
                    className="omnibar-input"
                    placeholder="Search medicines, brands, or health conditions..."
                    value={query === 'Listening...' ? '' : query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    aria-label="Search items"
                />

                <div className="action-buttons">
                    {query && !isTyping && (
                        <button type="button" className="clear-btn" onClick={handleClear} aria-label="Clear search">
                            &times;
                        </button>
                    )}
                    {isTyping && <Loader2 size={20} className="spinning text-muted" />}

                    <button type="button" className="action-btn" onClick={handleVoiceSearch} aria-label="Voice Search" title="Voice Search">
                        <Mic size={22} />
                        <span className="visually-hidden">Voice Search</span>
                    </button>

                    <button type="button" className="action-btn" onClick={handleVisualSearch} aria-label="Visual Search" title="Visual Search">
                        <Camera size={22} />
                        <span className="visually-hidden">Visual Search</span>
                    </button>

                    <button type="submit" className="submit-btn fw-bold">
                        Search
                    </button>
                </div>
            </form>

            {/* Rich Autocomplete Dropdown */}
            {isFocused && suggestions && (
                <div className="autocomplete-dropdown shadow-lg">
                    <div className="dropdown-grid">

                        <div className="dropdown-column">
                            <h4 className="text-muted fw-bold">Medicines</h4>
                            <ul>
                                {suggestions.Medicines.map(item => (
                                    <li key={item.id} onClick={() => { setQuery(item.name); onSearch(item.name); setIsFocused(false); }}>
                                        <Search size={14} className="dropdown-icon" /> {item.name}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="dropdown-column">
                            <h4 className="text-muted fw-bold">Brands</h4>
                            <ul>
                                {suggestions.Brands.map((item, idx) => (
                                    <li key={idx} onClick={() => { setQuery(item.name); onSearch(item.name); setIsFocused(false); }}>
                                        {item.name} <span className="item-count">({item.count})</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="dropdown-column">
                            <h4 className="text-muted fw-bold">Categories</h4>
                            <ul>
                                {suggestions.Categories.map((item, idx) => (
                                    <li key={idx} onClick={() => { setQuery(item.term); onSearch(item.term); setIsFocused(false); }}>
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default Omnibar;
