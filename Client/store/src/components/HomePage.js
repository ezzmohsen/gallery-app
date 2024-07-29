import React, { useState, useEffect } from 'react';
import './HomePage.css';

const Homepage = () => {
    const products = [
        {
            title: 'Abstract Painting',
            description: 'Unique abstract art piece',
            image: '/image1.jpg',
            price: 'EGP 1,500'
        },
        {
            title: 'Modern Sculpture',
            description: 'Contemporary sculpture for your home',
            image: '/image2.jpg',
            price: 'EGP 3,200'
        },
        {
            title: 'Vintage Vase',
            description: 'Classic vintage vase',
            image: '/image18.jpg',
            price: 'EGP 800'
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [products.length]);

    return (
        <div className="homepage">
            <div className="hero-section">
                <div className="hero-content">
                    <img src={products[currentIndex].image} alt={products[currentIndex].title} className="hero-image" />
                    <h1>{products[currentIndex].title}</h1>
                    <p>{products[currentIndex].description}</p>
                    <p className="hero-price">{products[currentIndex].price}</p>
                    <button className="explore-button">Explore Now</button>
                </div>
            </div>
            <div className="features-section">
                <div className="feature">
                    <h2>Unique Art Pieces</h2>
                    <p>Curated collections from renowned artists around the world.</p>
                </div>
                <div className="feature">
                    <h2>Handcrafted Furniture</h2>
                    <p>Beautiful, bespoke furniture to complement your home decor.</p>
                </div>
                <div className="feature">
                    <h2>Custom Orders</h2>
                    <p>Get personalized pieces designed to your specifications.</p>
                </div>
            </div>
            <div className="featured-products-section">
                <h2>Featured Products</h2>
                <div className="product-list">
                    <div className="product-card">
                        <img src="/image1.jpg" alt="Product 1" />
                        <h3>Abstract Painting</h3>
                        <p>EGP 1,500</p>
                    </div>
                    <div className="product-card">
                        <img src="/image2.jpg" alt="Product 2" />
                        <h3>Modern Sculpture</h3>
                        <p>EGP 3,200</p>
                    </div>
                    <div className="product-card">
                        <img src="/image18.jpg" alt="Product 3" />
                        <h3>Vintage Vase</h3>
                        <p>EGP 800</p>
                    </div>
                    <div className="product-card">
                        <img src="/image3.jpg" alt="Product 3" />
                        <h3>Landscape Oil Painting</h3>
                        <p>EGP 800</p>
                    </div>
                </div>
            </div>
            <div className="about-section">
                <h2>About Us</h2>
                <p>We believe art should be accessible to everyone. Our gallery offers a diverse range of artworks and home decor items to suit all tastes and budgets.</p>
            </div>
            <div className="testimonials-section">
                <h2>Customer Testimonials</h2>
                <div className="testimonial">
                    <p>"A fantastic selection of unique art pieces. Highly recommend!"</p>
                    <h4>- Sarah K.</h4>
                </div>
                <div className="testimonial">
                    <p>"Beautiful furniture that fits perfectly in my home. Excellent quality!"</p>
                    <h4>- John D.</h4>
                </div>
            </div>
        </div>
    );
};

export default Homepage;

