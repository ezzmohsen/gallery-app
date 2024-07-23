const axios = require("axios");
const users = require("../data/users");

const usersUrl = "http://localhost:5000/api/auth/register";

async function postUser(user) {
  try {
    const response = await axios.post(usersUrl, user);
    console.log(`User ${user.name} added:`, response.data);
  } catch (error) {
    console.error(
      "Failed to register user:",
      user.name,
      ":",
      error.response?.data || error.message
    );
  }
}

async function main() {
  try {
    for (const user of users) {
      await postUser(user);
    }
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
}

main();
