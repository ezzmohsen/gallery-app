const axios = require("axios");
const products = require("../data/products");

const loginUrl = "http://localhost:5000/api/auth/login";
const productsUrl = "http://localhost:5000/api/admin/products";

const credentials = {
  email: "admin@example.com",
  password: "password-admin",
};

async function login() {
  try {
    const response = await axios.post(loginUrl, credentials);
    const token = response.data.token;
    console.log("Login successful. Token:", token);
    return token;
  } catch (error) {
    console.error("Login failed:", error.response.data);
    throw error;
  }
}

async function postProduct(product, token) {
  try {
    const response = await axios.post(productsUrl, product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(`Product ${product.name} posted:`, response.data);
  } catch (error) {
    console.error("Failed to post product:", product.name, error.response.data);
  }
}

async function main() {
  try {
    const token = await login();
    for (const product of products) {
      await postProduct(product, token);
    }
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
}

main();
