import mongoose from 'mongoose';

// Update schema to match all fields from your form
const usersSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    contactMethod: String,
    message: String,
    country: String,
    username: String,
    verificationStatus: String,
    selectedCard: String // Added this field from your form data
}, {
    timestamps: true // Adds createdAt and updatedAt fields automatically
});

// Export as "orders" collection
export default mongoose.model("orders", usersSchema);