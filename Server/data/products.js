const products = [
    {
        name: "Abstract Canvas Painting",
        description: "A vibrant abstract painting on canvas.",
        price: 150.00,
        stock: 15,
        image: "http://localhost:5000/images/image1.jpg",
        category: "Paintings",
        status: "available"
    },
    {
        name: "Modern Sculpture",
        description: "A contemporary sculpture made of metal.",
        price: 200.00,
        stock: 12,
        image: "http://localhost:5000/images/image2.jpg",
        category: "Sculptures",
        status: "available"
    },
    {
        name: "Landscape Oil Painting",
        description: "A beautiful landscape painted with oil paints.",
        price: 250.00,
        stock: 18,
        image: "http://localhost:5000/images/image3.jpg",
        category: "Paintings",
        status: "available"
    },
    {
        name: "Handcrafted Ceramic Vase",
        description: "A unique ceramic vase handcrafted by artisans.",
        price: 75.00,
        stock: 22,
        image: "http://localhost:5000/images/image4.jpg",
        category: "Ceramics",
        status: "available"
    },
    {
        name: "Digital Art Print",
        description: "A high-quality digital print of a modern artwork.",
        price: 40.00,
        stock: 25,
        image: "http://localhost:5000/images/image5.jpg",
        category: "Prints",
        status: "available"
    },
    {
        name: "Watercolor Portrait",
        description: "A delicate watercolor portrait painting.",
        price: 120.00,
        stock: 14,
        image: "http://localhost:5000/images/image6.jpg",
        category: "Paintings",
        status: "available"
    },
    {
        name: "Glass Art Piece",
        description: "An intricate glass art piece with stunning colors.",
        price: 180.00,
        stock: 12,
        image: "http://localhost:5000/images/image7.jpg",
        category: "Glass Art",
        status: "available"
    },
    {
        name: "Acrylic Abstract Painting",
        description: "An abstract painting created with acrylic paints.",
        price: 160.00,
        stock: 15,
        image: "http://localhost:5000/images/image8.jpg",
        category: "Paintings",
        status: "available"
    },
    {
        name: "Wooden Sculpture",
        description: "A beautiful sculpture carved from wood.",
        price: 130.00,
        stock: 17,
        image: "http://localhost:5000/images/image9.jpg",
        category: "Sculptures",
        status: "available"
    },
    {
        name: "Ink Drawing",
        description: "A detailed ink drawing on high-quality paper.",
        price: 90.00,
        stock: 20,
        image: "http://localhost:5000/images/image10.jpg",
        category: "Drawings",
        status: "available"
    },
    {
        name: "Contemporary Wall Art",
        description: "A piece of contemporary wall art for modern interiors.",
        price: 210.00,
        stock: 10,
        image: "http://localhost:5000/images/image11.jpg",
        category: "Wall Art",
        status: "available"
    },
    {
        name: "Handmade Pottery Bowl",
        description: "A handcrafted pottery bowl with a unique design.",
        price: 45.00,
        stock: 30,
        image: "http://localhost:5000/images/image12.jpg",
        category: "Pottery",
        status: "available"
    },
    {
        name: "Vintage Art Poster",
        description: "A vintage art poster printed on high-quality paper.",
        price: 60.00,
        stock: 35,
        image: "http://localhost:5000/images/image13.jpg",
        category: "Posters",
        status: "available"
    },
    {
        name: "Photography Print",
        description: "A stunning photography print captured by a professional.",
        price: 85.00,
        stock: 15,
        image: "http://localhost:5000/images/image14.jpg",
        category: "Photography",
        status: "available"
    },
    {
        name: "Bronze Sculpture",
        description: "A detailed sculpture cast in bronze.",
        price: 275.00,
        stock: 20,
        image: "http://localhost:5000/images/image15.jpg",
        category: "Sculptures",
        status: "available"
    },
    {
        name: "Artisan Textile Art",
        description: "A piece of textile art handcrafted by artisans.",
        price: 95.00,
        stock: 12,
        image: "http://localhost:5000/images/image16.jpg",
        category: "Textiles",
        status: "available"
    },
    {
        name: "Mixed Media Collage",
        description: "An innovative collage made from mixed media materials.",
        price: 140.00,
        stock: 14,
        image: "http://localhost:5000/images/image17.jpg",
        category: "Collages",
        status: "available"
    },
    {
        name: "Contemporary Ceramic Sculpture",
        description: "A modern sculpture crafted from ceramics.",
        price: 220.00,
        stock: 11,
        image: "http://localhost:5000/images/image18.jpg",
        category: "Ceramics",
        status: "available"
    },
    {
        name: "Framed Watercolor Painting",
        description: "A beautiful watercolor painting framed and ready to hang.",
        price: 135.00,
        stock: 16,
        image: "http://localhost:5000/images/image19.jpg",
        category: "Paintings",
        status: "available"
    },
    {
        name: "Metal Wall Art",
        description: "A striking piece of metal wall art for your home.",
        price: 190.00,
        stock: 12,
        image: "http://localhost:5000/images/image20.jpg",
        category: "Wall Art",
        status: "available"
    },
    {
        name: "Handmade Beaded Jewelry",
        description: "Unique handmade jewelry with intricate beadwork.",
        price: 50.00,
        stock: 22,
        image: "http://localhost:5000/images/image21.jpg",
        category: "Jewelry",
        status: "available"
    },
    {
        name: "Acrylic Pour Painting",
        description: "An abstract painting created using the acrylic pour technique.",
        price: 110.00,
        stock: 15,
        image: "http://localhost:5000/images/image22.jpg",
        category: "Paintings",
        status: "available"
    },
    {
        name: "Handwoven Tapestry",
        description: "A beautiful handwoven tapestry with intricate patterns.",
        price: 250.00,
        stock: 18,
        image: "http://localhost:5000/images/image23.jpg",
        category: "Textiles",
        status: "available"
    },
    {
        name: "Ceramic Tea Set",
        description: "A handcrafted ceramic tea set with a unique design.",
        price: 80.00,
        stock: 24,
        image: "http://localhost:5000/images/image24.jpg",
        category: "Ceramics",
        status: "available"
    },
    {
        name: "Abstract Metal Sculpture",
        description: "An abstract sculpture crafted from metal.",
        price: 300.00,
        stock: 12,
        image: "http://localhost:5000/images/image25.jpg",
        category: "Sculptures",
        status: "available"
    },
    {
        name: "Limited Edition Print",
        description: "A limited edition print of a famous artwork.",
        price: 60.00,
        stock: 20,
        image: "http://localhost:5000/images/image26.jpg",
        category: "Prints",
        status: "available"
    },
    {
        name: "Handcrafted Wooden Box",
        description: "A beautifully handcrafted wooden box for storage.",
        price: 40.00,
        stock: 16,
        image: "http://localhost:5000/images/image27.jpg",
        category: "Woodwork",
        status: "available"
    },
    {
        name: "Stained Glass Window Art",
        description: "A stunning piece of art made from stained glass.",
        price: 210.00,
        stock: 15,
        image: "http://localhost:5000/images/image28.jpg",
        category: "Glass Art",
        status: "available"
    },
    {
        name: "Textured Canvas Art",
        description: "A unique canvas art piece with textured elements.",
        price: 130.00,
        stock: 12,
        image: "http://localhost:5000/images/image29.jpg",
        category: "Paintings",
        status: "available"
    },
    {
        name: "Vintage Photograph",
        description: "A vintage photograph printed on high-quality paper.",
        price: 95.00,
        stock: 22,
        image: "http://localhost:5000/images/image30.jpg",
        category: "Photography",
        status: "available"
    }
];

module.exports = products;
