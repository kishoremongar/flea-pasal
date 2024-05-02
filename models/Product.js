const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide product name"],
      maxlength: [100, "Name can not be more than 100 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please provide product price"],
      default: 0,
    },
    description: {
      type: String,
      required: [true, "Please provide product description"],
      maxlength: [1000, "Description can not be more than 1000 characters"],
    },
    image: {
      type: [String],
      default: ["/uploads/example.jpeg"],
    },
    category: {
      type: String,
      required: [true, "Please provide product category"],
      enum: ["krafts", "shoes", "apparel", "books"],
    },
    subcategory: {
      type: String,
      trim: true,
    },
    material: {
      type: String,
      trim: true,
    },
    size: {
      type: String,
      trim: true,
    },
    genre: {
      type: String,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    condition: {
      type: String,
      enum: ["Excellent", "Good", "Fair"],
      default: "Good",
    },
    company: {
      type: String,
      trim: true,
      required: [true, "Please provide company name"],
    },
    colors: {
      type: [String],
      default: ["#222"],
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    inventory: {
      type: Number,
      required: true,
      default: 15,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// const ProductSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       trim: true,
//       required: [true, "Please provide product name"],
//       maxlength: [100, "Name can not be more than 100 characters"],
//     },
//     price: {
//       type: Number,
//       required: [true, "Please provide product price"],
//       default: 0,
//     },
//     description: {
//       type: String,
//       required: [true, "Please provide product description"],
//       maxlength: [1000, "Description can not be more than 1000 characters"],
//     },
//     image: {
//       type: [String],
//       default: ["/uploads/example.jpeg"],
//     },
//     category: {
//       type: String,
//       required: [true, "Please provide product category"],
//       enum: ["office", "kitchen", "bedroom"],
//     },
//     company: {
//       type: String,
//       required: [true, "Please provide company"],
//       enum: {
//         values: ["ikea", "liddy", "marcos"],
//         message: "{VALUE} is not supported",
//       },
//     },
//     colors: {
//       type: [String],
//       default: ["#222"],
//       required: true,
//     },
//     featured: {
//       type: Boolean,
//       default: false,
//     },
//     freeShipping: {
//       type: Boolean,
//       default: false,
//     },
//     inventory: {
//       type: Number,
//       required: true,
//       default: 15,
//     },
//     averageRating: {
//       type: Number,
//       default: 0,
//     },
//     numOfReviews: {
//       type: Number,
//       default: 0,
//     },
//     user: {
//       type: mongoose.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//   },
//   { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
// );

ProductSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
  justOne: false,
});

ProductSchema.pre("deleteOne", async function (next) {
  await this.model("Review").deleteMany({ product: this._id });
});

module.exports = mongoose.model("Product", ProductSchema);
