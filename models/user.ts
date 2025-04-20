import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      maxlength: [60, "Name cannot be more than 60 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    role: {
      type: String,
      enum: ["admin", "seller", "buyer"],
      default: "buyer",
    },
    addresses: [
      {
        type: {
          street: String,
          city: String,
          state: String,
          zipCode: String,
          country: String,
          isDefault: Boolean,
        },
      },
    ],
    phone: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
)

// Use the getModel utility to safely get or create the model
const User = mongoose.models.User || mongoose.model("User", UserSchema)

export default User
