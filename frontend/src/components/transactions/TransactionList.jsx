import TransactionItem from "./TransactionItem.jsx";

const TransactionList = ({ transactions, refresh }) => {
  if (!transactions || transactions.length === 0) {
    return <p className="text-center text-gray-500">No transactions found.</p>;
  }

  return (
    <div className="card">
      {transactions.map((t) => (
        <TransactionItem key={t._id} t={t} refresh={refresh} />
      ))}
    </div>
  );
};

export default TransactionList;
