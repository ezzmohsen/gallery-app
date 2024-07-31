import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaHeart, FaEye } from "react-icons/fa";
import ProductCard from "./ProductCard";
import "./ProductsPage.css";

const ProductsPage = ({ onAddToCart, onAddToWishlist, searchQuery }) => {
  const [showCard, setShowCard] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = data.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.price.toString().includes(searchQuery)
  );

  const handleEyeClick = (product) => {
    setSelectedProduct(product);
    setShowCard(true);
  };

  const handleHeartClick = (product) => {
    onAddToWishlist(product);
  };

  const handleCloseCard = () => {
    setShowCard(false);
    setSelectedProduct(null);
  };

  const styles = {
    productsPage: {
      padding: "20px",
    },
    productList: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "20px",
    },
    productCard: {
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "15px",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      transition: "transform 0.3s ease, boxShadow 0.3s ease",
    },
    productCardHover: {
      transform: "translateY(-10px)",
      boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
    },
    imageSection: {
      position: "relative",
      overflow: "hidden",
      borderRadius: "15px",
      height: "250px",
    },
    productImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "15px",
      transition: "transform 0.3s ease",
    },
    productImageHover: {
      transform: "scale(1.1)",
    },
    iconOverlay: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      display: "flex",
      gap: "10px",
      transition: "opacity 0.3s ease",
      opacity: "0",
    },
    iconOverlayHover: {
      opacity: "1",
    },
    icon: {
      fontSize: "24px",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderRadius: "50%",
      padding: "10px",
      cursor: "pointer",
      transition: "background 0.3s ease, transform 0.3s ease",
    },
    iconHover: {
      backgroundColor: "#495057",
      color: "white",
      transform: "scale(1.1)",
    },
    productName: {
      marginTop: "15px",
      fontSize: "22px",
      color: "#212529",
    },
    productPrice: {
      color: "#6c757d",
      fontSize: "16px",
    },
  };

  return (
    <div style={styles.productsPage}>
      <div style={styles.productList}>
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            style={styles.productCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                styles.productCardHover.transform;
              e.currentTarget.style.boxShadow =
                styles.productCardHover.boxShadow;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = "";
            }}
          >
            {product.stock ? null : (
              <div style={{ color: "red" }}>Out Of Stock</div>
            )}
            <div
              style={styles.imageSection}
              onMouseEnter={(e) => {
                e.currentTarget.querySelector(
                  ".product-image"
                ).style.transform = styles.productImageHover.transform;
                e.currentTarget.querySelector(".icon-overlay").style.opacity =
                  styles.iconOverlayHover.opacity;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.querySelector(
                  ".product-image"
                ).style.transform = "";
                e.currentTarget.querySelector(".icon-overlay").style.opacity =
                  "";
              }}
            >
              <img
                className="product-image"
                src={product.image}
                alt={product.name}
                style={styles.productImage}
              />
              <div className="icon-overlay" style={styles.iconOverlay}>
                <FaEye
                  className="icon eye-icon"
                  onClick={() => handleEyeClick(product)}
                  style={styles.icon}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      styles.iconHover.backgroundColor;
                    e.currentTarget.style.color = styles.iconHover.color;
                    e.currentTarget.style.transform =
                      styles.iconHover.transform;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "";
                    e.currentTarget.style.color = "";
                    e.currentTarget.style.transform = "";
                  }}
                />
                <FaHeart
                  className="icon heart-icon"
                  onClick={() => handleHeartClick(product)}
                  style={styles.icon}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      styles.iconHover.backgroundColor;
                    e.currentTarget.style.color = styles.iconHover.color;
                    e.currentTarget.style.transform =
                      styles.iconHover.transform;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "";
                    e.currentTarget.style.color = "";
                    e.currentTarget.style.transform = "";
                  }}
                />
              </div>
            </div>
            <h4 style={styles.productName}>{product.name}</h4>
            <p style={styles.productPrice}>EGP {product.price}</p>
          </div>
        ))}
      </div>
      {showCard && selectedProduct && (
        <ProductCard
          product={selectedProduct}
          onClose={handleCloseCard}
          onAddToCart={onAddToCart}
        />
      )}
    </div>
  );
};

export default ProductsPage;
