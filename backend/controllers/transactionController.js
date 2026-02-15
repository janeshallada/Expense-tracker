const Transaction = require("../models/Transaction");

exports.createTransaction = async (req, res) => {
  const { title, amount, category, date, notes } = req.body;
  const transaction = await Transaction.create({
    user: req.user._id,
    title,
    amount,
    category,
    date,
    notes,
  });
  res.status(201).json(transaction);
};

exports.getTransactions = async (req, res) => {
  const { page = 1, limit = 10, q, category, minAmount, maxAmount, startDate, endDate } = req.query;
  const query = { user: req.user._id };

  if (q) {
    query.$or = [
      { title: { $regex: q, $options: "i" } },
      { notes: { $regex: q, $options: "i" } },
    ];
  }
  if (category) query.category = category;
  if (minAmount || maxAmount) {
    query.amount = {};
    if (minAmount) query.amount.$gte = Number(minAmount);
    if (maxAmount) query.amount.$lte = Number(maxAmount);
  }
  if (startDate || endDate) {
    query.date = {};
    if (startDate) query.date.$gte = new Date(startDate);
    if (endDate) query.date.$lte = new Date(endDate);
  }

  const skip = (page - 1) * limit;
  const [transactions, total] = await Promise.all([
    Transaction.find(query).sort({ date: -1 }).skip(skip).limit(Number(limit)),
    Transaction.countDocuments(query),
  ]);

  res.json({
    transactions,
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
  });
};

exports.getTransactionById = async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);
  if (!transaction || transaction.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: "Transaction not found" });
  }
  res.json(transaction);
};

exports.updateTransaction = async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);
  if (!transaction || transaction.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: "Transaction not found" });
  }
  Object.assign(transaction, req.body);
  const updated = await transaction.save();
  res.json(updated);
};

exports.deleteTransaction = async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);
  if (!transaction || transaction.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: "Transaction not found" });
  }
  await transaction.deleteOne();
  res.json({ message: "Transaction removed" });
};

exports.getSummary = async (req, res) => {
  const userId = req.user._id;
  const total = await Transaction.aggregate([
    { $match: { user: userId } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const byCategory = await Transaction.aggregate([
    { $match: { user: userId } },
    { $group: { _id: "$category", total: { $sum: "$amount" } } },
  ]);

  const recent = await Transaction.find({ user: userId }).sort({ date: -1 }).limit(5);

  res.json({
    total: total[0]?.total || 0,
    byCategory,
    recent,
  });
};
