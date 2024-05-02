// Import necessary modules
const mongoose = require("mongoose");
require("dotenv").config();
const fs = require("fs");
const Product = require("../models/Product");

mongoose.connect(process.env.DB_URL);

// Define the function to insert data
const insertData = async () => {
  try {
    // Read data from products.json file
    // const rawData = fs.readFileSync("./mockData/productdata.json");
    const productsData = JSON.parse(rawData);

    // Insert data into MongoDB using insertMany
    await Product.insertMany(productsData);
    console.log("Data inserted successfully");
  } catch (err) {
    console.error(err);
  } finally {
    // Disconnect from MongoDB after insertion
    mongoose.disconnect();
  }
};

insertData();
