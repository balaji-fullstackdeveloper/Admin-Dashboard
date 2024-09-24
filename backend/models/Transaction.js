import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    userId: String,
    products: [
      {
        type: [mongoose.Schema.Types.ObjectId],
        of: Number,
      },
    ],
    cost: String,
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;
