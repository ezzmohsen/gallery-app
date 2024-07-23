const axios = require("axios");
const users = require("../data/users");

const loginUrl = "http://localhost:5000/api/auth/login";
const ordersUrl = "http://localhost:5000/api/orders";
const productsUrl = "http://localhost:5000/api/products";

async function getProducts() {
  try {
    const response = await axios.get(productsUrl);

    console.log("Products fetched successfully");
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch products:",
      error.response?.data || error.message
    );
    throw error;
  }
}

async function login(user) {
  try {
    const response = await axios.post(loginUrl, {
      email: user.email,
      password: user.password,
    });
    const token = response.data.token;
    console.log("Login successful for", user.name);
    return token;
  } catch (error) {
    console.error(
      "Login failed for",
      user.name,
      ":",
      error.response?.data || error.message
    );
    throw error;
  }
}

async function createOrder(orderItems, token, user) {
  try {
    const response = await axios.post(
      ordersUrl,
      { orderItemsId: orderItems },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(`${user.name} created order:`, response.data);
  } catch (error) {
    console.error(
      "Failed to create order for",
      user.name,
      ":",
      error.response?.data || error.message
    );
  }
}

function getRandomElementAndStock(products) {
  if (products.length === 0) {
    throw new Error("The products array is empty.");
  }

  const randomIndex = Math.floor(Math.random() * products.length);
  const randomProduct = products[randomIndex];
  const { _id, stock } = randomProduct;
  if (stock <= 1) {
    return null;
  }
  const stockPercentage = Math.floor(stock * 0.1);
  return {
    id: _id,
    quantity: stockPercentage,
  };
}

function runRandomTimes(products) {
  const min = 1;
  const max = 6;
  const randomTimes = Math.floor(Math.random() * (max - min + 1)) + min;

  const results = [];
  for (let i = 0; i < randomTimes; i++) {
    const result = getRandomElementAndStock(products);
    if (result) {
      results.push(result);
    }
  }

  return results;
}

async function main() {
  try {
    const products = await getProducts();
    for (const user of users) {
      const token = await login(user);
      const orderItems = runRandomTimes(products);
      if (orderItems.length > 0) {
        await createOrder(orderItems, token, user);
      } else {
        console.log(`${user.name} had no items to order.`);
      }
    }
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
}

main();
