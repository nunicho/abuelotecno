import mongoose from "mongoose";

const promotionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    discountPercentage: {
      type: Number,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
      default: false,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Promotion = mongoose.model("Promotion", promotionSchema);

export default Promotion;
