import dbConnect from "./db"

// This function ensures we're on the server before using Mongoose
export async function withMongoose<T>(callback: () => Promise<T>): Promise<T> {
  // Connect to the database
  await dbConnect()

  // Execute the callback
  return callback()
}

// Export models for server-side use
export { default as User } from "@/models/user"
export { default as Product } from "@/models/product"
export { default as Category } from "@/models/category"
export { default as Brand } from "@/models/brand"
export { default as Ebook } from "@/models/ebook"
export { default as Banner } from "@/models/banner"
export { default as Cart } from "@/models/cart"
export { default as Order } from "@/models/order"
