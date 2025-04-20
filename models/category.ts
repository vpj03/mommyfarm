import mongoose from "mongoose"

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a category name"],
      maxlength: [60, "Name cannot be more than 60 characters"],
      unique: true,
    },
    slug: {
      type: String,
      required: [true, "Please provide a category slug"],
      unique: true,
    },
    image: {
      type: String,
      required: [true, "Please provide a category image"],
    },
    description: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Category || mongoose.model("Category", CategorySchema)
