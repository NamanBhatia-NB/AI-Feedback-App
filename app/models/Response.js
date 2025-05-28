import mongoose from "mongoose";

const ResponseSchema = new mongoose.Schema({
  feedback: { type: String, required: true },
  price: { type: Number, required: false, default: null },
  sentiment: { type: String, required: true },
  confidence: { type: Number, required: true },
  topics: { type: [String], required: true },
  recommendations: { type: [String], required: true },
  customerResponse: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Response =
  mongoose.models.Response || mongoose.model("Response", ResponseSchema);
export default Response;
