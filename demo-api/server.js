const express = require("express");
const app = express();
const connectDb = require("./config/connectDb");
const Product = require("./models/productModel");

app.use(express.json());

connectDb()
  .then(() => {
    const port = 3000;
    app.listen(port, () => {
      console.log(`App is running on port ${port}`);
    });
  })
  .catch(() => console.log("Error in DB Connection"));

/**@description to add product in db */
app.post("/product", async (req, res) => {
  try {
    const product = await Product.create(req?.body);
    res.status(200).json(product);
  } catch (error) {
    console.log("Issue in creating Product");
    res
      .status(500)
      .json({ message: `could not add product ${error?.message}` });
  }
});

/**@description to get All products from db */
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Could not get Products ${error?.message}` });
  }
});

/**@description get product by id */
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Could not find Product ${error?.message}` });
  }
});

/**@description Update product */
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res
        .status(404)
        .json({ message: `Could not find any product with id ${id}` });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Could not Update Product ${error?.message}` });
  }
});

/**@description Delete a Product */
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: `Could not Find Product With Id ${id} to Delete` });
    }
    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Could not Delete Product ${error?.message}` });
  }
});
