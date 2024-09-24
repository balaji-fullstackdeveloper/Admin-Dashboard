import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "config.env" });
import User from "./models/User.js";
import {
  dataProduct,
  dataProductStat,
  dataUser,
  dataTransaction,
} from "./data/index.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"));
const seedData = async () => {
  try {
    // await User.deleteMany();
    // console.log("User deleted!");
    // await User.insertMany(dataUser);
    // console.log("All User added!");
    // await Product.deleteMany();
    // console.log("Product deleted!");
    // await Product.insertMany(dataProduct);
    // console.log("All Product added!");
    // await ProductStat.deleteMany();
    // console.log("Product deleted!");
    // await ProductStat.insertMany(dataProductStat);
    // console.log("All Product added!");
    await Transaction.deleteMany();
    console.log("Transaction deleted!");
    await Transaction.insertMany(dataTransaction);
    console.log("All Transaction added!");
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

seedData();
