const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const path = require("path");
const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};
const getAllProducts = async (req, res) => {
  const { category } = req.query;
  let queryObject = {};
  if (category) {
    queryObject.category = category;
  }

  const products = await Product.find(queryObject);
  res.status(StatusCodes.OK).json({ products, count: products.length });
};
const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId }).populate("reviews");

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product });
};
const updateProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product });
};
const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }

  await product.deleteOne();
  res.status(StatusCodes.OK).json({ msg: "Success! Product removed." });
};
const uploadImage = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError("No File Uploaded");
  }
  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please Upload Image");
  }

  const maxSize = 1024 * 1024;

  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError(
      "Please upload image smaller than 1MB"
    );
  }

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );
  await productImage.mv(imagePath);
  res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });
};
const searchProducts = async (req, res) => {
  const { search } = req.query;

  try {
    const regex = new RegExp(search, "i");

    const products = await Product.find(
      {
        $or: [{ name: { $regex: regex } }, { description: { $regex: regex } }],
      },
      {
        name: 1,
        price: 1,
        image: 1,
        category: 1,
        company: 1,
      }
    );

    const groupedProducts = products.reduce((acc, product) => {
      const group = product.category;
      const { name, price, image, company } = product;

      if (!acc[group]) {
        acc[group] = [];
      }

      acc[group].push({
        id: product._id.toString(),
        label: name,
        price,
        image,
        company,
      });

      return acc;
    }, {});

    const actions = Object.entries(groupedProducts).map(([group, actions]) => ({
      group,
      actions,
    }));

    res.status(200).json({ results: actions });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
  searchProducts,
};
