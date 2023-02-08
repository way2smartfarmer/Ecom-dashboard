const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter product Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter product Description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter product Price"],
    maxLength: [8, "Price cannot exceed 8 charcters"],
  },
  cutted_price: {
    type: Number,
    required: [true, "Please Enter cutted Price"],
    maxLength: [8, "Price cannot exceed 8 charcters"],
  },
  category: {
    type: String,
    required: [true, "Please Enter Product Category"],
  },
  stock: {
    type: Number,
    required: [true, "Please eneter product Stock"],
    maxLength: [4, "Stoc cannot exceed 4 character"],
    default: 1,
  },
  warranty: {
    type: Number,
    required: [true, "Please enter the Product warranty"],
  },
  hightlight: {
    type: String,
  },
  brand: {
    type: String,
    required: [true, "Please enter the Brand name"],
  },
  logo: [
    {
      logo_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  spec_name: {
    type: String,
    required: [true, "Please Enter specification Name"],
    trim: true,
  },
  spec_description: {
    type: String,
    required: [true, "Please Enter specification Description"],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
