import asyncHandler from "../middleware/asyncHandler.js";
import Promotion from "../models/promotionModel.js";
import Product from "../models/productModel.js";

// @desc    Create a new promotion
// @route   POST /api/promotions
// @access  Private/Admin
const createPromotion = asyncHandler(async (req, res) => {
  const { name, description, discountPercentage, startDate, endDate } =
    req.body;

  if (!name || !discountPercentage || !startDate || !endDate) {
    res.status(400);
    throw new Error("Please fill all required fields");
  }

  const promotion = new Promotion({
    name,
    description,
    discountPercentage,
    startDate,
    endDate,
    active: false, // New promotions are inactive by default
  });

  const createdPromotion = await promotion.save();
  res.status(201).json(createdPromotion);
});

// @desc    Get all promotions
// @route   GET /api/promotions
// @access  Private/Admin
const getPromotions = asyncHandler(async (req, res) => {
  const promotions = await Promotion.find({});
  res.json(promotions);
});

// @desc    Update promotion
// @route   PUT /api/promotions/:id
// @access  Private/Admin
const updatePromotion = asyncHandler(async (req, res) => {
  const { name, description, discountPercentage, startDate, endDate } =
    req.body;

  const promotion = await Promotion.findById(req.params.id);

  if (promotion) {
    promotion.name = name || promotion.name;
    promotion.description = description || promotion.description;
    promotion.discountPercentage =
      discountPercentage || promotion.discountPercentage;
    promotion.startDate = startDate || promotion.startDate;
    promotion.endDate = endDate || promotion.endDate;

    const updatedPromotion = await promotion.save();
    res.json(updatedPromotion);
  } else {
    res.status(404);
    throw new Error("Promotion not found");
  }
});

// @desc    Activate/Deactivate promotion
// @route   PUT /api/promotions/:id/activate
// @access  Private/Admin
const activatePromotion = asyncHandler(async (req, res) => {
  const promotion = await Promotion.findById(req.params.id);

  if (promotion) {
    promotion.active = req.body.active;
    await promotion.save();

    if (promotion.active) {
      // Apply discount to products
      const products = await Product.find({});
      for (let product of products) {
        product.discountPrice =
          product.price * (1 - promotion.discountPercentage / 100);
        await product.save();
      }
    } else {
      // Remove discount from products
      const products = await Product.find({});
      for (let product of products) {
        product.discountPrice = null;
        await product.save();
      }
    }

    res.json({ message: "Promotion updated" });
  } else {
    res.status(404);
    throw new Error("Promotion not found");
  }
});

// @desc    Delete promotion
// @route   DELETE /api/promotions/:id
// @access  Private/Admin
const deletePromotion = asyncHandler(async (req, res) => {
  const promotion = await Promotion.findById(req.params.id);

  if (promotion) {
    await Promotion.deleteOne({ _id: req.params.id }); // Usa deleteOne en lugar de remove
    res.json({ message: "Promotion removed" });
  } else {
    res.status(404);
    throw new Error("Promotion not found");
  }
});


export {
  createPromotion,
  getPromotions,
  updatePromotion,
  activatePromotion,
  deletePromotion,
};
