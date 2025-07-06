import mongoose from 'mongoose';

export interface Transaction extends mongoose.Document {
    amount: number;
    date: Date;
    description: string;
}

const TransactionSchema = new mongoose.Schema<Transaction>({
    amount: { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now },
    description: { type: String, required: true },
});

const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);

export default Transaction;